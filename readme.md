# lazy-error
Easily manage error while building express apis

## Installation
```
npm install lazy-error
```

## Api
```
var lazyerror = require("lazy-error")
```

### Express Application Middleware
```
// Add it as a middle ware to your express application
app.use(lazyerror())
```

Once added your response object (res) will get two methods

* res.createError
* res.sendError

#### res.createError()

