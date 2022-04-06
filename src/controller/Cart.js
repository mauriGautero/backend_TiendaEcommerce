const fs = require("fs");
const Producto = require("./Producto");
const prod = new Producto("../productos/productos.json");
class Cart {
  constructor(archivo) {
    this.archivo = archivo;
    this.idCart = 0;
    this.carrito = [];
  }
  //nuevo carrito ok
  async saveCart() {
    const datos = await fs.promises.readFile(this.archivo, "utf-8");
    try {
      const data = JSON.parse(datos);
      data.map((c) => (this.idCart = c.idCart + 1));

      this.timestamp = new Date().toLocaleString();

      const cart = {
        idCart: this.idCart,
        timestamp: this.timestamp,
        productos: [],
      };

      data.push(cart);

      fs.promises.writeFile(this.archivo, JSON.stringify(data, null, 2));

      return this.idCart;
    } catch (error) {
      return "error: " + error;
    }
  }

  //obtener carrito ok
  async getCart(id) {
    const datos = await fs.promises.readFile(this.archivo, "utf-8");
    try {
      const cart = JSON.parse(datos);
      const carrito = cart.find((c) => c.idCart === id);
      if (carrito) {
        return carrito;
      } else {
        return `No se encuentra carrito con id: ${id}`;
      }
    } catch (error) {
      return "error", error;
    }
  }

  //agregar productos al carrito
  async updateCart(_id, datos) {
    const data = await fs.promises.readFile(this.archivo, "utf-8");
    const lista = JSON.parse(data);
    //obtengo indice del carrito
    const indice = lista.findIndex((c) => c.idCart == _id);
    let cart = lista[indice];

    //guardo el carrito con los productos previos
    const cartAnterior = await this.getCart(_id);
    const IdPd = datos.id;

    const pp = cartAnterior.productos.map((c) => c.id);
    const { productos } = cartAnterior;
    let _cantidad = 0;
    try {
      /**/
      if (productos.some((x) => x.id === pp[0])) {       
        productos.find((x) => productos.id === pp[0]).cantidad += 2;
        cart.productos.push(...productos, datos);
      } else {
        
        cart.productos.push(datos);

        /**/

        //agrego producto en el carrito
        //cart.productos.push(datos);

        //Actualizo el carrito en el array de carrito con el producto
        lista[indice] = cart;
      }
      await fs.promises.writeFile(this.archivo, JSON.stringify(lista, null, 2));
      const carrito = await this.getCart(_id);
      return carrito;
    } catch (error) {
      return "error al agregar producto: " + error.message;
    }
  }

  // quitar productos del carrito
  async deleteCart_prod(id, pd) {}

  //vaciar carrito
  async deleteCart() {}
}

module.exports = Cart;

/* if (pdAnterior.some((p) => p.producto.id === producto.producto.id)) {
        pdAnterior.find(
          (p) => p.producto.id === producto.producto.id
        ).cantidad += producto.cantidad;
        productos.push(pdAnterior);
      } else { */
