import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Icon } from 'rbx';

export default class Tag extends Component {
    render() {
        return (
            <>
                <p className='tagName__p'>
                    {this.props.recipeTag.name}
                    <Icon>
                        <FontAwesomeIcon icon={faTimes} size='xs' />
                    </Icon>
                </p>
            </>
        )
    }
}