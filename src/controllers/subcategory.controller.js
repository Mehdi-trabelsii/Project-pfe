import Subcategory from '../models/subcategory.model';
import ApiResponse from '../utils/APIResponse';
import httpStatus from 'http-status';
import { omit } from 'lodash';


export function get(req, res) {
  return new ApiResponse(res).success(() => {
    const subcategory = Subcategory.findById(req.params.id);
    return subcategory;
  });
}
export function listpercat(req, res, next) {
  return new ApiResponse(res).success(
    async () => {
      const subcategories = await Subcategory.find({ category: req.params.id });
      const transformedsubcategories = subcategories.map(subcategories => {
        let subcategory = subcategories.transform();

        return subcategory
      });
      return transformedsubcategories;
    },
    (error) => next(error),
  );
}

  export function add(req,res) {
    async function addsubcategory(){
        const subcategory = await new Subcategory({...req.body}).save();
        return{subcategory:subcategory.transform()};
    }
    async function erroraddingsubcategory(error){
        return subcategory.checkDuplicateLabel(error);
    }
    return new ApiResponse(res).create( addsubcategory, erroraddingsubcategory);
}

export function list(req, res, next) {
    return new ApiResponse(res).success(
      async () => {
        const subcategories = await Subcategory.list(req.query);
        const transformedsubcategories = subcategories.map(subcategory => subcategory.transform());
        return transformedsubcategories;
      },
      (error) => next(error),
    );
  }

  export function remove(req, res, next) {
    const subcategory = Subcategory.findById(req.params.id);
    subcategory
      .deleteOne()
      .then(() => res.status(httpStatus.NO_CONTENT).end())
      .catch(e => next(e));

  }

  export function update(req, res, next) {
    new ApiResponse(res).success(
      async () => {
        
        const updatedsubcategory = await Subcategory.findByIdAndUpdate(req.params.id,omit(req.body),{new:true});

        return (await updatedsubcategory).transform();
      },
  
    );
    }
