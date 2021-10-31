import React from "react";
import { AiOutlineCopyrightCircle } from "react-icons/ai"
import "./css/main.css"

function Footer({menuCollapse}){
    return(
        <div className={menuCollapse ? "contentshrink" : "content"}>
            <footer className="mt-auto py-4">
                <div className="container">
                    <span>Privacy Policy</span><span className="ms-3">Term of Use</span><span className="ms-3">Contact Us</span><br/>
                    <span><AiOutlineCopyrightCircle /> 2021 Jason Chan</span>
                </div>
            </footer>
        </div>
    )
}

export default Footer;