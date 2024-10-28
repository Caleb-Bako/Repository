import { useContext } from "react";
import { UserContext } from "../../../../UserContext";
import { Link, NavLink } from "react-router-dom";
import './NavBar.css';
export default function NavBar(){
    const {user} = useContext(UserContext);
    return(
        <div className="navstrc">
            <div>
                <Link to={'/files'}><h1 className="logo">HOME</h1></Link>
            </div>
            <div>
                <NavLink to={user?'/profile':'/'}>
                        {!!user && (
                            <div className="navbar">
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="profile-pic">
                                        <path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clip-rule="evenodd" />
                                    </svg>
                                </div>
                                <div className="user-name">
                                    {user.name}
                                </div>
                            </div>
                        )}
                        {!user && (
                            <div className="navbar">
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="profile-pic">
                                        <path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clip-rule="evenodd" />
                                    </svg>
                                </div>
                                <div className="user-name">
                                    Login
                                </div>
                        </div>
                        )}
                </NavLink>  
            </div>

            </div>
            
    )
}