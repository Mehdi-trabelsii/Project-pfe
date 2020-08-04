import Review from '../models/review.model';
import Reply from '../models/reply.model';
import ApiResponse from '../utils/APIResponse'


// export function list(req, res, next) {
//   return new ApiResponse(res).success(
//     async () => {
//       const replies = await Review.findById(req.params.id);
//       const transformedReplies = replies.map(replies => {
//         let reply = replies.transform();
//         reply.user = reply.user.transform();
//         return reply
//       });
//       return transformedReplies;
//     },
//     (error) => next(error),
//   );
// }


export function get(req, res) {
  return new ApiResponse(res).success(() => {
    const reply = Reply.findById(req.params.id);
    return reply;
  });
}

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
  await review.update({ $push: { replies: reply.id } })
  res.status(201);
  res.json(reply);
}


export function remove(req, res, next) {
  const reply = Reply.findById(req.params.id);
  reply
    .deleteOne()
    .then(() => res.status(httpStatus.NO_CONTENT).end())
    .catch(e => next(e));
}

