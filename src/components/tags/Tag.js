import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Icon } from 'rbx';
import './Tags.css'


export default class Tag extends Component {
    
    handleDelete = () => {
        const tagRelationship = this.props.tagRelationships.find(tagRelationship => tagRelationship.tagId === this.props.recipeTag.id)
        this.props.deleteTag(tagRelationship.id)
    }

    render() {
        return (
            <>
                <p className='tagName__p'>
                    {this.props.recipeTag.name}
                    <Icon onClick={this.handleDelete}>
                        <FontAwesomeIcon icon={faTimes} size='xs'/>
                    </Icon>
                </p>
            </>
        )
    }
}