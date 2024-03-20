//components/Layout.js
import React from 'react';
import Navbar from './Navbar'; // Ensure the path to your Navbar component is correct

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div>{children}</div>
    </>
  );
};

export default Layout;
