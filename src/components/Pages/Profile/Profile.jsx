import { useContext, useEffect, useState } from "react"
import axios from "axios";
import { Link, Navigate, useParams } from "react-router-dom";
import { UserContext } from "../../../../UserContext";
import SuperAdminPage from "../Admin/SuperAdmin";
import NavBar from "../NavBar/NavBar";
import './Profile.css';
import AddFile from "./AddFile";
import SharedFile from "../../ShareFile/SharedFile";
import RegisterPage from "../../Login/Register";
import Delete from "../Admin/Delete";

export default function Profile(){
    const[redirect,setRedirect] = useState(null);
    const {ready,user,setUser} = useContext(UserContext);
    const [customers,setCustomers] = useState('');
    const [open,onClose] = useState(false);
    const [toggle, setToggle] =useState(false);
    const{id} = useParams();


    let {subpage} = useParams();
    if(subpage === undefined){
        subpage = 'admin-page';
     }
    useEffect(()=>{
        axios.get('/admins').then(({data}) =>{
            setCustomers(data);
        });
    },[]);

    async function logout(){
        await axios.post('/logout');
        setRedirect('/');
        setUser(null);
    }

    if(!ready){
        return 'Loading...';
    }
    if(!customers){
        return 'Loading...';
    }

    if(ready && !user && !redirect){
        return <Navigate to={'/'}/>
    }

    if(redirect){
        return <Navigate to={redirect}/>
    }

    return(
        <div>
            <RegisterPage open={open} onClose={() => onClose(false)}/>
            <div className="profile-page">
                <div className="view-sec">
                    {/* <div className={toggle === true ? 'active-left-tab' : 'left-sec'}>
                        <div className="profile">
                            <div onClick={ev => setToggle((prev) => !prev)}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"  className={toggle === true ? 'profile-piczz' : 'small-profile-piczz'}>
                                    <path fill-rule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clip-rule="evenodd" />
                                </svg>
                            </div>

                            <div className={toggle === true ? 'active-p-section' : 'p-section'}>
                                <div className="profile-name">
                                        <h2>{user.name}</h2>
                                    </div>
                                    <div className="profile-email">
                                        {user.email}
                                    </div>
                                    <div>
                                        <button className="button accs" onClick={logout}>Logout</button>
                                    </div>
                                    <div className="delete-btn">
                                        {customers.role.includes("user")&&(
                                            <Link to={'/profile/'+ customers._id}>
                                                <Delete id={id}/>
                                            </Link>
                                        )}
                                    </div>
                            </div>

                        </div>
                    </div> */}
                    <div className="right-sec">
                        {customers.role.includes("user")&&(
                            <div>
                                <div className="adfil">
                                    <div>
                                        <h2>Shared Files</h2>
                                    </div>
                                    <div>
                                        <AddFile/>
                                    </div>
                                </div>
                                <div>
                                    <SharedFile/>
                                </div>
                                
                            </div>
                        )}
                        {customers.role.includes("admin")&&(
                            <div>
                                <SuperAdminPage open={open} onClose={onClose}/>
                            </div>
                        )}      
                    </div>
                </div>
               
            </div>
        </div>
    )
}