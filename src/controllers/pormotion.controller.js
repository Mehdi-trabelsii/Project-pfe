
import Promotion from '../models/promotion.model';
import ApiResponse from '../utils/APIResponse';
import httpStatus from 'http-status';



export function get(req, res) {
  return new ApiResponse(res).success(() => {
    return req.locals.product.transform();
  });
}

export function add(req, res) {
  async function addpromo() {
    const promotion = await new Promotion({ ...req.body }).save();
    return { promotion: promotion.transform() };
  }
  return new ApiResponse(res).create(addpromo);
}

export function list(req, res, next) {
  return new ApiResponse(res).success(
    async () => {
      const promotions = await Promotion.list(req.query);
      const transformedPromotions = promotions.map(promotion => promotion.transform());
      return transformedPromotions;
    },
    (error) => next(error),
  );
}
export function remove(req, res, next) {
  const promotion = Promotion.findById(req.params.id);
  promotion
    .deleteOne()
    .then(() => res.status(httpStatus.NO_CONTENT).end())
    .catch(e => next(e));
    console.log(done);
}
