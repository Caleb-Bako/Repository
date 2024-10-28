import axios from "axios";
import { useEffect } from "react";
import './DisplayPage.css';

export default function DownloadId({ck,setCk}){
    useEffect(()=>{
        axios.get('/getpath').then(({data}) =>{
            setCk(data);
        });
    },[]);
    if(!ck) return '';
    return(
        <div>
            {ck.length > 0 && ck.map(cks=>(
                <div className="d-id" >
                    {cks.owner}
                </div>
            ))}
        </div>
    )
}