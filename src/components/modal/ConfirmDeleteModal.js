import React, { Component } from 'react';
import { Modal, Delete, Button } from 'rbx';

export default class ConfirmDeleteModal extends Component {

    onClick = () => {
        this.props.deleteRecipe()
    }

    render() {
        return (
            <Modal active={this.props.active}>
                <Modal.Background onClick={this.props.toggleDeleteModal} />
                <Modal.Card>
                    <Modal.Card.Head>
                        <Modal.Card.Title>Delete Recipe?</Modal.Card.Title>
                        <Delete onClick={this.props.toggleDeleteModal} />
                    </Modal.Card.Head>
                    <Modal.Card.Foot>
                        <Button color="danger" onClick={this.onClick}>Yes</Button>
                        <Button onClick={this.props.toggleDeleteModal}>No</Button>
                    </Modal.Card.Foot>
                </Modal.Card>
            </Modal>
        )
    }
}