"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _passport = _interopRequireDefault(require("passport"));

var _routes = _interopRequireDefault(require("../routes"));

var _videoController = require("../controllers/videoController");

var _userCountroller = require("../controllers/userCountroller");

var _middlewares = require("../middlewares");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var globalRouter = _express["default"].Router();

globalRouter.get(_routes["default"].join, _middlewares.onlyPublic, _userCountroller.getJoin);
globalRouter.post(_routes["default"].join, _middlewares.onlyPublic, _userCountroller.postJoin, _userCountroller.postLogin);
globalRouter.get(_routes["default"].login, _middlewares.onlyPublic, _userCountroller.getLogin);
globalRouter.post(_routes["default"].login, _middlewares.onlyPublic, _userCountroller.postLogin);
globalRouter.get(_routes["default"].home, _videoController.home);
globalRouter.get(_routes["default"].search, _videoController.search);
globalRouter.get(_routes["default"].logout, _middlewares.onlyPrivate, _userCountroller.logout);
globalRouter.get(_routes["default"].github, _userCountroller.githubLogin);
globalRouter.get(_routes["default"].githubCallback, _passport["default"].authenticate('github', {
  failureRedirect: '/login'
}), _userCountroller.postGithubLogin);
globalRouter.get(_routes["default"].kakao, _userCountroller.kakaoLogin);
globalRouter.get(_routes["default"].kakaoCallback, _passport["default"].authenticate('kakao', {
  failureRedirect: '/login'
}), _userCountroller.postKakaoLogin);
globalRouter.get(_routes["default"].me, _userCountroller.getMe);
var _default = globalRouter;
exports["default"] = _default;