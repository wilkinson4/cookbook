import React, { Component } from 'react';
import MobileNav from '../nav/MobileNav';
import DesktopNav from '../nav/DesktopNav';
import MediaQuery from 'react-responsive';

export default class SearchNewRecipes extends Component {
    render() {
        return (
            <MediaQuery minDeviceWidth={1024} device={{ deviceWidth: 1600 }}>
                <MediaQuery maxDeviceWidth={1024}>
                    <div id="outer-container">
                        <MobileNav pageWrapId={"page-wrap"} outerContainerId={"outer-container"} {...this.props} />
                        <main id="page-wrap">
                            <h1 className="h1">Google for Recipes</h1>
                        </main>
                    </div>
                </MediaQuery>
                <MediaQuery minDeviceWidth={1024}>
                    <DesktopNav />
                    <main id="searchRecipes__main">
                        <h1 className="h1">Google for Recipes</h1>
                    </main>
                </MediaQuery>

            </MediaQuery>
        )
    }
}