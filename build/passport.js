"use strict";

var _passport = _interopRequireDefault(require("passport"));

var _passportGithub = _interopRequireDefault(require("passport-github"));

var _passportKakao = _interopRequireDefault(require("passport-kakao"));

var _User = _interopRequireDefault(require("./models/User"));

var _userCountroller = require("./controllers/userCountroller");

var _routes = _interopRequireDefault(require("./routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_passport["default"].use(_User["default"].createStrategy());

_passport["default"].use(new _passportKakao["default"]({
  clientID: process.env.KAKAO_ID,
  callbackURL: "http://localhost:4000".concat(_routes["default"].kakaoCallback)
}, _userCountroller.kakaoLoginCallback));

_passport["default"].use(new _passportGithub["default"]({
  clientID: process.env.GH_ID,
  clientSecret: process.env.GH_SECRET,
  callbackURL: "http://localhost:4000".concat(_routes["default"].githubCallback)
}, _userCountroller.githubLoginCallback));

_passport["default"].serializeUser(_User["default"].serializeUser());

_passport["default"].deserializeUser(_User["default"].deserializeUser());