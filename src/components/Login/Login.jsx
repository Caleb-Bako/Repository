import axios from "axios";
import React, { useContext, useState } from "react";
import { UserContext } from "../../../UserContext";
import { Navigate } from "react-router-dom";
import './Login.css';

export default function LoginPage(){
    const [email,setEmail] = useState('');
    const [pass,setPass] = useState('');
    const [redirect,setRedirect] = useState(false);
    const {setUser} = useContext(UserContext);

    async function handleLogin(ev){
        ev.preventDefault();
        try{
            const {data} = await axios.post('/login', {
                email,
                pass,
            });
            setUser(data);
            alert('Login Successful');
            setRedirect(true);
        }
        catch(e){
            alert('Login Failed');
        }
    }
    if(redirect){
        return<Navigate to={'/files'}/>
    }
    return(
        <div>
            <div className="login-shapes">
                <div className="circle"/>
                <div className="circle"/>
            </div>
                <div>
                    <form onSubmit={handleLogin} className="form-container" >
                        <h2 className="loginheader">Login</h2>
                        <div className="input-tag" >
                            <h3 className="input-label">Email:</h3>
                                <input type="email" placeholder="your@email.com" value={email} onChange={ev => setEmail(ev.target.value)}/> 
                            <h3 className="input-label">Password:</h3>
                                <input type="password" placeholder="password" value={pass} onChange={ev => setPass(ev.target.value)}/>
                        </div>
                        <div>
                            <button className="button bl">Login</button>
                        </div>    
                        </form>
            </div>
       
        </div>
       
    )
}