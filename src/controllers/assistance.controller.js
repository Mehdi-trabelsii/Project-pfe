import ApiResponse from '../utils/APIResponse';
import Assistance from '../models/assistance.model';
import APIError from '../utils/APIError';


export function get(req, res) {
    return new ApiResponse(res).success(async () => {
        const assistance = await Assitance.findById(req.params.id);
        return assistance.transform();
    });
}

export function list(req,res){
    return new ApiResponse(res).success(async () => {
        const assistances = await Assistance.list(req.query);
        const transformedAssistances = assistances.map(assistance => assistance.transform());
        return transformedAssistances;
    },
    (error) => next(error)
    );
}
export function add (req,res){
    return new ApiResponse(res).success(async() => {
        const {user} = req.locals;
        const assistance = await new Assistance({ ...req.body });
        assistance.user = user;
        await assistance.save();
        return {assistance : assistance.transform()}
    })
}
export async function addreply(req, res, next) {

    const assistance = await Assistance.findById(req.params.id)
      .populate('user')
      .populate('replies')
  
    if (!assistance) {
      next();
    }
    var reply = new Reply(req.body);
    reply.postedOn = Date.now();
  
    reply.user = req.locals.user._id;
    await reply.save();
    await assistance.update({ $push: { replies: reply.id } })
    res.status(201);
    res.json(reply);
  }


