import React from "react";
import { MdReorder } from 'react-icons/md';
import { IoNotificationsOutline, IoCalendarClearOutline} from "react-icons/io5"
import "./css/main.css"

function Topbar({menuCollapse, menuIconClick}){
    return(
        <div class={menuCollapse ? "contentshrink" : "content"}>
            <nav className="navbar">
                <div class="container-fluid">
                    <button class="btn" onClick={menuIconClick} >
                        <MdReorder />
                    </button>
                    <IoCalendarClearOutline class="d-flex ms-auto"/>
                    <IoNotificationsOutline class="d-flex ms-4"/>                    
                    <img src="https://cdn.dribbble.com/users/2253180/avatars/normal/e76cd92d63352dc67521a7138574f2c9.jpg?1622636427" style={{maxHeight: '30px', maxWidth: '30px', padding : "0px"}} class="d-flex ms-4 me-3 rounded-circle" alt="icon" />
                </div>
            </nav>
        </div>      
    )
}

export default Topbar;