import React from 'react';
import { Link } from 'react-router-dom';

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <Link className="navbar-brand" to="/Books">
        Google Book Search
      </Link>

      <Link className="navbar-brand" to="/Detail">
        Go to Saved Books
      </Link>

      {/* </a> */}
    </nav>
  );
}

export default Nav;
