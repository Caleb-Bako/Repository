import axios from "axios";
import { useEffect, useState } from "react";


export default function RequestFunction({id}){
    const[role,setRole] = useState('');

    useEffect(()=>{
        console.log(role);
        if(role > ''){
            deleteFolder();
        }

    },[role]);

    async function deleteFolder(){
        try{
            await axios.delete(`/deletephase2/${id}`);
            alert('Successful');
            window.location.reload(true);
        }catch(e){
            alert('Unsuccessful');
        }
    }
    return(
        <div>
            <button onClick={ev => setRole(id)}>DELETE</button>
        </div>
    )
}