import Product from '../models/product.model';
import { omit, fromPairs } from 'lodash';
import ApiResponse from '../utils/APIResponse';
import product from '../models/product.model';
import Popular from '../models/popular.model';
import httpStatus from 'http-status';


export function get(req, res) {
  return new ApiResponse(res).success(() => {
    const  product  = Product.findById(req.params.id);
    return product;
  });
}
export function listpersubcat(req, res, next) {
  return new ApiResponse(res).success(
    async () => {
      const products = await Product.find({ subcategory: req.params.id });
      const transformedProducts = products.map(products => {
        let product = products.transform();

        return product
      });
      return transformedProducts;
    },
    (error) => next(error),
  );
}

export function listpercat(req, res, next) {
  return new ApiResponse(res).success(
    async () => {
      const products = await Product.find({ category: req.params.id });
      const transformedProducts = products.map(products => {
        let product = products.transform();

        return product
      });
      return transformedProducts;
    },
    (error) => next(error),
  );
}

export function add(req,res) {
    async function addproduct(){
        const product = await new Product({...req.body}).save();
        return{product:product.transform()};
    }
    async function erroraddingproduct(error){
        return product.checkDuplicateLabel(error);
    }
    return new ApiResponse(res).create( addproduct, erroraddingproduct);
}
export function list(req, res, next) {
    return new ApiResponse(res).success(
      async () => {
        const products = await Product.list(req.query);
        console.log(products);
        const transformedProducts = products.map(product => product.transform());
        return transformedProducts;
      },
      (error) => next(error),
    );
  }

  export function remove(req, res, next) {
    const  product  = Product.findById(req.params.id);
    product
      .deleteOne()
      .then(() => res.status(httpStatus.NO_CONTENT).end())
      .catch(e => next(e));
  }

  export function update(req, res, next) {
    new ApiResponse(res).success(
      async () => {
        
        const updatedproduct = await Product.findByIdAndUpdate(req.params.id,omit(req.body),{new:true});

        return (await updatedproduct.populate("category","promotion")).transform();
      },
      (error) => next(Product.checkDuplicateLabel(error)),
    );
    }