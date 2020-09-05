import ApiResponse from '../utils/APIResponse';
import Popular from '../models/popular.model';
import Product from '../models/product.model';
import category from '../models/category.model';

export function list(req,res,next){
    new ApiResponse(res).success( async () =>{
        const {user} = req.locals;
        const populars = await Popular.find({users : user._id}).populate('product');
        const categories = {} ;
        populars.forEach(popular =>{
            if(!categories [popular.product.category])
            {
                categories [popular.product.category] = 1 ;
            }
            else {
                categories [popular.product.category] += 1;
            }
        })
        const categoriesKeys = Object.keys(categories).sort((a,b) =>{
            return categories[b] - categories [a] ;
        }).slice(0.5);
        const categoriesNumber = categoriesKeys.reduce((result,category)=>{
            return result+categories[category] ;
        },0);
        const products = await Promise.all(categoriesKeys.map((category) => {
        return Product.find({category:category}).sort({createdAt : -1}).limit((Math.round(categories[category]*20)/categoriesNumber));
        }));         
        return products;
    })

}