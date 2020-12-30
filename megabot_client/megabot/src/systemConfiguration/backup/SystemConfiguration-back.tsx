import React from 'react';
import { MenuItemLink, useTranslate } from 'react-admin';
import { Avatar, Layout } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import { Route, Switch } from 'react-router-dom';

import General from './General';
import EmailSettings from './EmailSettings';
import ServerConfig from './ServerConfig';
import '../scss/SysytemConfig.scss';

const { Sider, Content } = Layout;

const SystemConfiguration = () => {
    const translate = useTranslate();

    return (
        <Layout>
            <Sider className="mz-bot-sider">
                <div style={{ textAlign: 'center', padding: '16px 0px' }}>
                    <Avatar size={100} shape="circle" icon={<SettingOutlined />} />
                </div>
                <div className="mz-config-menu">
                    <MenuItemLink
                        to={`/project/system-confiquration/general`}
                        primaryText={translate(`resources.systemconfiguration.menu.general`)}
                    />
                    <MenuItemLink
                        to={`/project/system-confiquration/serverConfig`}
                        primaryText={translate(`resources.systemconfiguration.menu.serverconfig`)}
                    />
                    <MenuItemLink
                        to={`/project/system-confiquration/email`}
                        primaryText={translate(`resources.systemconfiguration.menu.email`)}
                    />
                </div>
            </Sider>
            <Layout className="system-config-layout">
                <Content className="system-config-contents">
                    <Switch>
                        <Route exact path="/project/system-confiquration/general">
                            <General />
                        </Route>
                        <Route path="/project/system-confiquration/serverConfig">
                            <ServerConfig />
                        </Route>
                        <Route path="/project/system-confiquration/email">
                            <EmailSettings />
                        </Route>
                        <Route path="/project/system-confiquration">
                            <General />
                        </Route>
                    </Switch>
                </Content>
            </Layout>
        </Layout>
    );
};

export default SystemConfiguration;
