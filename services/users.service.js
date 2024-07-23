const User = require("../models/user");

async function getUserById(id) {
    return await User.findById(id);
}

async function createUser(body) {
    const user = new User({ name: body?.name, email: body?.email });
    return await user.save();
}

const userService = {
    getUserById,
    createUser,
};

module.exports = userService;
