import React, { useState } from "react";
import "./searchBar.scss";

export default function SearchBar({ onSearch }) {
    const [keyword, setKeyword] = useState("");

    const handleChange = (e) => {
        setKeyword(e.target.value);
    };

    const handleSearch = () => {
        if (onSearch) {
            onSearch(keyword.trim());
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                value={keyword}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
            />
            <button onClick={handleSearch}>🔍</button>
        </div>
    );
};


