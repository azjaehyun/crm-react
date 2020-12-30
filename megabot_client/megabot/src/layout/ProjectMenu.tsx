import React, { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import SettingsIcon from '@material-ui/icons/Settings';
import { useMediaQuery, Theme } from '@material-ui/core';
import { useTranslate, DashboardMenuItem, MenuItemLink } from 'react-admin';

import projects from '../projects';
import userManagement from '../userManagement';
import systemConfiguration from '../systemConfiguration';
import distributionServers from '../distributionServers';
import botMonitor from '../botMonitor';
// import SubMenu from './SubMenu';
import { AppState } from '../types';
import { Scrollbars } from 'react-custom-scrollbars';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        height: `95vh`,
        overflow: `auto`,
        backgroundColor: `#26344a`,
    },
});

type MenuName = 'menuProjects' | 'menuUserManagement' | 'menuBoard' | 'menuCatalog' | 'menuSales' | 'menuCustomers';

interface Props {
    dense: boolean;
    logout: () => void;
    onMenuClick: () => void;
}

const Menu: FC<Props> = ({ onMenuClick, dense, logout }) => {
    const classes = useStyles();

    const [state, setState] = useState({
        menuProjects: false,
        menuUserManagement: false,
        menuBoard: false,
        menuCatalog: false,
        menuSales: false,
        menuCustomers: false,
        menuTabs: [],
    });

    const translate = useTranslate();
    const isXSmall = useMediaQuery((theme: Theme) => theme.breakpoints.down('xs'));
    const open = useSelector((state: AppState) => state.admin.ui.sidebarOpen);
    useSelector((state: AppState) => state.theme); // force rerender on theme change

    // const handleToggle = (menu: MenuName) => {
    //     setState(state => ({ ...state, [menu]: !state[menu] }));
    // };

    return (
        <div className={classes.root}>
            <Scrollbars
                autoHideTimeout={500}
                autoHideDuration={100}
                renderThumbVertical={props => <div {...props} className="scrollbar-thumb-vertical--project-menu" />}
            >
                <MenuItemLink
                    to={`/project-list`}
                    primaryText={translate(`resources.projects.name`, {
                        smart_count: 2,
                    })}
                    leftIcon={<projects.icon />}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                    dense={dense}
                />
                <DashboardMenuItem to={`/project/dashboard`} onClick={onMenuClick} sidebarIsOpen={open} />
                <MenuItemLink
                    to={`/project/usermanagement`}
                    primaryText={translate(`resources.usermanagement.name`, {
                        smart_count: 2,
                    })}
                    leftIcon={<userManagement.icon />}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                    dense={dense}
                />
                <MenuItemLink
                    to={`/project/system-confiquration`}
                    primaryText={translate(`resources.systemconfiguration.name`, {
                        smart_count: 2,
                    })}
                    leftIcon={<systemConfiguration.icon />}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                    dense={dense}
                />
                <MenuItemLink
                    to={`/project/distribution-servers`}
                    primaryText={translate(`resources.distributionservers.name`)}
                    leftIcon={<distributionServers.icon />}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                    dense={dense}
                />
                <MenuItemLink
                    to={`/project/bot-monitor`}
                    primaryText={translate(`resources.botmonitor.name`)}
                    leftIcon={<botMonitor.icon />}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                    dense={dense}
                />
                <MenuItemLink
                    to={`/project/system-monitor`}
                    primaryText={translate(`resources.systemmonitor.name`)}
                    leftIcon={<botMonitor.icon />}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                    dense={dense}
                />

                {isXSmall && (
                    <MenuItemLink
                        to="/configuration"
                        primaryText={translate('pos.configuration')}
                        leftIcon={<SettingsIcon />}
                        onClick={onMenuClick}
                        sidebarIsOpen={open}
                        dense={dense}
                    />
                )}
                {isXSmall && logout}
            </Scrollbars>
        </div>
    );
};

export default Menu;
