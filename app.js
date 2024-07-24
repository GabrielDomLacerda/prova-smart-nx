const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const { User, Comment, Post } = require("./models");
const {
    usersRoutes,
    commentsRoutes,
    postsRoutes,
    authRoutes,
} = require("./routes");
require("dotenv").config();

// eslint-disable-next-line no-undef
const PORT = process.env.APP_PORT;

// eslint-disable-next-line no-undef
const MONGO_URI = process.env.MONGO_URI;
const app = express();

async function connectDatabase() {
    try {
        const connection = await mongoose.connect(MONGO_URI);
        await Promise.all([
            User.createCollection(),
            Comment.createCollection(),
            Post.createCollection(),
        ]);

        console.log("Conexão com MongoDB estabelecida");
    } catch (err) {
        console.error("Não foi possível conectar ao MongoDB", err);
    }
}

connectDatabase();

app.use(express.json());
app.use(helmet());

app.use("/users", usersRoutes);
app.use("/posts", postsRoutes);
app.use("/comments", commentsRoutes);
app.use("/", authRoutes);

app.use((req, res) => {
    res.status(404).send("Rota não encontrada!");
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Houve um erro na aplicação, tente novamente!");
    if (!err?.stack) {
        next();
    }
});

app.listen(PORT, () => {
    console.log(`Aplicação rodando na porta ${PORT}`);
});
