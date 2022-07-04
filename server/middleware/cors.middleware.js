const cors = (request, response, next) => {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE");
    response.header("Access-Control-Allow-Headers", "Content-Type, email, password, token");
    next();
}

module.exports = cors;

