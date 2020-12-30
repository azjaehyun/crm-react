import React, { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import SettingsIcon from '@material-ui/icons/Settings';
import { useMediaQuery, Theme } from '@material-ui/core';
import { useTranslate, DashboardMenuItem, MenuItemLink } from 'react-admin';
import { AppState } from '../types';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        height: `95vh`,
        overflow: `auto`,
        //border: `red solid`,
        backgroundColor: `#26344a`,
        color: `white`,
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
    });
    const translate = useTranslate();
    const isXSmall = useMediaQuery((theme: Theme) => theme.breakpoints.down('xs'));
    const open = useSelector((state: AppState) => state.admin.ui.sidebarOpen);

    useSelector((state: AppState) => state.theme); // force rerender on theme change

    return (
        <div className={classes.root}>
            <DashboardMenuItem to={`/project/dashboard`} onClick={onMenuClick} sidebarIsOpen={open} />

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
        </div>
    );
};

export default Menu;
