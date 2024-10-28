import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './DisplayPage.css';
import NavBar from "../NavBar/NavBar";
import DownloadId from "./DownloadId";
import PopUp from "./PopUp";
import DownloadFile from "./DownloadFile";

export default function SingleDoc(){
    const{id} = useParams();
    const[place,setPlace] = useState(null);
    const[downld,setDownld] = useState('')
    const[ck,setCk] = useState('');
    const[showPopUp, setshowPopUp] = useState(false);
    useEffect(()=>{
        if(!id){
            return;
        }
        axios.get(`/staff/${id}`).then(response =>{
            setPlace(response.data);
        })
    },[id]);
    if(!place) return '';

    async function downloadButton(ev){
        ev.preventDefault();
        await axios.get(`/download/${id}`).then(response =>{
            setDownld(response.data);
        })
        alert("Success?");
    };

    return(
        <div>
            <PopUp open={showPopUp} onClose={() => setshowPopUp(false)} />
            <NavBar/>
            <div className="single-doc">
                <div className="download-folder" >
                    <DownloadId ck={ck} setCk={setCk}/>
                        <div>
                            <button onClick={downloadButton} className="download-btn"> 
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="folder-pic">
                                        <path d="M19.5 21a3 3 0 003-3v-4.5a3 3 0 00-3-3h-15a3 3 0 00-3 3V18a3 3 0 003 3h15zM1.5 10.146V6a3 3 0 013-3h5.379a2.25 2.25 0 011.59.659l2.122 2.121c.14.141.331.22.53.22H19.5a3 3 0 013 3v1.146A4.483 4.483 0 0019.5 9h-15a4.483 4.483 0 00-3 1.146z" />
                                </svg>
                                Download Folder
                            </button>
                        </div>
                </div>
                <div className="folder-title">
                            <div className="headings">
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="hpics">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776" />
                                    </svg>
                                </div>
                                <div>Name</div>
                            </div>
                            
                        </div>
            {place.profile.length > 0 && place.profile.map((photo) => (
                
                        <div key={photo} className="file-strs single-downloads">
                            <div>
                                <div className="group-name " >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"  className="folder-pic">
                                        <path d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0016.5 9h-1.875a1.875 1.875 0 01-1.875-1.875V5.25A3.75 3.75 0 009 1.5H5.625z" />
                                        <path d="M12.971 1.816A5.23 5.23 0 0114.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 013.434 1.279 9.768 9.768 0 00-6.963-6.963z" />
                                    </svg>
                                    <div className="file-name">
                                        {photo}
                                    </div>
                                </div>
                            </div>
                            {/* <div>
                                <img className="file-pics" src={`http://localhost:4000/uploads\\`+ photo} alt='' onClick={ev => setFileName({photo})} />
                                {photo}
                            </div> */}
                            <div>
                                <DownloadFile photo={photo} setshowPopUp={setshowPopUp} />
                            </div>
                    </div>    
                ))}
            </div>
            
        </div>
    )
}