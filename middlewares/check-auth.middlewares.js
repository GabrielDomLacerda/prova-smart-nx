const jwt = require("jsonwebtoken");
const { getToken } = require("../utils/utils");

const checkAuth = (req, res, next) => {
    const token = getToken(req);
    if (!token) {
        res.status(401).json({ message: "Acesso negado" });
    }

    try {
        // eslint-disable-next-line no-undef
        const secret = process.env.SECRET;
        jwt.verify(token, secret);
        next();
    } catch {
        res.status(401).json({ message: "Token inválido" });
    }
};

module.exports = checkAuth;
