psql reviews

DROP TABLE reviews;
DROP TABLE reviews_photos;
DROP TABLE characteristics;
DROP TABLE characteristic_reviews;

CREATE TABLE reviews (
  id SERIAL,
  product_id INT,
  rating INT,
  date BIGINT,
  summary TEXT,
  body TEXT,
  recommend BOOLEAN,
  reported BOOLEAN,
  reviewer_name VARCHAR(255),
  reviewer_email VARCHAR(255),
  response TEXT,
  helpfulness INT,
  PRIMARY KEY (id)
);

CREATE TABLE reviews_photos (
  id SERIAL,
  review_id INT,
  url TEXT,
  PRIMARY KEY (id)
);

CREATE TABLE characteristics (
  id SERIAL,
  product_id INT,
  name VARCHAR(255),
  PRIMARY KEY (id)
);

CREATE TABLE characteristic_reviews (
  id SERIAL,
  characteristic_id INT,
  review_id INT,
  value INT,
  PRIMARY KEY (id)
);

COPY reviews(id, product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response,helpfulness)
FROM '/Users/tingjunman/Documents/Code/Bootcamp/SDC/SDCApplicationData/reviews.csv'
DELIMITER ','
CSV HEADER;

COPY reviews_photos(id, review_id, url)
FROM '/Users/tingjunman/Documents/Code/Bootcamp/SDC/SDCApplicationData/reviews_photos.csv'
DELIMITER ','
CSV HEADER;

COPY characteristics(id, product_id, name)
FROM '/Users/tingjunman/Documents/Code/Bootcamp/SDC/SDCApplicationData/characteristics.csv'
DELIMITER ','
CSV HEADER;

COPY characteristic_reviews(id, characteristic_id, review_id, value)
FROM '/Users/tingjunman/Documents/Code/Bootcamp/SDC/SDCApplicationData/characteristic_reviews.csv'
DELIMITER ','
CSV HEADER;