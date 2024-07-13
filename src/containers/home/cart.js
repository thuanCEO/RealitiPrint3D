import React, { useState, useEffect } from "react";
import CartItem from "./cartItem";
import Header from "../../components/Common/header/header";
import Footer from "../../components/Common/footer/footer";
import axiosClient from "../../services/api/api";
import SuccessModal from "./successModal";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const [products, setProducts] = useState([]);
  const [selectedVoucher, setSelectedVoucher] = useState("");
  const [discount, setDiscount] = useState(0);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [address, setAddress] = useState("");
  const [shippingId, setShippingId] = useState(1); // Assuming 1 is a valid default shipping ID
  const navigate = useNavigate();

  useEffect(() => {
    const cartProducts = JSON.parse(sessionStorage.getItem("cart")) || [];
    setProducts(cartProducts);

    const userData = JSON.parse(sessionStorage.getItem("userData"));
    if (userData && userData.address) {
      setAddress(userData.address);
    }
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

  const subtotal = products.reduce((total, product) => {
    // Giảm giá nếu categoryId là 1
    const price =
      product.categoryId === 1 ? product.price - 30000 : product.price;

    return total + price * product.quantity;
  }, 0);

  useEffect(() => {
    if (selectedVoucher === "voucher1") {
      setDiscount(subtotal * 0.1);
    } else if (selectedVoucher === "voucher2") {
      setDiscount(subtotal * 0.05);
    } else {
      setDiscount(0);
    }
  }, [selectedVoucher, subtotal]);

  const shipping = 49900;
  const total = subtotal + shipping - discount;

  const fetchCheckOut = async () => {
    try {
      const userData = JSON.parse(sessionStorage.getItem("userData"));
      if (userData && userData.id) {
        const userId = userData.id;

        const orderDTO = {
          userId: userId,
          paymentId: 1,
          totalPrice: total,
          finalPrice: total,
          address: address,
          voucherId:
            selectedVoucher === "voucher1"
              ? 1
              : selectedVoucher === "voucher2"
              ? 2
              : null,
          shippingId: shippingId,
        };

        const orderDetailDTO = products.map((product) => ({
          productId: product.id,
          quantity: product.quantity,
          totalPrice: product.price * product.quantity,
        }));

        const response = await axiosClient.post(
          "api/Order/CreateOrder",
          {
            orderDTO,
            orderDetailDTO,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log("Order created successfully:", response.data);

        sessionStorage.removeItem("cart");
        navigate("/reality3d/home-page");

        // Show the success modal
        setShowSuccessModal(true);
      } else {
        console.error("User data or user ID not found.");
      }
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    window.location.reload();
  };

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
                      <option value="voucher1">Sale 10% </option>
                      <option value="voucher2">Sale 5%</option>
                    </select>
                  </div>
                  <hr className="my-4" />
                  <div className="mb-4">
                    <label className="block text-gray-700">
                      Địa chỉ giao hàng
                    </label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full border border-gray-300 rounded p-2"
                    />
                  </div>
                  <div className="flex justify-between">
                    <p className="text-lg font-bold">Total</p>
                    <div>
                      <p className="mb-1 text-lg font-bold">
                        {total.toLocaleString()} đ
                      </p>
                    </div>
                  </div>
                  <button
                    className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-white hover:bg-blue-600"
                    onClick={fetchCheckOut}
                  >
                    Mua Hàng
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {showSuccessModal && <SuccessModal onClose={handleCloseModal} />}
    </>
  );
}
