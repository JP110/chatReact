import React from 'react';
import "./Header.css";
const Header = ({ title }) => {
  return (
    <div className="app_header">
          {title}
    </div>
  );
};

export default Header;