import React, { Component } from 'react';
import { Navbar } from 'rbx';
import './NavBar.css';

export default class NavBar extends Component {
    logout() {
        sessionStorage.clear()
    }
    render() {
        return (
            <Navbar transparent>
                <Navbar.Brand>
                    <Navbar.Item href="https://bulma.io">
                        <img
                            src='../../logo.png'
                            alt="Bulma: a modern CSS framework based on Flexbox"
                            width="112"
                            height="28"
                            id='navLogo__img'
                        />
                    </Navbar.Item>
                    <Navbar.Burger />
                </Navbar.Brand>
                <Navbar.Menu>
                    <Navbar.Segment align="start">
                        <Navbar.Item href="/">Home</Navbar.Item>
                        <Navbar.Divider />
                        <Navbar.Item href="/recipes">View Your Recipes</Navbar.Item>
                        <Navbar.Divider />
                        <Navbar.Item href="/login" onClick={this.logout}>
                            Logout
                        </Navbar.Item>
                    </Navbar.Segment>
                </Navbar.Menu>
            </Navbar>
        )
    }
}