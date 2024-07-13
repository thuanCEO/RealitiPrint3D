import React, { useState, useEffect } from "react";
import "./RunningNotification.scss";

const messages = [
  "Sale giá sốc, cùng săn áo với Reality! Giảm giá tất cả loại áo trong mùa hè!",
];

const RunningNotification = ({ duration }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, duration);

    return () => clearInterval(interval);
  }, [duration]);

  return (
    <div className="running-notification">
      <span className="notification-text">{messages[index]}</span>
    </div>
  );
};

export default RunningNotification;
