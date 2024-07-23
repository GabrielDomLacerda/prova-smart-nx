const express = require("express");
const postService = require("../services/post.service");

const router = express.Router();

router.get("/", async (req, res) => {
    const posts = await postService.getAllPosts();
    res.json(posts);
});

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    const post = await postService.getPostById(Number.parseInt(id));
    res.json(post);
});

router.post("/", async (req, res) => {
    const body = req.body;
    try {
        const post = await postService.createPost(body);
        if (post) {
            res.send("Post criado com sucesso!");
        } else {
            res.status(400).send(
                "Campos inseridos de maneira incorreta, favor tentar novamente"
            );
        }
    } catch (error) {
        res.status(500).send(`Erro ao criar post\n${error}`);
    }
});

router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const result = await postService.deletePost(Number.parseInt(id));
        if (result) {
            res.send("Post removido com sucesso!");
        }
        res.status(400).send(
            "Post não encontrado ou já deletado anteriormente!"
        );
    } catch (error) {
        res.status(500).send(`Erro ao deletar post\n${error}`);
    }
});

module.exports = router;
