import Review from '../models/review.model';
import ApiResponse from '../utils/APIResponse';
import httpStatus from 'http-status';
import Product from '../models/product.model';


export function get(req, res) {
  console.log("this is working");
  return new ApiResponse(res).success(() => {
    const review = Review.findById(req.params.id);
    return review;
  });
}
export function list(req, res, next) {
  return new ApiResponse(res).success(
    async () => {
      const reviews = await Review.find({ product: req.params.id }).populate('user');
      const transformedReviews = reviews.map(reviews => {
        let review = reviews.transform();
        review.user = review.user.transform();
        return review
      });
      return transformedReviews;
    },
    (error) => next(error),
  );
}

export async function add(req, res, next) {

  const product = await Product.findById(req.params.id)
    .populate('user')
    .populate('reviews');

  if (!product) {
    next();
  }
  const reviews =await Review.find({ product: req.params.id })
  for (var i = 0; i < reviews.length; i++) {
    if (reviews[i].user.toJSON() === req.user._id.toJSON()) {
      res.status = 401;
      return res.json({ status: 'INVALID_REQUEST', errorCode: 'you already reviewed this product' });
    }
  }
  var review = new Review(req.body);
  review.postedOn = Date.now();
  review.user = req.locals.user._id;
  review.product = req.params.id;
  review.save();
  res.status(201);
  res.json(review);
}

export function remove(req, res, next) {
  const review = Reply.findById(req.params.id);
  review
    .deleteOne()
    .then(() => res.status(httpStatus.NO_CONTENT).end())
    .catch(e => next(e));
}




