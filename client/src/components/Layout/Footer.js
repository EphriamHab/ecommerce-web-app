import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4 mt-auto">
      <div className="container text-center">
        <h5>All Rights Reserved &copy; Ephrem</h5>
        <div className="mt-2 d-flex justify-content-center gap-3">
          <Link to="/about" className="text-light text-decoration-none">
            About
          </Link>
          <span className="text-light">|</span>
          <Link to="/contact" className="text-light text-decoration-none">
            Contact
          </Link>
          <span className="text-light">|</span>
          <Link to="/policy" className="text-light text-decoration-none">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
