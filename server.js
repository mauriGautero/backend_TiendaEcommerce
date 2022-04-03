const express = require("express");
const morgan = require("morgan");
const path = require("path");

//import routers
const routerProductos = require("./src/Router/routerProductos");
const routerCart = require("./src/Router/routerCart");
const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, "public")));

app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/productos", routerProductos);
app.use("/api/cart", routerCart);

const server = app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
server.on("error", (error) => console.log("error en el servidor: " + error));
