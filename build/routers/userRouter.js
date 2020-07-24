"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _routes = _interopRequireDefault(require("../routes"));

var _userCountroller = require("../controllers/userCountroller");

var _middlewares = require("../middlewares");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var userRouter = _express["default"].Router(); // userRouter.get(routes.users, users)
// userRouter.get(routes.userDetail, userDetail)


userRouter.get(_routes["default"].editProfile, _middlewares.onlyPrivate, _userCountroller.getEditProfile);
userRouter.post(_routes["default"].editProfile, _middlewares.onlyPrivate, _middlewares.uploadAvatar, _userCountroller.postEditProfile);
userRouter.get(_routes["default"].changePassword, _middlewares.onlyPrivate, _userCountroller.getChangePassword);
userRouter.post(_routes["default"].changePassword, _middlewares.onlyPrivate, _userCountroller.postChangePassword);
userRouter.get(_routes["default"].userDetail(), _userCountroller.userDetail);
var _default = userRouter;
exports["default"] = _default;