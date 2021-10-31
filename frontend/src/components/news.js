import React, {useState} from "react";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import { useGetCryptosQuery } from "../services/cryptoApi";

import moment from 'moment';

function News({ simplified, menuCollapse }){
    const [ newsCategory, setNewsCategory ] = useState("cryptocurrecy");
    const { data: cryptoNews } = useGetCryptoNewsQuery({newsCategory, count: simplified ? 8 : 16 });
    const { data, error } = useGetCryptosQuery(100);  
    console.log(error)

    const demoImage = "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News"
    if(!cryptoNews?.value) return 'Loading...'

    return(
        <div class={simplified ? "" : (menuCollapse ? "contentshrink" : "content")}>
            <div className="container">
            
            {!simplified && (
                <div className="row">
                    <div className="col-md-6">
                        <h2>Latest Crypto News</h2>
                    </div>
                    <div className="col-md-6">
                        <select class="form-select" placeholder="Select a Crypto" onChange={(e) => setNewsCategory(e.target.value)}>
                            <option selected>Select a currency</option>     
                            <option value="cryptocurrency">cryptocurrency</option>                    
                            {data?.data?.coins.map((coin) => 
                                <option value={coin.name.toLowerCase()}>{coin.name}</option>
                            )}
                        </select>
                    </div>
                </div>     
            )}      
            <div className="row">    
                {cryptoNews && cryptoNews.value.map((news, index) => 
                    <div class="col-md-6 col-lg-4">                        
                        <div class="card rounded-3" key={index}>
                            <a href={news.url} target="_blank" rel="noreferrer">                            
                                <div class="card-body news">
                                    <div className="row">
                                        <div class="col-md-9">
                                            <h6 class="card-title">{news.name}</h6>
                                        </div>
                                        <div class="col-md-3">
                                        <img src={news?.image?.thumbnail?.contentUrl || demoImage} style={{maxHeight: '200px', maxWidth: '200px', padding : "0px"}}class="card-img-top" alt="news" />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <p class="card-text">{news.description > 100 ? `${news.description.substring(0, 100)} ...` : news.description}</p>                            
                                    </div>
                                    <div className="row">                                    
                                        <span className="bottom">
                                            <span>{news.provider[0].name}</span><br/><span className="me-auto">{moment(news.datePublished).startOf('second').fromNow()}</span>
                                        </span>                   
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                )}                
            </div>                          
        </div>
        </div>
    )
}

export default News;