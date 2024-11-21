import { Outlet, useLocation } from "react-router-dom";
import NavBar from "../components/Pages/NavBar/NavBar";
import './WebPages.css';

export default function WebPages(){
    const location = useLocation();
    const noNavRoutes = ['/'];
    return(
        <div className={!noNavRoutes.includes(location.pathname) ? 'layout' : '' }>
             {!noNavRoutes.includes(location.pathname) &&
                <div className="Navigation-bar">
                    <NavBar/>
                </div>
             }
            <div className="Pages">
                <Outlet/>
            </div>
        </div>
    )
}