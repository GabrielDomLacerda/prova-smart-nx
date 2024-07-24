const { ObjectId } = require("mongodb");
const { Post, Comment } = require("../models");

async function getPostById(param) {
    const id = ObjectId.createFromHexString(param);
    return await Post.findById(id).populate({
        path: "comments",
        strictPopulate: false,
    });
}

async function getAllPosts() {
    return await Post.find().populate({
        path: "comments",
        strictPopulate: false,
    });
}

async function getPostsByUserId(param) {
    const userId = ObjectId.createFromHexString(param);
    return await Post.find({ user: userId }).populate({
        path: "comments",
        strictPopulate: false,
    });
}

async function createPost(body, userId) {
    if (!userId) {
        return { error: "Se identifique ao criar um post" };
    }
    if (!body?.content?.trim()) {
        return { error: "Insira um post" };
    }
    const post = new Post({
        user: userId,
        content: body?.content?.trim() || "",
    });
    return await post.save();
}

async function updatePost(id, body, userIdParam) {
    if (!body?.content?.trim()) {
        return { error: "Insira um post" };
    }
    const { content } = body;
    const post = await Post.findById(ObjectId.createFromHexString(id)).populate(
        "user"
    );
    const userId = ObjectId.createFromHexString(userIdParam);
    if (!post) {
        return { status: 404, error: "Post não encontrado" };
    }
    if (post.user._id !== userId) {
        return {
            status: 401,
            error: "Apenas o dono do post tem permissão de editar o post",
        };
    }
    await post.updateOne({
        content: content,
    });
    return post;
}

async function deletePost(id, userIdParam) {
    const post = await Post.findById(ObjectId.createFromHexString(id)).populate(
        "user"
    );
    const userId = ObjectId.createFromHexString(userIdParam);
    if (!post) {
        return { status: 404, error: "Post não encontrado" };
    }
    if (post.user._id !== userId) {
        return {
            status: 401,
            error: "Apenas o dono do post tem permissão de apagar o post",
        };
    }
    await post.deleteOne();
    const comments = await Comment.deleteMany({ post: id });
    if (comments) {
        return true;
    }
    return false;
}

const postService = {
    getPostById,
    getAllPosts,
    getPostsByUserId,
    createPost,
    deletePost,
    updatePost,
};

module.exports = postService;
