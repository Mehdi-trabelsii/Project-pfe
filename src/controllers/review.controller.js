import Review from '../models/review.model';
import ApiResponse from '../utils/APIResponse';
import httpStatus from 'http-status';
import Product from '../models/product.model';


export function get(req, res) {
    console.log("this is working");
    return new ApiResponse(res).success(() => {
      const  review  = Review.findById(req.params.id);
      return review;
    });
  }
  export function list(req, res, next) {
    return new ApiResponse(res).success(
      async () => {
        const reviews = await Review.list(req.query);
        const transformedReviews = reviews.map(reviews => reviews.transform());
        return transformedReviews;
      },
      (error) => next(error),
    );
  }

export async function add(req, res, next) {
    
    const product = await Product.findById(req.params.id)
        .populate('user')
        .populate('reviews');

    if(!product){
        next();
    }

    for (var i = 0; i < product.reviews.length; i++) {
        if (product.reviews[i].user.toJSON() === req.user._id.toJSON()) {
            res.status = 401;
            return res.json({status:'INVALID_REQUEST',errorCode:'you already reviewed this product'});
        }
    }
    
    var review = new Review(req.body);
    review.postedOn = Date.now();

    review.user = req.locals.user._id;

    product.reviews.push(review);
    review.save();
    res.status(201);
    res.json(review);
}




