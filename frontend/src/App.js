import {useEffect, useState} from "react";
import DashboardDataService from "./services/dashboard";
import Sidebar from './component.sidebar/sidebar.js';
import Main from './component.main/main.js'
import './App.css';

function App() {

  const [ATP, setATP] = useState([]);
  const [TFCM, setTFCM] =useState([]);
  const [LWP, setLWP] =useState([]);
  const [TFPM, setTFPM] =useState([]);
  const [AT, setAT] =useState([]);
  const [menuCollapse, setMenuCollapse] = useState(false)

    const menuIconClick = () => {
        menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
    };

  useEffect(() => {
      const getInfo = async () => {
          await DashboardDataService.getAll()
          .then(response => {
              console.log(response.data);
              setAT(response.data.dashboardinfo[0]);
              setATP(response.data.dashboardinfo[1]);
              setTFCM(response.data.dashboardinfo[2]);
              setTFPM(response.data.dashboardinfo[3]);
              setLWP(response.data.dashboardinfo[4]);
          })
          .catch(e => {
              console.log(e);
          })
      }
      getInfo()
  },[])

  return (
    <div className="App">
        <div className="contain">
          <Sidebar menuCollapse={menuCollapse}/>
          <Main ATP={ATP} TFCM={TFCM} LWP={LWP} TFPM={TFPM} AT={AT} menuIconClick={menuIconClick}/>
        </div>
    </div>
  );
}

export default App;
