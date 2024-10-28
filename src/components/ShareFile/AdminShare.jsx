import axios from "axios";
import { useEffect, useState } from "react";
import './ShareFile.css';
import AdminSharedFile from "./AdminSharedFile";
import { Link } from "react-router-dom";

export default function AdminShare(){
    const [share,setShare] = useState([]);
    const [drop, setDrop] =useState(false);

    useEffect(()=>{
        axios.get('/adminshared').then(({data}) =>{
            setShare(data);
        });
    },[]);
    return(
        <div>
            <div className="s-titls">
                <div>
                    <h3>Folder</h3>
                </div>
                <div className="stil">
                    <h3>Sender</h3>
                </div>
                <div className="stil">
                    <h3>Receiver</h3>
                </div>  
                <div>
                    <h3>ID</h3>
                </div>  
            </div>

            {share.length > 0 && share.map(s=>(
                <div className="Genesis">
                    <div className="share-str">
                        <div className="file-strt">
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="folder-picc">
                                    <path d="M19.5 21a3 3 0 003-3v-4.5a3 3 0 00-3-3h-15a3 3 0 00-3 3V18a3 3 0 003 3h15zM1.5 10.146V6a3 3 0 013-3h5.379a2.25 2.25 0 011.59.659l2.122 2.121c.14.141.331.22.53.22H19.5a3 3 0 013 3v1.146A4.483 4.483 0 0019.5 9h-15a4.483 4.483 0 00-3 1.146z" />
                                </svg>
                            </div>
                            <div className="file-namex">
                            <Link to={'/files/'+s.folder._id}> 
                                    {s.folder.name}
                                </Link>
                            </div>
                        </div>
                        <div className="file">
                                <div className="file-iden">
                                    {s.sender}
                                </div>
                                <div className="file-iden">
                                    {s.receiver}
                                </div>
                                <div >
                                    {s._id}
                                </div>
                                <div onClick={ev => setDrop((prev) => !prev)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="drop-icon">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                    </svg>
                                </div>
                        </div>
                    </div>
                    <div className={drop === true ? 'active-sect' : 'inactive-sect'}>
                        <div className="s-titlz">
                            <div>
                                <h3>Sender</h3>
                            </div>
                            <div>
                                <h3>Receiver</h3>
                            </div>  
                        </div>
                        <div className="exodus">
                            <div className="file-id">
                                {s.sender}
                            </div>
                            <div className="file-id">
                                {s.receiver}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            <div>
                <AdminSharedFile/>
            </div>
        </div>
    )
}