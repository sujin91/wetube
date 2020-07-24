"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var CommentSchema = new _mongoose["default"].Schema({
  text: {
    type: String,
    required: 'text is required'
  },
  createAt: {
    type: Date,
    "default": Date.now
  },
  creator: {
    type: _mongoose["default"].Schema.Types.String,
    ref: 'User'
  },
  creatorName: {
    type: _mongoose["default"].Schema.Types.String,
    ref: 'User',
    required: 'text is required'
  }
});

var model = _mongoose["default"].model("Comment", CommentSchema);

var _default = model;
exports["default"] = _default;