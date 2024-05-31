import React, { useState, useEffect } from "react";
import CartItem from "./cartItem";
import Header from "../../components/Common/header/header";
import Footer from "../../components/Common/footer/footer";

export default function Cart() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const cartProducts = sessionStorage.getItem("cartProducts");
    if (cartProducts) {
      setProducts(JSON.parse(cartProducts));
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem("cartProducts", JSON.stringify(products));
  }, [products]);

  const handleQuantityChange = (productId, newQuantity) => {
    setProducts(
      products.map((product) =>
        product.id === productId
          ? { ...product, quantity: newQuantity }
          : product
      )
    );
  };

  const handleRemoveProduct = (productId) => {
    setProducts(products.filter((product) => product.id !== productId));
  };

  const subtotal = products.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  const shipping = 49900;
  const total = subtotal + shipping;

  return (
    <>
      <Header products={products} />
      <main className="flex-1 p-6 bg-gray-300 flex justify-center items-center">
        <div className="p-6 bg-gray-100 rounded shadow-md w-full h-full flex flex-col items-center">
          <h1 className="mb-10 text-center text-2xl font-bold">
            Giỏ hàng của tôi
          </h1>
          <div className="max-w-5xl w-full">
            <div className="md:flex md:justify-center md:space-x-6">
              <div className="rounded-lg md:w-2/3 mb-6 md:mb-0">
                {products.map((product) => (
                  <CartItem
                    key={product.id}
                    product={product}
                    onQuantityChange={handleQuantityChange}
                    onRemove={handleRemoveProduct}
                    products={products}
                  />
                ))}
              </div>
              <div className="rounded-lg md:w-1/2">
                <div className="border bg-white p-6 shadow-md">
                  <div className="mb-2 flex justify-between">
                    <p className="text-gray-700">Subtotal</p>
                    <p className="text-gray-700">
                      {subtotal.toLocaleString()} đ
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-gray-700">Shipping</p>
                    <p className="text-gray-700">
                      {shipping.toLocaleString()}{" "}
                    </p>
                  </div>
                  <hr className="my-4" />
                  <div className="flex justify-between">
                    <p className="text-lg font-bold">Total</p>
                    <div>
                      <p className="mb-1 text-lg font-bold">
                        {total.toLocaleString()} đ
                      </p>
                    </div>
                  </div>
                  <button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-white hover:bg-blue-600">
                    Check out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
