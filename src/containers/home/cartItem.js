import React from "react";

export default function CartItem({ product, onQuantityChange, onRemove }) {
  const handleDecrement = () => {
    if (product.quantity > 1) {
      onQuantityChange(product.id, product.quantity - 1);
      updateCart(product.id, product.quantity - 1);
    }
  };

  const handleIncrement = () => {
    onQuantityChange(product.id, product.quantity + 1);
    updateCart(product.id, product.quantity + 1);
  };
  const updateCart = (productId, newQuantity) => {
    const updatedCart = JSON.parse(sessionStorage.getItem("cart")).map((item) =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    );
    sessionStorage.setItem("cart", JSON.stringify(updatedCart));
  };
  const handleRemove = () => {
    onRemove(product.id);
    const updatedCart = JSON.parse(sessionStorage.getItem("cart")).filter(
      (item) => item.id !== product.id
    );
    sessionStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <div className="flex justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full rounded-lg sm:w-40"
      />
      <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
        <div className="mt-5 sm:mt-0">
          <h2 className="text-lg font-bold text-gray-900">{product.name}</h2>
          <p className="mt-1 text-xs text-gray-700">{product.size}</p>
        </div>
        <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
          <div className="flex items-center border-gray-100">
            <button
              className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-white"
              onClick={handleDecrement}
            >
              -
            </button>
            <input
              className="h-8 w-8 border bg-white text-center text-xs outline-none"
              type="number"
              value={product.quantity}
              readOnly
            />
            <button
              className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-white"
              onClick={handleIncrement}
            >
              +
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <p className="text-sm">{product.price.toLocaleString()} </p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
              onClick={handleRemove}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
