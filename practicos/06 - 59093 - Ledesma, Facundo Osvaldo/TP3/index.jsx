const { useState, useEffect } = React;

const App = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', ean: '', quantity: 1 });
  const [editIndex, setEditIndex] = useState(null);
  const [editedProduct, setEditedProduct] = useState({ name: '', ean: '', quantity: 1 });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const savedProducts = JSON.parse(localStorage.getItem('products')) || [];
    setProducts(savedProducts);
  }, []);

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  const AddProduct = () => {
    if (newProduct.name && newProduct.ean) {
      const existingProductIndex = products.findIndex(product => product.name.toLowerCase() === newProduct.name.toLowerCase());
      if (existingProductIndex !== -1) {
        const updatedProducts = [...products];
        updatedProducts[existingProductIndex].quantity += newProduct.quantity;
        setProducts(updatedProducts);
      } else {
        setProducts([...products, newProduct]);
      }
      setNewProduct({ name: '', ean: '', quantity: 1 });
    }
  };

  const EditProduct = index => {
    setEditIndex(index);
    setEditedProduct(products[index]);
    setIsEditing(true);
  };

  const SaveEdit = index => {
    const updatedProducts = [...products];
    updatedProducts[index] = editedProduct;
    setProducts(updatedProducts);
    setEditIndex(null);
    setEditedProduct({ name: '', ean: '', quantity: 1 });
    setIsEditing(false);
  };

  const CancelEdit = () => {
    setEditIndex(null);
    setEditedProduct({ name: '', ean: '', quantity: 1 });
    setIsEditing(false);
  };

  const DeleteProduct = index => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
  };

  const incrementQuantity = index => {
    const updatedProducts = [...products];
    updatedProducts[index].quantity += 1;
    setProducts(updatedProducts);
  };

  const sortedProducts = [...products].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="app">
      <h1>Control Depósito</h1>
      <div className={`product-add ${isEditing ? 'hidden' : ''}`}>
        <input
          type="text"
          placeholder="Nombre del producto"
          value={newProduct.name}
          onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Código EAN"
          value={newProduct.ean}
          onChange={e => setNewProduct({ ...newProduct, ean: e.target.value })}
        />
        <button onClick={AddProduct}>Agregar</button>
      </div>
      <div className={`product-list ${isEditing ? 'hidden' : ''}`}>
        {sortedProducts.map((product, index) => (
          <div key={index} className="product-item-container">
            <div className="product-item" onClick={() => incrementQuantity(index)}>
              <span className="detail product-name">{product.name}</span>
              <span className="detail">{product.ean}</span>
              <div className="detail product-quantity">
                <label>CANTIDAD:</label>
                <span>{product.quantity}</span>
              </div>
            </div>
            <div className="product-actions">
              <button onClick={(e) => { e.stopPropagation(); EditProduct(index); }}>Editar</button>
              <button onClick={(e) => { e.stopPropagation(); DeleteProduct(index); }}>Eliminar</button>
            </div>
          </div>
        ))}
      </div>
      {isEditing && (
        <div className="product-edit">
          <input
            type="text"
            value={editedProduct.name}
            onChange={e => setEditedProduct({ ...editedProduct, name: e.target.value })}
          />
          <input
            type="text"
            value={editedProduct.ean}
            onChange={e => setEditedProduct({ ...editedProduct, ean: e.target.value })}
          />
          <input
            type="number"
            value={editedProduct.quantity}
            onChange={e => setEditedProduct({ ...editedProduct, quantity: Number(e.target.value) })}
          />
          <button onClick={() => SaveEdit(editIndex)}>Aceptar</button>
          <button onClick={CancelEdit}>Cancelar</button>
        </div>
      )}
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
