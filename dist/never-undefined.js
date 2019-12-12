"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _nu =
/*#__PURE__*/
function () {
  function _nu(target, realVal, isUndef) {
    _classCallCheck(this, _nu);

    this._target = target; // eslint-disable-next-line no-nested-ternary

    this._realVal = isUndef ? undefined : realVal === undefined ? target : realVal;
    var self = this;
    return new Proxy(self._target, {
      get: function get(obj, prop) {
        if (prop === 'toValue') {
          return self.toValue;
        }

        if (prop === '_realVal') {
          return self._realVal;
        }

        if (prop === '_target') {
          return self._target;
        }

        if (obj[prop] === undefined) {
          return new _nu({}, undefined, true);
        }

        if (obj[prop] instanceof Function) {
          // maintain function context
          obj[prop] = obj[prop].bind(self._target);
        }

        if (obj[prop] instanceof Object) {
          return new _nu(obj[prop]);
        }

        return new _nu({}, obj[prop]);
      },
      set: function set(obj, prop, newValue) {
        var WARN_MESSAGE = "Path not found. The value ".concat(newValue, " couldn't be set in ").concat(prop, "!");

        if (self._realVal !== undefined) {
          try {
            self._realVal[prop] = newValue;
          } catch (e) {
            // eslint-disable-next-line no-console
            console.warn(WARN_MESSAGE);
          }
        } else {
          // eslint-disable-next-line no-console
          console.warn(WARN_MESSAGE);
        }

        return true;
      }
    });
  }

  _createClass(_nu, [{
    key: "toValue",
    value: function toValue(defaultValue) {
      return this._realVal === undefined ? defaultValue : this._realVal;
    }
  }]);

  return _nu;
}();

var NeverUndefined = function NeverUndefined(obj) {
  _classCallCheck(this, NeverUndefined);

  return new _nu(obj);
};

var _default = NeverUndefined;
exports["default"] = _default;