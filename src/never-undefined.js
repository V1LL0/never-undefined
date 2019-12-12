class _nu {
  constructor(target, realVal, isUndef) {
    this._target = target;
    // eslint-disable-next-line no-nested-ternary
    this._realVal = isUndef ? undefined : realVal === undefined ? target : realVal;

    const self = this;
    return new Proxy(self._target, {
      get(obj, prop) {
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
      set(obj, prop, newValue) {
        const WARN_MESSAGE = `Path not found. The value ${newValue} couldn't be set in ${prop}!`;
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

  toValue(defaultValue) {
    return this._realVal === undefined ? defaultValue : this._realVal;
  }
}

class NeverUndefined {
  constructor(obj) {
    return new _nu(obj);
  }
}

export default NeverUndefined;
