const fs = require("fs");

class Producto {
  constructor(archivo) {
    this.archivo = archivo;
    this.product = [];
    this.id = 0;
  }
  async getAll() {
    try {
      const data = await fs.promises.readFile(this.archivo, "utf-8");
      if (data) {
        this.product = JSON.parse(data);
        this.product.map((p) => {
          if (this.id < p.id) this.id = p.id;
        });
      }
      return this.product;
    } catch (error) {}
  }
  async getById(id) {
    await this.getAll();
    try {
      const pd = this.product.find((x) => x.id == id);
      if (pd) {
        return pd;
      } else {
        return `Producto con id:${id}, no encontrado`;
      }
    } catch (error) {
      console.log(error);
    }
  }
  async save(producto) {
    await this.getAll();
    this.id++;
    const timestamp = new Date().toLocaleString();
    this.product.push({ ...producto, id: this.id, timestamp });
    try {
      console.log("guardar:");
      console.log(this.product);
      fs.promises.writeFile(
        this.archivo,
        JSON.stringify(this.product, null, 2)
      );
      return this.id;
    } catch (error) {
      return "no se pudo gardar el producto " + this.product;
    }
  }
  async deleteById(id) {
    const pd = await this.getAll();
    try {
      const borrado = pd.filter((x) => x.id !== id);
      fs.promises.writeFile(this.archivo, JSON.stringify(borrado, null, 2));
      return borrado;
    } catch (error) {}
  }

  async updateById(id, datos) {
    let listado = await this.getAll();
    try {
      const indice = this.product.findIndex((x) => x.id == id);
      let prod = listado[indice];
      if (prod) {
        const {
          timestamp,
          descripcion,
          categoria,
          peso,
          codigo,
          precio,
          img,
          stock,
          activo,
        } = datos;

        prod.timestamp = timestamp;
        prod.descripcion = descripcion;
        prod.categoria = categoria;
        prod.peso = peso;
        prod.codigo = codigo;
        prod.precio = precio;
        prod.img = img;
        prod.stock = stock;
        prod.activo = activo;

        listado[indice] = prod;

        try {
          /* -------------- actualizo el archivo con producto modificado -------------- */
          await fs.promises.writeFile(
            this.archivo,
            JSON.stringify(listado, null, 2)
          );
          return prod;
        } catch (error) {
          return "No se pudo actualizar " + error;
        }        
      } else {
        return { Error: `producto con id:${id} no encontrado` };
      }
    } catch (error) {}
  }
}

module.exports = Producto;
