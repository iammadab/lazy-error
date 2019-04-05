function init(){
	return function(req, res, next){
		let errorCreator = createError,
		    errorSender = makeErrorSender(res)

		res.createError = errorCreator
		res.sendError = errorSender
		
		next()
	}
}

function final(){
	return function(error, req, res, next){
		//Only handle lazyerror objects
		if(!error.statusCode) next(error)

		sendErrorResponse(res, error)
	}
}

module.exports = {
	init: init,
	final: final,
	createError: createError
}


//Components

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