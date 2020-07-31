import ApiResponse from '../utils/APIResponse';
import Characteristic from '../models/characteristic.model$';


export function get(req, res) {
    return new ApiResponse(res).success(() => {
        const characteristic = Characteristic.findById(req.params.id);
        return characteristic;
});
}

export function add(req,res) {
    async function addcharacteristic(){
        const characteristic = await new Characteristic({...req.body}).save();
        return{characteristic:characteristic.transform()};
    }
    async function erroraddingproduct(error){
        return product.checkDuplicateLabel(error);
    }
    return new ApiResponse(res).create( addproduct, erroraddingproduct);
}