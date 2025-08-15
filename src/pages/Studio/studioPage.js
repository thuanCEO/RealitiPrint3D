import React, { useState, useRef, useEffect } from "react";
import Header from "@components/common/header/header";
import Footer from "@components/common/footer/footer";
import { ChromePicker } from "react-color";
import Draggable from "react-draggable";
import img1 from "@assets/images/products/R.png";
import IconGrid from "./IconGrid";
import "./studioPages.scss";

export default function StudioPages() {
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
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            elements.forEach((element, index) => {
                if (element.type === "icon" && element.x && element.y) {
                    if (
                        x >= element.x - 20 &&
                        x <= element.x + 20 &&
                        y >= element.y - 20 &&
                        y <= element.y + 20
                    ) {
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
            <div className="studio-container">
                <aside className="sidebar">
                    <h1 className="sidebar-title">🎨 Công cụ thiết kế</h1>
                    <ul>
                        <li onClick={() => handleToggleSection("color")}>
                            Thanh màu
                            {activeSection === "color" && (
                                <div className="picker-wrapper">
                                    <ChromePicker
                                        color={selectedColor}
                                        onChangeComplete={handleColorChange}
                                    />
                                </div>
                            )}
                        </li>
                        <li onClick={() => handleToggleSection("icon")}>
                            Thanh icon
                            {activeSection === "icon" && (
                                <IconGrid onSelect={handleIconSelect} />
                            )}
                        </li>
                        <li onClick={() => handleToggleSection("text")}>
                            Thêm text chữ
                            {activeSection === "text" && (
                                <div className="add-btn" onClick={() => handleAddElement("text")}>
                                    Add Text
                                </div>
                            )}
                        </li>
                        <li onClick={() => handleToggleSection("pattern")}>
                            Thêm họa tiết
                            {activeSection === "pattern" && (
                                <div className="add-btn" onClick={() => handleAddElement("pattern")}>
                                    Add Pattern
                                </div>
                            )}
                        </li>
                        <li onClick={handleEraserToggle}>
                            {isErasing ? "Đang dùng tẩy" : "Dùng tẩy"}
                        </li>
                    </ul>
                </aside>

                <main className="canvas-area" onClick={handleCanvasClick}>
                    <h2 className="canvas-title">Thiết Kế Sản Phẩm</h2>
                    <div className="canvas-wrapper">
                        <canvas ref={canvasRef} className="design-canvas" />
                        <img ref={imgRef} src={img1} alt="shirt" className="hidden" />

                        {elements.map((el) => (
                            <Draggable key={el.id}>
                                <div className="draggable-element">
                                    {el.type === "icon" && (
                                        <div className="icon-element">{el.icon}</div>
                                    )}
                                    {el.type === "image" && (
                                        <img src="https://via.placeholder.com/50" className="image-element" />
                                    )}
                                    {el.type === "text" && (
                                        <div contentEditable className="text-element">Editable Text</div>
                                    )}
                                    {el.type === "pattern" && (
                                        <svg className="pattern-element" height="50" width="50">
                                            <circle cx="25" cy="25" r="20" stroke="black" strokeWidth="3" fill="red" />
                                        </svg>
                                    )}
                                </div>
                            </Draggable>
                        ))}
                    </div>
                </main>
            </div>
            <Footer />
        </>
    );
}
