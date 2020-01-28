"use strict";

function formatDate(e, t) {
  e instanceof Date || (e = new Date(e));
  var r = {
    "M+": e.getMonth() + 1,
    "d+": e.getDate(),
    "h+": e.getHours(),
    "m+": e.getMinutes(),
    "s+": e.getSeconds(),
    "q+": Math.floor((e.getMonth() + 3) / 3),
    S: e.getMilliseconds()
  };
  for (var a in /(y+)/.test(t) && (t = t.replace(RegExp.$1, (e.getFullYear() + "").substr(4 - RegExp.$1.length))), r) new RegExp("(".concat(a, ")")).test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? r[a] : ("00" + r[a]).substr(("" + r[a]).length)));
  return t
}
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.formatDate = formatDate;