const jwt = require("jsonwebtoken");

function getToken(req) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    return token;
}

function getUser(token) {
    try {
        const { id } = jwt.decode(token);
        return id;
    } catch {
        return null;
    }
}

module.exports = {
    getToken,
    getUser,
};
