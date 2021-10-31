import { ProSidebar, SidebarHeader, SidebarFooter, SidebarContent, Menu, MenuItem } from 'react-pro-sidebar';
import { FaBitcoin, FaChartBar, FaNewspaper, FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import 'react-pro-sidebar/dist/css/styles.css';
import "./css/sidebar.css"

function Sidebar({menuCollapse}){

    return(
        <ProSidebar collapsed={menuCollapse} style={{ height: "100vh", position: "fixed"}} breakPoint={'md'} width={"220px"} collapsedWidth={"70px"}>
            <SidebarHeader>
                <div style={{ padding: "22px" }}>
                    <img src={process.env.PUBLIC_URL + '/Blokbot-Final-logo-10-1-e1630483230481.png'} alt="blokbot" width="30" height="30"/>                                  
                </div>
            </SidebarHeader>
            <SidebarContent>
                <Menu iconShape="header">
                    <MenuItem icon={<FaHome />}><Link to="/home"><span className="menu">Home</span></Link></MenuItem>
                    <MenuItem icon={<FaChartBar />}><Link to="/dashboard"><span className="menu">Dashboard</span></Link></MenuItem>
                    <MenuItem icon={<FaBitcoin />}><Link to="/coin"><span className="menu">Coin</span></Link></MenuItem>
                    <MenuItem icon={<FaNewspaper />}><Link to="/news"><span className="menu">News</span></Link></MenuItem>
                </Menu>
            </SidebarContent>
            <SidebarFooter>
                <div style={{ padding: "24px" }}>
                    <span></span>
                </div>
            </SidebarFooter>
        </ProSidebar>
        
    )
}

export default Sidebar;