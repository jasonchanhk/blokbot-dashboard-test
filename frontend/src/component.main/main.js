import { Bar, Line } from 'react-chartjs-2';
import { IconContext } from "react-icons";
import { MdAccountBalanceWallet, MdAccountBalance, MdReorder } from 'react-icons/md';
import { BsFillPiggyBankFill, BsCurrencyExchange } from 'react-icons/bs';
import "./main.css"

function Main({ATP, TFCM, LWP, TFPM, AT, menuIconClick}){
    const renderHeader = () => {
        let headerElement = ['date', 'time', 'pair', 'bought_amount', 'bought_volume', ]

        return headerElement.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }

    function renderBody() {
        return ATP.pairs && ATP.pairs.map(individual => {
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
        return ATP.pairs && ATP.pairs.forEach(element => {
            sum = sum + element.bought_amount;
        });
    }   
    findActiveDeal()

    var new_array = [];
    function cumulativeArray(){
        return LWP.profits && 
        Object.values(LWP.profits).reduce((a,b,i) => { 
            return (new_array[i] = a+b); 
            
        },0)
    }
    cumulativeArray()

    function renderLineChart() {      
        return LWP.profits &&
            <Line
                data={{
                    labels: Object.keys(LWP.profits),
                    datasets: [{
                        label: 'Daily profit',
                        fill: true,
                        borderColor: '#e6f14a',
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
        return LWP.profits &&
            <Bar
                data={{
                    labels: Object.keys(LWP.profits),
                    datasets: [{
                        label: 'Daily profit',
                        backgroundColor: '#e6f14a',
                        borderColor: '#e6f14a',
                        data: Object.values(LWP.profits)
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
                        
                    }
                }} />;
    }

    return(
        <div className="main">
            <nav className="navbar bg-light">
                    <div class="container-fluid">
                        <button class="btn" onClick={menuIconClick}>
                                <MdReorder /> 
                        </button> 
                        <form class="d-flex ms-auto">                            
                            <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                            <button class="btn btn-outline-dark my-2 my-sm-0" type="submit">Search</button>
                        </form>
                    </div>
            </nav>
            <div className="container">    
                <h2>Dashboard</h2>            
                <div className="row">   
                    <IconContext.Provider value={{ color: "#e6f14a", className: "global-class-name", size: "3rem" }}>                 
                    <div className="col col-xl-6">
                        <div className="row">                           
                            <div className="col col-md-6">
                                <div class="card top" >
                                    <div class="card-body">
                                        <span class="icon"><BsFillPiggyBankFill/></span>
                                        <h6 class="card-subtitle mb-2 text-muted">{AT.section}</h6>
                                        <h3 class="card-text">${AT.total}</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="col col-md-6">
                                <div class="card top">
                                    <div class="card-body">                                        
                                        <span class="icon"><MdAccountBalanceWallet/></span>
                                        <h6 class="card-subtitle mb-2 text-muted">Current Active Deals</h6>
                                        <h3 class="card-text">${sum.toFixed(2)}</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">   
                            <div className="col col-md-6">
                                <div class="card top">
                                    <div class="card-body">
                                        <span class="icon"><BsCurrencyExchange/></span>
                                        <h6 class="card-subtitle mb-2 text-muted">{TFCM.section}</h6>
                                        <h3 class="card-text">${TFCM.total}</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="col col-md-6">
                                <div class="card top">
                                    <div class="card-body">
                                        <span class="icon"><MdAccountBalance/></span>
                                        <h6 class="card-subtitle mb-2 text-muted">{TFPM.section}</h6>
                                        <h3 class="card-text">${TFPM.total}</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </IconContext.Provider>
                    <div className="col col-xl-6">
                        <div class="card">
                            <div class="card-body">
                                <h4 class="text-muted mb-2">Last 7 Days Cumulative</h4>
                                <div>{renderLineChart()}</div>
                            </div>
                        </div>
                    </div>                   
                </div>

                <div className="row">
                    <div className="col col-xl-4">
                        <div class="card">
                            <div class="card-body">
                                <h4 class="text-muted mb-2">{LWP.section}</h4>
                                <div>{renderBarChart()}</div>
                            </div>
                        </div>
                    </div>
                    <div className="col col-xl-8">
                        <div class="card">
                            <div class="card-body">
                                <h4 class="text-muted mb-2">{ATP.section}</h4>
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
            </div>            
        </div>
    )
}

export default Main;