"use strict";
var _baseComponent = _interopRequireDefault(require("../helpers/baseComponent")),
  _createFieldsStore = _interopRequireDefault(require("../helpers/createFieldsStore"));

function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  }
}

function ownKeys(t, e) {
  var i = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(t);
    e && (r = r.filter(function(e) {
      return Object.getOwnPropertyDescriptor(t, e).enumerable
    })), i.push.apply(i, r)
  }
  return i
}

function _objectSpread(t) {
  for (var e = 1; e < arguments.length; e++) {
    var i = null != arguments[e] ? arguments[e] : {};
    e % 2 ? ownKeys(i, !0).forEach(function(e) {
      _defineProperty(t, e, i[e])
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(i)) : ownKeys(i).forEach(function(e) {
      Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(i, e))
    })
  }
  return t
}

function _defineProperty(e, t, i) {
  return t in e ? Object.defineProperty(e, t, {
    value: i,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = i, e
}(0, _baseComponent.default)({
  relations: {
    "../field/index": {
      type: "descendant",
      observer: function(e, t) {
        var i = t.unlinked;
        this.renderFields[e.data.name] = !1 === i, this.debounce(this.changeValue)
      }
    }
  },
  properties: {},
  methods: {
    changeValue: function() {
      var n = this,
        e = this.getRelationNodes("../field/index");
      if (0 < e.length) {
        var t = e.reduce(function(e, t) {
          var i = t.data,
            r = i.name,
            s = _objectSpread({}, i, {}, n.fieldsStore.getField(r), {
              originalProps: i,
              fieldElem: t
            });
          return e[r] = s, n.renderFields[r] = !0, t.fieldsStore = n.fieldsStore, e
        }, {});
        this.fieldsStore.updateFields(t), this.clearUnlinkedFields()
      }
    },
    clearUnlinkedFields: function() {
      var t = this,
        e = this.fieldsStore.getAllFieldsName().filter(function(e) {
          return !t.renderFields[e]
        });
      0 < e.length && e.forEach(function(e) {
        return t.clearField(e)
      })
    },
    clearField: function(e) {
      this.fieldsStore.clearField(e), delete this.renderFields[e]
    },
    setFields: function(r) {
      var s = this;
      Object.keys(r).forEach(function(e) {
        var t = s.fieldsStore.getField(e),
          i = _objectSpread({}, t, {
            value: r[e]
          });
        s.fieldsStore.setFields(_defineProperty({}, e, i)), t && t.fieldElem && t.fieldElem.changeValue(r[e])
      })
    },
    setFieldsValue: function(i) {
      var r = this.fieldsStore.fields,
        e = Object.keys(i).reduce(function(e, t) {
          return r[t] && (e[t] = i[t]), e
        }, {});
      this.setFields(e);
      var t = this.getFieldsValue();
      this.onChange(e, t)
    },
    resetFields: function(e) {
      var t = Array.isArray(e) ? e : [e],
        i = this.fieldsStore.resetFields(t);
      0 < Object.keys(i).length && this.setFields(i)
    },
    getForm: function() {
      return {
        getFieldsValue: this.getFieldsValue,
        getFieldValue: this.getFieldValue,
        setFieldsValue: this.setFieldsValue,
        setFields: this.setFields,
        resetFields: this.resetFields
      }
    },
    onChange: function(e, t) {
      this.triggerEvent("change", {
        form: this.getForm(),
        changedValues: e,
        allValues: t
      })
    }
  },
  created: function() {
    var i = this;
    this.fieldsStore = (0, _createFieldsStore.default)(), this.renderFields = {}, this.setFieldsValue = this.setFieldsValue.bind(this), this.setFields = this.setFields.bind(this), this.resetFields = this.resetFields.bind(this), ["getFieldsValue", "getFieldValue"].forEach(function(t) {
      i[t] = function() {
        var e;
        return (e = i.fieldsStore)[t].apply(e, arguments)
      }
    })
  }
});