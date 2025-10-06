import React from "react";
import Icon from "./Icon";
import Button from "./Button";

export default function Topbar() {
  return (
    <header className="topbar">
      <div className="row" style={{ gap: 10 }}>
        <Button className="ghost" aria-label="Menu">
          <Icon name="menu" />
        </Button>
        <div className="row" style={{ gap: 8 }}>
          <Icon name="search" />
          <input
            className="input"
            placeholder="Rechercher..."
            style={{ width: 260 }}
          />
        </div>
      </div>
      <div className="row" style={{ gap: 12 }}>
        <Button className="ghost" aria-label="Notifications">
          <Icon name="bell" />
        </Button>
        <div className="pill hide-md">Pro</div>
        <div className="row" style={{ gap: 8 }}>
          <Icon name="user" />
          <span className="hide-md">Me</span>
        </div>
      </div>
    </header>
  );
}
