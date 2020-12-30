import React, {useCallback, useEffect, useState} from 'react';
import { MenuItemLink, useTranslate } from 'react-admin';
import {Avatar, Button, Col, Collapse, Divider, Layout, Menu, Row} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Route, Switch } from 'react-router-dom';
import Roles from './tabs/roles/Roles';
import Groups from './tabs/group/Groups';
import Users from './tabs/users/Users';
import Company from './tabs/company/Company';
import Department from './tabs/department/Department';
import './scss/UserManagement.scss';
import {makeStyles} from "@material-ui/core/styles";
import {useDataProvider, useVersion} from "ra-core";
import companyService, {CompanyEntity} from "./service/companyService";
import {Paper} from "@material-ui/core";

const useStyle = makeStyles({
    row: {padding: "10px"}
})
const {Panel} = Collapse;
const { Sider, Content, Header } = Layout;
const {Item} = Menu;

const UserManagement = () => {
    const classes = useStyle();
    const translate = useTranslate();

    const userManagement = {
        Company: {
            render: <Company/>
        }
    }
    const TAB = {
        Company: "Company",
        Department: 'Department',
        Group: 'Group',
        Role: 'Role',
        User: 'User'
    }

    const [selectedTab, setSelectedTab] = useState("Company");

    return (
        <div style={{backgroundColor: "#eee", width: '100%', height: '100%'}}>
            <Paper style={{margin: "10px", minHeight: '400px'}}>
                <Layout>
                    <Header>
                        <Menu
                            selectedKeys={[selectedTab]}
                            theme={"dark"}
                            mode={"horizontal"}
                        >
                            <Item
                                key={TAB.Company}
                                onClick={console.log}
                            ><div style={{width: "80px", textAlign: "center"}}>{TAB.Company}</div></Item>
                            <Item
                                key={TAB.Department}
                                onClick={e=>
                                    // @ts-ignore
                                    setSelectedTab(e.key)
                                }
                            ><div style={{width: "80px", textAlign: "center"}}>{TAB.Department}</div></Item>
                            <Item
                                key={TAB.Group}
                                onClick={e=>
                                    // @ts-ignore
                                    setSelectedTab(e.key)
                                }
                            ><div style={{width: "80px", textAlign: "center"}}>{TAB.Group}</div></Item>
                            <Item
                                key={TAB.User}
                                onClick={e=>
                                    // @ts-ignore
                                    setSelectedTab(e.key)
                                }
                            ><div style={{width: "80px", textAlign: "center"}}>{TAB.User}</div></Item>
                            <Item
                                key={TAB.Role}
                                onClick={e=>
                                    // @ts-ignore
                                    setSelectedTab(e.key)
                                }
                            ><div style={{width: "80px", textAlign: "center"}}>{TAB.Role}</div></Item>
                        </Menu>
                    </Header>
                    <Content>
                        <div>
                            <Row className={classes.row}>
                                <Col span={24}>
                                </Col>
                            </Row>
                        </div>
                    </Content>
                </Layout>
            </Paper>
        </div>
    );
};

export default UserManagement;
