const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function reviewExists(req, res, next) {
  const review = await service.read(req.params.reviewId);
  if (review) {
    res.locals.review = review;
    return next();
  }
  next({ status: 404, message: `Review cannot be found.` });
}

async function list(req, res, next) {
  let data = "";
  if (req.params.movieId) {
    data = await service.list(req.params.movieId);
  } else {
    data = await service.list();
  }
  data.map((review) => {
    return (review.critic = review.critic[0]);
  });
  res.json({ data });
}

async function read(req, res, next) {
  const { review: data } = res.locals;
  res.json({ data });
}

async function update(req, res, next) {
  const updatedReview = {
    ...res.locals.review,
    ...req.body.data,
    review_id: res.locals.review.review_id,
  };

  const criticId = updatedReview.critic_id;
  const critic = await service.getCritic(criticId);

  await service.update(updatedReview);

  const update = await service.read(res.locals.review.review_id);

  const data = update;

  data.critic = critic;

  res.json({ data });
}

async function destroy(req, res, next) {
  const { review } = res.locals;
  await service.delete(review.review_id);
  res.sendStatus(204);
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  read: [asyncErrorBoundary(reviewExists), read],
  update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
  delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
};
