import React from 'react';
import { Route } from 'react-router-dom';
import Configuration from './configuration/Configuration';
import Projects from './projects/Projects';
import ProjectsDetail from './projects/ProjectsDetail';
import DistributionServers from './distributionServers/DistributionServers';
import SmartcardTemplate from './smartcardTemplate/SmartcardTemplate';
import UserManagement from './userManagement/UserManagement';
import SystemConfiguration from './systemConfiguration/SystemConfiguration';
import SystemLog from './systemLog/SystemLog';
import SystemStatus from './systemStatus/SystemStatus';
import TransferProject from './transferProject/TransferProject';
import DashBoard from './dashboard/Dashboard';
import BotMonitor from './botMonitor/BotMonitor';
import SystemMonitor from './systemMonitor/SystemMonitor';

export default [
    <Route exact path="/transferProject" render={() => <TransferProject />} />,

    <Route exact path="/project/DashBoard" render={() => <DashBoard />} />,
    <Route exact path="/project-list" render={() => <Projects />} />,
    <Route exact path="/project-details/:botId" render={() => <ProjectsDetail />} />,
    <Route exact path="/project-details/:botId/:submenu" render={() => <ProjectsDetail />} />,
    <Route exact path="/project/distribution-servers" render={() => <DistributionServers />} />,
    <Route exact path="/project/userManagement" render={() => <UserManagement />} />,
    <Route exact path="/project/userManagement/:submenu" render={() => <UserManagement />} />,
    <Route exact path="/project/system-confiquration" render={() => <SystemConfiguration />} />,
    <Route exact path="/project/system-confiquration/:submenu" render={() => <SystemConfiguration />} />,
    <Route exact path="/project/smartcard-template" render={() => <SmartcardTemplate />} />,
    <Route exact path="/project/bot-monitor" render={() => <BotMonitor />} />,
    <Route exact path="/project/system-monitor" render={() => <SystemMonitor />} />,

    <Route exact path="/admin/system-log" render={() => <SystemLog />} />,
    <Route exact path="/admin/system-status" render={() => <SystemStatus />} />,

    // <Route exact path="/configuration" render={() => <Configuration />} />,
];
