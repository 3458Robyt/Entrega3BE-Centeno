const fs = require('fs'); // Importar el módulo de sistema de archivos

class ProductManager {
  constructor(filePath) {
    this.filePath = filePath;
    this.loadProducts();
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    let newProduct = {
      id: this.products.length + 1,
      title,
      description,
      price,
      thumbnail,
      code,
      stock
    };

    if (!this.isProductValid(newProduct)) {
      console.log("Error: Product data is invalid.");
      return;
    }

    if (this.isCodeTaken(code)) {
      console.log("Error: Product code is already taken.");
      return;
    }

    this.products.push(newProduct);
    this.saveProducts();
    console.log("Product added successfully.");
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    return this.products.find(product => product.id === id);
  }

  updateProduct(id, updatedFields) {
    let productIndex = this.products.findIndex(product => product.id === id);
    if (productIndex !== -1) {
      this.products[productIndex] = {
        ...this.products[productIndex],
        ...updatedFields,
        id // Mantener el ID original en caso de actualización
      };
      this.saveProducts();
      console.log("Product updated successfully.");
    } else {
      console.log("Error: Product not found.");
    }
  }

  deleteProduct(id) {
    let productIndex = this.products.findIndex(product => product.id === id);
    if (productIndex !== -1) {
      this.products.splice(productIndex, 1);
      this.saveProducts();
      console.log("Product deleted successfully.");
    } else {
      console.log("Error: Product not found.");
    }
  }

  isProductValid(product) {
    return (
      product.title &&
      product.description &&
      product.price &&
      product.thumbnail &&
      product.code &&
      product.stock !== undefined
    );
  }

  isCodeTaken(code) {
    return this.products.some(product => product.code === code);
  }

  saveProducts() {
    fs.writeFileSync(this.filePath, JSON.stringify(this.products, null, 2));
  }

  loadProducts() {
    try {
      const data = fs.readFileSync(this.filePath, 'utf-8');
      this.products = JSON.parse(data);
    } catch (error) {
      this.products = [];
    }
  }
}

// Ejemplo de uso y testeo
// Crear una instancia de la clase ProductManager
const filePath = 'products.json'; // Ruta del archivo de productos
const productManager = new ProductManager(filePath);

// Test 1: Verificar que getProducts devuelve un arreglo vacío
console.log(productManager.getProducts()); // []

// Test 2: Agregar un producto con addProduct
productManager.addProduct(
  "producto prueba",
  "Este es un producto prueba",
  200,
  "Sin imagen",
  "abc123",
  26
);

// Test 3: Verificar que el producto se ha agregado correctamente
console.log(productManager.getProducts()); // Debe mostrar el producto recién agregado

// Test 4: Verificar que getProductById devuelve el producto con el ID especificado
console.log(productManager.getProductById(1)); // Debe mostrar el producto agregado anteriormente
console.log(productManager.getProductById(2)); // Debe mostrar un error "Product not found"

// Test 5: Actualizar un producto con updateProduct
productManager.updateProduct(1, {
  title: "producto modificado",
  description: "Descripción modificada",
  price: 150,
  thumbnail: "Nueva imagen",
  code: "xyz789",
  stock: 30
});

console.log(productManager.getProductById(1)); // Debe mostrar el producto actualizado

// Test 6: Eliminar un producto con deleteProduct
console.log(productManager.getProducts()); // Debe mostrar un arreglo vacío

// productManager.deleteProduct(2); // Debe mostrar un error "Product not found"

