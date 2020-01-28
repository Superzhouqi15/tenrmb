"use strict";
var _baseComponent = _interopRequireDefault(require("../helpers/baseComponent")),
  _createFieldsStore = _interopRequireDefault(require("../helpers/createFieldsStore"));

function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  }
}

function _toConsumableArray(e) {
  return _arrayWithoutHoles(e) || _iterableToArray(e) || _nonIterableSpread()
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance")
}

function _iterableToArray(e) {
  if (Symbol.iterator in Object(e) || "[object Arguments]" === Object.prototype.toString.call(e)) return Array.from(e)
}

function _arrayWithoutHoles(e) {
  if (Array.isArray(e)) {
    for (var t = 0, r = new Array(e.length); t < e.length; t++) r[t] = e[t];
    return r
  }
}

function ownKeys(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(e) {
      return Object.getOwnPropertyDescriptor(t, e).enumerable
    })), r.push.apply(r, n)
  }
  return r
}

function _objectSpread(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = null != arguments[e] ? arguments[e] : {};
    e % 2 ? ownKeys(r, !0).forEach(function(e) {
      _defineProperty(t, e, r[e])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : ownKeys(r).forEach(function(e) {
      Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(r, e))
    })
  }
  return t
}

function _defineProperty(e, t, r) {
  return t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e
}
var DEFAULT_TRIGGER = "onChange";

function noop() {}

function getValueFromEvent(e) {
  return e && e.detail ? e.detail.value : "value" in e ? e.value : e
}
var children = ["picker", "date-picker", "popup-select", "radio-group", "checkbox-group", "switch", "input", "input-number", "rater", "slider", "textarea"],
  relations = children.map(function(e) {
    return "../".concat(e, "/index")
  }).reduce(function(e, t) {
    return _objectSpread({}, e, _defineProperty({}, t, {
      type: "descendant",
      observer: function() {
        this.debounce(this.changeValue)
      }
    }))
  }, {});
(0, _baseComponent.default)({
  useField: !0,
  relations: _objectSpread({
    "../form/index": {
      type: "ancestor"
    }
  }, relations),
  properties: {
    initialValue: {
      type: null,
      value: null,
      observer: "changeValue"
    },
    valuePropName: {
      type: String,
      value: "inputValue"
    },
    trigger: {
      type: String,
      value: DEFAULT_TRIGGER
    }
  },
  methods: {
    getNodes: function(e) {
      var t = this;
      return (0 < arguments.length && void 0 !== e ? e : []).map(function(e) {
        return t.getRelationNodes(e)[0]
      }).filter(function(e) {
        return !!e
      })
    },
    changeValue: function(e) {
      var t = this,
        r = 0 < arguments.length && void 0 !== e ? e : this.data.value,
        n = this.getRelationsName(["descendant"]),
        o = this.getNodes(n);
      this.fieldsStore = this.fieldsStore || (0, _createFieldsStore.default)(), this.setValue(r), 0 < o.length && o.forEach(function(e) {
        e.hasFieldDecorator = !0, t.setValue(r, e, t.data.valuePropName, function() {
          t.forceUpdate(t.data.name, t.data, e)
        })
      })
    },
    setValue: function(e, t, r, n) {
      var o = 1 < arguments.length && void 0 !== t ? t : this,
        a = 2 < arguments.length && void 0 !== r ? r : "value",
        i = 3 < arguments.length && void 0 !== n ? n : noop;
      o.data[a] !== e ? o.setData(_defineProperty({}, a, e), i) : i()
    },
    forceUpdate: function(e, t, r) {
      var n = t.valuePropName,
        o = this.getFieldDecorator(e, t, r),
        a = o[n];
      delete o[n], r.setData(o), this.setValue(a, r, n)
    },
    onCollectCommon: function(e, t, r) {
      var n = this.fieldsStore.getField(e),
        o = n.inputElem,
        a = n.oriInputProps.oriInputEvents;
      a && a[t] && a[t].apply(a, _toConsumableArray(r));
      var i = getValueFromEvent.apply(void 0, _toConsumableArray(r)),
        l = this.fieldsStore.getFieldValue(e),
        u = this.getRelationNodes("../form/index")[0];
      if (i !== l && (this.setValue(i), this.setValue(i, o, n.valuePropName), u)) {
        var s = _defineProperty({}, e, i),
          p = this.fieldsStore.getFieldsValue();
        u.onChange(s, _objectSpread({}, p, {}, s))
      }
      return {
        name: e,
        field: _objectSpread({}, n, {
          value: i
        })
      }
    },
    onCollect: function(e, t) {
      for (var r = arguments.length, n = new Array(2 < r ? r - 2 : 0), o = 2; o < r; o++) n[o - 2] = arguments[o];
      var a = this.onCollectCommon(e, t, n),
        i = a.name,
        l = a.field;
      this.fieldsStore.setFields(_defineProperty({}, i, l))
    },
    getFieldDecorator: function(n, e, t) {
      var o = this,
        r = this.fieldsStore.getField(n),
        a = t.data,
        i = e.trigger,
        l = void 0 === i ? DEFAULT_TRIGGER : i,
        u = _objectSpread({}, r, {}, e, {
          name: n,
          oriInputProps: a,
          inputElem: t
        });
      this.fieldsStore.setFields(_defineProperty({}, n, u));
      var s = _objectSpread({}, this.fieldsStore.getFieldValuePropValue(e));
      return l && !a.oriInputEvents && (s.oriInputEvents = _objectSpread({}, a.inputEvents), s.inputEvents = _objectSpread({}, a.inputEvents, _defineProperty({}, l, function() {
        for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++) t[r] = arguments[r];
        return o.onCollect.apply(o, [n, l].concat(t))
      }))), s
    }
  }
});