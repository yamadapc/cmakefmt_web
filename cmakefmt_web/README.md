# cmakefmt_web
This is a WASM package for https://github.com/yamadapc/cmakefmt.

It's source code is at https://github.com/yamadapc/cmakefmt_web.

Published on NPM as https://www.npmjs.com/package/cmakefmt_web

## Consuming JS package
```tsx
const inputString = '';
const doc = cmakefmt.parse_doc(value);
const outputString = cmakefmt.format_doc(doc);
```

Importing on React application:
```tsx
import("cmakefmt_web").then((cmakefmt) => {
  // ...
});
```

## Building wasm package
```
make
```
