async function getUserById(id) {
    return { id: id, name: "Gabriel Lacerda" };
}

const userService = {
    getUserById,
};

module.exports = userService;
