import React from 'react';
import { useSelector } from 'react-redux';
import { Layout, Sidebar } from 'react-admin';
import AppBar from './AppBar';
import ProjectMenu from './ProjectMenu';
import AdminMenu from './AdminMenu';
import TalkBotBtn from './TalkBotBtn';

import { darkTheme, lightTheme } from './themes';
import { AppState } from '../types';
import { useLocation, Link } from 'react-router-dom';

import 'antd/dist/antd.css';
import { Card } from 'antd';
import { SettingOutlined, DashboardOutlined } from '@ant-design/icons';

import './scss/Layout.scss';

const { Meta } = Card;

const CustomSidebar = (props: any) => <Sidebar {...props} size={200} />;

export default (props: any) => {
    const theme = useSelector((state: AppState) => (state.theme === 'light' ? lightTheme : darkTheme));
    const location = useLocation<{ nextPathname: string } | null>();

    // console.log( location.pathname );
    console.log(location.state ? location.state.nextPathname : '/');

    if (location.pathname === '/transferProject') {
        return (
            <div className="layout-container">
                <Link to="/project/dashboard">
                    <Card className="card left">
                        <Meta
                            avatar={<DashboardOutlined className="card-icon" />}
                            title="Dashboard"
                            description="Go to Dashboard"
                        />
                    </Card>
                </Link>
                <Link to="/admin/system-confiquration">
                    <Card className="card">
                        <Meta
                            avatar={<SettingOutlined className="card-icon" />}
                            title="System"
                            description="/admin/system-confiquration"
                        />
                    </Card>
                </Link>
            </div>
        );
    } else {
        return (
            <Layout
                {...props}
                appBar={AppBar}
                sidebar={CustomSidebar}
                menu={location.pathname.match('/admin') ? AdminMenu : ProjectMenu}
                theme={theme}
            />
        );
    }
};
