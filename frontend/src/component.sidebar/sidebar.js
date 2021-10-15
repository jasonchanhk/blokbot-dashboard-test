import { useState } from "react";
import { ProSidebar, SidebarHeader, SidebarFooter, SidebarContent, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { FaBitcoin, FaChartBar, FaGratipay, FaEnvelopeOpenText } from 'react-icons/fa';
import 'react-pro-sidebar/dist/css/styles.css';

function Sidebar({menuCollapse}){

    return(
        <ProSidebar collapsed={menuCollapse} style={{ height: "170vh"}} breakPoint={'md'} width={"220px"} collapsedWidth={"70px"}>
            <SidebarHeader>
                <div style={{ padding: "22px" }}>
                    <img src={process.env.PUBLIC_URL + '/Blokbot-Final-logo-10-1-e1630483230481.png'} alt="blokbot" width="30" height="30"/>                                  
                </div>
            </SidebarHeader>
            <SidebarContent>
                <Menu iconShape="header">
                    <MenuItem icon={<FaChartBar />}>Dashboard</MenuItem>
                    <SubMenu title="Components" icon={<FaGratipay />}>
                        <MenuItem>Component 1</MenuItem>
                        <MenuItem>Component 2</MenuItem>
                    </SubMenu>
                    <SubMenu title="Components" icon={<FaEnvelopeOpenText />}>
                        <MenuItem>Component 1</MenuItem>
                        <MenuItem>Component 2</MenuItem>
                    </SubMenu>
                    <SubMenu title="Components" icon={<FaBitcoin />}>
                        <MenuItem>Component 1</MenuItem>
                        <MenuItem>Component 2</MenuItem>
                    </SubMenu>
                </Menu>
            </SidebarContent>
            <SidebarFooter>
                <div style={{ padding: "24px" }}>
                    <span>Jason Chan 2021</span>
                </div>
            </SidebarFooter>
        </ProSidebar>
        
    )
}

export default Sidebar;