class ProductManager {
  constructor() {
    this.products = [];
    this.productIdCounter = 1; // Para generar IDs autoincrementables
  }

  addProduct(product) {
    if (!this.isProductValid(product)) {
      console.log("Error: Product data is invalid.");
      return;
    }

    if (this.isCodeTaken(product.code)) {
      console.log("Error: Product code is already taken.");
      return;
    }

    product.id = this.productIdCounter++;
    this.products.push(product);
    console.log("Product added successfully.");
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find(product => product.id === id);
    if (product) {
      return product;
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
}

// Ejemplo de uso y testeo
const productManager = new ProductManager();

console.log(productManager.getProducts()); // []

const productToAdd = {
  title: "producto prueba",
  description: "Este es un producto prueba",
  price: 200,
  thumbnail: "Sin imagen",
  code: "abc123",
  stock: 25
};

productManager.addProduct(productToAdd); // Agrega el producto sin problemas

console.log(productManager.getProducts()); // Muestra el producto recién agregado

// Intento de agregar un producto con el mismo código, debe arrojar un error
productManager.addProduct(productToAdd);

console.log(productManager.getProductById(1)); // Muestra el producto con ID 1
console.log(productManager.getProductById(3)); // Debe mostrar un error "Product not found"
