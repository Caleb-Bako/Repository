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
    const[files,setFiles] = useState([]);
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
                setFiles(data.files);
                setName(data.name);
            });
    },[id]);

    async function uploadFiles(ev) {
        ev.preventDefault(); // Prevent default form submission
    
        const data = new FormData();
        
        // Append the folder name to FormData
        data.append('folderName', name); // Assuming 'name' holds the folder name
        
        // Append each selected file to FormData
        files.forEach(file => {
            data.append('file', file); // Append each selected file
        });
    
        try {
            const response = await axios.post('/upload', data, {
                headers: {   
                    'Content-Type': 'multipart/form-data'
                }
            });
            
            const { data: filenames } = response;
            setFiles(prev => [...prev, ...filenames]); // Update parent component with uploaded filenames
            await saveFiles(); // Save files data if needed
        } catch (err) {
            console.error(err);
        }
    }
    
    async function saveFiles() {
        const fileNames = files.map(file => file.name);
    
        let updatedFiles = [];
        
        // Fetch existing files if updating an existing folder (identified by `id`)
        if (id) {
            const existingData = await axios.get(`/staff/${id}`);
            updatedFiles = [...existingData.data.files, ...fileNames]; // Append new files to existing ones
        } else {
            updatedFiles = fileNames;
        }
    
        const staffData = {
            files: updatedFiles,
            name,
            form
        };
    
        if (id) {
            await axios.put('/staff', {
                id,
                ...staffData
            });
            setRedirect(true);
        } else {
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
                                <DeleteTag id={id} name={name} setRedirect={setRedirect} />
                            </div>
                            <div>
                                <button onClick={() => setshowPopUp(true)}>Share</button>
                            </div>
                        </div>
                    )}
                </div>
                <div className="fstr">
                    <form onSubmit={uploadFiles}>
                        <h2>Folder Name: </h2>
                        <input type="text" placeholder="Folder Name" value={name} onChange={ev => setName(ev.target.value)}/> 
                        <h2>Files:</h2>
                            <FileUploader id={id} name={name} files={files} setFiles={setFiles} singleFile={singleFile} setSingleFile={setSingleFile} setshowPopUps={setshowPopUps}/>
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