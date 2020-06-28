import Category from '../models/category.model';
import ApiResponse from '../utils/APIResponse';
import httpStatus from 'http-status';


export function get(req, res) {
    return new ApiResponse(res).success(() => {
      return req.locals.product.transform();
    });
  }

  export function add(req,res) {
    async function addproduct(){
        const category = await new Category({...req.body}).save();
        return{category:category.transform()};
    }
    async function erroraddingproduct(error){
        return category.checkDuplicateLabel(error);
    }
    return new ApiResponse(res).create( addproduct, erroraddingproduct);
}

export function list(req, res, next) {
    return new ApiResponse(res).success(
      async () => {
        const categories = await Category.list(req.query);
        const transformedcategories = categories.map(category => category.transform());
        return transformedcategories;
      },
      (error) => next(error),
    );
  }
  export function remove(req, res, next) {
    const  category  = Category.findById(req.params.id);
    category
      .deleteOne()
      .then(() => res.status(httpStatus.NO_CONTENT).end())
      .catch(e => next(e));
  }