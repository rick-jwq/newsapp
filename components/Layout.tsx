import React from "react";
import NavBar from "./Navbar";

type Props = {};

const Layout: React.FC<Props> = ({ children }) => (
  <div>
    <NavBar />
    {children}
  </div>
);

export default Layout;
