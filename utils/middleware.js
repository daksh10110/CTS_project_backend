const { SECRET } = require("./config")
const logger = require("./logger")
const jwt = require("jsonwebtoken")

const errorHandler = (error, req, res, next) => {
	res.locals.message = error.message;
	res.locals.error = req.app.get('env') === 'development' ? error : {};
  
	res.status(error.status || 500).render('error');
};
  

const tokenExtractor = (request, response, next) => {
	const authorization = request.get("authorization")

	if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
		request["token"] = authorization.substring(7)
	}
	next()
}

const tokenValidator = (request, response, next) => {
	const token = request.token
	if (!token) {
		return response.status(401).json({ error: "token missing" })
	}

	const decodedToken = jwt.verify(token, SECRET)
	console.log(decodedToken);
	if (!decodedToken.id) {
		return response.status(401).json({ error: "invalid token" })
	}
	next()
}

module.exports = { errorHandler, tokenExtractor, tokenValidator }