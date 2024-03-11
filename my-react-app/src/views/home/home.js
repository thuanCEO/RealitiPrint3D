import React, { useState } from 'react';

const HomePage = () => {

  const [products, setProducts] = useState([
    { id: 1, name: 'Product 1', price: '$19.99' },
    { id: 2, name: 'Product 2', price: '$29.99' },
    { id: 3, name: 'Product 3', price: '$24.99' },
 
  ]);

  return (
    <div>
       <title>Trang chủ - Website của tôi</title>
      <h1>Home Page</h1>
      <h2>Products</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <strong>{product.name}</strong> - {product.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;