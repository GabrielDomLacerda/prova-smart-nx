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

async function deletePost(id) {
    const post = await Post.findByIdAndDelete(ObjectId.createFromHexString(id));
    if (!post) {
        return false;
    }
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
};

module.exports = postService;
