const express = require("express");
const commentService = require("../services/comment.service");

const router = express.Router();

router.post("/", async (req, res) => {
    const body = req.body;
    try {
        const comment = await commentService.createComment(body);
        if (comment) {
            res.send("Comentário criado com sucesso!");
        } else {
            res.status(400).send(
                "Campos inseridos de maneira incorreta, favor tentar novamente"
            );
        }
    } catch (error) {
        res.status(500).send(`Erro ao criar comentário\n${error}`);
    }
});

router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const result = await commentService.deleteComment(Number.parseInt(id));
        if (result) {
            res.send("Comentário removido com sucesso!");
        }
        res.status(400).send(
            "Comentário não encontrado ou já deletado anteriormente!"
        );
    } catch (error) {
        res.status(500).send(`Erro ao deletar comentário\n${error}`);
    }
});

module.exports = router;
