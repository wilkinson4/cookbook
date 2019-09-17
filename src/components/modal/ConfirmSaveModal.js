import React, { Component } from 'react';
import { Modal, Delete, Button } from 'rbx';

export default class ConfirmSaveModal extends Component {

    onClick = () => {
        this.props.saveRecipeNotes()
        .then(this.props.findRecipeToReviewAndEdit)
    }

    render() {
        return (
            <Modal active={this.props.active}>
                <Modal.Background onClick={this.props.toggleSaveRecipeNotesModal} />
                <Modal.Card>
                    <Modal.Card.Head>
                        <Modal.Card.Title>Save Changes?</Modal.Card.Title>
                        <Delete onClick={this.props.toggleSaveRecipeNotesModal} />
                    </Modal.Card.Head>
                    <Modal.Card.Foot>
                        <Button color="success" onClick={this.onClick}>Yes</Button>
                        <Button onClick={this.props.toggleSaveRecipeNotesModal}>No</Button>
                    </Modal.Card.Foot>
                </Modal.Card>
            </Modal>
        )
    }
}