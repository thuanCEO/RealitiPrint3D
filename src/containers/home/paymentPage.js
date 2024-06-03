import React, { useState } from "react";
import axios from "axios";
import QRCode from "react-qr-code";

const PaymentPage = () => {
  const [qrCodeData, setQrCodeData] = useState(null);

  const handlePayment = async () => {
    try {
      // Gửi yêu cầu thanh toán đến API của Momo
      const response = await axios.post("https://momo.api/payment", {
        amount: 100000, // Số tiền cần thanh toán
        merchantCode: "MOMOS97D20240305",
        apiKey: "pK84tYZVkqQJTUM7",
        // Thêm các thông tin khác cần thiết
      });

      // Xử lý phản hồi từ Momo
      const qrCode = response.data.qrCode; // Giả sử phản hồi trả về mã QR code
      setQrCodeData(qrCode);
    } catch (error) {
      console.error("Error processing payment:", error);
    }
  };

  return (
    <div>
      <button onClick={handlePayment}>Pay with Momo</button>
      {qrCodeData && <QRCode value={qrCodeData} />}
    </div>
  );
};

export default PaymentPage;
