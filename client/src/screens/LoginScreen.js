import React, { useState } from 'react';
import axios from 'axios'
import { CognitoUser, AuthenticationDetails, CognitoUserPool } from 'amazon-cognito-identity-js';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignIn = () => {
        const authenticationData = {
            Username: email,
            Password: password
        };

        const authenticationDetails = new AuthenticationDetails(authenticationData);

        const poolData = {
            UserPoolId: 'ap-south-1_d7BEerimn',
            ClientId: '7p6pauho2tdu6ijedn5bntnsca'
        };

        const userPool = new CognitoUserPool(poolData);
        const userData = {
            Username: email,
            Pool: userPool
        };

        const cognitoUser = new CognitoUser(userData);

        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: (session) => {
               
                const accessToken = session.getAccessToken().getJwtToken();
                const idToken = session.getIdToken().getJwtToken();
                const refreshToken = session.getRefreshToken().getToken();
                
                sessionStorage.setItem('accessToken', accessToken);
                sessionStorage.setItem('idToken', idToken);
                sessionStorage.setItem('refreshToken', refreshToken);

  
                 

                console.log("User Signed in Successfully");
                window.location.href = '/';


                
               
            },
            onFailure: (error) => {
                console.error('Sign in error', error);
            }
        });
    };

    

    return (
        <div className='container2'>
            <div className='card'>
                <div className='card-header'>
                    <h2>Login</h2>
                    </div>              
            <div className='card-body'>  

            <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleSignIn}>Sign In</button>
            <p>Create an Account <a href="/signup">Register</a></p>
            </div>    
            

            </div>
            
        </div>
    );
};

export default LoginScreen;