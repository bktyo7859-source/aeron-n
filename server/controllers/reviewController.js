import { ReviewsDB, ProductsDB } from '../config/db.js';

// @desc    Add review to product
// @route   POST /api/products/:id/reviews
export const createProductReview = (req, res) => {
  try {
    const { rating, comment } = req.body;
    const productId = req.params.id;

    if (!rating || !comment) {
      return res.status(400).json({ success: false, message: 'Rating and comment are required' });
    }

    const review = ReviewsDB.insert({
      product: productId,
      user: req.user ? req.user._id : 'guest',
      userName: req.user ? req.user.name : 'AERON Runner',
      rating: Number(rating),
      comment,
      verifiedPurchase: true
    });

    // Update product average rating
    const allReviews = ReviewsDB.find((r) => r.product === productId);
    const avgRating = allReviews.reduce((acc, r) => acc + r.rating, 0) / allReviews.length;

    ProductsDB.updateById(productId, {
      rating: Number(avgRating.toFixed(1)),
      reviewCount: allReviews.length
    });

    res.status(201).json({
      success: true,
      message: 'Review posted successfully',
      data: review
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
