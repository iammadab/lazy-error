const lazyerror = function(){
	return function(req, res, next){
		res.createError = createError
		res.sendError = makeErrorSender(res)
		
		next()
	}
}

lazyerror.createError = createError

module.exports = lazyerror

// Helpers
function makeErrorSender(res){
	return function sendError(errorObj){
		if(errorObj.type == "restError")
			sendErrorResponse(res, errorObj)

		else{
			let errorObjNew = createError(...arguments)
			sendErrorResponse(res, errorObjNew)
		}
	}
}

function sendErrorResponse(res, error){
	res.status(error.statusCode).json({
		code: error.code,
		error: error.error
	})
}

function createError(statusCode, code, errorData){
	let error = new Error()
	error.statusCode = statusCode || 500
	error.code = code || "INTERNAL_SERVER_ERROR",
	error.error = errorData
	error.type = "restError"
	return error
}