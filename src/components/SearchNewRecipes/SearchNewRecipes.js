import React, { Component } from 'react';
import MobileNav from '../nav/MobileNav';

export default class SearchNewRecipes extends Component {
    render() {
        console.log(this.props)
        return (
            <div id="outer-container">
                <MobileNav pageWrapId={"page-wrap"} outerContainerId={ "outer-container"} {...this.props}/>
                <main id="page-wrap">
                    <h1 className="h1">Google for Recipes</h1>
                </main>
            </div>
        )
    }
}