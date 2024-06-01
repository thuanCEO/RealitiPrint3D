import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const SuccessModal = ({ onClose }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
      navigate("/reality3d/home-page");
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose, navigate]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
      navigate("/reality3d/home-page");
    }
  };

  return (
    <div
      className="fixed z-50 inset-0 overflow-y-auto flex items-center justify-center"
      onClick={handleOverlayClick}
    >
      <div className="fixed inset-0 bg-gray-800 opacity-50"></div>
      <div className="bg-white rounded-lg overflow-hidden shadow-xl max-w-md">
        <div className="px-6 py-8">
          <div className="text-center mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-green-500 mx-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <h2 className="text-2xl font-bold mt-4">Thanh toán thành công!</h2>
          </div>
          <p className="text-lg text-center">
            Bạn đã thanh toán thành công đơn hàng. Đơn hàng sẽ được chuyển đến
            bạn trong thời gian sớm nhất!
          </p>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
