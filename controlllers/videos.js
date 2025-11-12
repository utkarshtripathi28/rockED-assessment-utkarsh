let db = require("../models");

const getVideoById = async (req, res) => {
  try {
    if (!req.query.Id) {
      return res
        .status(400)
        .send({
          statusCode: "400",
          statusMessage: "Please enter Video Id",
          doc: null,
        });
    }
    let video = await db.videos.findOne({
      where: {
        Id: req.query.Id,
      },
    });
    if (video) {
      return res
        .status(200)
        .send({ statusCode: "200", statusMessage: "Data found", doc: video });
    }
    return res
      .status(204)
      .send({ statusCode: "204", statusMessage: "No data found", doc: null });
  } catch (error) {
    return res
      .status(500)
      .send({ statusCode: "500", statusMessage: "Server Error", doc: error });
  }
};

module.exports = { getVideoById };
