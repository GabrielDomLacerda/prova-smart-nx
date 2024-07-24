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

async function deleteComment(id, userIdParam) {
    const comment = await Comment.findById(
        ObjectId.createFromHexString(id)
    ).populate("post");
    const post = await Post.findById(comment.post._id).populate("user");
    const userId = ObjectId.createFromHexString(userIdParam);
    if (!comment) {
        return { status: 404, error: "Comentário não encontrado ou apagado" };
    }
    if (comment.user._id !== userId || post.user._id !== userId) {
        return {
            status: 401,
            error: "Apenas o dono do comentário ou do post tem permissão de apagar o comentário",
        };
    }
    await comment.deleteOne();
    return { status: 200 };
}

const commentService = {
    createComment,
    deleteComment,
};

module.exports = commentService;
