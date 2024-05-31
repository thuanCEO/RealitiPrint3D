import React, { useState, useEffect } from "react";
import CartItem from "./cartItem";
import Header from "../../components/Common/header/header";
import Footer from "../../components/Common/footer/footer";

export default function Cart() {
  const [products, setProducts] = useState([]);
  const [selectedVoucher, setSelectedVoucher] = useState("");
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    const cartProducts = JSON.parse(sessionStorage.getItem("cart")) || [];
    setProducts(cartProducts);
  }, []);

  const handleQuantityChange = (productId, newQuantity) => {
    const updatedProducts = products.map((product) =>
      product.id === productId ? { ...product, quantity: newQuantity } : product
    );
    setProducts(updatedProducts);
    updateSessionStorage(updatedProducts);
  };

  const handleRemoveProduct = (productId) => {
    const updatedProducts = products.filter(
      (product) => product.id !== productId
    );
    setProducts(updatedProducts);
    updateSessionStorage(updatedProducts);
  };
  const updateSessionStorage = (updatedProducts) => {
    sessionStorage.setItem("cart", JSON.stringify(updatedProducts));
  };

  const subtotal = products.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  useEffect(() => {
    if (selectedVoucher === "voucher1") {
      setDiscount(subtotal * 0.1);
    } else {
      setDiscount(0);
    }
  }, [selectedVoucher, subtotal]);

  const shipping = 49900;
  const total = subtotal + shipping - discount;

  return (
    <>
      <Header />
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
                  />
                ))}
              </div>
              <div className="rounded-lg md:w-1/2">
                <div className="border bg-white p-6 shadow-md">
                  <div className="mb-2 flex justify-between">
                    <p className="text-gray-700">Tổng giá tiền</p>
                    <p className="text-gray-700">
                      {subtotal.toLocaleString()} đ
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-gray-700">Phí vận chuyển</p>
                    <p className="text-gray-700">
                      {shipping.toLocaleString()}{" "}
                    </p>
                  </div>
                  <hr className="my-4" />
                  <div className="flex justify-between">
                    <p className="text-gray-700">Voucher giảm giá</p>
                    <select
                      value={selectedVoucher}
                      onChange={(e) => setSelectedVoucher(e.target.value)}
                      className="border border-gray-300 rounded p-1"
                    >
                      <option value="">Chọn voucher</option>
                      <option value="voucher1">Voucher 1</option>
                      <option value="voucher2">Voucher 2</option>
                    </select>
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
                    Thanh Toán
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
