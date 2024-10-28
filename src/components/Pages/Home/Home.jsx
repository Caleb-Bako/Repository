import { useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar";
import axios from "axios";
import './Home.css';
import FileUploader from "./FileUploader";
import { Navigate, useParams } from "react-router-dom";
import DeleteTag from "./DeleteTag";
import ShareFile from "../../ShareFile/ShareFile";
import SingleSharedFile from "../../ShareFile/SingleSharedFile";
import LocationFeed from "./LocationFeed";

export default function Home(){
    const[profile,setProfile] = useState([]);
    const[name,setName] = useState('');
    const[showPopUp, setshowPopUp] = useState(false);
    const[showPopUps, setshowPopUps] = useState(false);
    const[redirect,setRedirect] = useState(false);
     const [form,setForm] = useState('');
    const {id} = useParams();
    const [singleFile,setSingleFile] = useState('');

    useEffect(() => {
        if(!id){
            return;
        }
        axios.get('/staff/'+id).then(response =>{
                const{data} = response;
                setProfile(data.profile);
                setName(data.name);
            });
    },[id]);

    async function saveFiles(ev){
        ev.preventDefault();
        const staffData = {
            profile,name,form
        };
        if(id){
            await axios.put('/staff', 
            {
            id,...staffData
         });
         setRedirect(true);
        }else{
            await axios.post('/staff', staffData);
            alert('Success !!!');
            setRedirect(true);
        }
    }

    if(redirect){
        return<Navigate to={'/home'}/>
    }
console.log(form);
    return(
        <div>
            <ShareFile id={id} open={showPopUp} onClose={() => setshowPopUp(false)}/>
            <SingleSharedFile singleFile={singleFile} open={showPopUps} onClose={() => setshowPopUps(false)}/>
            <NavBar/>
            <div className="home-page">
                <LocationFeed/>
                <div>
                    {id &&(
                        <div className="tags">
                            <div>
                                <DeleteTag id={id} setRedirect={setRedirect} />
                            </div>
                            <div>
                                <button onClick={() => setshowPopUp(true)}>Share</button>
                            </div>
                        </div>
                    )}
                </div>
                <div className="fstr">
                    <form onSubmit={saveFiles}>
                        <h2>File Name: </h2>
                        <input type="text" placeholder="File Name" value={name} onChange={ev => setName(ev.target.value)}/> 
                        <h2>Files:</h2>
                            <FileUploader id={id} files={profile} onChange={setProfile} singleFile={singleFile} setSingleFile={setSingleFile} setshowPopUps={setshowPopUps}/>
                            <div className="file-form">
                                <div>
                                    <label onClick={() => setForm('Public')}>Public</label>
                                </div>
                                <div>
                                    <label onClick={() => setForm('Private')}>Private</label>
                                </div>
                            </div>
                            <button className="upload-button">Upload</button>
                    </form>     
                </div>

            </div>
        </div>
    )
}