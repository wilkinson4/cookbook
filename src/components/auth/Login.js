import React, { Component } from 'react';
import UserManager from '../../modules/UserManager';
import { Input, Button, Message, Field, Control, Icon } from 'rbx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import './Login.css'

export default class LoginForm extends Component {
    state = {
        loginEmail: '',
        loginPassword: '',
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
            email: this.state.loginEmail,
            password: this.state.loginPassword
        }
        if (this.state.loginEmail.length === 0 || this.state.loginPassword.length === 0) {
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
                        const existingUserObj = userArray[0]
                        const passwordMatches = existingUserObj.password === userObj.password
                        if (passwordMatches) {
                            sessionStorage.setItem("activeUser", existingUserObj.id)
                            this.props.history.push("/")
                        } else {
                            this.setState({
                                displayError: 'block',
                                errorMessage: "Incorrect email/password. Please try again."
                            })
                        }
                    }
                })
        }
    }

    redirectToRegister = (event) => {
        event.preventDefault()
        this.props.history.push("/register")
    }

    render() {
        const displayErrorMessage = {
            display: this.state.displayError
        }
        return (
            <div className='loginRegister__container'>
                <Message className='message__container' color="danger" style={displayErrorMessage}>
                    <Message.Header>
                        <p>Error</p>
                    </Message.Header>
                    <Message.Body>
                        <p>{this.state.errorMessage}</p>
                    </Message.Body>
                </Message>
                <form className='login__form section'>
                    <Field kind='group' align='centered'>
                        <h1 className='loginForm__h1 is-size-3-mobile'>What's Cooking?</h1>
                    </Field>
                    <Field>
                        <Control iconLeft>
                            <Input type='email' id='loginEmail' placeholder='Email' value={this.state.loginEmail} onChange={this.handleChange} />
                            <Icon size="small" align="left">
                                <FontAwesomeIcon icon={faEnvelope} />
                            </Icon>
                        </Control>
                    </Field>
                    <Field>
                        <Control iconLeft>
                            <Input type='password' id='loginPassword' placeholder='Password' value={this.state.loginPassword} onChange={this.handleChange} />
                            <Icon size="small" align="left">
                                <FontAwesomeIcon icon={faLock} />
                            </Icon>
                        </Control>
                    </Field>
                    <Field kind='group' align='centered'>
                        <Control>
                            <Button color='danger' disabled={this.state.loadingStatus} id='loginSubmit__button' onClick={this.handleSubmit}>Login</Button>
                        </Control>
                    </Field>
                    <Field kind='group' align='centered'>
                        <Control>
                            <p className='loginRegister__p'>or</p>
                        </Control>
                    </Field>
                    <Field kind='group' align='centered'>
                        <Control>
                            <Button onClick={this.redirectToRegister}>Sign Up</Button>
                        </Control>
                    </Field>
                </form>
            </div>
        )
    }
}