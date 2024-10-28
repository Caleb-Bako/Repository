import axios from "axios";
import { useEffect, useState } from "react";
import './Admin.css';
import { Link, useParams } from "react-router-dom";
import RequestFunction from "./RequestFunction";

export default function UserRequest(){
    const[files,setFiles] = useState([]);
    const{id} = useParams();
    const [drop, setDrop] =useState(false);

    useEffect(()=>{
        axios.get('/requests').then(response => {
            setFiles(response.data);
        });
    },[]);

    return(
        <div>
            <div className="s-titles">
                            <div>
                                <h3>Role</h3>
                            </div>
                            <div>
                                <h3>Name</h3>
                            </div>
                            <div>
                                <h3>Email</h3>
                            </div>  
                            <div className="hiddens">
                                <h3>ID</h3>
                            </div>  
                        </div>
            {files.length > 0 && files.map(fil =>(
                <div className="cfunct">
                    <div className="customers">
                                <div className="customer-role">
                                    {fil.role}
                                </div>
                                <div className="customer-name">
                                    {fil.name}
                                </div>
                                <div className="customer-email">
                                    {fil.email}
                                </div>
                                <div onClick={ev => setDrop((prev) => !prev)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="drop-icons">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                        </svg>
                                </div>
                    </div>
                            <div className={drop === true ? 'functs' : 'inactive-section'}>
                                <div className="customer-id">
                                    {fil._id}
                                </div>
                                <div>
                                    <Link to={'/profile/'+fil._id}>
                                        <RequestFunction id={id}/>
                                    </Link>
                                </div>
                            </div>
                </div>

                        ))}
        </div>
    )
}