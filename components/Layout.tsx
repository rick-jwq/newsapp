import React from "react";
import Head from "next/head";
import NavBar from "./Navbar";

type Props = {};

const Layout: React.FC<Props> = ({ children }) => (
  <div>
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <NavBar />
    {children}
  </div>
);

export default Layout;
