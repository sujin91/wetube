"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userDetail = exports.postChangePassword = exports.getChangePassword = exports.postEditProfile = exports.getEditProfile = exports.getMe = exports.logout = exports.postKakaoLogin = exports.kakaoLoginCallback = exports.kakaoLogin = exports.postGithubLogin = exports.githubLoginCallback = exports.githubLogin = exports.postLogin = exports.getLogin = exports.postJoin = exports.getJoin = void 0;

var _passport = _interopRequireDefault(require("passport"));

var _routes = _interopRequireDefault(require("../routes"));

var _User = _interopRequireDefault(require("../models/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var getJoin = function getJoin(req, res) {
  res.render('join', {
    pageTitle: "Join"
  });
};

exports.getJoin = getJoin;

var postJoin = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
    var _req$body, name, email, password, password2, user;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, name = _req$body.name, email = _req$body.email, password = _req$body.password, password2 = _req$body.password2;

            if (!(password != password2)) {
              _context.next = 6;
              break;
            }

            res.status(400);
            res.render('join', {
              pageTitle: "Join"
            });
            _context.next = 18;
            break;

          case 6:
            _context.prev = 6;
            _context.next = 9;
            return (0, _User["default"])({
              name: name,
              email: email
            });

          case 9:
            user = _context.sent;
            _context.next = 12;
            return _User["default"].register(user, password);

          case 12:
            next();
            _context.next = 18;
            break;

          case 15:
            _context.prev = 15;
            _context.t0 = _context["catch"](6);
            console.log(_context.t0);

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[6, 15]]);
  }));

  return function postJoin(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.postJoin = postJoin;

var getLogin = function getLogin(req, res) {
  res.render('login', {
    pageTitle: "Login"
  });
}; // export const postLogin = (req, res) => {
//     console.log(req.body)
//     res.redirect(routes.home)
// }
// 로그인 새로만들어주자.


exports.getLogin = getLogin;

var postLogin = _passport["default"].authenticate('local', {
  failureRedirect: _routes["default"].login,
  successRedirect: _routes["default"].home
});

exports.postLogin = postLogin;

var githubLogin = _passport["default"].authenticate('github');

exports.githubLogin = githubLogin;

var githubLoginCallback = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(accessToken, refreshToken, profile, cb) {
    var _profile$_json, id, avatar_url, name, email, user, newUser;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _profile$_json = profile._json, id = _profile$_json.id, avatar_url = _profile$_json.avatar_url, name = _profile$_json.name, email = _profile$_json.email;
            _context2.prev = 1;
            _context2.next = 4;
            return _User["default"].findOne({
              email: email
            });

          case 4:
            user = _context2.sent;

            if (!user) {
              _context2.next = 9;
              break;
            }

            user.githubId = id;
            user.save();
            return _context2.abrupt("return", cb(null, user));

          case 9:
            _context2.next = 11;
            return _User["default"].create({
              email: email,
              name: name,
              githubId: id,
              avatarUrl: avatar_url
            });

          case 11:
            newUser = _context2.sent;
            return _context2.abrupt("return", cb(null, newUser));

          case 15:
            _context2.prev = 15;
            _context2.t0 = _context2["catch"](1);
            return _context2.abrupt("return", cb(_context2.t0));

          case 18:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 15]]);
  }));

  return function githubLoginCallback(_x4, _x5, _x6, _x7) {
    return _ref2.apply(this, arguments);
  };
}();

exports.githubLoginCallback = githubLoginCallback;

var postGithubLogin = function postGithubLogin(req, res) {
  res.redirect(_routes["default"].home);
}; //kakao 


exports.postGithubLogin = postGithubLogin;

var kakaoLogin = _passport["default"].authenticate('kakao');

exports.kakaoLogin = kakaoLogin;

