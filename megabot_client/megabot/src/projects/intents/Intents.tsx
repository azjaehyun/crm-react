import React, { FC, useState, useEffect, useCallback } from 'react';
import { Button, Input, Row, Col, Modal, Space, notification, Empty, Upload } from 'antd';
import { PlusOutlined, DownloadOutlined, UploadOutlined } from '@ant-design/icons';

import IntentsList from './IntentsList';
import CreateIntentForm from './CreateIntentForm';
import IntentsFork from './IntentsFork';
import { setAnnotationColor } from './index';

import { Error, useTranslate, Loading } from 'react-admin';
import { SmileOutlined, ReloadOutlined, RetweetOutlined, ExclamationCircleOutlined } from '@ant-design/icons/lib';
import { API_ERROR_MESSAGES, UNKNOWN_INTENT_ID } from '../common/Constants';
import IntentService, { IntentQuery } from '../service/intentService';
import { useDataProvider } from 'ra-core';
import moment from 'moment';
import SaveFile from '../common/SaveFile';

const { Search } = Input;
const { confirm } = Modal;

interface Prods {
    bot: any;
}

let DEFAULT_INTENT_PARAMS: IntentQuery = {
    responseType: 'ALL',
    offset: 0,
    limit: 10000,
};

let DEFAULT_INTENT = {
    id: UNKNOWN_INTENT_ID,
    name: '',
    sentences: [],
};

