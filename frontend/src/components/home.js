import React from "react";
import { Link } from "react-router-dom";
import Coin from './coin';
import News from './news';
import Dashboard from './dashboard'
import "./css/main.css"

function home({menuCollapse}){
    return(
        <div class={menuCollapse ? "contentshrink" : "content"}>  
            <div className="container">                
                <div className="row">
                    <div className="col-md-6">
                        <h2 className="mt-3">Welcome to Blokbot.</h2>
                    </div>
                    <div className="col-md-6">
                        <p className="showMore mt-3"><Link to="/dashboard">Show more</Link></p>
                    </div>                    
                </div>
            </div>     
            <Dashboard simplified={true} />
            <div className="container">                
                <div className="row">
                    <div className="col-md-6">
                        <h2 className="mt-5">Top 10 Cryptocurrencies</h2>
                    </div>
                    <div className="col-md-6">
                        <p className="showMore mt-5"><Link to="/coin">Show more</Link></p>
                    </div>                    
                </div>
            </div>        
            <Coin simplified={true} />
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <h2 className="mt-5">Latest Crypto News</h2>
                    </div>
                    <div className="col-md-6">
                        <p className="showMore mt-5"><Link to="/news">Show more</Link></p>
                    </div> 
                </div>
            </div>
            <News simplified={true} />  
        </div>
        
    )
}

export default home;