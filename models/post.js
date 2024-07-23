const { Schema, model } = require("mongoose");

const postSchema = new Schema({
    content: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    createdAt: { type: Date, default: Date.now },
});

module.exports = model("Post", postSchema);
