const Post = require("../models/post");
const Comment = require("../models/comment");

async function createComment(body) {
    const postId = body.postId;
    const comment = await new Comment({
        content: body?.content || "",
        post: postId,
        user: body.userId,
    }).save();

    await Post.findByIdAndUpdate(postId, { $push: { comments: comment._id } });
    return await Comment.findById(comment._id).populate("post");
}

async function deleteComment(id) {
    const comment = await Comment.findByIdAndDelete(id);
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
