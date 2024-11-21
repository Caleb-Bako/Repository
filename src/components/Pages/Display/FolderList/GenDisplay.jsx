import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './GenDisplay.css';
import NavBar from "../../NavBar/NavBar";

export default function GenDisplay(){
    const[files,setFiles] = useState([]);
    const[query,setQuery] = useState('');
    useEffect(()=>{
        axios.get('/services').then(response => {
            setFiles(response.data);
        });
    },[]);
    return(
        <div className="main-body">
                <div className="main">
                    <h1>FileBarn</h1>
                    <div className="single-doc">
                        <input type="text" placeholder="Search" value={query} onChange={ev => setQuery(ev.target.value)}/> 
                        <div className="folder-titlez">
                            <div className="headings">
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="hpics">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776" />
                                    </svg>
                                </div>
                                <div>Folder</div>
                            </div>
                            <div className="headings">
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="hpics">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                                    </svg>
                                </div>
                                <div>Date</div>
                            </div>
                            
                        </div>
                        
                        {files.length > 0 && files.filter(fil => fil.name.toLowerCase().includes(query.toLowerCase())).map(fil =>(
                            <Link to={'/files/'+fil._id}>
                                <div className="single-file-body">
                                   <div className="folder-details">
                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="folder-pic">
                                                <path d="M19.5 21a3 3 0 003-3v-4.5a3 3 0 00-3-3h-15a3 3 0 00-3 3V18a3 3 0 003 3h15zM1.5 10.146V6a3 3 0 013-3h5.379a2.25 2.25 0 011.59.659l2.122 2.121c.14.141.331.22.53.22H19.5a3 3 0 013 3v1.146A4.483 4.483 0 0019.5 9h-15a4.483 4.483 0 00-3 1.146z" />
                                            </svg>
                                        </div>
                                        <div className="file-name">
                                            {fil.name}
                                        </div>
                                    </div> 
                                    <div className="file-date">
                                        {fil.time}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
           
        </div>
    )
}