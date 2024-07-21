const express = require("express");
const userRoutes = require("./routes/user.routes");

const app = express();
const port = 3000;

app.use("/users", userRoutes);

app.get("/", (req, res) => {
    res.send();
});

app.listen(port, () => {
    console.log(`Aplicação rodando na porta ${port}`);
});
