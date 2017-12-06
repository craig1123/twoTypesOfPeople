import React from 'react';

const Header = ({ user, login, logout }) => (
    <header>
        <h1>Two Types of People</h1>
        {this.props.user ?
            <div className="">
                <div className='user-profile'>
                    <p>{this.props.user.displayName || this.props.user.email}</p>
                    <img src={this.props.user.photoURL} />
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
