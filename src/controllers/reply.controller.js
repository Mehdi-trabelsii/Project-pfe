import Review from '../models/review.model';
import Reply from '../models/reply.model';


export async function add(req, res, next) {

    const review = await Review.findById(req.params.id)
        .populate('user')
        .populate('replies')

    if (!review) {
        next();
    }
    var reply = new Reply(req.body);
    reply.postedOn = Date.now();

    reply.user = req.locals.user._id;
    await reply.save();
    await review.update({ $push: {replies:reply.id} })
    res.status(201);
    res.json(reply);
}

