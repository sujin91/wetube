"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

_mongoose["default"].connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useFindAndModify: false
});

var db = _mongoose["default"].connection;

var handleOpen = function handleOpen() {
  console.log("Conneted to DB");
};

var handleError = function handleError(error) {
  console.log("error to db");
};

db.once("open", handleOpen);
db.once("error", handleError); // export const dummyData = [
//     {
//         id: 1,
//         title: "Video 1",
//         description: "This is something I love",
//         views: 24,
//         videoFile: "https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4",
//         creator: {
//           id: 121212,
//           name: "sujin",
//           email: "sujin@dummy.com"
//         }
//     },
//     {
//         id: 2,
//         title: "Video 2",
//         description: "This is something I love",
//         views: 24,
//         videoFile: "https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4",
//         creator: {
//           id: 121212,
//           name: "sujin",
//           email: "sujin@dummy.com"
//         }
//     },
//     {
//         id: 3,
//         title: "Video 3",
//         description: "This is something I love",
//         views: 24,
//         videoFile: "https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4",
//         creator: {
//           id: 121212,
//           name: "sujin",
//           email: "sujin@dummy.com"
//         }
//     },
//     {
//         id: 4,
//         title: "Video 4",
//         description: "This is something I love",
//         views: 24,
//         videoFile: "https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4",
//         creator: {
//           id: 121212,
//           name: "sujin",
//           email: "sujin@dummy.com"
//         }
//     }
// ]