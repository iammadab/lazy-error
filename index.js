function init(){
	return function(req, res, next){
		let errorCreator = makeErrorCreator(res),
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
	final: final
}


//Components
function makeErrorCreator(res){
	return function createError(statusCode, code, errorData){
		let error = new Error()
		error.statusCode = statusCode || 500
		error.code = code || "INTERNAL_SERVER_ERROR",
		error.error = errorData
		return error
	}
}

function makeErrorSender(res){
	return function sendError(){
		let errorObj = createError(...arguments)
		sendErrorResponse(res, errorObj)
	}
}

function sendErrorResponse(res, error){
	res.status(error.statusCode).json({
		code: error.code,
		error: error.error
	})
}