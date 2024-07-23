const Post = require("../models/post");
const Comment = require("../models/comment");

async function getPostById(id) {
    return await Post.findById(id).populate("Comment");
}

async function getAllPosts() {
    return await Post.find().populate("Comment");
}

async function getPostsByUserId() {
    throw new Error("Método não implementado");
}

async function createPost(body) {
    const post = new Post({ user: body.userId, content: body?.content || "" });
    return await post.save();
}

async function deletePost(id) {
    const post = await Post.findByIdAndDelete(id);
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
