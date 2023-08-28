import React from "react";
import Search from "./Search";
import Logo from "./Logo";
import NumResult from "./NumResult";

export default function Header({ children }) {
  return (
    <div>
      <nav className="nav-bar">
        <Logo></Logo>
        {children}
      </nav>
    </div>
  );
}
