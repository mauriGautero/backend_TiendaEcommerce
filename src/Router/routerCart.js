const express = require("express");
const { Router } = express;
const routerCart = Router();
/* --------- importo clase Cart la reutilizare para el desafio -------- */
const Carrito = require("../controller/Cart");
const Producto = require("../controller/Producto");

/* ------------------------ instacnio obj de la clase ----------------------- */
const cart = new Carrito("./src/carrito/carrito.json");
const pd = new Producto("./src/productos/productos.json");

/* ----------------------------endpoint para las rutas para el carrito --------------------------------- */
//obtener carrito
routerCart.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const carrito = await cart.getCart(id);
    res.json(carrito);
  } catch (error) {
    return error;
  }
});

// crear carrito
routerCart.post("/", async (req, res) => {
  //const datos = req.body;
  try {
    const carrito = await cart.saveCart();
    res.json(carrito);
  } catch (error) {
    res.json("error al guardar " + error);
  }
});

//agregar productos al carrito
routerCart.post("/:id", async (req, res) => {
  const datos = req.body;
  const id = parseInt(req.params.id);
  try {
    const agregado = await cart.updateCart(id, datos);
    res.json(agregado);
  } catch (error) {}
});

//vaciar carrito
routerCart.delete("/:id", (req, res) => {});
//quitar producto del carrito
routerCart.delete("/:id/productos/:id_prod", (req, res) => {});

module.exports = routerCart;
