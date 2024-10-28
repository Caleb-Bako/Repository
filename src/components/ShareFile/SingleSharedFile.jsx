import axios from "axios";
import { useEffect, useState } from "react";
import '../Pages/Display/DisplayPage.css';
import SingleShare from "./SingleShare";


export default function SingleShared({open, onClose,singleFile}){
    const [receivee,setReceivee] = useState('');

    useEffect(()=>{
        console.log(receivee);
        if(receivee > ''){
            shares();
        }
    },[receivee]);

    async function shares(){
        const fileData = {
            file : singleFile,
            receivee
        };
        await axios.post('/singleshared',fileData);
        alert('Success');
    }
    
    if (!open) return null;
    return(
        <div>
            <div className="overlay">
                <div className="popup-container">
                    <div className="modal-right">
                        <p className="close-btn"  onClick={onClose} > X </p>
                        <div className="pop-content">
                           <SingleShare setReceivee={setReceivee} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}