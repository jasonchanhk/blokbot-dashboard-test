import { useState } from "react";
import Dashboard from './components/dashboard';
import Sidebar from './components/sidebar';
import Topbar from "./components/topbar";
import Coin from './components/coin';
import CoinDetail from './components/coinDetail';
import Home from './components/home';
import News from './components/news';
import Footer from './components/footer';
import ScrollToTop from "./components/scrollToTop";
import { Switch, Route, Redirect } from "react-router-dom"
import './App.css';

function App() {

  const [menuCollapse, setMenuCollapse] = useState(false)

    const menuIconClick = () => {
        menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
        console.log(menuCollapse)
      };

  return (    
      <div className="App">
          <div className="contain">
            <ScrollToTop />
            <Sidebar menuCollapse={menuCollapse}/>
            <Topbar menuIconClick={menuIconClick} menuCollapse={menuCollapse}/>
            <Switch>
                  <Route path="/home"  component={() => <Home menuCollapse={menuCollapse} />} />
                  <Route path="/dashboard" component={() => <Dashboard menuCollapse={menuCollapse}/>} />
                  <Route exact path="/coin"  component={() => <Coin menuCollapse={menuCollapse} />} />
                  <Route path="/news"  component={() => <News menuCollapse={menuCollapse} />} />
                  <Route path="/coin/:coinId" component={() => <CoinDetail menuCollapse={menuCollapse} />} />
                  <Redirect to="/home" />
            </Switch>
            <Footer menuCollapse={menuCollapse} />            
          </div>
      </div>
  );
}

export default App;
