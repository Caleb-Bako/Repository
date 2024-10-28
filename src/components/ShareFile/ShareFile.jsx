import { useEffect, useState } from "react"
import Share from "./Share";
import axios from "axios";
import '../Pages/Display/DisplayPage.css';

export default function ShareFile({id, open, onClose}){
    const [receiver,setReceiver] = useState('');

    useEffect(()=>{
        console.log(receiver);
        if(receiver > ''){
            share();
        }
    },[receiver]);

    async function share(){
        const fileData = {
            folder : id,
            receiver
        };
        await axios.post('/shares',fileData);
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
                        <Share setReceiver={setReceiver} />
                    </div>
                </div>
            </div>
        </div>
           
        </div>
    )
}