import React, { Component } from 'react';
import { slide as Menu } from 'react-burger-menu';
import './MobileNav.css'

export default class MobileNav extends Component {
    logout() {
        sessionStorage.clear()
    }
    render() {
        return (
            <Menu>
                <a id="home" className="menu-item" href="/">Home</a>
                <a id="about" className="menu-item" href="/about">About</a>
                <a id="contact" className="menu-item" href="/contact">Contact</a>
                <a id="logout" className="menu-item"  href="/login" onClick={this.logout}>Logout</a>
            </Menu>
        )
    }
}
