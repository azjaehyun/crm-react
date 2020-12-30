import React, { FC, useCallback, useEffect, useState, Fragment } from 'react';
import { IndicatorIcon } from '../common/Constants';
import {
    Button,
    Col,
    Drawer,
    Empty,
    Form,
    Input,
    notification,
    Row,
    Select,
    Space,
    Spin,
    Table,
    Typography,
} from 'antd';
import { useDataProvider, useTranslate } from 'ra-core';
import DistributionServerService, { DispServer } from '../../distributionServers/service/DistributionServerService';
import { DeployFormData, DeployScheduleType, DeployServer } from './service/BotDeployService';
import { BotMemberEvent } from '../service/botGroupService';

const { Option } = Select;
const { Text } = Typography;

interface Prods {
    botId: string;
    visible: boolean;
    processing: boolean;
    deployedServers: Array<DeployServer>;
    onClose: (reload: boolean) => void;
    onDeploy: (serverIds: Array<number>, date: string) => void;
}

const DeployForm: FC<Prods> = (prods: Prods) => {
    const translate = useTranslate();
    const dataProvider = useDataProvider();
    const [loading, setLoading] = useState(false);
    // const [selectedServerIds, setSelectedServerIds] = useState();

    const [formData, setFormData] = useState<DeployFormData>({
        serverIds: [],
        scheduleType: DeployScheduleType.IMMEDIATELY,
        deployDate: '',
        deployTime: '',
    });
    const [distServerList, setDistServerList] = useState<Array<DispServer>>([]);
    const [form] = Form.useForm();

    /**
     * Load distribution servers
     */
    const loadDistServers = useCallback(async () => {
        setLoading(true);
        DistributionServerService.all(dataProvider)
            .then(({ data, status }: any) => {
                setLoading(false);
                if (status === 200) {
                    const deployedIds = prods.deployedServers.map(s => s.id);

                    const distServers = data.list as Array<DispServer>;
                    setDistServerList(distServers.filter((s: DispServer) => deployedIds.indexOf(s.id ? s.id : 0) < 0));
                }
            })
            .catch((error: any) => {
                setLoading(false);
                notification['error']({
                    message: translate(`common.message.error`),
                    description: translate(`common.message.unknown_error_try_again`),
                });
            });
    }, [dataProvider, prods.deployedServers, translate]);

    const onFormFinish = () => {
        const values = form.getFieldsValue();
        let date = '';
        if (DeployScheduleType.SPECIFIC_TIME === values.scheduleType) {
            date = values.deployDate + ' ' + values.deployTime;
        }

        prods.onDeploy(values.serverIds, date);
        // console.log('onFormFinish', values);
    };
    const onFormFinishFailed = () => {};
    const onFieldsChange = (changedFields: any, allFields: any) => {
        // console.log('onFieldsChange', allFields);
        // console.log('\tgetFieldsValue -> ', form.getFieldsValue());
        setFormData(form.getFieldsValue() as DeployFormData);
    };

    const onValuesChange = () => (changedValues: any, allValues: any) => {
        console.log('onValuesChange', allValues);
    };

    const columns: Array<any> = [
        {
            render: (dispServer: DispServer) => (
                <Fragment>
                    <div style={{ fontWeight: 600, color: '#666' }}>{dispServer.name}</div>
                    <div>
                        jdbc:mariadb://{dispServer.host}:{dispServer.port}/{dispServer.database}
                    </div>
                </Fragment>
            ),
        },
    ];

    const defaultValue: DeployFormData = {
        serverIds: [],
        scheduleType: DeployScheduleType.IMMEDIATELY,
        deployDate: '',
        deployTime: '',
    };

    useEffect(() => {
        loadDistServers().then();

        // setFormData(formData);
        // form.setFieldsValue(formData);
    }, [loadDistServers]);

    return (
        <Drawer
            title={translate(`resources.deploy.form.title`)}
            placement="right"
            onClose={() => prods.onClose(false)}
            visible={prods.visible}
            width="550"
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
                        <Button onClick={() => prods.onClose(false)} className="mz-btn mz-drawer-btn-footer">
                            {translate(`common.button.cancel`)}
                        </Button>
                        <Button
                            loading={prods.processing}
                            disabled={distServerList.length === 0}
                            onClick={(e: any) => {
                                e.preventDefault();
                                form.submit();
                            }}
                            type="primary"
                            className="mz-btn mz-drawer-btn-footer"
                        >
                            {translate(`common.button.deploy`)}
                        </Button>
                    </Space>
                </div>
            }
        >
            <Spin indicator={IndicatorIcon} spinning={prods.processing} tip={translate(`common.message.processing`)}>
                <Form
                    layout="vertical"
                    form={form}
                    onFinish={onFormFinish}
                    onFieldsChange={onFieldsChange}
                    onValuesChange={onValuesChange}
                    onFinishFailed={onFormFinishFailed}
                    scrollToFirstError={true}
                    initialValues={defaultValue}
                >
                    <Row gutter={16}>
                        <Col span={24}>
                            {(distServerList.length > 0 || loading) && (
                                <Form.Item
                                    name="serverIds"
                                    label={translate(`resources.deploy.form.select_server.label`)}
                                    rules={[
                                        {
                                            required: true,
                                            message: translate(`resources.deploy.form.select_server.error.required`),
                                        },
                                    ]}
                                >
                                    <Table
                                        className="mz-table"
                                        showHeader={false}
                                        // bordered
                                        size={'small'}
                                        style={{
                                            borderTop: '1px solid #f0f0f0',
                                            borderLeft: '1px solid #f0f0f0',
                                            borderRight: '1px solid #f0f0f0',
                                        }}
                                        tableLayout="auto"
                                        loading={loading}
                                        dataSource={distServerList}
                                        rowKey={(server: DispServer) => (server.id ? server.id : 0)}
                                        rowSelection={{
                                            onChange: (selectedRowKeys, selectedRows) => {
                                                // setSelectedServerIds(selectedRowKeys);
                                                let formData = form.getFieldsValue() as DeployFormData;
                                                formData.serverIds = selectedRowKeys as Array<number>;

                                                setFormData(formData);
                                                form.setFieldsValue(formData);
                                            },
                                        }}
                                        pagination={false}
                                        columns={columns}
                                    />
                                </Form.Item>
                            )}

                            {distServerList.length === 0 && !loading && (
                                <div style={{ marginBottom: 16 }}>
                                    <Empty className="mz-empty" description="No distribution servers yet." />
                                </div>
                            )}
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                name="scheduleType"
                                label={translate(`resources.deploy.form.deploy_at.label`)}
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Select>
                                    <Option value={DeployScheduleType.IMMEDIATELY}>
                                        {translate(`resources.deploy.form.deploy_at.options.immediately`)}
                                    </Option>
                                    <Option value={DeployScheduleType.SPECIFIC_TIME}>
                                        {translate(`resources.deploy.form.deploy_at.options.specific_time`)}
                                    </Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            {formData.scheduleType === DeployScheduleType.SPECIFIC_TIME && (
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Form.Item
                                            name="deployDate"
                                            label={translate(`resources.deploy.form.deploy_date.label`)}
                                            rules={[
                                                {
                                                    required:
                                                        formData.scheduleType === DeployScheduleType.SPECIFIC_TIME,
                                                    message: translate(
                                                        `resources.deploy.form.deploy_date.error.required`
                                                    ),
                                                },
                                            ]}
                                        >
                                            <Input autoComplete="off" type="date" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            name="deployTime"
                                            label={translate(`resources.deploy.form.deploy_time.label`)}
                                            rules={[
                                                {
                                                    required:
                                                        formData.scheduleType === DeployScheduleType.SPECIFIC_TIME,
                                                    message: translate(
                                                        `resources.deploy.form.deploy_time.error.required`
                                                    ),
                                                },
                                            ]}
                                        >
                                            <Input autoComplete="off" type="time" />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            )}
                        </Col>
                    </Row>
                </Form>
            </Spin>
        </Drawer>
    );
};

export default DeployForm;
