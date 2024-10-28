import axios from "axios";
import React, { useState } from "react";
import './Login.css';
import { Link, Navigate } from "react-router-dom";

export default function RegisterPage({open,onClose}){
    const [name,setName] = useState('');
    const [surname,setSurname] = useState('');
    const [email,setEmail] = useState('');
    const[location,setLocation] = useState([]);
    const [pass,setPass] = useState('');
    const [redirect,setRedirect] = useState(false);
    const[stats,setStats] = useState('unverified');
    const[role,setRole] = useState('user');
    const[view,setview] = useState('active')
    async function registerUser(ev){
        ev.preventDefault();
        try{
            await axios.post('/register', {
                name,
                surname,
                email,
                location,
                pass,
                stats,
                role,
                view
            });
            alert('Registration Successful');
            window.location.reload(true);
        }
        catch(e){
            alert('Registration Failed');
        }
    }
    if (!open) return null;
    return(
        <div>
            <div className="login-shapes">
                <div className="circle"/>
                <div className="circle"/>
            </div>
            <div  className="overlay">
                <p className="close-btns"  onClick={onClose} > X </p>
                <form onSubmit={registerUser} className="formpg">
                    <h2 className="loginheader2">Register</h2>   
                    <h3 className="hlabel">First Name:</h3>
                        <input type="text" placeholder="Full Name" value={name} onChange={ev => setName(ev.target.value)}/>
                    <h3 className="hlabel">Surname:</h3>
                        <input type="text" placeholder="Full Name" value={surname} onChange={ev => setSurname(ev.target.value)}/>      
                    <h3 className="hlabel">Email:</h3>
                        <input type="email" placeholder="your@email.com" value={email} onChange={ev => setEmail(ev.target.value)}/> 
                    <h3 className="hlabel">Location:</h3>
                        <select value={location} onChange={ev => setLocation(ev.target.value)}>
                            <option></option>
                            <option>Abuja</option>
                            <option>Lagos</option>
                            <option>Port Harcourt</option>
                        </select>   
                    <h3 className="hlabel">Password:</h3>
                        <input type="password" placeholder="password" value={pass} onChange={ev => setPass(ev.target.value)}/>
                        <button className="button b2">Register</button>
                </form>
        </div>
        </div>
    )
}