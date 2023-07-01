import React from 'react';
import './NavBar.css';
import {Link, NavLink} from "react-router-dom";

const NavBar = () => {
    return (
        <div className='header d-flex justify-content-around'>
            <Link to='/' className='logo'></Link>
            <nav className="main-nav">
                <ul className='nav-list'>
                    <li><NavLink to="/">Quotes</NavLink></li>
                    <li><NavLink to="/add-quote">Add new quote</NavLink></li>
                </ul>
            </nav>
        </div>
    );
};

export default NavBar;