import React, { useState, useEffect } from 'react';

const ProductForm = ({ addProduct, editProduct, productToEdit }) => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');

  useEffect(() => {
    if (productToEdit) {
      setName(productToEdit.name);
      setQuantity(productToEdit.quantity);
    } else {
      setName('');
      setQuantity('');
    }
  }, [productToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = { name, quantity: parseInt(quantity, 10) };

    if (productToEdit) {
      editProduct(newProduct);
    } else {
      addProduct(newProduct);
    }

    setName('');
    setQuantity('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nombre del producto"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Cantidad"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        required
      />
      <button type="submit">{productToEdit ? 'Editar' : 'Agregar'} Producto</button>
    </form>
  );
};

export default ProductForm;
