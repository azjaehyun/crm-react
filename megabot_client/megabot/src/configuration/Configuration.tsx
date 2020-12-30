import React, {FC, useCallback, useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Button, Col, Drawer, Form, Input, Modal, Row, Typography} from 'antd';
import {useTranslate, useLocale, useSetLocale} from 'react-admin';
import {changeTheme} from './actions';
import {AppState} from '../types';
import {useDataProvider, useVersion} from "ra-core";
import {Method} from "ra-data-simple-rest/lib";
import regexData from "../userManagement/regexData";
import ChangePassword from "./Section/ChangePassword";

const {Title, Text} = Typography;

interface Props {
    visible: boolean;
    onClose: any;
    // onSave: () => void;
}

interface User {
    id: string;
    username: string;
    avatarUrl: string;
    fullName: string;
    email: string;
    status: string;
    roles: string[];
    languageCode: string;
    createOn: string;
    updateOn: string;
    authorities: any[];
}

const initialUser = {
    id: "",
    username: "",
    avatarUrl: "",
    fullName: "",
    email: "",
    status: "",
    roles: [],
    languageCode: "",
    createOn: "",
    updateOn: "",
    authorities: []
}


const Configuration: FC<Props> = props => {
    const version = useVersion();
    const dataProvider = useDataProvider();
    const [form] = Form.useForm();

    const translate = useTranslate();
    const locale = useLocale();
    const setLocale = useSetLocale();
    const theme = useSelector((state: AppState) => state.theme);
    const dispatch = useDispatch();

    const [user, setUser] = useState<User>(initialUser);
    const [loginUser, setLoginUser] = useState<User>(JSON.parse(localStorage.getItem('logged-user') || '{}'));

    const getUser = useCallback(async () => {
        const {username} = loginUser;
        const response = await dataProvider.execute({
            method: Method.GET,
            resource: `user/${username}/info`,
        })
        setUser(response.data)

        form.setFieldsValue({
            username: response.data.username,
            fullName: response.data.fullName,
            email: response.data.email,
        })
    }, [dataProvider, user, setUser, form, loginUser])
    useEffect(() => {
        if (loginUser.username !== "" && loginUser.username !== undefined) {
            getUser()
        } else {
            setTimeout(() => {
                setLoginUser(JSON.parse(localStorage.getItem('logged-user') || '{}'))
            }, 1000)
        }
        // setLoginUser(JSON.parse(localStorage.getItem('logged-user') || '{}'))
    }, [version, loginUser])

    const [changePasswordModalVisible, setChangePasswordModalVisible] = useState<boolean>(false);

    const closeHandler = () => {
        form.setFieldsValue({
            username: user.username,
            fullName: user.fullName,
            email: user.email,
        })
        props.onClose()
        setChangePasswordModalVisible(false);
    }

    return (
        <Drawer
            title={translate('pos.configuration')}
            visible={props.visible}
            maskClosable={false}
            onClose={props.onClose}
            width={400}
            // onSave={onSave}
            footer={
                <div style={{textAlign: 'right',}}>
                    <Button
                        onClick={() => {
                            closeHandler()
                        }}
                        style={{marginRight: 8}}
                    >Cancel</Button>
                    <Button
                        onClick={() => {
                            closeHandler()
                        }}
                        type="primary"
                    >Save</Button>
                </div>
            }
        >
            <Form className="config-form" form={form} layout="vertical">
                <Row gutter={16}>
                    <Col span={24}>

                    </Col>
                    <Col span={24}>
                        {/*<Form.Item name={'username'} label={translate('resources.profile.label.user_name')}>*/}
                        {/*    <Input placeholder={translate('resources.profile.placeholder.user_name')}/>*/}
                        {/*</Form.Item>*/}
                        <div>
                            <Text style={{color: "#262626"}}>{translate('resources.profile.label.user_name')}</Text>
                        </div>
                        <div>
                            <Row>
                                <Col span={16}>
                                    <Title style={{color: "black", marginTop: 0}} level={4}>{user.username}</Title>
                                </Col>
                                <Col span={8}>
                                    <ChangePassword
                                        visible={changePasswordModalVisible}
                                        setVisible={setChangePasswordModalVisible}
                                    />
                                </Col>
                            </Row>
                        </div>
                    </Col>
                    <Col span={24}>
                        <Form.Item name={'fullName'} label={translate('resources.profile.label.full_name')}>
                            <Input placeholder={translate('resources.profile.placeholder.full_name')}/>
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item name={'email'} label={translate('resources.profile.label.email')}>
                            <Input placeholder={translate('resources.profile.placeholder.email')}/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label={translate('pos.theme.name')}>
                            <Button
                                type={theme === 'light' ? 'primary' : 'default'}
                                onClick={() => dispatch(changeTheme('light'))}
                                style={{marginRight: 5}}
                            >
                                {translate('pos.theme.light')}
                            </Button>
                            <Button
                                type={theme === 'dark' ? 'primary' : 'default'}
                                onClick={() => dispatch(changeTheme('dark'))}
                            >
                                {translate('pos.theme.dark')}
                            </Button>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label={translate('pos.language')}>
                            <Button
                                type={locale === 'en' ? 'primary' : 'default'}
                                onClick={() => setLocale('en')}
                                style={{marginRight: 5}}
                            >
                                en
                            </Button>
                            {/*<Button*/}
                            {/*    type={locale === 'fr' ? 'primary' : 'default'}*/}
                            {/*    onClick={() => setLocale('fr')}*/}
                            {/*    style={{ marginRight: 5 }}*/}
                            {/*>*/}
                            {/*    fr*/}
                            {/*</Button>*/}
                            <Button type={locale === 'kr' ? 'primary' : 'default'} onClick={() => setLocale('kr')}>
                                kr
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Drawer>
    );
};

export default Configuration;
