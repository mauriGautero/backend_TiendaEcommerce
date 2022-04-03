const express = require("express");
const { Router } = express;
const routerProductos = Router();
const Producto = require("../controller/Producto");
const productos = new Producto("./src/productos/productos.json");

/* ----------------------------endpoint para las rutas --------------------------------- */
// 1) /api/prodtuctos -> devuelve lista de productos formato json
routerProductos.get("/", async (req, res) => {
  const pd = await productos.getAll();
  res.send({ pd });
});

// 2) /api/productos/:id -> devuelve un producto según su id. muestra mensaje si no lo existe
routerProductos.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const pd = await productos.getById(id);
    if (pd) {
      res.json({ pd });
    } else {
      res.json({ error: `producto con id:${id} no encontrado` });
    }
  } catch (error) {
    return error;
  }
});

// 3) POST '/api/productos' -> recibe y agrega un producto, y lo devuelve con su id asignado.

routerProductos.post("/", async (req, res) => {
  const product = req.body;
  /* ----------------- agrego nuevo producto y devuelvo si id ----------------- */
  const id = await productos.save(product);
  /* con ese id lo busco en el Array y devuelvo la respuesta con dicho producto -------------------- */
  const pdAgregado = await productos.getById(id);
  res.json({ agregado: pdAgregado });
});

// 4)PUT '/api/productos/:id' -> recibe y actualiza un producto según su id.
routerProductos.put("/:id", async (req, res) => {
  const {
    body,
    params: { id },
  } = req;
  const pdAnterior = await productos.getById(parseInt(id));
  const pdModificado = await productos.updateById(id, body);

  res.json({ pdAnterior, pdModificado });
});

// 5)DELETE '/api/productos/:id' -> elimina un producto según su id

routerProductos.delete("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const listado = await productos.getById(id);
    if (listado) {
      const eliminado = await productos.deleteById(id);
      const data = await productos.getAll();
      res.json({ Resultado: `Producto con id: ${id} eliminado.`, listado });
    } else {
      res.json({ error: `producto con id:${id} no encontrado` });
    }
  } catch (error) {
    return error.message();
  }
});

module.exports = routerProductos;
