const express = require("express");
const mongoose = require("mongoose");
const usersRoutes = require("./routes/user.routes");
const commentsRoutes = require("./routes/comment.routes");
const postsRoutes = require("./routes/post.routes");
require("dotenv").config();

// eslint-disable-next-line no-undef
const PORT = process.env.PORT;
// eslint-disable-next-line no-undef
const MONGO_URI = process.env.MONGO_URI;
const app = express();

mongoose
    .connect(MONGO_URI)
    .then(() => console.log("Conexão com MongoDB estabelecida"))
    .catch((err) => console.error("Não foi possível conectar ao MongoDB", err));

app.use(express.json());

app.use("/users", usersRoutes);

app.listen(PORT, () => {
    console.log(`Aplicação rodando na porta ${PORT}`);
});
