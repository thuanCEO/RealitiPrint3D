// EditPages.js
import React, { useState, useRef, useEffect } from "react";
import Header from "@components/common/header/header";
import Footer from "@components/common/footer/footer";
import { ChromePicker } from "react-color";
import Draggable from "react-draggable";
import img1 from "@assets/images/products/R.png";
import IconGrid from "./IconGrid";

export default function EditPages() {
  const [selectedColor, setSelectedColor] = useState("#ffffff");
  const [elements, setElements] = useState([]);
  const [activeSection, setActiveSection] = useState(null);
  const canvasRef = useRef(null);
  const imgRef = useRef(null);
  const [isErasing, setIsErasing] = useState(false);

  const handleToggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const handleAddElement = (type) => {
    setElements([...elements, { type, id: elements.length }]);
  };

  const handleColorChange = (color) => {
    setSelectedColor(color.hex);
  };

  const handleIconSelect = (icon) => {
    setElements([...elements, { type: "icon", id: elements.length, icon }]);
    setActiveSection(null);
  };

  const handleEraserToggle = () => {
    setIsErasing(!isErasing);
  };

  const handleCanvasClick = (e) => {
    if (isErasing) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      elements.forEach((element, index) => {
        if (element.type === "icon") {
          // Check if click is within the bounds of the icon
          // For simplicity, assuming icons are centered at their positions
          if (
            x >= element.x - 20 &&
            x <= element.x + 20 &&
            y >= element.y - 20 &&
            y <= element.y + 20
          ) {
            // Remove the element if clicked within its bounds
            const updatedElements = [...elements];
            updatedElements.splice(index, 1);
            setElements(updatedElements);
          }
        }
      });
    }
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
          <aside className="w-96 bg-gray-800 text-white border-r border-gray-700">
            <div className="p-6">
              <h1 className="text-2xl font-bold text-center text-white">
                Thanh công cụ
              </h1>
            </div>
            <nav className="mt-6">
              <ul>
                <li className="relative p-4 hover:bg-gray-700 cursor-pointer">
                  <div onClick={() => handleToggleSection("color")}>
                    Thanh màu
                  </div>
                  {activeSection === "color" && (
                    <div className="mt-2">
                      <ChromePicker
                        color={selectedColor}
                        onChangeComplete={handleColorChange}
                      />
                    </div>
                  )}
                </li>
                <li className="relative p-4 hover:bg-gray-700 cursor-pointer">
                  <div onClick={() => handleToggleSection("icon")}>
                    Thanh Icon
                  </div>
                  {activeSection === "icon" && (
                    <div className="mt-2">
                      <IconGrid onSelect={handleIconSelect} />
                    </div>
                  )}
                </li>
                <li className="relative p-4 hover:bg-gray-700 cursor-pointer">
                  <div onClick={() => handleToggleSection("image")}>
                    Thanh logo
                  </div>
                  {activeSection === "image" && (
                    <div className="mt-2">
                      <div
                        className="cursor-pointer text-2xl p-2 flex justify-center items-center border border-gray-200 hover:bg-gray-100 rounded"
                        onClick={() => handleAddElement("image")}
                      >
                        Add Logo
                      </div>
                    </div>
                  )}
                </li>
                <li className="relative p-4 hover:bg-gray-700 cursor-pointer">
                  <div onClick={() => handleToggleSection("text")}>
                    Thêm text chữ
                  </div>
                  {activeSection === "text" && (
                    <div className="mt-2">
                      <div
                        className="cursor-pointer text-2xl p-2 flex justify-center items-center border border-gray-200 hover:bg-gray-100 rounded"
                        onClick={() => handleAddElement("text")}
                      >
                        Add Text
                      </div>
                    </div>
                  )}
                </li>
                <li className="relative p-4 hover:bg-gray-700 cursor-pointer">
                  <div onClick={() => handleToggleSection("pattern")}>
                    Thêm họa tiết
                  </div>
                  {activeSection === "pattern" && (
                    <div className="mt-2">
                      <div
                        className="cursor-pointer text-2xl p-2 flex justify-center items-center border border-gray-200 hover:bg-gray-100 rounded"
                        onClick={() => handleAddElement("pattern")}
                      >
                        Add Pattern
                      </div>
                    </div>
                  )}
                </li>
                <li className="relative p-4 hover:bg-gray-700 cursor-pointer">
                  <div onClick={handleEraserToggle}>
                    {isErasing ? "Đang dùng tẩy" : "Dùng tẩy"}
                  </div>
                </li>
              </ul>
            </nav>
          </aside>
          <main
            className="flex-1 p-6 bg-gray-100 flex justify-center items-center"
            onClick={handleCanvasClick}
          >
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
                        <div className="text-4xl">{element.icon}</div>
                      )}
                      {element.type === "image" && (
                        <div>
                          <img
                            src="https://via.placeholder.com/50"
                            alt="placeholder"
                            className="rounded"
                          />
                        </div>
                      )}
                      {element.type === "text" && (
                        <div
                          contentEditable={true}
                          className="border border-gray-400 p-2 bg-white rounded"
                          onBlur={(e) => (e.target.style.border = "none")}
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
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
}
