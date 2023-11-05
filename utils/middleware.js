const { SECRET } = require("./config");
const jwt = require("jsonwebtoken");

const errorHandler = (error, req, res, next) => {
    res.locals.message = error.message;
    res.locals.error = req.app.get("env") === "development" ? error : {};

    res.status(error.status || 500).render("error");
    next(error);
};

const tokenExtractor = (request, response, next) => {
    const authorization = request.get("authorization");

    if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
        request["token"] = authorization.substring(7);
    }
    next();
};

const tokenValidator = (request, response, next) => {
    const token = request.token;
    if (!token) {
        return response.status(401).json({ error: "token missing" });
    }

    const decodedToken = jwt.verify(token, SECRET);
    if (!decodedToken.id) {
        return response.status(401).json({ error: "invalid token" });
    }
    next();
};

const adminValidator = (request, response, next) => {
    const token = request.token;
    const decodedToken = jwt.verify(token, SECRET);
    if (!decodedToken.isAdmin) {
        return response.status(404).json({ error: "user not an admin" })
    }
    next();
}

module.exports = { errorHandler, tokenExtractor, tokenValidator, adminValidator };
