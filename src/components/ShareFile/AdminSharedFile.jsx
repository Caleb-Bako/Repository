import axios from "axios";
import { useEffect, useState } from "react";
import './ShareFile.css';

export default function AdminSharedFile(){
    const [share,setShare] = useState([]);
    const [drop, setDrop] =useState(false);

    useEffect(()=>{
        axios.get('/viewsingleshare').then(({data}) =>{
            setShare(data);
        });
    },[]);
    return(
        <div>
            <div className="s-titls">
                <div>
                    <h3>File</h3>
                </div>
                <div  className="stil">
                    <h3>Sender</h3>
                </div>
                <div  className="stil">
                    <h3>Receiver</h3>
                </div>  
                <div className="id-title">
                    <h3>ID</h3>
                </div>  
            </div>

            {share.length > 0 && share.map(s=>(
                <div className="Genesis">
                    <div className="share-str">
                    <div className="file-strt">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="folder-pic">
                                 <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                            </svg>
                        </div>
                        <div className="file-namez">
                            {s.file}
                        </div>
                    </div >
                        <div className="file">
                            <div  className="file-iden">
                                    {s.sender}
                                </div>
                                <div  className="file-iden">
                                    {s.receivee}
                                </div>
                                <div>
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
                                {s.receivee}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}