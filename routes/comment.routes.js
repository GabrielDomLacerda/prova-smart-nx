const express = require("express");
const { commentService } = require("../services");
const { checkAuth } = require("../middlewares");
const { getToken, getUser } = require("../utils/utils");

const router = express.Router();
router.use(checkAuth);

router.post("/", async (req, res) => {
    const body = req.body;
    const token = getToken(req);
    const userId = getUser(token);
    try {
        const comment = await commentService.createComment(body, userId);
        if (comment.error) {
            res.status(comment?.status || 500).send({
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
    const token = getToken(req);
    const userId = getUser(token);
    try {
        const result = await commentService.deleteComment(id, userId);
        if (result.error) {
            res.status(result?.status || 500).send({
                message: result.error,
            });
        } else {
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
