import React from 'react';

const ProductList = ({ products, updateProduct, deleteProduct, setProductToEdit }) => {
  const handleIncrement = (index) => {
    const newProducts = [...products];
    newProducts[index].quantity += 1;
    updateProduct(newProducts);
  };

  const handleDecrement = (index) => {
    const newProducts = [...products];
    if (newProducts[index].quantity > 0) {
      newProducts[index].quantity -= 1;
      updateProduct(newProducts);
    }
  };

  return (
    <table className="product-table">
      <thead>
        <tr>
          <th>Cantidad</th>
          <th>Descripción</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product, index) => (
          <tr key={index}>
            <td>
              <div className="product-buttons">
                <button onClick={() => handleDecrement(index)}>-</button>
                <div className="product-quantity">{product.quantity}</div>
                <button onClick={() => handleIncrement(index)}>+</button>
              </div>
            </td>
            <td>
              <div className="product-name">{product.name}</div>
            </td>
            <td>
              <div className="actions-buttons">
                <button onClick={() => setProductToEdit(product)}>Editar</button>
                <button onClick={() => deleteProduct(index)}>Eliminar</button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductList;
