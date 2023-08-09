class ProductManager {
  constructor() {
    this.products = [];
    this.productIdCounter = 1; // Para generar IDs autoincrementables
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    let newProduct = {
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

    newProduct.id = this.productIdCounter++;
    this.products.push(newProduct);
    console.log("Product added successfully.");
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    let indexproduct = this.products.findIndex(product => product.id === id);
    if (indexproduct==-1) {
      console.log("Error: Product not found.");
      return
    } 
      return this.products[indexproduct];
    
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



//Testeo
let productManager = new ProductManager();

console.log(productManager.getProducts()); // []

productManager.addProduct(
  "producto prueba",
  "Este es un producto prueba",
  200,
  "Sin imagen",
  "abc123",
  25
); 

console.log(productManager.getProducts()); // Muestra el producto recién agregado

// Intento de agregar un producto con el mismo código, debe arrojar un error
productManager.addProduct(
  "producto repetido",
  "Este es un producto repetido",
  150,
  "Sin imagen",
  "abc123",
  20
);

console.log(productManager.getProductById(1));
// console.log(productManager.getProductById(2));
