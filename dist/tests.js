"use strict";

var _neverUndefined = _interopRequireDefault(require("./never-undefined"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
describe('GET', function () {
  it('Should create a correct NU object', function () {
    var opt = new _neverUndefined["default"](exampleObject);
    expect(opt).toBeInstanceOf(Object);
  });
  it('Should access an existing field without throwing errors', function () {
    var opt = new _neverUndefined["default"](exampleObject);
    expect(function () {
      return opt.a;
    }).not.toThrowError();
  });
  it('Should access a not existing field without throwing errors', function () {
    var opt = new _neverUndefined["default"](exampleObject);
    expect(function () {
      return opt.zzz;
    }).not.toThrowError();
  });
  it('Should access an existing field getting the real value', function () {
    var opt = new _neverUndefined["default"](exampleObject);
    expect(function () {
      return opt.a.toValue();
    }).not.toThrowError();
  });
  it('Should access an existing nested field getting the real value', function () {
    var opt = new _neverUndefined["default"](exampleObject);
    expect(opt.e.e4.e41.toValue()).toBe('e41');
  });
  it('Should access a not existing nested field getting undefined without throwing errors', function () {
    var opt = new _neverUndefined["default"](exampleObject);
    expect(function () {
      return opt.a.b.c.d.e.f.g.h;
    }).not.toThrowError();
    expect(opt.a.b.c.d.e.f.g.h.toValue()).toBeUndefined();
  });
  it('Should get a function nested into a object', function () {
    var opt = new _neverUndefined["default"](exampleObject);
    expect(function () {
      return opt.e.e3.toValue();
    }).not.toThrowError();
    var e3 = opt.e.e3.toValue();
    expect(e3).toBe(exampleObject.e.e3);
    expect(e3()).toBe('e3');
  });
  it('Should get the default value passed to "toValue"', function () {
    var opt = new _neverUndefined["default"](exampleObject);
    expect(function () {
      return opt.e.e3.toValue();
    }).not.toThrowError();
    var val = opt.e.zzz.z2.z3.z4.toValue('default');
    expect(val).toBe('default');
  });
  it('Should not get the default value passed to "toValue" in case of falsy but different from undefined values', function () {
    var opt = new _neverUndefined["default"](exampleObject);
    expect(function () {
      return opt.e.e3.toValue();
    }).not.toThrowError();
    var f = opt.f.toValue('default');
    var g = opt.g.toValue('default');
    var h = opt.h.toValue('default');
    var i = opt.i.toValue('default');
    expect(f).toBe(false);
    expect(g).toBe(null);
    expect(h).toBe(0);
    expect(i).toBe('');
  });
  it('Should get a function nested into a object', function () {
    var opt = new _neverUndefined["default"](exampleObject);
    expect(function () {
      return opt.e.e3.toValue();
    }).not.toThrowError();
    var e3 = opt.e.e3.toValue();
    expect(e3).toBe(exampleObject.e.e3);
    expect(e3()).toBe('e3');
  });
  it('Should get a nested array obj', function () {
    var opt = new _neverUndefined["default"](exampleObject);
    var j12 = opt.j[2].j1.j12.toValue();
    expect(j12).toBe('j12');
  });
});
describe('SET', function () {
  it('Should correctly set a new value in a nested field', function () {
    var opt = new _neverUndefined["default"](exampleObject);
    expect(opt.e.z.toValue()).toBeUndefined();
    var newValue = 'new Z value';
    opt.e.z = newValue;
    expect(opt.e.z.toValue()).toBe(newValue);
  });
  it('Should not set a new value in a nested field with a non-existent path', function () {
    var opt = new _neverUndefined["default"](exampleObject);
    expect(opt.e.z.z2.toValue()).toBeUndefined();
    var mockedWarn = jest.fn();
    console.warn = mockedWarn;
    var newValue = 'new Z value';
    expect(function () {
      opt.e.z.z2 = newValue;
    }).not.toThrowError();
    expect(mockedWarn).toHaveBeenCalledTimes(1);
    expect(mockedWarn.mock.calls[0][0]).toMatch(/^Path not found.*$/);
    expect(opt.e.z.z2.toValue()).toBeUndefined();
  });
});