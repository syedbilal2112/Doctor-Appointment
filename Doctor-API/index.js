const http = require("http");
const app = require("./app");
const constant = require("./utils/constant");
// const redis = require("redis");
// var flag = 0;
// async function redisCall() {
//   let redisClient = await redis.createClient({
//     db: 0
//   });
//   redisClient.on("error", function (err) {
//     console.error("Error connecting to redis Please Run Redis-server", err.code);
//   });
//   redisClient.on("connect", function (err) {
//     console.error("Redis Connected...");
//     flag = 1;
//   });
//   global.client = redisClient;
// }
// Create server with express app;
const server = http.createServer(app);
server.listen(constant.PORT);
server.on("listening", () => {
  server.timeout = 90000;
  console.log(`server is running at ${constant.PORT}`);
  // var timer = setInterval(async () => {
  //   if (flag == 0) {
  //     // await redisCall();
  //   }
  // }, 6000);
});
console.log("env", process.env.NODE_ENV);
server.on("error", e => {
  console.error("Something went wrong!", e);
});