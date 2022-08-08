import React, { ChangeEvent, useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import AuthService from "../services/auth-service";
import UserModel from '../models/user';

function Login() {
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate() // alias
    
    useEffect(() => {
        document.title = "Login";
    });
    
    function onChangeUsername(event: ChangeEvent<HTMLInputElement>) {
        setUsername(event.target.value);
    }
    
    function onChangePassword(event: ChangeEvent<HTMLInputElement>) {
        setPassword(event.target.value);
    }
    
    function handleMessage() {
        if (message.length > 0) {
            return(
            <div id="messageArea" className="alert alert-danger">
                { message }
            </div>  
            );
        }
    }
    
    function handleLogin(event: any) {
        event.preventDefault();
        
        // Instatiate an object of type UserModel
        const UserData: UserModel = {
            username: username,
            password: password,
            FirstName: "",
            LastName: "",
            EmailAddress: ""
        }
        
        // use the auth service to perform login
        AuthService.login(UserData.username, UserData.password)
        .then((data) => {
            if (data.success) {
                navigate('/movie-list');
                window.location.reload();
            } else {
                setMessage(data.message);
                clearForm(null);
            }
            
        }, error => {
            setMessage("Server Error");
            window.location.reload();   
        });
    }
    
    function clearForm(event: any) {
        setUsername('');
        setPassword('');
    }
    
    function handleReset(event: any) {
        clearForm(event);
        setMessage('');
    }
    
    return (
    <div className="container">
        <div className="row">
            <div className="offset-md-3 col-md-6 col-sm-12">
                <div className="login" id="contentArea">
                    <h1 className="display-4">Login</h1>
                    
                    { handleMessage() }
                    
                    <form onSubmit={ handleLogin } onReset = { handleReset } id="loginForm" noValidate>
                        <div className="form-group mb-2">
                            <div className="input-group">
                                <span className="input-group-addon">
                                <i className="fa fa-user">
                                </i>
                                </span>
                                <input type="text" className="form-control" id="username" name="username" required
                                value={ username } 
                                onChange = { onChangeUsername } 
                                placeholder="Enter your username"/>
                            </div>
                        </div>
        
                        <div className="form-group mb-2">
                        <div className="input-group">
                            <span className="input-group-addon">
                            <i className="fa fa-lock">
                            </i>
                            </span>
                            <input type="password" className="form-control" id="password" name="password" required
                            value = {password}
                            onChange = { onChangePassword }
                            placeholder="Enter your password"/>
                        </div>
                        
                        </div>                                        
                        <div className="text-end">
                        <button id="loginButton" type="submit" className="btn btn-primary btn-lg">
                            <i className="fas fa-sign-in-alt"></i> Login</button>
                            <button id="cancelButton" type="reset" className="btn btn-warning btn-lg">
                            <i className="fas fa-undo"></i> Cancel</button>
                        </div>
                    </form>
                </div>
                <p className="text-center text-muted small">
                    Don't have an account? 
                    <Link className="link" to={'/register'}>Register Here!</Link>
                </p>
            </div>
        </div>
    </div>);
}

export default Login;