const express = require("express");
const { commentService } = require("../services");

const router = express.Router();

router.post("/", async (req, res) => {
    const body = req.body;
    try {
        const comment = await commentService.createComment(body, body.userId);
        if (comment.error) {
            res.status(422).send({
                message: comment.error,
            });
        } else {
            res.status(201).send(comment);
        }
    } catch (error) {
        res.status(500).send({
            message: `Erro ao criar comentário\n${error}`,
        });
    }
});

router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const result = await commentService.deleteComment(id);
        if (result) {
            res.status(200).send({
                message: "Comentário removido com sucesso!",
            });
        }
        res.status(404).send({
            message: "Comentário não encontrado ou já deletado anteriormente!",
        });
    } catch (error) {
        res.status(500).send({
            message: `Erro ao deletar comentário\n${error}`,
        });
    }
});

module.exports = router;
