import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import Link from "next/Link";

const NavBar: React.FC = () => (
  <>
    <Navbar variant="dark" className="nav">
      <Nav className="mr-auto">
        <Link href="/" passHref>
          <Nav.Link>Home</Nav.Link>
        </Link>
        <Link href="/world" passHref>
          <Nav.Link>World</Nav.Link>
        </Link>
        <Link href="/politics" passHref>
          <Nav.Link>Politics</Nav.Link>
        </Link>
        <Link href="/business" passHref>
          <Nav.Link>Business</Nav.Link>
        </Link>
        <Link href="/technology" passHref>
          <Nav.Link>Technology</Nav.Link>
        </Link>
        <Link href="/sports" passHref>
          <Nav.Link>Sports</Nav.Link>
        </Link>
      </Nav>
    </Navbar>
  </>
);

export default NavBar;
