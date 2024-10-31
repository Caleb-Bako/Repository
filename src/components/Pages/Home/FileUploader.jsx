import axios from "axios";
import './Home.css';
import { useEffect } from "react";

export default function FileUploader({ id,name, files, setFiles, singleFile, setSingleFile, setshowPopUps }) {
    useEffect(() => {
        console.log(singleFile);
        if (singleFile > '') {
            setshowPopUps(true);
        }
    }, [singleFile]);

    function handleFileChange(ev) {
        const selectedFiles = ev.target.files;
        const fileArray = Array.from(selectedFiles);
        setFiles(fileArray); // Store selected files in state
    }

    async function deleteFile(file){
        try{
            await axios.delete(`/delete-file/${name}/${file}`);
            await axios.delete(`/delete-file/${id}`, {
                params: { fileName: file}
            });
            alert('Deleted!!!');
        }catch(err){
            console.error(err);
        }
    }

    return (
        <div className="fileUploader">
            <div>
                <label className="uploadButton"> 
                    <input type="file" multiple className="hidden" onChange={handleFileChange}/> 
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="uploadPic">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                    </svg> 
                    Upload
                </label>
            </div>
            <div>
            <div>
            {files && files.length > 0 && files.map((file, index) => (
                <div className="f-sect" key={index}>
                    <div className="fnm">
                        <div className="group-names">
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="folder-pics">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                </svg>
                            </div>   
                            <div className="file-name">
                                {file.name} {/* Displaying the file name */}
                                <button className="trashd" onClick={() => setFiles(prev => prev.filter((_, i) => i !== index))}>
                                    X
                                </button>
                            </div>
                        </div>
                    </div>
                    {id && (
                        <div>
                            <button className="share-containerz" onClick={() => deleteFile(file)}>
                                X
                            </button>
                            {/* <div className="share-containerz" onClick={ev => setSingleFile(file)}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="share-btn">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l6-6m0 0l-6-6m6 6H9a6 6 0 000 12h3" />
                                </svg>
                            </div> */}
                        </div>
                    )}
                </div>
            ))}
        </div>
            </div>
        </div>
    )
}
