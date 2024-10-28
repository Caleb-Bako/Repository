import axios from "axios";
import './Home.css';

export default function DeleteTag({id,setRedirect}){
    async function deleteFolder(ev){
        ev.preventDefault();
        try{
            await axios.delete(`/folderdel/${id}`);
            alert('Successful');
            setRedirect(true);
        }catch(e){
            alert('Unsuccessful');
        }
    }
    return(
        <div>
            <button className="delete-tag" onClick={deleteFolder}>Delete</button>
        </div>
    )
}