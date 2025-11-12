const express = require("express");
const db = require("./models");
const app = express();
let videos = require("./controlllers/videos");
app.set("view engine", "ejs");
app.use(express.json());

app.get("/heartbeat", (req, res) => {
  res.json({ status: "ok" });
});
// let routers = require("./routes");
// app.use("/rocked/v1/users", routers.users);
// app.use("/rocked/v1/videos", routers.videos);
const HOST = process.env.HOST
const PORT = process.env.PORT
app.get("/rocked/v1/videos/getVideoById", videos.getVideoById);
app.listen(PORT, HOST, () => {
  console.log(`assessment server is running on ${HOST}:${PORT}`);
});