const Intents: FC<Prods> = (prods: Prods) => {
    const dataProvider = useDataProvider();
    const translate = useTranslate();

    const [visibleCreateForm, setVisibleCreateForm] = useState(false);
    const [visibleModal, setVisibleModal] = useState(false);
    const [keyword, setKeyword] = useState('');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const [intentList, setIntentList] = useState([]);
    const [intentParams, setIntentParams] = useState(DEFAULT_INTENT_PARAMS);
    const [selectedIds, setSelectedIds] = useState<Array<string>>([]);
    const [selectedIntent, setSelectedIntent] = useState({
        ...DEFAULT_INTENT,
        botId: prods.bot.id,
    });
    const [searchIntentList, setSearchIntentList] = useState([]);

    const [mapColor, setMapColor] = useState(new Map());
    const [saving, setSaving] = useState(false);

    const showDrawer = (intent: any) => {
        if (intent) {
            setSelectedIntent({ ...intent });
        } else {
            setSelectedIntent({ ...DEFAULT_INTENT, botId: prods.bot.id });
        }
        setVisibleCreateForm(true);
    };

    const closeDraw = () => {
        setVisibleCreateForm(false);
    };

    const onSaveClick = (intent: any) => {
        intent.id = selectedIntent.id;
        doCreateIntent(intent).then();
    };

    const closeModal = () => {
        setKeyword('');
        setVisibleModal(false);
    };

    // load intent list
    const loadIntentList = useCallback(async () => {
        setLoading(true);
        IntentService.search(dataProvider, prods.bot.id, intentParams)
            .then(({ data }: any) => {
                setLoading(false);
                const { intents, mapColor } = setAnnotationColor(data.list);

                setIntentList(intents);
                setMapColor(mapColor);
                console.log(data);
                // console.log('intents', intents);
            })
            .catch((error: any) => {
                setLoading(false);
                setError(error);
            });
    }, [dataProvider, intentParams, prods.bot.id]);

    /**
     * perform create/update intent
     */
    const doCreateIntent = useCallback(
        async intent => {
            setSaving(true);
            IntentService.createOrUpdate(dataProvider, prods.bot.id, intent)
                .then(({ data }: any) => {
                    notification['success']({
                        message: translate(`common.message.success`),
                        description:
                            intent.id !== UNKNOWN_INTENT_ID
                                ? translate(`resources.intents.message.update_completed`, { intent_name: intent.name })
                                : translate(`resources.intents.message.create_completed`, { intent_name: intent.name }),
                    });
                    setVisibleCreateForm(false);
                    setSaving(false);
                    loadIntentList().then();
                })
                .catch((error: any) => {
                    setSaving(false);
                    notification['error']({
                        message: translate(`common.message.error`),
                        description: translate(`common.message.unknown_error_try_again`),
                    });
                });
        },
        [dataProvider, loadIntentList, prods.bot.id, translate]
    );

    // start: intent event handler
    const onDeleteIntentHandler = useCallback(
        async (intentId: any, intentName: any) => {
            // console.log('delete intent', intentId);
            IntentService.delete(dataProvider, prods.bot.id, intentId)
                .then(({ data }: any) => {
                    notification['success']({
                        message: translate(`common.message.success`),
                        description: translate(`resources.intents.message.delete_completed`, {
                            intent_name: intentName,
                        }),
                    });
                    loadIntentList().then();
                })
                .catch((error: any) => {
                    notification['error']({
                        message: translate(`common.message.error`),
                        description: translate(`common.message.unknown_error_try_again`),
                    });
                });
        },
        [dataProvider, loadIntentList, prods.bot.id, translate]
    );

    const reloadIntentList = () => {
        loadIntentList().then();
    };

    const onRetrainClick = () => {
        confirm({
            title: translate(`resources.intents.message.retrain_confirm.title`),
            icon: <ExclamationCircleOutlined />,
            content: translate(`resources.intents.message.retrain_confirm.description`),
            okText: translate(`common.button.retrain`),
            cancelText: translate(`common.button.cancel`),
            onOk() {
                return IntentService.retrain(dataProvider, prods.bot.id)
                    .then(({ data }: any) => {
                        notification['success']({
                            message: translate(`common.message.success`),
                            description: translate(`resources.intents.message.retrain_completed`),
                        });
                    })
                    .catch((error: any) => {
                        notification['error']({
                            message: translate(`common.message.error`),
                            description: translate(`common.message.unknown_error_try_again`),
                        });
                    });
            },
            onCancel() {},
        });
    };

    const onSearch = (value: string) => {
        setKeyword(value);
        setVisibleModal(true);

        const params = {
            intentName: value,
        };

        IntentService.externalSearch(dataProvider, params)
            .then(({ data }: any) => {
                setLoading(false);
                setSearchIntentList(data.list);
            })
            .catch((error: any) => {
                setLoading(false);
                setError(error);
            });
    };
    const handleExportJson = () => {
        setLoading(true);
        IntentService.exportJson(dataProvider, prods.bot.id)
            .then((resp: any) => {
                setLoading(false);
                if (resp.status === 200) {
                    const fileName = 'intent_' + moment() + '.json';
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
            IntentService.importJson(dataProvider, prods.bot.id, JSON.parse(e.target.result))
                .then((resp: any) => {
                    setLoading(false);
                    if (resp.status === 200) {
                        notification['success']({
                            message: 'Success',
                            description: `Import ${resp.data.rowsAffected} intents successful!`,
                        });
                        loadIntentList();
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
        return isJpgOrPng && isLt2M;
    };
    // end: intent event handler
    useEffect(() => {
        loadIntentList().then();
    }, [loadIntentList]);

    if (!prods.bot) return <Loading />;
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
                        {translate(`resources.intents.name`)} ({intentList.length})
                    </h5>
                </Col>
                <Col span={16} style={{ textAlign: 'right' }}>
                    <Space>
                        {intentList.length > 0 && (
                            <>
                                <Button icon={<ReloadOutlined />} onClick={reloadIntentList} className="mz-link-btn">
                                    {translate(`common.button.reload`)}
                                </Button>
                                <Button icon={<RetweetOutlined />} className="mz-link-btn" onClick={onRetrainClick}>
                                    {translate(`common.button.retrain`)}
                                </Button>
                            </>
                        )}
                        {/*{selectedIds.length > 0 && (*/}
                        {/*    <Button*/}
                        {/*        icon={<DeleteOutlined style={{ color: 'red' }} />}*/}
                        {/*        className="mz-link-btn"*/}
                        {/*        onClick={() => {}}*/}
                        {/*    >*/}
                        {/*        Delete ({selectedIds.length})*/}
                        {/*    </Button>*/}
                        {/*)}*/}
                        <Upload name="file" showUploadList={false} beforeUpload={handleImportJson}>
                            <Button loading={loading} icon={<UploadOutlined />} className="mz-link-btn">
                                {translate(`common.button.import`)}
                            </Button>
                        </Upload>
                        <Button
                            loading={loading}
                            icon={<DownloadOutlined />}
                            className="mz-link-btn"
                            onClick={handleExportJson}
                        >
                            {translate(`common.button.export`)}
                        </Button>
                        {intentList.length > 0 && (
                            <Button
                                disabled={loading}
                                type="primary"
                                icon={<PlusOutlined />}
                                onClick={() => showDrawer(null)}
                            >
                                {translate(`resources.intents.button.create_intent`)}
                            </Button>
                        )}
                    </Space>
                </Col>
            </Row>
            {intentList.length > 0 && (
                <Row>
                    <Col span={24}>
                        <Search
                            placeholder={translate(`resources.intents.placeholder`)}
                            onSearch={value => onSearch(value)}
                            style={{ marginBottom: 10 }}
                        />
                    </Col>
                </Row>
            )}
            <Row>
                <Col span={24}>
                    {(loading || intentList.length > 0) && (
                        <IntentsList
                            loading={loading}
                            intentList={intentList}
                            onClickIntent={(intent: any) => showDrawer(intent)}
                            onRowCheckChange={(selectedRowKeys: any) => {
                                setSelectedIds(selectedRowKeys);
                            }}
                            onDeleteIntent={onDeleteIntentHandler}
                        />
                    )}

                    {!loading && intentList.length === 0 && (
                        <Empty
                            className="mz-empty-big"
                            description={
                                <span>
                                    ( <SmileOutlined /> {translate(`resources.intents.message.no_intent_yet`)} )
                                </span>
                            }
                        >
                            <Button type="primary" icon={<PlusOutlined />} onClick={() => showDrawer(null)}>
                                {translate(`resources.intents.button.create_intent`)}
                            </Button>
                        </Empty>
                    )}
                </Col>
            </Row>

            <CreateIntentForm
                saving={saving}
                visible={visibleCreateForm}
                intent={selectedIntent}
                mapColor={mapColor}
                onClose={closeDraw}
                onSave={onSaveClick}
            />

            <Modal title="Fork Intent" visible={visibleModal} footer={null} onCancel={closeModal} width={700}>
                {/*<Search*/}
                {/*    placeholder="Search and fork an intent from community"*/}
                {/*    prefix="#"*/}
                {/*    value={keyword}*/}
                {/*    enterButton*/}
                {/*    onSearch={value => onSearch(value)}*/}
                {/*/>*/}
                <IntentsFork keyword={keyword} list={searchIntentList} />
            </Modal>
        </div>
    );
};

export default Intents;
