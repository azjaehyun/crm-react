import React from 'react';
import { MenuItemLink, useTranslate } from 'react-admin';
import { Avatar, Layout } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Route, Switch } from 'react-router-dom';
import Roles from './tabs/roles/Roles';
import Groups from './tabs/group/Groups';
import Users from './tabs/users/Users';
import Company from './tabs/company/Company';
import Department from './tabs/department/Department';
import './scss/UserManagement.scss';

const { Sider, Content } = Layout;

const UserManagement = () => {
    const translate = useTranslate();

    return (
        <Layout id={"wtf"}>
            <Sider className="mz-bot-sider" defaultValue={""}>
                <div style={{ textAlign: 'center', padding: '16px 0px' }}>
                    <Avatar size={100} shape="circle" icon={<UserOutlined />} />
                </div>
                <div className="mz-config-menu">
                    <MenuItemLink
                        to={`/project/userManagement/company`}
                        primaryText={translate(`resources.usermanagement.menu.company`)}
                    />
                    <MenuItemLink
                        to={`/project/userManagement/department`}
                        primaryText={translate(`resources.usermanagement.menu.department`)}
                    />
                    <MenuItemLink
                        to={`/project/userManagement/groups`}
                        primaryText={translate(`resources.usermanagement.menu.groups`)}
                    />
                    <MenuItemLink
                        to={`/project/userManagement/users`}
                        primaryText={translate(`resources.usermanagement.menu.users`)}
                    />
                    <MenuItemLink
                        to={`/project/userManagement/roles`}
                        primaryText={translate(`resources.usermanagement.menu.roles`)}
                    />
                </div>
            </Sider>
            <Layout className="user-management-layout">
                <Content className="user-management-contents">
                    <Switch>
                        <Route exact path='/project/userManagement'>
                            <div>welcome Page</div>
                        </Route>
                        <Route path="/project/userManagement/roles">
                            <Roles />
                        </Route>
                        <Route path="/project/userManagement/groups">
                            <Groups />
                        </Route>
                        <Route path="/project/userManagement/users">
                            <Users />
                        </Route>
                        <Route path="/project/userManagement/company">
                            <Company />
                        </Route>
                        <Route path="/project/userManagement/department">
                            <Department />
                        </Route>
                        {/*<Route path="/project/userManagement/">*/}
                        {/*    <Users />*/}
                        {/*</Route>*/}
                    </Switch>
                </Content>
            </Layout>
        </Layout>
    );
};

export default UserManagement;
