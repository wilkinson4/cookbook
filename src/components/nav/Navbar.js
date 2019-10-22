import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
                    <Navbar.Item as='div'>
                        <Link to='/'>
                            <img
                                src='../../logo.png'
                                alt="Bulma: a modern CSS framework based on Flexbox"
                                width="112"
                                height="28"
                                id='navLogo__img'
                            />
                        </Link>
                    </Navbar.Item>
                    <Navbar.Burger />
                </Navbar.Brand>
                <Navbar.Menu>
                    <Navbar.Segment align="start">
                        <Navbar.Item as='div'>
                            <Link to='/'>
                                Home
                            </Link>
                        </Navbar.Item>
                        <Navbar.Divider />
                        <Navbar.Item as='div'>
                            <Link to='/recipes'>
                                View Your Recipes
                            </Link>
                        </Navbar.Item>
                        <Navbar.Divider />
                        <Navbar.Item as='div' onClick={this.logout}>
                            <Link to='/login'>
                                Logout
                            </Link>
                        </Navbar.Item>
                    </Navbar.Segment>
                </Navbar.Menu>
            </Navbar>
        )
    }
}