var kakaoLoginCallback = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(accessToken, refreshToken, profile, cb) {
    var username, id, email, avatarUrl, user, newUser;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            // console.log(accessToken, refreshToken, profile, cb)
            username = profile.username, id = profile._json.id;
            email = profile._json.kakao_account.email;
            avatarUrl = profile._json.properties.profile_image;
            _context3.prev = 3;
            _context3.next = 6;
            return _User["default"].findOne({
              email: email
            });

          case 6:
            user = _context3.sent;

            if (!user) {
              _context3.next = 11;
              break;
            }

            user.kakaoId = id;
            user.save();
            return _context3.abrupt("return", cb(null, user));

          case 11:
            _context3.next = 13;
            return _User["default"].create({
              email: email,
              username: username,
              kakaoId: id,
              avatarUrl: avatarUrl
            });

          case 13:
            newUser = _context3.sent;
            console.log(newUser);
            return _context3.abrupt("return", cb(null, newUser));

          case 18:
            _context3.prev = 18;
            _context3.t0 = _context3["catch"](3);
            return _context3.abrupt("return", cb(_context3.t0));

          case 21:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[3, 18]]);
  }));

  return function kakaoLoginCallback(_x8, _x9, _x10, _x11) {
    return _ref3.apply(this, arguments);
  };
}();

exports.kakaoLoginCallback = kakaoLoginCallback;

var postKakaoLogin = function postKakaoLogin(req, res) {
  res.redirect(_routes["default"].home);
};

exports.postKakaoLogin = postKakaoLogin;

var logout = function logout(req, res) {
  // logout
  // user = null
  req.logout();
  res.redirect(_routes["default"].home);
};

exports.logout = logout;

var getMe = function getMe(req, res) {
  res.render('userDetail', {
    pageTitle: "User Detail",
    user: req.user
  });
};

exports.getMe = getMe;

var getEditProfile = function getEditProfile(req, res) {
  res.render('editProfile', {
    pageTitle: "Edit Profile"
  });
};

exports.getEditProfile = getEditProfile;

var postEditProfile = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var _req$body2, name, email, file;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _req$body2 = req.body, name = _req$body2.name, email = _req$body2.email, file = req.file;
            _context4.prev = 1;
            _context4.next = 4;
            return _User["default"].findByIdAndUpdate(req.user.id, {
              name: name,
              email: email,
              avatarUrl: file ? "/".concat(file.path) : req.user.avatarUrl
            });

          case 4:
            res.redirect(_routes["default"].me);
            _context4.next = 10;
            break;

          case 7:
            _context4.prev = 7;
            _context4.t0 = _context4["catch"](1);
            // res.render('editProfile', {pageTitle: "Edit Profile"})
            res.redirect(_routes["default"].editProfile);

          case 10:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[1, 7]]);
  }));

  return function postEditProfile(_x12, _x13) {
    return _ref4.apply(this, arguments);
  };
}();

exports.postEditProfile = postEditProfile;

var getChangePassword = function getChangePassword(req, res) {
  return res.render('changePassword', {
    pageTitle: "Change Password"
  });
};

exports.getChangePassword = getChangePassword;

var postChangePassword = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var _req$body3, oldPassword, newPassword, newPassword1;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _req$body3 = req.body, oldPassword = _req$body3.oldPassword, newPassword = _req$body3.newPassword, newPassword1 = _req$body3.newPassword1;
            _context5.prev = 1;

            if (!(newPassword != newPassword1)) {
              _context5.next = 6;
              break;
            }

            res.status(200);
            res.redirect(_routes["default"].changePassword);
            return _context5.abrupt("return");

          case 6:
            _context5.next = 8;
            return req.user.changePassword(oldPassword, newPassword);

          case 8:
            res.redirect(_routes["default"].me);
            _context5.next = 15;
            break;

          case 11:
            _context5.prev = 11;
            _context5.t0 = _context5["catch"](1);
            res.status(200);
            res.redirect("/users".concat(_routes["default"].changePassword));

          case 15:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[1, 11]]);
  }));

  return function postChangePassword(_x14, _x15) {
    return _ref5.apply(this, arguments);
  };
}(); // export const users = (req, res) => res.render('users', {pageTitle: "Users"})


exports.postChangePassword = postChangePassword;

var userDetail = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
    var id, user;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            id = req.params.id;
            _context6.prev = 1;
            _context6.next = 4;
            return _User["default"].findById(id).populate('videos');

          case 4:
            user = _context6.sent;
            console.log(user.avatarUrl);
            res.render("userDetail", {
              pageTitle: "User Detail",
              user: user
            });
            _context6.next = 12;
            break;

          case 9:
            _context6.prev = 9;
            _context6.t0 = _context6["catch"](1);
            res.redirect(_routes["default"].home);

          case 12:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[1, 9]]);
  }));

  return function userDetail(_x16, _x17) {
    return _ref6.apply(this, arguments);
  };
}();

exports.userDetail = userDetail;