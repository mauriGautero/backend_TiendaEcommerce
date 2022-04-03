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
        this.product.map((p) => p == p);
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
        return `Producto con id:${id}, no encotrado`;
      }
    } catch (error) {
      console.log(error);
    }
  }
  async save(){
      try {
        

      } catch (error) {
          
      }
  }


}

module.exports = Producto;
