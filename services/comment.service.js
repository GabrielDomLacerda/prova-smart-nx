const { ObjectId } = require("mongodb");
const { Post, Comment } = require("../models");

async function createComment(body, userId) {
    const postId = body.postId;
    if (!postId) {
        return { error: "Insira o ID do post em que você quer comentar" };
    }
    if (!body?.content?.trim()) {
        return { error: "Insira um comentário" };
    }
    if (!userId) {
        return { error: "Se identifique ao comentar" };
    }
    const comment = await new Comment({
        content: body?.content || "",
        post: postId,
        user: userId,
    }).save();
    await Post.findByIdAndUpdate(postId, { $push: { comments: comment._id } });
    return await Comment.findById(comment._id).populate("post");
}

async function deleteComment(id) {
    const comment = await Comment.findByIdAndDelete(
        ObjectId.createFromHexString(id)
    );
    if (comment) {
        return true;
    }
    return false;
}

const commentService = {
    createComment,
    deleteComment,
};

module.exports = commentService;
