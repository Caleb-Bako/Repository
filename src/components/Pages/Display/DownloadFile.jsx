import axios from "axios";
import { useEffect, useState } from "react";
import './DisplayPage.css';
import DownloadId from "./DownloadId";

export default function DownloadFile({photo,setshowPopUp}){
    const[filenam,setFileName] = useState('')
    const[check,setCheck] = useState('checked');
    const[df,setDf] = useState('');
    const[ck,setCk] = useState('');

    useEffect(()=>{
        console.log(filenam);
        if(filenam > ''){
            downloadFile();
        }

    },[filenam]);

    async function downloadFile(){
        const staffData = {filenam,check};
        if (!ck){
            await axios.post('/createpath',staffData);
            alert('Downloading !!!');
            downloaded();
        }
            try{
                await axios.put('/updatefile', staffData);
                alert('Downloading P !!!');
                downloaded();
            }catch(e){
                alert('error');
            }
    };
    async function downloaded(){
        await axios.get('/single-download').then(response =>{
            setDf(response.data);
        })
        alert('Downloaded !!!');
        setshowPopUp(true);
    }
    return(
        <div>
            <DownloadId  ck={ck} setCk={setCk}/>
            <button onClick={ev => setFileName({photo})}> 
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="folder-pic">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
            </button>
        </div>
    )
}