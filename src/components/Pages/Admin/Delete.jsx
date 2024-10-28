import axios from "axios";
import { useEffect, useState } from "react";
import './Admin.css';

export default function Delete({id}){
    const [view,setView] = useState('');

    useEffect(()=>{
        console.log(view);
        if(view > ''){
            deleteFolder();
        }

    },[view]);

    async function deleteFolder(){
        const userData = {
            id,
            view
        }
        try{
            await axios.put('/deletephase1',userData);
            alert('Successful');
            window.location.reload(true);
        }catch(e){
            alert('Unsuccessful');
        }
    }
    return(
        <div>
            <button className="delete-tag" onClick={ev => setView("delete")}>Delete</button>
        </div>
    )
}