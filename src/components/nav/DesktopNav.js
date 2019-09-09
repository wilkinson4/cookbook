import React, { Component } from 'react';
import './DesktopNav.css'

export default class DesktopNav extends Component {
    logout() {
        sessionStorage.clear()
    }
    render() {
        return (
            <header>
                <nav className="desktop__nav">
                    <ul>
                        <li className="desktopNavItem__li">
                            <a id="home" className="menu-item" href="/">Home</a>
                        </li>
                        <li className="desktopNavItem__li">
                            <a id="about" className="menu-item" href="/about">About</a>
                        </li>
                        <li className="desktopNavItem__li">
                            <a id="contact" className="menu-item" href="/contact">Contact</a>
                        </li>
                        <li className="desktopNavItem__li">
                            <a id="logout" className="menu-item" href="/login" onClick={this.logout}>Logout</a>
                        </li>
                    </ul>
                </nav>
            </header>


        )
    }
}
