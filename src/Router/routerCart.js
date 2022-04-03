const express = require("express");
const { Router } = express;
const routerCart = Router();
/* --------- importo clase Cart la reutilizare para el desafio -------- */
//const Contenedor = require("./Contenedor");

/* ------------------------ instacnio obj de la clase ----------------------- */
//const productos = new Contenedor("./src/productos.txt");

/* ----------------------------endpoint para las rutas para el carrito --------------------------------- */
//obtener carrito
routerCart.get("/:id/productos", (req, res) => {
  res.json("cart");
});
// crear carrito
routerCart.post("/", (req, res) => {});
//vaciar carrito
routerCart.delete("/:id", (req, res) => {});
//quitar producto del carrito
routerCart.delete("/:id/productos/:id_prod", (req, res) => {});

module.exports = routerCart;
