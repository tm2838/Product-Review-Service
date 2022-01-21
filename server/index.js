require('dotenv').config();
const express = require('express');
const cors = require('cors');

const { getReviews, getReviewMeta, markReviewHelpful, markReviewReported } = require('../db/index.js');

const app = express();
app.use(cors());

app.get('/reviews', async (req, res) => {
  const productId = req.query.product_id || 1;
  let reviews;
  try {
    reviews = await getReviews(productId);
  } catch (e) {
    console.log(e);
    res.status(500).end();
  }

  res.status(200).send({ reviews });
})

app.get('/reviews/meta', async (req, res) => {
  const productId = req.query.product_id || 3;
  let reviewMeta;
  try {
    reviewMeta = await getReviewMeta(productId);
  } catch (e) {
    console.log(e);
    res.status(500).end();
  }

  res.status(200).send({ reviewMeta });
})

app.put('/reviews/:review_id/helpful', async (req, res) => {
  const reviewId = req.params.review_id || 3;
  try {
    await markReviewHelpful(reviewId);
  } catch (e) {
    console.log(e);
    res.status(500).end();
  }

  res.status(204).end();
})

app.put('/reviews/:review_id/report', async (req, res) => {
  const reviewId = req.params.review_id || 3;
  try {
    await markReviewReported(reviewId);
  } catch (e) {
    console.log(e);
    res.status(500).end();
  }

  res.status(204).end();
})

app.listen(8000, () => {
  console.log('listening on port 8000')
});