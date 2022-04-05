const express = require("express");
const { Router } = express;
const routerProductos = Router();
const Producto = require("../controller/Producto");
const productos = new Producto("./src/productos/productos.json");

const admin = true;
/* ----------------------------endpoint para las rutas --------------------------------- */
//GET /api/productos/:id? -> devuelve la lista todos los productos 
//  ó un producto según su id.
routerProductos.get("/:id?", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const pd = await productos.getAll();
    if (id) {
      res.json(await productos.getById(id));
    } else {
      res.json({ pd });
    }
  } catch (error) {
    return error;
  }
});

//POST '/api/productos' -> recibe y agrega un producto,
//     y lo devuelve con su id asignado.
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

// DELETE '/api/productos/:id' -> elimina un producto según su id

routerProductos.delete("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    console.log(id);
    //const buscado = await productos.getById(id);
    if (id) {
      const eliminado = await productos.deleteById(id);
      console.log("endpoint borrar:");
      console.log(eliminado);
      const data = await productos.getAll();
      res.json({ Resultado: `Producto con id: ${id} eliminado.`, data });
    } else {
      res.json({ error: `producto con id:${id} no encontrado` });
    }
  } catch (error) {
    return error;
  }
});


module.exports = routerProductos;
