import React, { Component } from 'react';
import { Modal, Delete, Button } from 'rbx';

export default class ConfirmDeleteModal extends Component {

    onClick = () => {
        this.props.deleteRecipe()
    }

    render() {
        return (
            <Modal active={this.props.active}>
                <Modal.Background onClick={this.props.toggleModal} />
                <Modal.Card>
                    <Modal.Card.Head>
                        <Modal.Card.Title>Are You Sure?</Modal.Card.Title>
                        <Delete onClick={this.props.toggleModal} />
                    </Modal.Card.Head>
                    <Modal.Card.Foot>
                        <Button color="success" onClick={this.onClick}>Yes</Button>
                        <Button onClick={this.props.toggleModal}>No</Button>
                    </Modal.Card.Foot>
                </Modal.Card>
            </Modal>
        )
    }
}