import "./Header.css";
import React from "react";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="header">
      <h1 onClick={() => navigate("/")}>
        <span class="big-cap">T</span>he <span class="big-cap">F</span>amily <span class="big-cap">J</span>ournal
      </h1>
    </div>
  );
};
