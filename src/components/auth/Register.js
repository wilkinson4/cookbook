import React, { Component } from 'react'
import UserManager from '../../modules/UserManager';

export default class RegisterForm extends Component {
    state = {
        registerEmail: '',
        registerUsername: '',
        registerPassword: '',
        loadingStatus: false
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
            window.alert('Please fill out all fields')
        } else if(!emailValidation.test(userObj.email)) {
            window.alert("Invalid email format")
        }
        else {
            UserManager.getUserFromSearch("email", userObj.email)
                .then(userArray => {
                    const userIsInDatabase = userArray.length > 0
                    if (userIsInDatabase) {
                        window.alert("An account is already associated with that email.")
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
        return (
            <form className='register__form'>
                <h1 className='registerForm__h1'>Join CookBook</h1>
                <fieldset>
                    <input type='email' id='registerEmail' placeholder='email' value={this.state.registerEmail} onChange={this.handleChange} />
                </fieldset>
                <fieldset>
                    <input type='text' id='registerUsername' placeholder='username' value={this.state.registerUsername} onChange={this.handleChange} />
                </fieldset>
                <fieldset>
                    <input type='password' id='registerPassword' placeholder='password' value={this.state.registerPassword} onChange={this.handleChange} />
                </fieldset>
                <fieldset>
                    <input type='submit' disabled={this.state.loadingStatus} id='registerSubmit__input' value='Register' onClick={this.handleSubmit} />
                </fieldset>
                <fieldset>
                    <p>Already a user?</p>
                </fieldset>
                <fieldset>
                    <input type="submit" onClick={this.redirectToLogin} value="Log In" />
                </fieldset>
            </form>
        )
    }
}