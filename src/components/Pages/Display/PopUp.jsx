import './DisplayPage.css';

export default function PopUp({ open, onClose }){
    if (!open) return null;
    return(
        <div className="overlay">
            <div className="popup-container">
                <div className="modal-right">
                    <p className="close-btn"  onClick={onClose} > X </p>
                    <div className="pop-content">
                        <h2>Download Ready</h2>
                        <a href="http://localhost:4000/single-download">
                            <button className="button pop-btn" onClick={onClose} >Download</button> 
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}