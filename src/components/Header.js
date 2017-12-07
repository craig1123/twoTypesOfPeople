import React from 'react';
import Link from 'react-router-dom/Link';

const Header = ({ user, login, logout }) => (
  <header>
    <Link to="/"><h1>Two Types of People</h1></Link>
    {user ?
      <div className="user-profile">
        <div>
          <img alt="user__profile" src={user.photoURL} />
          {/* <p>{user.displayName || user.email}</p> */}
        </div>
        <button onClick={logout}>Log Out</button>
      </div>
      :
      <div className="">
        <button onClick={login}>Log In</button>
      </div>
    }
  </header>
);

export default Header;
