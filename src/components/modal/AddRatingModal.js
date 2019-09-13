import React, { Component } from 'react';
import { Modal, Delete, Button, Content, Icon } from 'rbx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as faStarOutline } from '@fortawesome/free-regular-svg-icons'
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons'

export default class AddRatingModal extends Component {
    render() {
        return (
            <Modal active={this.props.active}>
                <Modal.Background onClick={this.props.toggleModal} />
                <Modal.Card>
                    <Modal.Card.Head>
                        <Modal.Card.Title>Add a rating</Modal.Card.Title>
                        <Delete onClick={this.props.toggleModal} />
                    </Modal.Card.Head>
                    <Modal.Card.Body>
                        <Content>
                            <p>Rating Content</p>
                            <Icon>
                                <FontAwesomeIcon icon={faStarOutline} />
                                <FontAwesomeIcon icon={faStarSolid} />
                            </Icon>
                        </Content>
                    </Modal.Card.Body>
                    <Modal.Card.Foot>
                        <Button color="success" onClick={this.onClick}>Save</Button>
                        <Button onClick={this.props.toggleModal}>Cancel</Button>
                    </Modal.Card.Foot>
                </Modal.Card>
            </Modal>
        )
    }
}