import React, { FC, useCallback, useEffect, useRef, useState, Fragment } from 'react';
import { Button, Col, Drawer, Form, Input, notification, Row, Space, Spin, Typography } from 'antd';
import { IndicatorIcon } from '../projects/common/Constants';
import { useDataProvider, useTranslate } from 'ra-core';
import DistributionServerService, { ConnectionResp, DispServer } from './service/DistributionServerService';
import { CheckCircleFilled, EyeInvisibleOutlined, EyeTwoTone, WarningFilled } from '@ant-design/icons/lib';

const { Text } = Typography;

interface Props {
    visible: boolean;
    server: DispServer;
    onClose: (reload: boolean) => void;
}

const AddServerForm: FC<Props> = (props: Props) => {
    const translate = useTranslate();

    const dataProvider = useDataProvider();
    const [server, setServer] = useState<DispServer>(DistributionServerService.emptyServer);
    const [connectionResp, setConnectionResp] = useState<ConnectionResp>();

    const [saving, setSaving] = useState(false);
    const [form] = Form.useForm();
    const serverNameRef = useRef<Input>(null);

    /**
     * Test database connection
     */
    const testConnection = useCallback(() => {
        setSaving(true);
        DistributionServerService.testConnection(dataProvider, server)
            .then(({ data, status }: any) => {
                if (status === 200) {
                    setConnectionResp(data);
                    setSaving(false);
                }
            })
            .catch((error: any) => {
                setSaving(false);
                notification['error']({
                    message: translate(`common.message.error`),
                    description: translate(`common.message.unknown_error_try_again`),
                });
            });
    }, [dataProvider, server, translate]);

    const onSaveClick = () => {
        form.submit();
    };

    const onFormFinish = () => {
        console.log('AddServerForm.tsx -> onFormFinish', server);
        if (server) {
            doSave(server).then();
        }
    };
    const onFormFinishFailed = () => {};

    const onFormValuesChange = (changedValues: any, allValues: any) => {
        console.log('AddServerForm.tsx -> onFormValuesChange', allValues);
        setServer(allValues);
    };

    /**
     * Insert of Update
     */
    const doSave = useCallback(
        async (server: DispServer) => {
            setSaving(true);
            DistributionServerService.save(dataProvider, server)
                .then(({ data, status }: any) => {
                    setSaving(false);
                    if (status === 200) {
                        props.onClose(true);
                    } else {
                        notification['error']({
                            message: translate(`common.message.error`),
                            description: translate(`common.message.unknown_error_try_again`),
                        });
                    }
                })
                .catch((error: any) => {
                    setSaving(false);
                    notification['error']({
                        message: translate(`common.message.error`),
                        description: translate(`common.message.unknown_error_try_again`),
                    });
                });
        },
        [dataProvider, props, translate]
    );

    useEffect(() => {
        form.setFieldsValue(props.server);
        setServer(props.server);

        if (serverNameRef.current !== null) {
            serverNameRef.current.focus();
        }
    }, [form, props.server]);

    return (
        <Drawer
            title={
                server.id && server.id > 0
                    ? translate(`resources.distributionservers.form.edit_server`)
                    : translate(`resources.distributionservers.form.add_server`)
            }
            placement="right"
            onClose={() => props.onClose(false)}
            visible={props.visible}
            width="500"
            maskClosable={false}
            keyboard={false}
            destroyOnClose={true}
            footer={
                <div
                    style={{
                        textAlign: 'right',
                    }}
                >
                    <Space>
                        <Button onClick={() => props.onClose(false)} className="mz-btn mz-drawer-btn-footer">
                            {translate(`common.button.cancel`)}
                        </Button>
                        <Button
                            loading={saving}
                            disabled={!connectionResp || connectionResp.status === 0 ? true : false}
                            onClick={onSaveClick}
                            type="primary"
                            className="mz-btn mz-drawer-btn-footer"
                        >
                            {translate(`common.button.save`)}
                        </Button>
                    </Space>
                </div>
            }
        >
            <Spin indicator={IndicatorIcon} spinning={saving} tip={translate(`common.message.processing`)}>
                <Form
                    layout="vertical"
                    form={form}
                    onFinish={onFormFinish}
                    onFinishFailed={onFormFinishFailed}
                    scrollToFirstError={true}
                    onValuesChange={(changedValues, allValues) => onFormValuesChange(changedValues, allValues)}
                >
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="name"
                                label={translate(`resources.distributionservers.form.server_name.label`)}
                                rules={[
                                    {
                                        message: translate(
                                            `resources.distributionservers.form.server_name.error.required`
                                        ),
                                        required: true,
                                    },
                                ]}
                            >
                                <Input
                                    ref={serverNameRef}
                                    autoFocus={true}
                                    placeholder={translate(`resources.distributionservers.form.server_name.label`)}
                                    autoComplete="off"
                                />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Text className="form-label-header">
                                {translate(`resources.distributionservers.form.database_connection`)}
                            </Text>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="host"
                                label={translate(`resources.distributionservers.form.host.label`)}
                                rules={[
                                    {
                                        message: translate(`resources.distributionservers.form.host.error.required`),
                                        required: true,
                                    },
                                ]}
                            >
                                <Input
                                    placeholder={translate(`resources.distributionservers.form.host.label`)}
                                    autoComplete="off"
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="port"
                                label={translate(`resources.distributionservers.form.port.label`)}
                                rules={[
                                    {
                                        message: translate(`resources.distributionservers.form.port.error.required`),
                                        required: true,
                                    },
                                ]}
                            >
                                <Input
                                    placeholder={translate(`resources.distributionservers.form.port.label`)}
                                    autoComplete="off"
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="username"
                                label={translate(`resources.distributionservers.form.username.label`)}
                                rules={[
                                    {
                                        message: translate(
                                            `resources.distributionservers.form.username.error.required`
                                        ),
                                        required: true,
                                    },
                                ]}
                            >
                                <Input
                                    placeholder={translate(`resources.distributionservers.form.username.label`)}
                                    autoComplete="off"
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="password"
                                label={translate(`resources.distributionservers.form.password.label`)}
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Input.Password
                                    autoComplete="off"
                                    placeholder={translate(`resources.distributionservers.form.password.label`)}
                                    iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                name="database"
                                label={translate(`resources.distributionservers.form.database.label`)}
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Input
                                    placeholder={translate(`resources.distributionservers.form.database.label`)}
                                    autoComplete="off"
                                />
                            </Form.Item>
                            <Row>
                                <Col flex="auto">
                                    {connectionResp && connectionResp.status === 0 && (
                                        <Fragment>
                                            <WarningFilled style={{ color: '#faad14' }} /> {connectionResp.title}
                                        </Fragment>
                                    )}

                                    {connectionResp && connectionResp.status === 1 && (
                                        <Fragment>
                                            <CheckCircleFilled style={{ color: '#52c41a' }} /> {connectionResp.title}
                                        </Fragment>
                                    )}
                                </Col>
                                <Col flex="150px" style={{ textAlign: 'right' }}>
                                    <Button size="small" onClick={e => testConnection()}>
                                        {translate(`resources.distributionservers.form.test_connection`)}
                                    </Button>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={24} style={{ paddingTop: 16 }}>
                            <Text className="form-label-header">
                                {translate(`resources.distributionservers.form.api_server`)}
                            </Text>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                name="contextPath"
                                label={translate(`resources.distributionservers.form.server_context_path.label`)}
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Input
                                    placeholder={translate(
                                        `resources.distributionservers.form.server_context_path.label`
                                    )}
                                    autoComplete="off"
                                />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                name="chatServer"
                                label={translate(`resources.distributionservers.form.chat_server.label`)}
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Input
                                    placeholder={translate(`resources.distributionservers.form.chat_server.label`)}
                                    autoComplete="off"
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Spin>
        </Drawer>
    );
};

export default AddServerForm;
