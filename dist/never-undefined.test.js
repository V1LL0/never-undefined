"use strict";

var _neverUndefined = _interopRequireDefault(require("./never-undefined"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var exampleObject = {
  a: 'a',
  b: 'b',
  c: 'c',
  d: null,
  e: {
    e1: 'e1',
    e2: 3,
    e3: function e3() {
      return 'e3';
    },
    e4: {
      e41: 'e41'
    }
  },
  f: false,
  g: null,
  h: 0,
  i: '',
  j: ['a', 2, {
    j1: {
      j12: 'j12'
    }
  }]
};

var TestClass =
/*#__PURE__*/
function () {
  function TestClass() {
    _classCallCheck(this, TestClass);

    this.testValue = 'testValue';
  }

  _createClass(TestClass, [{
    key: "getValue",
    value: function getValue() {
      return this.testValue;
    }
  }]);

  return TestClass;
}();

describe('GET', function () {
  it('Should create a correct NU object', function () {
    var nu = new _neverUndefined["default"](exampleObject);
    expect(nu).toBeInstanceOf(Object);
  });
  it('Should access an existing field without throwing errors', function () {
    var nu = new _neverUndefined["default"](exampleObject);
    expect(function () {
      return nu.a;
    }).not.toThrowError();
  });
  it('Should access a not existing field without throwing errors', function () {
    var nu = new _neverUndefined["default"](exampleObject);
    expect(function () {
      return nu.zzz;
    }).not.toThrowError();
  });
  it('Should access an existing field getting the real value', function () {
    var nu = new _neverUndefined["default"](exampleObject);
    expect(function () {
      return nu.a.toValue();
    }).not.toThrowError();
  });
  it('Should access an existing nested field getting the real value', function () {
    var nu = new _neverUndefined["default"](exampleObject);
    expect(nu.e.e4.e41.toValue()).toBe('e41');
  });
  it('Should access a not existing nested field getting undefined without throwing errors', function () {
    var nu = new _neverUndefined["default"](exampleObject);
    expect(function () {
      return nu.a.b.c.d.e.f.g.h;
    }).not.toThrowError();
    expect(nu.a.b.c.d.e.f.g.h.toValue()).toBeUndefined();
  });
  it('Should get a function nested into a object', function () {
    var nu = new _neverUndefined["default"](exampleObject);
    expect(function () {
      return nu.e.e3.toValue();
    }).not.toThrowError();
    var e3 = nu.e.e3.toValue();
    expect(e3).toBe(exampleObject.e.e3);
    expect(e3()).toBe('e3');
  });
  it('Should get the default value passed to "toValue"', function () {
    var nu = new _neverUndefined["default"](exampleObject);
    expect(function () {
      return nu.e.e3.toValue();
    }).not.toThrowError();
    var val = nu.e.zzz.z2.z3.z4.toValue('default');
    expect(val).toBe('default');
  });
  it('Should not get the default value passed to "toValue" in case of falsy but different from undefined values', function () {
    var nu = new _neverUndefined["default"](exampleObject);
    expect(function () {
      return nu.e.e3.toValue();
    }).not.toThrowError();
    var f = nu.f.toValue('default');
    var g = nu.g.toValue('default');
    var h = nu.h.toValue('default');
    var i = nu.i.toValue('default');
    expect(f).toBe(false);
    expect(g).toBe(null);
    expect(h).toBe(0);
    expect(i).toBe('');
  });
  it('Should get a function nested into a object', function () {
    var nu = new _neverUndefined["default"](exampleObject);
    expect(function () {
      return nu.e.e3.toValue();
    }).not.toThrowError();
    var e3 = nu.e.e3.toValue();
    expect(e3).toBe(exampleObject.e.e3);
    expect(e3()).toBe('e3');
  });
  it('Should get a nested array obj', function () {
    var nu = new _neverUndefined["default"](exampleObject);
    var j12 = nu.j[2].j1.j12.toValue();
    expect(j12).toBe('j12');
  });
});
describe('GET class', function () {
  it('Should maintain function context', function () {
    var nu = new _neverUndefined["default"](new TestClass());
    var gv = nu.getValue.toValue();
    expect(gv()).toBe('testValue');
  });
});
describe('SET', function () {
  it('Should correctly set a new value in a nested field', function () {
    var nu = new _neverUndefined["default"](exampleObject);
    expect(nu.e.z.toValue()).toBeUndefined();
    var newValue = 'new Z value';
    nu.e.z = newValue;
    expect(nu.e.z.toValue()).toBe(newValue);
  });
  it('Should not set a new value in a nested field with a non-existent path', function () {
    var nu = new _neverUndefined["default"](exampleObject);
    expect(nu.e.z.z2.toValue()).toBeUndefined();
    var mockedWarn = jest.fn();
    console.warn = mockedWarn;
    var newValue = 'new Z value';
    expect(function () {
      nu.e.z.z2 = newValue;
    }).not.toThrowError();
    expect(mockedWarn).toHaveBeenCalledTimes(1);
    expect(mockedWarn.mock.calls[0][0]).toMatch(/^Path not found.*$/);
    expect(nu.e.z.z2.toValue()).toBeUndefined();
  });
});