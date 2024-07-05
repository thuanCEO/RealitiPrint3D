import React from "react";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import "./Card.scss";

export default function Card({ item }) {
  const isOrderFail = item.title === "Total Orders Fail";

  return (
    <div className={`card-item ${isOrderFail ? "order-fail" : ""}`}>
      <p>
        {item.title}
        <div className={`item-chart ${isOrderFail ? "red" : ""}`}>
          <ShowChartIcon />
          {isOrderFail ? "10%" : "10%"}
        </div>
      </p>
      <p>{item.total}</p>
      <p>{item.label}</p>
    </div>
  );
}
