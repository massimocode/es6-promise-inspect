# es6-promise-inspect
A utility for synchronously inspecting the state of ES6 promises. It's useful for testing that a promise is still pending in a unit test.

##Usage
```javascript
let inspect = require('es6-promise-inspect');

let pendingPromise = new Promise(() => {});
inspect.getStatus(pendingPromise); // "pending"

let resolvedPromise = Promise.resolve();
inspect.getStatus(resolvedPromise); // "resolved"

let rejectedPromise = Promise.reject();
inspect.getStatus(rejectedPromise); // "rejected"
```

##Known Limitations
It only works with Node JS and native ES6 promises. You will get an error if you try to inspect something that is not a native ES6 promise.

I have not tested it with NodeJS running on Chakra Core but if you try it out then let me know!