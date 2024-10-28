import axios from "axios";
import { useEffect, useState } from "react";


export default function Share({setReceiver}){
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
                    <button onClick={ev => setReceiver(u._id)} >
                        Share
                    </button>
                </div>
            ))}

        </div>
    )
}