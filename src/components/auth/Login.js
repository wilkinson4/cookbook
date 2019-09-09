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
        const userObj = {
            email: this.state.loginEmail,
            password: this.state.loginPassword
        }
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
            </form>
        )
    }
}