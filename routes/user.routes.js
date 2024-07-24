const express = require("express");
const { userService } = require("../services");

const router = express.Router();

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    const user = await userService.getUserById(id);
    res.json(user);
});

router.post("/", async (req, res) => {
    const body = req.body;
    try {
        const user = await userService.createUser(body);
        if (user.error) {
            res.status(422).send({ message: user.error });
        } else {
            res.status(201).send(user);
        }
    } catch (error) {
        res.status(500).send({ message: `Erro ao criar usuário\n${error}` });
    }
});

module.exports = router;
