import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <nav>
        <Link to="/home">Home</Link>
        <Link to="/manager">Manager</Link>
      </nav>
    </header>
  );
};

export default Header;
