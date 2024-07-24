const express = require("express");
const { postService } = require("../services");
const { checkAuth } = require("../middlewares");
const { getToken, getUser } = require("../utils/utils");

const router = express.Router();
router.use(checkAuth);

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
    const token = getToken(req);
    const userId = getUser(token);
    try {
        const post = await postService.createPost(body, userId);
        if (post.error) {
            res.status(post?.status || 422).send({ message: post.error });
        } else {
            res.status(201).send(post);
        }
    } catch (error) {
        res.status(500).send({ message: `Erro ao criar post\n${error}` });
    }
});

router.put("/:id", async (req, res) => {
    const body = req.body;
    const id = req.params.id;
    const token = getToken(req);
    const userId = getUser(token);
    try {
        const post = await postService.updatePost(id, body, userId);
        if (post.error) {
            res.status(post?.status || 400).send({
                message: post.error,
            });
        } else {
            res.status(200).send(post);
        }
    } catch (error) {
        res.status(500).send({
            message: `Erro ao deletar post\n${error}`,
        });
    }
});

router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    const token = getToken(req);
    const userId = getUser(token);
    try {
        const result = await postService.deletePost(id, userId);
        if (result.error) {
            res.status(result?.status || 400).send({
                message: result.error,
            });
        } else {
            res.status(200).send({ message: "Post removido com sucesso!" });
        }
    } catch (error) {
        res.status(500).send({
            message: `Erro ao deletar post\n${error}`,
        });
    }
});

module.exports = router;
