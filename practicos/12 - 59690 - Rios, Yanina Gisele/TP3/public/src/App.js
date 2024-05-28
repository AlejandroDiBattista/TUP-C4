import React, { useState, useEffect } from 'react';
import './App.css';
import ProductForm from './componentes/ProductForm';
import ProductList from './componentes/ProductList';

function App() {
  const [products, setProducts] = useState([]);
  const [productToEdit, setProductToEdit] = useState(null);

  // Cargar productos desde el localStorage al inicializar la aplicación
  useEffect(() => {
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    }
  }, []);

  // Guardar productos en el localStorage cuando se actualicen
  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  const addProduct = (product) => {
    setProducts((prevProducts) => [...prevProducts, product]);
  };

  const editProduct = (editedProduct) => {
    const newProducts = products.map((product) =>
      product.name === productToEdit.name ? editedProduct : product
    );
    setProducts(newProducts);
    setProductToEdit(null);
  };

  const updateProduct = (updatedProducts) => {
    setProducts(updatedProducts);
  };

  const deleteProduct = (index) => {
    const newProducts = products.filter((_, i) => i !== index);
    setProducts(newProducts);
  };

  return (
    <div className="App">
      <h1>Control de Stock</h1>
      <ProductForm
        addProduct={addProduct}
        editProduct={editProduct}
        productToEdit={productToEdit}
      />
      <ProductList
        products={products}
        updateProduct={updateProduct}
        deleteProduct={deleteProduct}
        setProductToEdit={setProductToEdit}
      />
    </div>
  );
}

export default App;
