import { useEffect, useState } from 'react';
import './Admin.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function AllFolders(){
    const[files,setFiles] = useState([]);
    const [drop, setDrop] =useState(false);

    useEffect(()=>{
        axios.get('/foldees').then(response => {
            setFiles(response.data);
        });
    },[]);

    return(
        <div>
            <div>
                <div className="s-titles">
                    <div>
                        <h3>Role</h3>
                    </div>
                    <div>
                        <h3>Name</h3>
                    </div> 
                    <div className="hiddens">
                        <h3>Date</h3>
                    </div>  
                    <div className="hiddens">
                        <h3>ID</h3>
                    </div>   
                </div>
            </div>    
            {files.length > 0 && files.map(fil =>(
                <div className='allfolders'>
                    <div className="customers fiddd">
                                <div className="customer-role">
                                    {fil.form}
                                </div>
                                <div className="customer-name">
                                    <Link to={'/files/'+fil._id}>
                                        {fil.name}
                                    </Link>
                                </div>
                                <div onClick={ev => setDrop((prev) => !prev)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="drop-icon">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                    </svg>
                                </div>
                        </div>
                        <div className={drop === true ? 'active-section' : 'inactive-section'}>
                            <div className="s-title">
                                <div>
                                    <h3>Date</h3>
                                </div>  
                                <div className='snrdz'>
                                    <h3>ID</h3>
                                </div>  
                            </div>
                            <div className ="customers-detail">
                                <div className="customer-email">
                                    {fil.time}
                                </div>
                                <div className="customer-id fidl">
                                    {fil._id}
                                </div>
                            </div>
                        </div>
                </div>      
            ))}
        </div>
    )
}