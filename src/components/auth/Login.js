import React, { Component } from 'react'
import UserManager from '../../modules/UserManager';

export default class LoginForm extends Component {
    state = {
        loginEmail: '',
        loginPassword: '',
        loadingStatus: false
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
            window.alert('Please fill out all fields')
        } else if (!emailValidation.test(userObj.email)) {
            window.alert("Invalid email format")
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
                        }
                    } else {
                        const userConfirmation = window.confirm("Username/password not found. Click \"OK\" to register as new user. Click \"Cancel\" to try again.")
                        if (userConfirmation) {
                            this.props.history.push("/register")
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
        return (
            <form className='login__form'>
                <h1 className='loginForm__h1'>CookBook</h1>
                <fieldset>
                    <input type='email' id='loginEmail' placeholder='email' value={this.state.loginEmail} onChange={this.handleChange} />
                </fieldset>
                <fieldset>
                    <input type='password' id='loginPassword' placeholder='password' value={this.state.loginPassword} onChange={this.handleChange} />
                </fieldset>
                <fieldset>
                    <input type='submit' disabled={this.state.loadingStatus} id='loginSubmit__input' value='Login' onClick={this.handleSubmit} />
                </fieldset>
                <fieldset>
                    <p>or</p>
                </fieldset>
                <fieldset>
                    <input type="submit" onClick={this.redirectToRegister} value="Sign Up" />
                </fieldset>
            </form>
        )
    }
}