require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: 'localhost',
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: 5432,
});

const getReviews = (productId) => {
  let reviews;

  return pool.query(`SELECT id, product_id, rating, '1970-01-01 00:00:00 GMT'::timestamp + ((date/1000)::text)::interval as date, summary, body, recommend, reported, reviewer_name, reviewer_email, response,
  helpfulness FROM reviews where product_id=${productId}`)
    .then((reviews_raw) => {
      reviews = reviews_raw.rows;
      let photoPromises = [];

      reviews.forEach((review) => {
        photoPromises.push(
          pool.query(`SELECT id, url FROM reviews_photos where review_id=${review.id}`)
          .then((photos_raw) => {
            review.photos = photos_raw.rows;
          })
        );
      });

      return Promise.all(photoPromises);
    })
    .then(() => {
      return reviews;
    })
};

const getRatings = (reviews) => {
  const ratings = {};
  reviews.forEach((review) => {
    ratings[review.rating] = ratings[review.rating] || 0;
    ratings[review.rating] += 1;
  })
  return ratings;
}

const getRecommended = (reviews) => {
  const recommended = {};
  reviews.forEach((review) => {
    const key = Boolean(review.recommend).toString();
    recommended[key] = recommended[key] || 0;
    recommended[key] += 1;
  })

  return recommended;
}

const getReviewMeta = (productId) => {
  let reviewMeta = { product_id: productId };
  let charRating = {};

  return pool.query(`SELECT * FROM reviews where product_id=${productId}`)
    .then((reviews_raw) => {
      const reviews = reviews_raw.rows;
      reviewMeta.ratings = getRatings(reviews);
      reviewMeta.recommended = getRecommended(reviews);
    })
    .then(() => pool.query(`SELECT id, name FROM characteristics where product_id=${productId}`))
    .then((chars_raw) => {
      const chars = chars_raw.rows;
      const charsPromises = [];
      chars.forEach((char) => {
        charsPromises.push(
          pool.query(`SELECT value FROM characteristic_reviews where characteristic_id=${char.id}`)
          .then((results) => {
            charRating[char.name] = charRating[char.name] || {};
            charRating[char.name].id = char.id;
            charRating[char.name].value = charRating[char.name].value || 0;
            if (results.rows.length) {
              charRating[char.name].value += results.rows.reduce((curr, accu) => ({value: accu.value + curr.value}), { value: 0 }).value / results.rows.length;
            }
          })
        )
      })

      return Promise.all(charsPromises);
    })
    .then(() => {
      reviewMeta.characteristics = { ...charRating };
      return reviewMeta;
    })
};

module.exports = {
  getReviews,
  getReviewMeta,
};