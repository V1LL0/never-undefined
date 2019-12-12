import NU from './never-undefined';

const exampleObject = {
  a: 'a',
  b: 'b',
  c: 'c',
  d: null,
  e: {
    e1: 'e1',
    e2: 3,
    e3() {
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
  j: [
    'a',
    2,
    {
      j1: {
        j12: 'j12'
      }
    }
  ]
};

class TestClass {
  constructor() {
    this.testValue = 'testValue';
  }

  getValue() {
    return this.testValue;
  }
}

describe('GET', () => {
  it('Should create a correct NU object', () => {
    const nu = new NU(exampleObject);

    expect(nu).toBeInstanceOf(Object);
  });

  it('Should access an existing field without throwing errors', () => {
    const nu = new NU(exampleObject);

    expect(() => nu.a).not.toThrowError();
  });

  it('Should access a not existing field without throwing errors', () => {
    const nu = new NU(exampleObject);

    expect(() => nu.zzz).not.toThrowError();
  });

  it('Should access an existing field getting the real value', () => {
    const nu = new NU(exampleObject);

    expect(() => nu.a.toValue()).not.toThrowError();
  });

  it('Should access an existing nested field getting the real value', () => {
    const nu = new NU(exampleObject);

    expect(nu.e.e4.e41.toValue()).toBe('e41');
  });

  it('Should access a not existing nested field getting undefined without throwing errors', () => {
    const nu = new NU(exampleObject);

    expect(() => nu.a.b.c.d.e.f.g.h).not.toThrowError();
    expect(nu.a.b.c.d.e.f.g.h.toValue()).toBeUndefined();
  });

  it('Should get a function nested into a object', () => {
    const nu = new NU(exampleObject);

    expect(() => nu.e.e3.toValue()).not.toThrowError();
    const e3 = nu.e.e3.toValue();
    expect(e3).toBe(exampleObject.e.e3);
    expect(e3()).toBe('e3');
  });

  it('Should get the default value passed to "toValue"', () => {
    const nu = new NU(exampleObject);

    expect(() => nu.e.e3.toValue()).not.toThrowError();
    const val = nu.e.zzz.z2.z3.z4.toValue('default');
    expect(val).toBe('default');
  });

  it('Should not get the default value passed to "toValue" in case of falsy but different from undefined values', () => {
    const nu = new NU(exampleObject);

    expect(() => nu.e.e3.toValue()).not.toThrowError();
    const f = nu.f.toValue('default');
    const g = nu.g.toValue('default');
    const h = nu.h.toValue('default');
    const i = nu.i.toValue('default');

    expect(f).toBe(false);
    expect(g).toBe(null);
    expect(h).toBe(0);
    expect(i).toBe('');
  });

  it('Should get a function nested into a object', () => {
    const nu = new NU(exampleObject);

    expect(() => nu.e.e3.toValue()).not.toThrowError();
    const e3 = nu.e.e3.toValue();
    expect(e3).toBe(exampleObject.e.e3);
    expect(e3()).toBe('e3');
  });

  it('Should get a nested array obj', () => {
    const nu = new NU(exampleObject);

    const j12 = nu.j[2].j1.j12.toValue();
    expect(j12).toBe('j12');
  });
});

describe('GET class', () => {
  it('Should maintain function context', () => {
    const nu = new NU(new TestClass());
    const gv = nu.getValue.toValue();
    expect(gv()).toBe('testValue');
  });
});

describe('SET', () => {
  it('Should correctly set a new value in a nested field', () => {
    const nu = new NU(exampleObject);
    expect(nu.e.z.toValue()).toBeUndefined();
    const newValue = 'new Z value';
    nu.e.z = newValue;
    expect(nu.e.z.toValue()).toBe(newValue);
  });

  it('Should not set a new value in a nested field with a non-existent path', () => {
    const nu = new NU(exampleObject);
    expect(nu.e.z.z2.toValue()).toBeUndefined();
    const mockedWarn = jest.fn();
    console.warn = mockedWarn;
    const newValue = 'new Z value';
    expect(() => {
      nu.e.z.z2 = newValue;
    }).not.toThrowError();
    expect(mockedWarn).toHaveBeenCalledTimes(1);
    expect(mockedWarn.mock.calls[0][0]).toMatch(/^Path not found.*$/);
    expect(nu.e.z.z2.toValue()).toBeUndefined();
  });
});
