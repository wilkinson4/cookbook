import React, { Component } from 'react'
import UserManager from '../../modules/UserManager';
import { Input, Button, Message } from 'rbx'

export default class RegisterForm extends Component {
    state = {
        registerEmail: '',
        registerUsername: '',
        registerPassword: '',
        loadingStatus: false,
        displayError: 'none',
        errorMessage: '',
    }

    handleChange = (event) => {
        this.setState({ [event.target.id]: event.target.value })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        const emailValidation = /^(([^<>()[\]\\.,;:\s@\\"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        const userObj = {
            email: this.state.registerEmail,
            username: this.state.registerUsername,
            password: this.state.registerPassword
        }
        if (this.state.registerUsername.length === 0 || this.state.registerEmail.length === 0 || this.state.registerPassword.length === 0) {
            this.setState({
                displayError: 'block',
                errorMessage: "Please fill out all fields."
            })
        } else if (!emailValidation.test(userObj.email)) {
            this.setState({
                displayError: 'block',
                errorMessage: "Invalid email format."
            })
        }
        else {
            UserManager.getUserFromSearch("email", userObj.email)
                .then(userArray => {
                    const userIsInDatabase = userArray.length > 0
                    if (userIsInDatabase) {
                        this.setState({
                            displayError: 'block',
                            errorMessage: "An account is already associated with that email."
                        })
                    } else {
                        UserManager.addUser(userObj)
                            .then(newUser => {
                                sessionStorage.setItem("activeUser", newUser.id)
                                this.props.history.push("/")
                            })
                    }
                })
        }
    }

    redirectToLogin = (event) => {
        event.preventDefault()
        this.props.history.push("/login")
    }

    render() {
        const displayErrorMessage = {
            display: this.state.displayError
        }
        return (
            <div className='loginRegister__container'>
                <Message className='message__container'color="danger" style={displayErrorMessage}>
                    <Message.Header>
                        <p>Error</p>
                    </Message.Header>
                    <Message.Body>
                        <p>{this.state.errorMessage}</p>
                    </Message.Body>
                </Message>
                <form className='register__form section has-text-centered'>
                    <h1 className='loginForm__h1 is-size-3-mobile'>Join What's Cooking</h1>
                    <fieldset className='field'>
                        <Input type='email' id='registerEmail' placeholder='email' value={this.state.registerEmail} onChange={this.handleChange} />
                    </fieldset>
                    <fieldset className='field'>
                        <Input type='text' id='registerUsername' placeholder='username' value={this.state.registerUsername} onChange={this.handleChange} />
                    </fieldset>
                    <fieldset className='field'>
                        <Input type='password' id='registerPassword' placeholder='password' value={this.state.registerPassword} onChange={this.handleChange} />
                    </fieldset>
                    <fieldset className='field'>
                        <Button disabled={this.state.loadingStatus} id='registerSubmit__button' onClick={this.handleSubmit}>Register</Button>
                    </fieldset>
                    <fieldset className='field'>
                        <p className='loginRegister__p'>Already a user?</p>
                    </fieldset>
                    <fieldset className='field'>
                        <Button onClick={this.redirectToLogin}>Login</Button>
                    </fieldset>
                </form>
            </div>
        )
    }
}