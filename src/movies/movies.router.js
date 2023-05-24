const router = require("express").Router();
const controller = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

const cors = require("cors");
router.use(cors());

router.route("/").get(controller.list).all(methodNotAllowed);
router.route("/:movieId").get(controller.read).all(methodNotAllowed);

const reviewsRouter = require("../reviews/reviews.router");
router.use("/:movieId/reviews", controller.movieExists, reviewsRouter);

const theatersRouter = require("../theaters/theaters.router");
router.use("/:movieId/theaters", controller.movieExists, theatersRouter);

module.exports = router;
