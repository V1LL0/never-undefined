# never-undefined
Optional chaining with a recursive ES6 Proxy


# Installation
Just do the following in your project:
```
npm install never-undefined
```

# Import and usage
```
import NU from 'never-undefined'

const anObject = {
  subObject: {
    anotherLevel: 55
  },
  anArray: [3, 'random values', {
    containing: 'a sub object with a string'
  }],
  aFunction() {
    return 'This is a function'
  }
};

const obj = new NU(anObject);

obj.subObject.anotherLevel.toValue(); // 55
obj.anArray[2].containing.toValue(); // 'a sub object with a string'

obj.a.b.c.d.e.f.g.h.toValue(); // undefined
obj.a.b.c.d.e.f.g.h.toValue('default value'); // 'default value'
const aFunction = obj.aFunction.toValue();
aFunction(); // 'This is a function'
```
