import React, { FC, useCallback, useEffect, useState } from 'react';
import { Input, Button, Dropdown, Menu, Form, Row, Col, Typography, Space, Spin, notification, Upload } from 'antd';
import { DownloadOutlined, UploadOutlined, PlusOutlined } from '@ant-design/icons';

import EntitiesList from './EntitiesList';
import CreateEntityForm from './CreateEntityForm';
import EntityService from '../service/entityService';
import { Error, useTranslate, useDataProvider } from 'react-admin';
import { Entity } from '../../types';
import { API_ERROR_MESSAGES } from '../common/Constants';
import SaveFile from '../common/SaveFile';
import moment from 'moment';
const { Search } = Input;
const { Title } = Typography;

interface Prods {
    botId: any;
}

interface SystemEntity {
    key: string;
    name: string;
    description: string;
    isTurn: Boolean;
}

const Entities: FC<Prods> = (props: any) => {
    const dataProvider = useDataProvider();
    const translate = useTranslate();
    const [visible, setVisible] = useState(false);
    const [form] = Form.useForm();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const [activeLoading, setActiveLoading] = useState(false);
    const [entities, setEntities] = useState([]);
    const [systemEntities, setSystemEntities] = useState<SystemEntity[]>([]);
    const [selectedEntity, setSelectedEntity] = useState<Entity>({
        description: '',
        enrichmentBy: undefined,
        id: '',
        name: '',
        prefix: undefined,
        prefixes: [],
        suffixes: [],
        values: [],
    });
    const [params, setParams] = useState({});

    const loadEntities = useCallback(() => {
        setLoading(true);
        EntityService.getList(dataProvider, props.botId, params)
            .then((response: any) => {
                setLoading(false);
                if (response.status === 200) {
                    setEntities(response.data.list);
                }
            })
            .catch((error: any) => {
                setLoading(false);
                console.log(error);
            });
    }, [dataProvider, params, props.botId]);

    const loadSystemEntities = useCallback(() => {
        EntityService.getSystemEntities(dataProvider, props.botId)
            .then((response: any) => {
                if (response.status == 200) {
                    setSystemEntities(response.data);
                }
            })
            .catch((error: any) => {
                var error_info = JSON.parse(error.message);
                console.log(error_info);
            });
    }, [dataProvider, props.botId]);
    useEffect(() => {
        loadEntities();
        loadSystemEntities();
    }, [loadEntities, loadSystemEntities]);

    const showDrawer = (entity: any) => {
        if (!entity.id || entity.id === '') {
            console.log('Create new an entity');
            let entity: Entity = {
                description: '',
                enrichmentBy: undefined,
                id: '',
                name: '',
                prefix: undefined,
                prefixes: [],
                suffixes: [],
                values: [],
            };
            form.resetFields();
            setSelectedEntity(entity);
        } else {
            form.setFieldsValue(entity);
            setSelectedEntity(entity);
        }
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };

    const saveNewEntity = (entity: any) => {
        if (!entity) return;
        setActiveLoading(true);
        if (!entity.id || entity.id === '') {
            // (2) Create a new custom entity
            EntityService.create(dataProvider, props.botId, entity)
                .then((response: any) => {
                    setActiveLoading(false);
                    if (response.status === 200) {
                        notification['success']({
                            message: 'Success',
                            description: `Create a new entity successful!`,
                        });
                        loadEntities();
                        form.resetFields();
                        onClose();
                    } else {
                        const message = response.data ? response.data.message : API_ERROR_MESSAGES[response.status];
                        notification['error']({
                            message: 'Error',
                            description: message,
                        });
                    }
                })
                .catch((error: any) => {
                    console.log(error);
                });
        } else {
            // (3) Update a custom
            EntityService.update(dataProvider, props.botId, entity)
                .then((response: any) => {
                    setActiveLoading(false);
                    if (response.status === 200) {
                        notification['success']({
                            message: 'Success',
                            description: `Update entity successful!`,
                        });
                        entity.entityType === 'SYSTEM' ? loadSystemEntities() : loadEntities();
                        form.resetFields();
                        onClose();
                    } else {
                        const message = response.data ? response.data.message : API_ERROR_MESSAGES[response.status];
                        notification['error']({
                            message: 'Error',
                            description: message,
                        });
                    }
                })
                .catch((error: any) => {
                    console.log(error);
                });
        }
    };

    const deleteEntity = (entityId: any) => {
        setActiveLoading(true);
        EntityService.delete(dataProvider, props.botId, entityId)
            .then((response: any) => {
                setActiveLoading(false);
                if (response.status === 200) {
                    notification['success']({
                        message: 'Success',
                        description: `Delete entity successful!`,
                    });
                    loadEntities();
                }
            })
            .catch((error: any) => {
                console.log('Error during delete an entity', error);
            });
    };

    const turnOnSystemEntity = (systemEntity: any) => {
        setActiveLoading(true);
        EntityService.turnOnSystemEntity(dataProvider, props.botId, systemEntity)
            .then((response: any) => {
                setActiveLoading(false);
                if (response.status === 200) {
                    notification['success']({
                        message: 'Success',
                        description: `Turn on the system entity successful`,
                    });
                    loadSystemEntities();
                }
            })
            .catch((error: any) => {
                notification['success']({
                    message: 'Error',
                    description: `Error during turn on the system entity!`,
                });
                setActiveLoading(false);
                setSystemEntities(systemEntities);
            });
    };
    const handleExportJson = () => {
        setLoading(true);
        EntityService.exportAll(dataProvider, props.botId)
            .then((resp: any) => {
                setLoading(false);
                if (resp.status === 200) {
                    const fileName = 'entity_' + moment() + '.json';
                    SaveFile.saveJson(resp.data, fileName);
                }
            })
            .catch((error: any) => {});
    };

    const handleImportJson = (file: any) => {
        const isJpgOrPng = file.type === 'json';
        if (!isJpgOrPng) {
            console.log('You can only upload JSON file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            console.log('Image must smaller than 2MB!');
        }
        setLoading(true);
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = (e: any) => {
            console.log('--onload', e.target.result);
            EntityService.importJson(dataProvider, props.botId, JSON.parse(e.target.result))
                .then((resp: any) => {
                    setLoading(false);
                    if (resp.status === 200) {
                        notification['success']({
                            message: 'Success',
                            description: `Import ${resp.data.rowsAffected} entity successful!`,
                        });
                        loadEntities();
                    } else {
                        const message = resp.data ? resp.data.message : API_ERROR_MESSAGES[resp.status];
                        notification['error']({
                            message: 'Error',
                            description: message,
                        });
                    }
                })
                .catch((error: any) => {});
        };
        console.log(reader);
        return isJpgOrPng && isLt2M;
    };
    const entityExport = (
        <Menu onClick={handleExportJson}>
            <Menu.Item key="JSON">
                <DownloadOutlined />
                JSON
            </Menu.Item>
            <Menu.Item key="EXCEL">
                <DownloadOutlined />
                EXCEL
            </Menu.Item>
        </Menu>
    );

    if (error) return <Error />;
    return (
        <div className="content-body">
            <Row className="content-body-header">
                <Col span={8}>
                    <h5
                        className="ant-typography"
                        style={{
                            fontWeight: 'normal',
                            marginBottom: '0px',
                        }}
                    >
                        {translate(`resources.entities.name`)}
                    </h5>
                </Col>
                <Col span={16} style={{ textAlign: 'right' }}>
                    <Space>
                        <Upload name="file" showUploadList={false} beforeUpload={handleImportJson}>
                            <Button loading={loading} icon={<UploadOutlined />} className="mz-link-btn">
                                {translate(`common.button.import`)}
                            </Button>
                        </Upload>
                        {/*<Dropdown className="more-entity-btn" overlay={entityExport}>*/}
                        <Button
                            loading={loading}
                            icon={<DownloadOutlined />}
                            className="mz-link-btn"
                            onClick={handleExportJson}
                        >
                            {translate(`common.button.export`)}
                        </Button>
                        {/*</Dropdown>*/}
                        {/*<Button icon={<UploadOutlined />} className="mz-link-btn">*/}
                        {/*    {translate(`common.button.import`)}*/}
                        {/*</Button>*/}
                        <Button type="primary" icon={<PlusOutlined />} onClick={showDrawer}>
                            {translate(`resources.entities.button.create_entity`)}
                        </Button>
                        {/*<Dropdown className="more-entity-btn" overlay={entityMenu}>*/}
                        {/*    <Button>*/}
                        {/*        <EllipsisOutlined />*/}
                        {/*    </Button>*/}
                        {/*</Dropdown>*/}
                    </Space>
                </Col>
            </Row>

            <Row>
                <Col span={24}>
                    <Spin spinning={loading}>
                        <EntitiesList
                            activeLoading={activeLoading}
                            systemEntities={systemEntities}
                            entities={entities}
                            onSelectedEntityEvent={(entity: any) => showDrawer(entity)}
                            openEditFormEvent={showDrawer}
                            deleteEntityEvent={deleteEntity}
                            turnOnSystemEntityEvent={turnOnSystemEntity}
                        />
                    </Spin>
                </Col>
            </Row>

            <CreateEntityForm
                visible={visible}
                form={form}
                onClose={onClose}
                entity={selectedEntity}
                systemEntities={systemEntities}
                onFinish={saveNewEntity}
                saving={activeLoading}
                entities={entities}
            />
        </div>
    );
};

export default Entities;
