import { useEffect, useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { IconContext } from "react-icons";
import { MdAccountBalanceWallet, MdAccountBalance, MdReorder } from 'react-icons/md';
import { BsFillPiggyBankFill, BsCurrencyExchange } from 'react-icons/bs';
import { useGetDashboardQuery } from '../services/dashboardApi'
import "./css/main.css"

function Main({menuCollapse, simplified}){

    const { data } = useGetDashboardQuery()
    const ATP = data?.dashboardinfo?.find( ({ section }) => section === 'Active Trading Pairs' );
    const TFCM = data?.dashboardinfo?.find( ({ section }) => section === 'Total for Current Month' );
    const LWP = data?.dashboardinfo?.find( ({ section }) => section === 'Last 7 days profit' );
    const TFPM = data?.dashboardinfo?.find( ({ section }) => section === 'Total for Previous Month' );
    const AT = data?.dashboardinfo?.find( ({ section }) => section === 'Account Total' );
    
    const renderHeader = () => {
        let headerElement = ['date', 'time', 'pair', 'bought_amount', 'bought_volume', ]

        return headerElement.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }

    function renderBody() {
        return ATP && ATP.pairs.map(individual => {
            return (
                <tr>
                    <td>{individual.date}</td>
                    <td>{individual.time}</td>
                    <td>{individual.pair}</td>
                    <td>{individual.bought_amount}</td>
                    <td>{individual.bought_volume}</td>
                </tr>
            );
        });
    }   

    let sum = 0
    function findActiveDeal() {        
        return ATP && ATP.pairs.forEach(element => {
            sum = sum + element.bought_amount;
        });
    }   
    findActiveDeal()

    var new_array = [];
    function cumulativeArray(){
        return LWP && 
        Object.values(LWP.profits).reduce((a,b,i) => { 
            return (new_array[i] = a+b); 
            
        },0)
    }
    cumulativeArray()

    function renderLineChart() {      
        return LWP &&
            <Line
                data={{
                    labels: Object.keys(LWP.profits),
                    datasets: [{
                        label: 'Daily profit',
                        borderColor: '#201E50',
                        data: new_array,
                    }]
                }}
                height={300}
                width={500}
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
            />;
    }
    
    function renderBarChart() {      
        return LWP &&
            <Bar
                data={{
                    labels: Object.keys(LWP.profits),
                    datasets: [{
                        label: 'Daily profit',
                        backgroundColor: '#201E50',
                        borderColor: '#201E50',
                        data: Object.values(LWP.profits)
                    }]
                }}
                height={300}
                width={400}
                options={{
                    maintainAspectRatio: false,
                    scales: {
                        x: {
                            grid: {
                              display: false
                            }
                        },
                        
                    }
                }} />;
    }

    return(
        <div class={simplified ? "" : (menuCollapse ? "contentshrink" : "content")}> 
                  
            <div className="container">
                {!simplified && (
                <div className="row"> 
                    <div class="col-md-6">
                        <h2>Dashboard</h2>
                    </div>
                </div>
            
                )}            
                <div className="row">   
                    <IconContext.Provider value={{ color: "#201E50", className: "global-class-name", size: "3rem" }}>                 
                    <div className="col col-xl-6">
                        <div className="row">                           
                            <div className="col col-md-6">
                                <div class="card top rounded-3" >
                                    <div class="card-body">
                                        <span class="icon"><BsFillPiggyBankFill/></span>
                                        <h6 class="card-subtitle mb-2 ">{AT?.section}</h6>
                                        <h3 class="card-text">${AT?.total}</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="col col-md-6">
                                <div class="card top rounded-3">
                                    <div class="card-body">                                        
                                        <span class="icon"><MdAccountBalanceWallet/></span>
                                        <h6 class="card-subtitle mb-2 ">Current Active Deals</h6>
                                        <h3 class="card-text">${sum.toFixed(2)}</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">   
                            <div className="col col-md-6">
                                <div class="card top rounded-3">
                                    <div class="card-body">
                                        <span class="icon"><BsCurrencyExchange/></span>
                                        <h6 class="card-subtitle mb-2 ">{TFCM?.section}</h6>
                                        <h3 class="card-text">${TFCM?.total}</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="col col-md-6">
                                <div class="card top rounded-3">
                                    <div class="card-body">
                                        <span class="icon"><MdAccountBalance/></span>
                                        <h6 class="card-subtitle mb-2 ">{TFPM?.section}</h6>
                                        <h3 class="card-text">${TFPM?.total}</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </IconContext.Provider>
                    <div className="col col-xl-6">
                        <div class="card rounded-3">
                            <div class="card-body">
                                <h4 class=" mb-2">Last 7 Days Cumulative</h4>
                                <div>{renderLineChart()}</div>
                            </div>
                        </div>
                    </div>                   
                </div>
                {!simplified && (
                <div className="row">
                    <div className="col col-xl-4">
                        <div class="card rounded-3">
                            <div class="card-body">
                                <h4 class=" mb-2">{LWP?.section}</h4>
                                <div>{renderBarChart()}</div>
                            </div>
                        </div>
                    </div>
                    <div className="col col-xl-8">
                        <div class="card rounded-3">
                            <div class="card-body">
                                <h4 class=" mb-2">{ATP?.section}</h4>
                                <table class="table">
                                    <thead>
                                        <tr>{renderHeader()}</tr>
                                    </thead>
                                    <tbody>   
                                        {renderBody()} 
                                    </tbody>
                                </table>
                             </div>
                         </div>
                    </div>
                </div> 
                )}               
            </div>            
        </div>
    )
}

export default Main;