const express = require("express");
const { authService } = require("../services");

const router = express.Router();

router.post("/login", async (req, res) => {
    const token = await authService.validateLogin(req.body);
    if (token.error) {
        res.status(token?.status || 500).send({ message: token.error });
    }
    res.send({ token: token.value });
});

module.exports = router;
