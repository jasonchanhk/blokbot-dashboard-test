import React from "react";
import { useState, useEffect } from "react";
import { useGetCryptosQuery } from "../services/cryptoApi";
import { useHistory } from 'react-router-dom';
import { AiFillCaretUp, AiFillCaretDown} from "react-icons/ai";
import millify from 'millify';
import "./css/main.css"

function Coin({ simplified, menuCollapse }){
    const count = simplified ? 10 : 100;
    const { data: cryptosList, isFetching } = useGetCryptosQuery(count); 
    const [cryptos, setCryptos] = useState(cryptosList?.data?.coins);
    const [searchTerm, setSearchTerm] = useState("");
    
    useEffect(() => {
        const filteredData = cryptosList?.data?.coins.filter((coin) => coin.name.toLowerCase().includes(searchTerm.toLowerCase()))
        setCryptos(filteredData)
    }, [cryptosList, searchTerm])

    const renderCryptoHeader = () => {
        let headerElement = [ 'price', 'market cap', '24h' ]

        return headerElement.map((key, index) => {
            return <th key={index} class="coinHeader">{key.toUpperCase()}</th>
        })
    }

    const history = useHistory();
    const handleRowClick = (currency) => {
      history.push(`/coin/${currency.id}`);
    }  

    function renderCryptoBody() {
        return cryptos && cryptos.map((currency, index) => {
            return (                
                <tr class="coinBody" onClick={() => handleRowClick(currency)}>
                    <td style={{width: "10%"}}>{(index+1)}</td>
                    <td style={{width: "5%"}}><img src={currency.iconUrl} style={{maxHeight: '30px', maxWidth: '30px'}} alt="cryptoIcon" /></td>                    
                    <td style={{width: "20%"}}>{currency.name}<br/><span class='symbol'>{currency.symbol}</span></td>
                    <td style={{width: "25%"}}>${ReadableNumber(currency.price)}</td>
                    <td style={{width: "20%"}}>${millify(currency.marketCap,{
                        units: ['', 'K', 'Million', 'Billion', 'Tillion', 'P', 'E'],
                        space: true,
                    })}</td>                    
                    <td style={{width: "20%"}}>{percentageBetterment(currency.change)}</td>
                </tr>               
            );
        });
    }       

    function ReadableNumber(number){
        if(number >= 1){
            return Number.parseFloat(number).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
        }
        else{
            return Number.parseFloat(number).toPrecision(4)
        }
    }

    function percentageBetterment(percentage){
        if(percentage>=0){
            return(
                <span class="text-success">
                    <AiFillCaretUp /><span>{percentage}%</span>
                </span>
            )            
        }
        else{
            return(
                <span class="text-danger">
                    <AiFillCaretDown /><span>{percentage}%</span>
                </span>
            ) 
        }
    }
    if(isFetching) return "Loading..."

    return(
        <div class={simplified ? "" : (menuCollapse ? "contentshrink" : "content")}>
            <div className="container">
                {!simplified && (
                    <div className="row">
                        <div class="col-md-6">
                            <h2 class="mb-3">All Cryptocurrency Price</h2>
                        </div>
                        <div class="col-md-6 me-auto">
                            <div class="input-group mb-3">
                                <span class="input-group-text" id="inputGroup-sizing-default">Search</span>
                                <input type="text" class="form-control" placeholder="Cryptocurrency" onChange={(e) => setSearchTerm(e.target.value)} />
                            </div>
                        </div>
                    </div>
                )}
                <div className="row"> 
                    <div class="card rounded-3">
                        <div class="card-body">                   
                            <table class="table align-middle coinTable" style={{width: "100%"}} >
                                <thead>
                                    <tr>
                                        <th key="cryptocurrency" class="coinHeader" colspan="3">CRYPTOCURRENCY</th>
                                        {renderCryptoHeader()}
                                    </tr>
                                </thead>
                                <tbody>   
                                    {renderCryptoBody()} 
                                </tbody>
                            </table> 
                        </div>
                    </div>
                </div>                          
            </div>
        </div>
        
        
    )
}

export default Coin