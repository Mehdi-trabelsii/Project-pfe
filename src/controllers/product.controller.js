import Product from '../models/product.model';
import { omit, fromPairs } from 'lodash';
import ApiResponse from '../utils/APIResponse';
import product from '../models/product.model';
import Popular from '../models/popular.model';
import httpStatus from 'http-status';


export function get(req, res) {
  return new ApiResponse(res).success(async () => {
    const product = await Product.findById(req.params.id);
    const { user } = req.locals;
    const Exist = await Popular.findOne({ product: req.params.id })
    if(user){
    if (Exist) {
      for (var i = 0; i < Exist.users.length; i++) {
        if (Exist.users[i].toJSON() === user._id.toJSON()) {
          return product;
        }
      }
      Exist.popularity = Exist.users.length + 1;
      Exist.users.push(user._id);
      await Exist.save();
    }
    else {
      var popular = new Popular();
      popular.product = req.params.id;
      popular.popularity = 1
      await popular.save();
      await popular.update({ $push: { users: user._id } })

    }}
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

export function add(req, res) {
  async function addproduct() {
    const product = await new Product({ ...req.body }).save();
    return { product: product.transform() };
  }
  async function erroraddingproduct(error) {
    return product.checkDuplicateLabel(error);
  }
  return new ApiResponse(res).create(addproduct, erroraddingproduct);
}
export function list(req, res, next) {
  return new ApiResponse(res).success(
    async () => {
      const products = await Product.list(req.query);
      const transformedProducts = products.map(product => product.transform());
      return transformedProducts;
    },
    (error) => next(error),
  );
}
export function listdesc(req, res, next) {
  return new ApiResponse(res).success(
    async () => {
      const products = await Product.listdesc(req.query);
      const transformedProducts = products.map(product => product.transform());
      return transformedProducts;
    },
    (error) => next(error),
  );
}
export function listasc(req, res, next) {
  return new ApiResponse(res).success(
    async () => {
      const products = await Product.listasc(req.query);
      const transformedProducts = products.map(product => product.transform());
      return transformedProducts;
    },
    (error) => next(error),
  );
}


export function remove(req, res, next) {
  const product = Product.findById(req.params.id);
  product
    .deleteOne()
    .then(() => res.status(httpStatus.NO_CONTENT).end())
    .catch(e => next(e));
}

export function update(req, res, next) {
  new ApiResponse(res).success(
    async () => {

      const updatedproduct = await Product.findByIdAndUpdate(req.params.id, omit(req.body), { new: true });

      return (await updatedproduct.populate("category")).transform();
    },
    (error) => next(Product.checkDuplicateLabel(error)),
  );
}
export function search (req,res,next){
  new ApiResponse(res).success(
    async() => {
      var s = req.query.s
      return await Product.find({
        label:{
          $regex : new RegExp(s)
        }
      },{
        _id:0,
        __v:0
      }).limit(10);
    }
  )
}