import { useDataProvider, useVersion } from 'ra-core';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { useTranslate } from 'react-admin';
import { Button, Col, Drawer, Form, Input, Radio, Row, Select, Space } from 'antd';
import { userRoleList } from '../../service/type';
import groupService, { GroupEntity } from '../../service/groupService';
import { UserCreateDto, UserEntity, userService } from '../../service/userService';
import regexData from '../../regexData';
import makeHash from "../../../utils/makeHash";

const { Option } = Select;

interface Props {
    getUserList: () => void;
    visible: boolean;

    onClose(): any;

    user: UserEntity;
    setUserId: (userId: string | undefined) => void;
    initializeUserData: () => void;
}

const AddUserForm: FC<Props> = props => {
    const avatarHash = makeHash(32);

    const version = useVersion();
    const dataProvider = useDataProvider();
    const translate = useTranslate();
    // const [birthday, setBirthDay] = useState<string>("");
    const [form] = Form.useForm();

    const [willInputPwd, setWillInputPwd] = useState<boolean>(false);

    const handleClose = () => {
        props.onClose();
        props.initializeUserData();
        props.setUserId(undefined);
        setWillInputPwd(false);
        form.resetFields([
            'roles',
            'defaultGroup',
            'password',
            'confirm',
            'username',
            'email',
            'fullName',
            'gender',
            'status',
        ]);
    };

    const onSaveClick = () => {
        const userCreateData: UserCreateDto = {
            role: form.getFieldValue('role'),
            defaultGroup: form.getFieldValue('defaultGroup'),
            username: form.getFieldValue('username'),
            email: form.getFieldValue('email'),
            password: props.user.id === '' && !willInputPwd ? makeHash(128, true) : form.getFieldValue('password'),
            fullName: form.getFieldValue('fullName'),
            gender: form.getFieldValue('gender'),
            status: form.getFieldValue('status') || 'ACTIVE',
            birthday: form.getFieldValue('birthday'),
            avatarUrl: `http://www.gravatar.com/avatar/${avatarHash}?d=retro&f=y`,
            avatarUrl200: `http://www.gravatar.com/avatar/${avatarHash}?d=retro&f=y?s=200`,
        };
        const validateTarget = [
            'role',
            'defaultGroup',
            'username',
            'email',
            'fullName',
            'gender',
            'status',
            'birthday',
        ];
        willInputPwd && validateTarget.concat(['password', 'confirm']);

        form.validateFields()
            .then(() => {
                const callback = () => {
                    props.getUserList();
                    handleClose();
                };
                if (props.user.id === '') {
                    userService.createUser(dataProvider, userCreateData).then(callback);
                } else {
                    userService.updateUser(dataProvider, { ...userCreateData, id: props.user.id }).then(callback);
                }
            })
            .catch(validator => {
                // console.log(validator.errorFields[0].errors)
                alert(validator.errorFields[0].errors);
            });
    };

    const [groupList, setGroupList] = useState<Array<GroupEntity>>([]);
    const getGroupList = useCallback(() => {
        groupService.getListGroup(dataProvider).then((res: Array<GroupEntity>) => {
            console.log(res);
            setGroupList(res);
        });
    }, [dataProvider]);

    form.setFieldsValue({
        role: props.user.roles[0],
        defaultGroup: props.user.defaultGroup,
        username: props.user.username,
        // 이메일 형식 안봄
        email: props.user.email,
        password: '',
        fullName: props.user.fullName,
        gender: props.user.gender,
        status: props.user.status,
        birthday: props.user.birthday,
        avatarUrl: `http://www.gravatar.com/avatar/${avatarHash}?d=retro&f=y`,
        avatarUrl200: `http://www.gravatar.com/avatar/${avatarHash}?d=retro&f=y?s=200`,
    });

    /**
     * initialize
     */
    useEffect(() => {
        getGroupList();
    }, [getGroupList, version]);

    return (
        <Drawer
            className="add-user-drawer"
            title={props.user.id === '' ? 'Create New User' : 'Edit User'}
            visible={props.visible}
            width="400"
            maskClosable={false}
            closable={false}
            footer={
                <div style={{ textAlign: 'right' }}>
                    <Space>
                        <Button onClick={handleClose} className="mz-btn mz-drawer-btn-footer">
                            {translate(`common.button.cancel`)}
                        </Button>
                        <Button onClick={onSaveClick} type="primary" className="mz-btn mz-drawer-btn-footer">
                            {translate(`common.button.save`)}
                        </Button>
                    </Space>
                </div>
            }
        >
            <Form layout={'vertical'} form={form} style={{ width: '100%' }}>
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item name={'role'} label={'Roles'} rules={[{ required: true, message: `Select Roles` }]}>
                            <Select>
                                {userRoleList.map((data: string, index: number) => {
                                    return (
                                        <Option key={index} value={data}>
                                            {data}
                                        </Option>
                                    );
                                })}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            name={'defaultGroup'}
                            label={'Default Group'}
                            rules={[{ required: true, message: `Select Default Group` }]}
                        >
                            <Select>
                                {groupList.map((group: GroupEntity, index: number) => {
                                    return (
                                        <Option key={index} value={group.name}>
                                            {group.name}
                                        </Option>
                                    );
                                })}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            name={'username'}
                            label={'User Name(id)'}
                            rules={[{ required: true, message: `Enter User Name` }]}
                        >
                            <Input
                                style={{ width: '100%' }}
                                placeholder={`Enter User Name`}
                                disabled={props.user.id !== ''}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        {!willInputPwd ? (
                            <Button
                                style={{ marginBottom: 10 }}
                                type={'primary'}
                                onClick={() => {
                                    setWillInputPwd(true);
                                }}
                            >
                                Input Password
                            </Button>
                        ) : (
                            <>
                                <Form.Item
                                    name={'password'}
                                    label={'password'}
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
                                                const { number, upper, lower, spacial } = regexData;

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
                                    <Input.Password style={{ width: '100%' }} placeholder={`Enter password`} />
                                </Form.Item>
                                <Form.Item
                                    name={'confirm'}
                                    label={'confirm password'}
                                    dependencies={['password']}
                                    hasFeedback
                                    rules={[
                                        {
                                            required: true,
                                            message: 'please enter password!',
                                        },
                                        ({ getFieldValue }) => ({
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
                                    <Input.Password style={{ width: '100%' }} placeholder={`Enter password`} />
                                </Form.Item>
                            </>
                        )}
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            name={'email'}
                            label={'Email'}
                            rules={[
                                { required: true, message: `Enter Email` },
                                {
                                    validator: (rule, value) => {
                                        if (
                                            regexData.isEmail.exec(value) !== null ||
                                            regexData.isEmail.exec(value) !== null
                                        ) {
                                            return Promise.resolve();
                                        } else {
                                            return Promise.reject('Need email format');
                                        }
                                    },
                                },
                            ]}
                        >
                            <Input style={{ width: '100%' }} placeholder={`Enter Email`} />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            name={'fullName'}
                            label={'Full Name'}
                            rules={[{ required: true, message: `Enter Full Name` }]}
                        >
                            <Input style={{ width: '100%' }} placeholder={`Enter Full Name`} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label={'Gender'}
                            name={'gender'}
                            rules={[{ required: false, message: `Select Gender` }]}
                        >
                            <Radio.Group style={{ width: '100%' }}>
                                <Radio.Button value={'MALE'}>Male</Radio.Button>
                                <Radio.Button value={'FEMALE'}>Female</Radio.Button>
                            </Radio.Group>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label={'Birthday'}
                            name={'birthday'}
                            rules={[{ required: false, message: `Select birthday` }]}
                        >
                            <Input id="datepicker" type="date" />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            label={'Status'}
                            name={'status'}
                            rules={[{ required: true, message: `Select Status` }]}
                        >
                            <Radio.Group style={{ width: '100%' }}>
                                <Radio.Button value={'ACTIVE'}>Active</Radio.Button>
                                <Radio.Button value={'INACTIVE'}>Inactive</Radio.Button>
                                <Radio.Button value={'PENDING'}>Pending</Radio.Button>
                            </Radio.Group>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Drawer>
    );
};

export default AddUserForm;
