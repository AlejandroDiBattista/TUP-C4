const { createRoot } = ReactDOM;
const { useState, useEffect } = React;

const App = () => (
  <main className="flex flex-center w-full">
    <Storage />
  </main>
);

const Storage = () => {
  const [productList, setProductList] = useState([]);
  const [editingProductIdList, setEditingProductIdList] = useState([]);

  useEffect(() => {
    const storedProducts = localStorage.getItem("productList");
    if (storedProducts) {
      setProductList(JSON.parse(storedProducts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("productList", JSON.stringify(productList));
  }, [productList]);

  const handleCardClick = (id) => {
    setProductList(
      productList.map((product) =>
        product.id === id ? { ...product, quantity: parseInt(product.quantity) + 1 } : product
      )
    );
  };

  const handleAdd = () => {
    const id = productList.length > 0 ? Math.max(...productList.map((product) => product.id)) + 1 : 1;
    const newItem = { id, name: "", code: "", quantity: "0" };
    setProductList([...productList, newItem]);
    setEditingProductIdList([...editingProductIdList, id]);
  };

  const handleEdit = (id) => setEditingProductIdList([...editingProductIdList, id]);

  const handleDelete = (id) => setProductList(productList.filter((product) => product.id !== id));

  const handleSave = (updatedProduct) => {
    setProductList(productList.map((product) => (product.id === updatedProduct.id ? updatedProduct : product)));
    setEditingProductIdList(editingProductIdList.filter((productId) => productId !== updatedProduct.id));
  };

  const handleCancel = (id) => {
    const existingProduct = productList.find((product) => product.id === id);
    if (existingProduct.name === "" && existingProduct.code === "" && existingProduct.quantity === "0") {
      setProductList(productList.filter((product) => product.id !== id));
    }
    setEditingProductIdList(editingProductIdList.filter((productId) => productId !== id));
  };

  productList.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <section className="flex flex-col flex-center w-full">
      <div className="flex flex-row flex-center">
        <h1>Control Depósito</h1>
        <button className="add-button" onClick={handleAdd}>
          <i className="fa-regular fa-square-plus" />
        </button>
      </div>

      {productList.map((product) => (
        <Card
          key={product.id}
          product={product}
          isEditing={editingProductIdList.includes(product.id)}
          handleEdit={() => handleEdit(product.id)}
          handleDelete={() => handleDelete(product.id)}
          handleSave={handleSave}
          handleCancel={() => handleCancel(product.id)}
          handleCardClick={() => handleCardClick(product.id)}
        />
      ))}
    </section>
  );
};

const Form = ({ product, handleSave, handleCancel }) => {
  const [name, setName] = useState(product.name);
  const [code, setCode] = useState(product.code);
  const [quantity, setQuantity] = useState(product.quantity);

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanedName = name.trim().replace(/^\w/, (c) => c.toUpperCase());
    handleSave({ ...product, name: cleanedName, code, quantity });
  };

  const handleCodeChange = (e) => setCode(e.target.value.replace(/\D/g, ""));

  return (
    <form onSubmit={handleSubmit} className="card">
      <div className="flex flex-col w-full">
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          minLength={13}
          maxLength={13}
          name="code"
          placeholder="Código EAN (13 dígitos)"
          value={code}
          onChange={handleCodeChange}
          required
        />
        <input
          type="number"
          name="quantity"
          placeholder="Stock"
          min={0}
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />
      </div>
      <div className="flex flex-col">
        <button className="confirm-button" type="submit" disabled={name.trim().length === 0 || code.length < 13}>
          Aceptar
        </button>
        <button type="button" className="cancel-button" onClick={handleCancel}>
          Cancelar
        </button>
      </div>
    </form>
  );
};

const Card = ({ product, isEditing, handleEdit, handleDelete, handleSave, handleCancel, handleCardClick }) => (
  isEditing ? (
    <Form product={product} handleSave={handleSave} handleCancel={handleCancel} />
  ) : (
    <article className="card" onClick={handleCardClick}>
      <div className="quantity text-ellipsis">{product.quantity}</div>
      <div className="details">
        <div className="name text-ellipsis">{product.name}</div>
        <div className="code text-ellipsis">{product.code}</div>
      </div>
      <div className="flex flex-col flex-center">
        <button className="edit-button" onClick={(e) => { e.stopPropagation(); handleEdit(); }}>
          <i className="fa-regular fa-pen-to-square"></i>
        </button>
        <button className="delete-button" onClick={(e) => { e.stopPropagation(); handleDelete(); }}>
          <i className="fa-regular fa-trash-can"></i>
        </button>
      </div>
    </article>
  )
);

createRoot(document.getElementById("root")).render(<App />);
