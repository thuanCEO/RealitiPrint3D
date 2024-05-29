import React, { useState, useRef, useEffect } from "react";
import Header from "../../components/Common/header/header";
import Footer from "../../components/Common/footer/footer";
import { ChromePicker } from "react-color";
import Draggable from "react-draggable";
import img1 from "../../assets/images/products/R.png";

export default function EditPages() {
  const [selectedColor, setSelectedColor] = useState("#ffffff");
  const [elements, setElements] = useState([]);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const canvasRef = useRef(null);
  const imgRef = useRef(null);

  const handleAddElement = (type) => {
    if (type === "color") {
      setShowColorPicker(true);
    } else {
      setElements([...elements, { type, id: elements.length }]);
    }
  };

  const handleColorChange = (color) => {
    setSelectedColor(color.hex);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = imgRef.current;

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
    };

    if (img.complete) {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = imgRef.current;

    ctx.drawImage(img, 0, 0);
    ctx.globalCompositeOperation = "source-in";
    ctx.fillStyle = selectedColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = "source-over";
  }, [selectedColor]);

  return (
    <>
      <Header />
      <div className="flex flex-col min-h-screen">
        <div className="flex flex-1">
          <aside className="w-64 bg-gray-800 text-white border-r border-gray-700">
            <div className="p-6">
              <h1 className="text-2xl font-bold text-center text-white">
                Thanh công cụ
              </h1>
            </div>
            <nav className="mt-6">
              <ul>
                <li className="p-4 hover:bg-gray-700 cursor-pointer">
                  <div onClick={() => handleAddElement("color")}>Thanh màu</div>
                </li>
                <li className="p-4 hover:bg-gray-700 cursor-pointer">
                  <div onClick={() => handleAddElement("icon")}>Thanh Icon</div>
                </li>
                <li className="p-4 hover:bg-gray-700 cursor-pointer">
                  <div onClick={() => handleAddElement("image")}>
                    Thanh logo
                  </div>
                </li>
                <li className="p-4 hover:bg-gray-700 cursor-pointer">
                  <div onClick={() => handleAddElement("text")}>
                    Thêm text chữ
                  </div>
                </li>
                <li className="p-4 hover:bg-gray-700 cursor-pointer">
                  <div onClick={() => handleAddElement("pattern")}>
                    Thêm họa tiết
                  </div>
                </li>
              </ul>
            </nav>
          </aside>
          <main className="flex-1 p-6 bg-gray-100 flex justify-center items-center">
            <div className="p-6 bg-white rounded shadow-md w-full h-full flex flex-col items-center">
              <h2 className="text-2xl font-bold text-center mb-6">
                Thiết Kế Sản Phẩm
              </h2>
              <div
                className="border border-gray-300 rounded p-4 relative"
                style={{ width: "600px", height: "600px" }}
              >
                <canvas ref={canvasRef} className="w-full h-full" />
                <img ref={imgRef} src={img1} alt="shirt" className="hidden" />
                {elements.map((element) => (
                  <Draggable key={element.id}>
                    <div className="absolute m-2">
                      {element.type === "icon" && (
                        <div>
                          <span role="img" aria-label="icon">
                            🌟
                          </span>
                        </div>
                      )}
                      {element.type === "image" && (
                        <div>
                          <img
                            src="https://via.placeholder.com/50"
                            alt="placeholder"
                          />
                        </div>
                      )}
                      {element.type === "text" && (
                        <div
                          contentEditable={true}
                          className="border p-2 bg-white"
                        >
                          Editable Text
                        </div>
                      )}
                      {element.type === "pattern" && (
                        <div>
                          <svg height="50" width="50">
                            <circle
                              cx="25"
                              cy="25"
                              r="20"
                              stroke="black"
                              strokeWidth="3"
                              fill="red"
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                  </Draggable>
                ))}
              </div>
              {showColorPicker && (
                <div className="mt-4">
                  <ChromePicker
                    color={selectedColor}
                    onChangeComplete={handleColorChange}
                  />
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
}
