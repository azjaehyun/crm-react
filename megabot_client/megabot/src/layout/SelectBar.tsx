import React from 'react';
import { Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import { Menu, Dropdown, Button } from 'antd';
import { AppstoreOutlined, HomeOutlined, DashboardOutlined, SettingOutlined } from '@ant-design/icons';

const SelectBar = () => {
    const menu = (
        <Menu>
            <Menu.Item>
                <Link to={`/transferProject`}>
                    <div>
                        <HomeOutlined /> Home
                    </div>
                </Link>
            </Menu.Item>
            <Menu.Item>
                <Link to="/project/dashboard">
                    <div>
                        <DashboardOutlined /> Dashboard
                    </div>
                </Link>
            </Menu.Item>
            <Menu.Item>
                <Link to="/admin/system-confiquration">
                    <div>
                        <SettingOutlined /> Setting
                    </div>
                </Link>
            </Menu.Item>
        </Menu>
    );

    return (
        <Dropdown overlay={menu} placement="bottomCenter">
            <Button>
                <AppstoreOutlined />
                Move To Page
            </Button>
        </Dropdown>
    );
};

export default SelectBar;
