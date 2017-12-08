import React from 'react';
import Link from 'react-router-dom/Link';

const Header = ({ user, login, logout }) => (
  <header>
    <Link to="/"><h1 id="title">Two Types of People</h1></Link>
    {user ?
      <div className="user-profile">
        <div>
          <img alt="user__profile" src={user.photoURL} />
          {/* <p>{user.displayName || user.email}</p> */}
        </div>
        <div>
          <button className="log-button" onClick={logout}>Log Out</button>
        </div>
      </div>
      :
      <div>
        <button className="log-button" onClick={login}>Log In</button>
      </div>
    }
  </header>
);

export default Header;
