const express = require("express");
const userService = require("../services/users.service");

const router = express.Router();

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    const user = await userService.getUserById(Number.parseInt(id));
    res.json(user);
});

module.exports = router;
