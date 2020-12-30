import React, {useCallback, useEffect, useState} from 'react';
import {Button, Col, Form, Input, Modal, Row} from "antd";
import regexData from "../../userManagement/regexData";
import {useDataProvider} from "ra-core";
import {Method} from "ra-data-simple-rest/lib";

interface Props {
    visible: boolean;
    setVisible: (boolean: boolean) => void;
}

function ChangePassword(props: Props) {
    const dataProvider = useDataProvider();

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const {visible, setVisible} = props
    const [formChange] = Form.useForm();
    const [formConfirm] = Form.useForm();
    useEffect(()=>{
        formConfirm.setFieldsValue({
            currentPassword: ""
        })
    }, [])

    const [isPassConfirmPwd, setIsPassConfirmPwd] = useState<boolean>(false);
    const [confirmValid, setConfirmValid] = useState<boolean>(true);
    const confirmPassword = useCallback(async () => {
        const currentPassword = formConfirm.getFieldValue('currentPassword')
        const response = await dataProvider.execute({
            method: Method.POST,
            resource: 'user/confirmPassword',
            body: currentPassword,
            serializeBody: false
        })
        setIsLoading(false);
        if(response.data){
            setIsPassConfirmPwd(true)
        } else {
            setConfirmValid(false)
        }
        formConfirm.validateFields()
    }, [setIsLoading, setIsPassConfirmPwd, formConfirm])

    return (<>
        <Button
            style={{width: "100%", height: "100%"}}
            type={'primary'}
            onClick={() => {
                setVisible(true);
            }}
        >Change Password</Button>
        <Modal
            title={"changePassword"}
            onCancel={() => {
                setVisible(false);
            }}
            onOk={() => {
                setVisible(false)
            }}
            visible={visible}
        >
            <Form className={'configForm'} form={formConfirm} layout={"vertical"}>
                <Form.Item
                    label={'changePassword'}
                    name={'currentPassword'}
                    initialValue={""}
                    rules={[{
                        validator: ()=>{
                            if(confirmValid){
                                return Promise.resolve();
                            } else {
                                return Promise.reject("Wrong password");
                            }
                        }
                    }]}
                >
                    <Row gutter={6}>
                        <Col span={15}>
                            <Input.Password
                                disabled={isPassConfirmPwd}
                                placeholder={'currentPassword'}
                                onChange={()=>{setConfirmValid(true)}}
                            />
                        </Col>
                        <Col span={9}>
                            <Button
                                disabled={isPassConfirmPwd}
                                style={{width: "100%"}}
                                type={'primary'}
                                onClick={() => {
                                    confirmPassword();
                                    // setVisible(true);
                                }}
                            >confirm Password</Button>
                        </Col>
                    </Row>
                </Form.Item>
            </Form>
            <Form className={'configForm'} form={formChange} layout={"vertical"}>
                <Form.Item
                    name={'password'}
                    label={'new password'}
                    dependencies={[]}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'please enter password!',
                        },
                        {
                            validator: (rule, pwd) => {
                                const rejectReason: Array<string> = [];
                                const {number, upper, lower, spacial} = regexData;

                                pwd.length < 8 && rejectReason.push('Minimum 8 characters');
                                number.exec(pwd) === null && rejectReason.push('Need number');
                                upper.exec(pwd) === null && rejectReason.push('Need upper character');
                                lower.exec(pwd) === null && rejectReason.push('Need lower character');
                                spacial.exec(pwd) === null &&
                                rejectReason.push('Need special character');

                                if (rejectReason.length === 0) {
                                    return Promise.resolve();
                                } else {
                                    return Promise.reject(rejectReason.join(' / '));
                                }
                            },
                        },
                    ]}
                >
                    <Input.Password
                        disabled={!isPassConfirmPwd}
                        style={{width: '100%'}}
                        placeholder={`Enter password`}
                    />
                </Form.Item>
                <Form.Item
                    name={'confirm'}
                    label={'confirm new password'}
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'please enter password!',
                        },
                        ({getFieldValue}) => ({
                            validator: (rule, v) => {
                                if (!v || getFieldValue('password') === v) {
                                    return Promise.resolve();
                                } else {
                                    return Promise.reject('Please confirm your password!');
                                }
                            },
                        }),
                    ]}
                >
                    <Input.Password
                        disabled={!isPassConfirmPwd}
                        style={{width: '100%'}}
                        placeholder={`Enter password`}
                    />
                </Form.Item>
            </Form>
        </Modal>
    </>);
}

export default ChangePassword;
