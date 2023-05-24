const knex = require("../db/connection");

const reduceProperties = require("../utils/reduce-properties");

const addCritic = reduceProperties("review_id", {
  critic_id: ["critic", null, "critic_id"],
  preferred_name: ["critic", null, "preferred_name"],
  surname: ["critic", null, "surname"],
  organization_name: ["critic", null, "organization_name"],
  created_at: ["critic", null, "created_at"],
  updated_at: ["critic", null, "updated_at"],
});

// function list(movieId) {
//   return knex("reviews as r")
//     .join("critics as c", "r.critic_id", "c.critic_id")
//     .select("*")
//     .where({ movie_id: movieId })
//     .then(addCritic);
// }

function list(movieId) {
  let query = knex("reviews as r").join("critics as c", "r.critic_id", "c.critic_id").select("*");

  if (movieId) {
    query = query.where({ movie_id: movieId });
  }

  return query.then(addCritic);
}

function read(review_id) {
  return knex("reviews as r").select("*").where({ "r.review_id": review_id }).first();
}

function getCritic(critic_id) {
  return knex("critics as c").select("*").where({ "c.critic_id": critic_id }).first();
}

function update(updatedReview) {
  return knex("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("r.*", "c.*")
    .where({ "r.review_id": updatedReview.review_id })
    .update(updatedReview, "*");
}

function destroy(review_id) {
  return knex("reviews as r").where({ "r.review_id": review_id }).del();
}

module.exports = {
  list,
  read,
  update,
  delete: destroy,
  getCritic,
  addCritic,
};
