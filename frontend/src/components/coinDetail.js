import React, {useState} from "react";
import { useParams } from "react-router";
import HTMLReactParser from 'html-react-parser';
import { Line } from 'react-chartjs-2';
import { useGetCryptoDetailQuery, useGetCryptoHistoryQuery } from "../services/cryptoApi";
import { IoPodiumOutline, IoTrophyOutline, IoWaterOutline } from "react-icons/io5";
import { AiOutlineDollar } from "react-icons/ai";
import { MdWater } from "react-icons/md";
import millify from 'millify';
import "./css/main.css"

function CoinDetail({menuCollapse}){

    const { coinId } = useParams();
    const [ timePeriod, setTimePeriod] = useState('7d');
    const { data } = useGetCryptoDetailQuery(coinId);
    const { data: priceHistory, error } = useGetCryptoHistoryQuery({coinId, timePeriod});
    const coinDetail = data?.data?.coin;

    console.log(priceHistory)
    console.log(error)

    const coinPrice = [];
    const coinTimeStamp = [];

    for (var i = 0; i < priceHistory?.data?.history?.length ; i++){
        coinPrice.push(priceHistory.data.history[i].price)
        coinTimeStamp.push(new Date(priceHistory.data.history[i].timestamp).toLocaleDateString())
    }

    const stats = [
        { title: 'Price to USD', value: `$ ${coinDetail && ReadableNumber(coinDetail.price)}`, icon: <AiOutlineDollar /> },
        { title: 'Rank', value: `${coinDetail && coinDetail.rank}`, icon: <IoPodiumOutline /> },
        { title: '24h Volume', value: `$ ${coinDetail && millify(coinDetail.volume, {
            units: ['', 'K', 'Million', 'Billion', 'Tillion', 'P', 'E'],
            space: true,
          })}`, icon: <IoWaterOutline /> },
        { title: 'Market Cap', value: `$ ${coinDetail && millify(coinDetail.marketCap, {
            units: ['', 'K', 'Million', 'Billion', 'Tillion', 'P', 'E'],
            space: true,
          })}`, icon: <MdWater /> },
        { title: 'All-time-high (daily avg.)', value: `$ ${coinDetail && ReadableNumber(coinDetail.allTimeHigh.price)}`, icon: <IoTrophyOutline /> },
      ];

      function ReadableNumber(number){
        if(number >= 1){
            return Number.parseFloat(number).toFixed(2)
        }
        else{
            return Number.parseFloat(number).toPrecision(4)
        }
      }

      function renderCryptoLineChart() {      
        return (<Line
            data={{
                labels: coinTimeStamp,
                datasets: [{
                    label: 'Price in USD',
                    borderColor: '#201E50',
                    data: coinPrice,
                }]
            }}
            height={400}
            options={{
                maintainAspectRatio: false,
                scales: {
                    x: {
                        grid: {
                          display: false
                        }
                    },
                    y: {
                        grid: {
                          display: false
                        }
                    }
                }
            }} 
        />)
            
    }

    function renderCryptoStatBody() {
        return stats && stats.map(stat => {
            return (                
                <tr class="cryptoStat">
                    <td>{stat.icon}</td>
                    <td>{stat.title}</td>
                    <td>{stat.value}</td>
                </tr>               
            );
        });
    }   

    function renderProjectLinkBody() {
        return coinDetail && coinDetail.links.map(link => {
            return (                
                <tr class="projectLink">
                    <td><a href={link.url} >{link.type}</a></td>
                    <td><a href={link.url} >{link.name}</a></td>
                </tr>               
            );
        });
    }   

    return(
        <div class={menuCollapse ? "contentshrink" : "content"}>
            <div className="container">
                <div className="row">
                    <div className="col-md-10">
                        <h2>{coinDetail?.name} ({coinDetail?.slug}) Price</h2>
                        <p className="p-0">{coinDetail?.name} live price in US Dollar (USD). View value statistics, market cap and supply.</p>
                    </div>
                    <div className="col-md-2">
                        <img src={coinDetail?.iconUrl} style={{maxHeight: '70px', maxWidth: '70px', margin: "16px 0px"}} alt="cryptoIcon" />
                    </div>
                </div>        
                <div className="row">
                    <div class="card rounded-3" >
                            <div class="card-body">
                                
                            <div>{renderCryptoLineChart()}</div>
                            <div className="col">
                            <div class="btn-group my-3" role="group" onClick={(e) => setTimePeriod(e.target.value)} >

                            <input type="radio" class="btn-check" name="btnradio" id="24h" value="24h" autocomplete="off"/>
                            <label class="btn btn-outline-secondary" for="24h">24H</label>

                            <input type="radio" class="btn-check" name="btnradio" id="7d" value="7d" autocomplete="off" active/>
                            <label class="btn btn-outline-secondary" for="7d">7D</label>    

                            <input type="radio" class="btn-check" name="btnradio" id="30d" value="30d" autocomplete="off" />
                            <label class="btn btn-outline-secondary" for="30d">30D</label>  

                            <input type="radio" class="btn-check" name="btnradio" id="1y" value="1y" autocomplete="off" />
                            <label class="btn btn-outline-secondary" for="1y">1Y</label>  

                            <input type="radio" class="btn-check" name="btnradio" id="5y" value="5y" autocomplete="off" />
                            <label class="btn btn-outline-secondary" for="5y">5Y</label>    
         
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col col-md-6">
                        <div class="card rounded-3" >
                            <div class="card-body">
                                <h3>{coinDetail?.name} Value Statistics</h3>
                                <table class="table">
                                    <tbody>   
                                        {renderCryptoStatBody()} 
                                    </tbody>
                                </table>
                            </div>
                        </div> 
                    </div>
                    <div className="col col-md-6">
                        <div class="card rounded-3" >
                            <div class="card-body">
                                <h3>Project links</h3>
                                <table class="table">
                                    <tbody>   
                                        {renderProjectLinkBody()} 
                                    </tbody>
                                </table>
                            </div>
                        </div>  
                    </div>
                </div>
                <div className="row">
                    <div className="col col-md-6">
                        <div class="card rounded-3" >
                            <div class="card-body">
                                <h3>What is {coinDetail?.name}</h3>
                                {coinDetail && HTMLReactParser(coinDetail.description)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CoinDetail;