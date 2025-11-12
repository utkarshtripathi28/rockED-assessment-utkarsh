const db = require("../models");

const REWARD = 20;
const submitVideo = async (req, res) => {
  try {
    const email = req.headers.x - user - email;
    const { videoId } = req.body;
    if (!email || !videoId) {
      return res.status(400).send({
        statusCode: "400",
        statusMessage: "Please enter Email and Video Id",
        doc: null,
      });
    }
    const user = await db.users.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      return res.status(404).send({
        statusCode: "400",
        statusMessage: "User does not exists",
        doc: null,
      });
    }
    await db.userVideos.create({ userId: user.Id, videoId });
    await user.increment("star", { by: REWARD });
    let totalStars = user.star + REWARD;
    return res.status(200).send({
      statusCode: "200",
      statusMessage: "Video watched and entry recorded",
      doc: { totalStars },
    });
  } catch (error) {
    return res.status(500).send({
      statusCode: "500",
      statusMessage: "Server Error",
      doc: null,
    });
  }
};

const leaderBoard = async (req, res) => {
  try {
    let users = await db.users.findAll({
      attributes: ["name", "email", "star"],
      order: [
        ["star", "DESC"],
        ["Id", "ASC"],
      ],
    });
    if (!users.length > 0) {
      return res.status(400).send({
        statusCode: "400",
        statusMessage: "No user data found",
        doc: null,
      });
    }
    const leaderBoard = users.map((u, i) => ({
      rank: i + 1,
      name: u.name,
      email: u.email,
      star: u.star,
    }));
    return res.status(200).send({
      statusCode: "200",
      statusMessage: "Leaderboard found",
      doc: leaderBoard,
    });
  } catch (error) {
    return res.status(500).send({
      statusCode: "500",
      statusMessage: "Server Error",
      doc: null,
    });
  }
};

module.exports = { submitVideo };
