const express = require('express');
const reviewController = require('./../controllers/reviewController');
const router = express.Router();
const authController = require('./../controllers/authController');

//ROUTES
router
  .route('/')
  .get(reviewController.getAllReviews)
  .post(
    authController.protect,
    authController.restrictTo('user'),
    reviewController.createReview
  );

module.exports = router;
