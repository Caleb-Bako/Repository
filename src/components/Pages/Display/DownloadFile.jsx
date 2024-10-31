import axios from 'axios';
import './DisplayPage.css';

export default function DownloadFile({ photo,folderName }) {
    async function downloadFile(fileKey) {
        try {
            const response = await axios.get(`/download-file/${folderName}/${fileKey}`);
            const downloadUrl = response.data.url;
            window.open(downloadUrl); // Opens the file download in a new tab
        } catch (error) {
            console.error("Error downloading file:", error);
        }
    }

    return (
        <div>
            <button onClick={() => downloadFile(photo)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="folder-pic">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
            </button>
        </div>
    );
}
