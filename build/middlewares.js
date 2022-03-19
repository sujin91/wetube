"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploadAvatar = exports.uploadVideo = exports.onlyPrivate = exports.onlyPublic = exports.localMiddleWare = void 0;

var _multer = _interopRequireDefault(require("multer"));

var _routes = _interopRequireDefault(require("./routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var multerVideo = (0, _multer["default"])({
  dest: 'uploads/videos/'
});
var multerAvatar = (0, _multer["default"])({
  dest: 'uploads/avatars/'
});

var localMiddleWare = function localMiddleWare(req, res, next) {
  res.locals.siteName = 'Wetube';
  res.locals.routes = _routes["default"]; // res.locals.user = {
  //     isAuthenticated: true,
  //     id: 1
  // }

  res.locals.loggedUser = req.user || null;
  next();
};

exports.localMiddleWare = localMiddleWare;

var onlyPublic = function onlyPublic(req, res, next) {
  if (req.user) {
    res.redirect(_routes["default"].home);
  } else {
    next();
  }
};

exports.onlyPublic = onlyPublic;

var onlyPrivate = function onlyPrivate(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.redirect(_routes["default"].home);
  }
};

exports.onlyPrivate = onlyPrivate;
var uploadVideo = multerVideo.single("videoFile");
exports.uploadVideo = uploadVideo;
var uploadAvatar = multerAvatar.single("avatar");
exports.uploadAvatar = uploadAvatar;