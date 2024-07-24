const { ObjectId } = require("mongodb");
const { User } = require("../models");
const bcrypt = require("bcryptjs");

async function getUserById(id) {
    return await User.findById(ObjectId.createFromHexString(id));
}

async function createUser(body) {
    if (!body?.name?.trim()) {
        return { error: "O campo nome não foi preenchido" };
    }
    if (!body?.email?.trim()) {
        return { error: "O campo email não foi preenchido" };
    }
    if (!body?.password?.trim()) {
        return { error: "O campo senha não foi preenchido" };
    }
    const previousUser = await User.findOne({ email: body?.email });
    if (previousUser) {
        return { error: "Já existe um usuário cadastrado com esse email" };
    }
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(body?.password?.trim(), salt);
    const user = new User({
        name: body?.name.trim(),
        email: body?.email.trim(),
        password: passwordHash,
    });
    return await user.save();
}

const userService = {
    getUserById,
    createUser,
};

module.exports = userService;
