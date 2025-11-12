let routes = require("express").Router();
let videos = require("../controlllers/videos")

routes.get("getVideoById", videos.getVideoById);


module.exports = routes;