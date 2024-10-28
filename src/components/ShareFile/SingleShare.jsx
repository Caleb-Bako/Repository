import axios from "axios";
import { useEffect, useState } from "react";


export default function SingleShare({setReceivee}){
    const [user,setUser] = useState([]);
    useEffect(()=>{
        axios.get('/users').then(response => {
            setUser(response.data);
        });
    },[]);
    return(
        <div>
            {user.length > 0 && user.map(u =>(
                <div>
                    <div>
                        {u.name}
                    </div>
                    <button onClick={ev => setReceivee(u._id)} >
                        Share Nigga
                    </button>
                </div>
            ))}

        </div>
    )
}