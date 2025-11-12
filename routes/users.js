let routes = require("express").Router();
let users = require("../controlllers/users")

routes.get("leaderboard", users.leaderBoard);
routes.get("leaderboard", users.leaderBoard);


module.exports = routes