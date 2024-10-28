import axios from "axios";
import { useEffect, useState } from "react";
import './Admin.css';

export default function Role({id}){
    const[role,setRole] = useState('');

    useEffect(()=>{
        console.log(role);
        if(role > ''){
            commentBox();
        }

    },[role]);

    async function commentBox(){
        if(id){
            try{
                await axios.put('/staffac',{
                    id,role
                });
                alert('User Successfully set as Admin');
                window.location.reload(true);
            }catch(e){
                alert('Unsuccessful');
            }
        }else{
            return 'Loading';
        }
    }
    return(
        <div className="role-btn">
            <div>
                <button className="button" onClick={ev => setRole("Admin")}>Admin</button>
            </div>
            <div>
                <button className="button" onClick={ev => setRole("User")}>User</button>
            </div>
        </div>
    )
}