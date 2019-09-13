import React, { Component } from 'react';
import NavBar from '../nav/Navbar';
import { Card } from 'rbx';

export default class RecipeDetails extends Component {
    render() {
        return (
            <>
                <NavBar />
                <main className='has-text-centered section'>
                    <h1>Recipe Details</h1>
                    <Card>
                        
                    </Card>
                </main>
            </>
        )
    }
}