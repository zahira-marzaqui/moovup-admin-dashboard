import React from "react";
import Icon from "./Icon";

export default function KPI({ label, value, trend = 0, icon = "arrow-up" }) {
  const isDown = trend < 0;
  return (
    <div
      className="card"
      style={{
        display: "flex",
        gap: 12,
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div>
        <div className="muted" style={{ marginBottom: 6 }}>
          {label}
        </div>
        <div className="kpi-value">{value}</div>
      </div>
      <div className="row" style={{ gap: 8 }}>
        <span className={["kpi-trend", isDown ? "down" : ""].join(" ")}>
          {isDown ? "" : "+"}
          {trend}%
        </span>
        <Icon
          name={isDown ? "arrow-down" : "arrow-up"}
          size={18}
          color={isDown ? "#ef4444" : "#22c55e"}
        />
      </div>
    </div>
  );
}
