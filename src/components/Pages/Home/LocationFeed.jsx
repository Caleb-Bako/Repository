import axios from "axios";
import { useEffect, useState } from "react";
import './Home.css';

export default function LocationFeed(){
    const[users,setUsers] = useState([]);
    const[locate,setLocate] = useState('');
    useEffect(()=>{
        axios.get('/userlocate').then(response => {
            setUsers(response.data);
        });
    },[]);

    return(
        <div>
            {users.length> 0 && users.map(u=>(
                <div className="user-location">
                    <div>
                       <h2> Location:</h2>
                    </div>
                    <div>
                       <h2>{u.location}</h2>
                      
                    </div>
                </div>
            ))}
        </div>
    )
}