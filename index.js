function init(){
	return function(req, res, next){
		let errorCreator = makeErrorCreator(res)
		res.createError = errorCreator
		next()
	}
}

function final(){
	return function(error, req, res, next){
		//Only handle lazyerror objects
		if(!error.statusCode) next(error)

		res.status(error.statusCode).json({
			code: error.code,
			error: error.error
		})
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