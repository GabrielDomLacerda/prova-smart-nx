const express = require("express");
const userService = require("../services/users.service");

const router = express.Router();

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    const user = await userService.getUserById(Number.parseInt(id));
    res.json(user);
});

router.post("/", async (req, res) => {
    const body = req.body;
    try {
        const user = await userService.createUser(body);
        if (user) {
            res.send("Usuário criado com sucesso!");
        } else {
            res.status(400).send(
                "Campos inseridos de maneira incorreta, favor tentar novamente"
            );
        }
    } catch (error) {
        res.status(500).send(`Erro ao criar usuário\n${error}`);
    }
});

module.exports = router;
