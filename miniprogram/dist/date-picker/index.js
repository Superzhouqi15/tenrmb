"use strict";
var _baseComponent = _interopRequireDefault(require("../helpers/baseComponent")),
  _popupMixin = _interopRequireDefault(require("../helpers/popupMixin")),
  _props = require("../date-picker-view/props"),
  _utils = require("./utils");

function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  }
}
var platformProps = {
  labelPropName: "label",
  format: function(e, r) {
    return (0, _utils.formatDate)(e.date, {
      datetime: "yyyy-MM-dd hh:mm",
      date: "yyyy-MM-dd",
      year: "yyyy",
      month: "yyyy-MM",
      time: "hh:mm"
    }[r.mode])
  }
};
(0, _baseComponent.default)({
  behaviors: [(0, _popupMixin.default)("#wux-picker", platformProps)],
  properties: _props.props
});