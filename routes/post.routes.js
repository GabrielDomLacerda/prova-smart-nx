const express = require("express");
const { postService } = require("../services");

const router = express.Router();

router.get("/", async (req, res) => {
    const posts = await postService.getAllPosts();
    res.json(posts);
});

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    const post = await postService.getPostById(id);
    res.json(post);
});

router.get("/user/:id", async (req, res) => {
    const userId = req.params.id;
    const post = await postService.getPostsByUserId(userId);
    res.json(post);
});

router.post("/", async (req, res) => {
    const body = req.body;
    try {
        const post = await postService.createPost(body, body?.userId);
        if (post.error) {
            res.status(400).send({ message: post.error });
        } else {
            res.status(201).send(post);
        }
    } catch (error) {
        res.status(500).send({ message: `Erro ao criar post\n${error}` });
    }
});

router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const result = await postService.deletePost(id);
        if (result) {
            res.status(200).send({ message: "Post removido com sucesso!" });
        }
        res.status(400).send({
            message: "Post não encontrado ou já deletado anteriormente!",
        });
    } catch (error) {
        res.status(500).send({
            message: `Erro ao deletar post\n${error}`,
        });
    }
});

module.exports = router;
