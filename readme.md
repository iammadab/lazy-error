# lazy-error
Easily manage errors while building express APIs

## Installation
```
npm install lazy-error
```

## API
```
var lazyerror = require("lazy-error")
```

### Express Application Middleware
```
//Add it as  middleware to your express application

app.use(lazyerror())
```

Once added your response object (res) will get two methods

* res.createError
* res.sendError

### res.createError(statusCode, errorCode, errorData)

returns a restError object

**statusCode** represents the HTTP standard response code e.g 403, 404, 500 e.t.c

**errorCode** a machine friendly code that can be used to differentiate errors e.g "INVALID_USER", "INTERNAL_ERROR" e.t.c

**errorData** any extra data that is needed to describe the error (it could be an object)



### res.sendError(restError)  or res.sendError(statusCode, errorCode, errorData)

Ends the response chain and send the formatted error directly to the client

You can pass in a **restError** object which you can create with *res.createError* or you can pass all the data you would pass to *res.createError* to combine both steps






### lazyerror.createError(statusCode, errorCode, errorData)

Sometimes you might be writing functionality where you don't have access to the response (res) object, but you want to create a restError. 

You can do this with lazyerror.createError. The generated error can then be thrown, caught and passed to res.sendError when you have access to the res object


### Author
Wisdom Ogwu (iammadab)

[Twitter](https://twitter.com/iammadab)
