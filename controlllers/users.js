const { Op } = require("sequelize");
const db = require("../models");
const data = [
  {
    range: "2-5",
    stars: 10,
  },
  {
    range: "5-7",
    stars: 5,
  },
];

const REWARD = 20;
const submitVideo = async (req, res) => {
  try {
    const email = req.headers["x-user-email"];
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
    let todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    let todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);
    let userVideoWatched = await db.userVideos.findOne({
      where: {
        userId: user.Id,
        videoId,
        watchedAt: { [Op.between]: [todayStart, todayEnd] },
      },
    });
    if (userVideoWatched) {
      await db.userVideos.create({ userId: user.Id, videoId });
      return res.status(400).send({
        statusCode: "400",
        statusMessage: "No points for same day rewatch",
        doc: null,
      });
    }
    const totalVideos = await db.userVideos.count({
      where: {
        userId: user.Id,
        watchedAt: { [Op.between]: [todayStart, todayEnd] },
      },
    });
    let starsToAdd = 0;
    //this was the condition that was given towards the end to make it dynamic.
    //start
    for (let d of data) {
      let videoRange = d?.range.split("-");
      let stars = d?.stars;
      if (
        totalVideos > parseInt(videoRange[0]) &&
        totalVideos < parseInt(videoRange[1])
      ) {
        starsToAdd = stars;
      } else starsToAdd = 0;
    }
    //end
    // if (totalVideos < 2) starsToAdd = 20;
    // else if (totalVideos < 7) starsToAdd = 10;
    // else if (totalVideos < 10) starsToAdd = 1;
    // else starsToAdd = 0;
    await db.userVideos.create({ userId: user.Id, videoId });
    await user.increment("star", { by: starsToAdd });
    let totalStars = user.star + starsToAdd;
    return res.status(200).send({
      statusCode: "200",
      statusMessage: "Video watched and entry recorded",
      doc: { totalStars },
    });
  } catch (error) {
    return res.status(500).send({
      statusCode: "500",
      statusMessage: "Server Error",
      doc: error,
    });
  }
};

const leaderBoard = async (req, res) => {
  try {
    const { page = 1, name, gender, department } = req.query;
    const limit = 10;
    const offset = (page - 1) * limit;
    let where = {};
    if (name) Object.assign(where, { name });
    if (gender) Object.assign(where, { gender });
    if (department) Object.assign(where, { department });
    let { count, rows } = await db.users.findAndCountAll({
      offset,
      limit,
      where,
      order: [
        ["star", "DESC"],
        ["Id", "ASC"],
      ],
    });
    if (!rows.length > 0) {
      return res.status(400).send({
        statusCode: "400",
        statusMessage: "No user data found",
        doc: null,
      });
    }
    const leaderBoard = rows.map((u, i) => ({
      rank: offset + i + 1,
      name: u.name,
      email: u.email,
      star: u.star,
      department: u.department,
      gender: u.gender,
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
      doc: error,
    });
  }
};

module.exports = { submitVideo, leaderBoard };
