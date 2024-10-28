import axios from "axios";
import { useEffect, useState } from "react";
import './Admin.css';
import { Link, useParams } from "react-router-dom";
import Role from "./Role";
import Delete from "./Delete";
import UserRequest from "./Request";
import AddFile from "../Profile/AddFile";
import AllFolders from "./AllFolders";
import AdminShare from "../../ShareFile/AdminShare";


export default function SuperAdminPage({open,onClose}){
    const{id} = useParams();
    const[files,setFiles] = useState([]);
    const [toggle, setToggle] =useState(1);
    const [drop, setDrop] =useState(false);

    function updateToggle(id){
        setToggle(id)
    }

    useEffect(()=>{
        axios.get('/users').then(response => {
            setFiles(response.data);
        });
    },[]);


    return(
        <div className="admin-bg">
            <div>
                <div className="top-section">
                    <div>
                        <h2>Welcome Super Admin</h2>
                    </div>
                    <div>
                        <AddFile/>
                    </div>
                </div>
                <div className='tab-heading'>
                        <ul className='tab-list'>
                            <li onClick={()=> updateToggle(1)} className={toggle === 1 ? 'active-title' : 'tab-title'}>
                                Users
                            </li>
                            <li onClick={()=> updateToggle(2)} className={toggle === 2 ? 'active-title' : 'tab-title'}>
                                Requests
                            </li>
                            <li onClick={()=> updateToggle(3)} className={toggle === 3 ? 'active-title' : 'tab-title'}>
                                Folders
                            </li>
                            <li onClick={()=> updateToggle(4)} className={toggle === 4 ? 'active-title' : 'tab-title'}>
                                Shared
                            </li>
                            <li onClick={()=> updateToggle(5)} className={toggle === 5 ? 'active-title' : 'tab-title'}>
                                Register
                            </li>
                        </ul>
                    </div>
                    <div className={toggle === 1 ? 'show-content' : 'tab-content'}>
                        <div className="s-titles">
                            <div>
                                <h3>Name</h3>
                            </div>
                            <div>
                                <h3>Email</h3>
                            </div>
                            <div className="vanish">
                                <h3>Role</h3>
                            </div>
                            <div className="vanish">
                                <h3>ID</h3>
                            </div>    
                        </div>
                        {files.length > 0 && files.map(fil =>(
                            <div className="cuss">
                                <div className="customers">
                                    <div className="customer-named">
                                        {fil.name}
                                    </div>
                                    <div className="customer-emaild">

                                        {fil.email}
                                    </div>
                                    <div onClick={ev => setDrop((prev) => !prev)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="drop-icon">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                        </svg>
                                    </div>
                                </div>
                                <div  className={drop === true ? 'active-section' : 'inactive-section'}>
                                    <div className="s-titlez">
                                        <div>
                                            <h3>Role</h3>
                                        </div>
                                        <div>
                                            <h3>ID</h3>
                                        </div>  
                                    </div>
                                    <div className="selct">
                                        <div className="customers-details">
                                            <div className="customer-roled">
                                                {fil.role}
                                            </div>
                                            <div className="customer-ids">
                                                {fil._id}
                                            </div>
                                        </div>
                                        <div className="customer-rolez">
                                            <div>
                                                <Link to={'/profile/'+fil._id}>
                                                    <Role id={id}/>
                                                </Link>    
                                            </div>
                                            <div>
                                                <Link to={'/profile/'+fil._id}> 
                                                    <Delete id={id}/>
                                                </Link>
                                            </div>   
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className={toggle === 2 ? 'show-content' : 'tab-content'}>
                        <UserRequest/>
                    </div>
                    <div className={toggle === 3 ? 'show-content' : 'tab-content'}>
                       <AllFolders/>
                    </div>
                    <div className={toggle === 4 ? 'show-content' : 'tab-content'}>
                       <AdminShare/>
                    </div>
                    <div className={toggle === 5 ? 'show-content' : 'tab-content'}>
                        <button className="sadmin" onClick={ev => onClose(true)}>Register</button>
                    </div>
            </div>
        </div>
    )
}