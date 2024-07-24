const { User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function validateLogin(body) {
    const { email, password } = body;
    if (!email) {
        return { error: "O email é obrigatório" };
    }
    if (!password) {
        return { error: "A senha é obrigatória" };
    }
    const user = await User.findOne({ email: email });
    if (!user) {
        return { status: 404, error: "Usuário não encontrado" };
    }

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
        return { error: "Senha inválida" };
    }

    // eslint-disable-next-line no-undef
    const secret = process.env.SECRET;

    try {
        const token = jwt.sign(
            {
                id: user._id,
            },
            secret,
            {
                expiresIn: "10h",
            }
        );
        return { value: token };
    } catch (error) {
        return { status: 500, error: `Erro ao fazer login!\n${error}` };
    }
}

module.exports = {
    validateLogin,
};
