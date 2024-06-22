import React, { useState } from 'react';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [name, setName] = useState('');
    const [code, setCode] = useState('');
    const [quantity, setQuantity] = useState('');

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const newProduct = {
            name: name,
            code: code,
            quantity: parseInt(quantity)
        };
        setProducts([...products, newProduct]);
        setName('');
        setCode('');
        setQuantity('');
    };

    return (
        <div>
            <h1>Control de Inventario del Depósito</h1>
            <div id="product-list">
                {products.map((product, index) => (
                    <div key={index} className="product-item">
                        <strong>{product.name}</strong> - {product.code} - Cantidad: {product.quantity}
                    </div>
                ))}
            </div>
            <form id="product-form" onSubmit={handleFormSubmit}>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nombre del Producto" required />
                <input type="text" value={code} onChange={(e) => setCode(e.target.value)} placeholder="Código EAN" required />
                <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="Cantidad" required />
                <button type="submit">Agregar Producto</button>
            </form>
        </div>
    );
};

export default ProductList;