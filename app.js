const express = require('express');
const ProductManager = require('./ProductManager'); // Ajusta la ruta si es necesario

const app = express();
const filePath = 'products.json'; // Ruta del archivo de productos
const productManager = new ProductManager(filePath);

app.use(express.json());

// Ruta para obtener todos los productos con límite opcional
app.get('/products', async (req, res) => {
  const limit = req.query.limit;
  const products = await productManager.getProducts();
  if (limit) {
    res.json(products.slice(0, parseInt(limit)));
  } else {
    res.json(products);
  }
});

// Ruta para obtener un producto por ID
app.get('/products/:pid', async (req, res) => {
  const productId = parseInt(req.params.pid);
  const product = await productManager.getProductById(productId);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: "Product not found" });
  }
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
