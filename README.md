# un-defined
Optional chaining with a recursive ES6 Proxy


# Installation
Just do the following in your project:
```
npm install un-defined
```

# Import and usage
```
import ud from 'un-defined'

const anObject = {
  subObject: {
    anotherLevel: 55
  },
  anArray: [3, 'random values', {
    containing: 'a sub object with a string'
  }]
};

const obj = new ud(anObject);

obj.subObject.anotherLevel.toValue(); // 55
obj.anArray[2].containing.toValue(); // 'a sub object with a string'

obj.a.b.c.d.e.f.g.h.toValue(); // undefined
obj.a.b.c.d.e.f.g.h.toValue('default value'); // 'default value'
```
