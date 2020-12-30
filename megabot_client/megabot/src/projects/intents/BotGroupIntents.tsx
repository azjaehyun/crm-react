import React, { FC, useState, useEffect, useCallback } from 'react';
import { Button, Row, Col, Space, notification, Empty } from 'antd';
import { DownloadOutlined, UploadOutlined } from '@ant-design/icons';

import { Error, useTranslate } from 'react-admin';
import { SmileOutlined, ReloadOutlined } from '@ant-design/icons/lib';
import IntentService, { IntentQuery } from '../service/intentService';
import { useDataProvider } from 'ra-core';
import BotGroupIntentsList from './BotGroupIntentList';
import BotGroupService from '../service/botGroupService';
import { setAnnotationColor } from './index';

let DEFAULT_INTENT_PARAMS: IntentQuery = {
    responseType: 'ALL',
    offset: 0,
    limit: 10000,
};

interface Prods {
    botId: any;
}

const BotGroupIntents: FC<Prods> = (prods: Prods) => {
    const dataProvider = useDataProvider();
    const translate = useTranslate();

    const [botGroup, setBotGroup] = useState();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const [intentList, setIntentList] = useState([]);

    const [mapColor, setMapColor] = useState(new Map());

    /**
     * load bot group info
     */
    const loadBotGroupInfo = useCallback(async () => {
        setLoading(true);
        BotGroupService.getBot(dataProvider, prods.botId)
            .then(({ status, data }: any) => {
                setLoading(false);
                if (status === 200) {
                    setBotGroup(data);
                    return data;
                } else {
                    setError(true);
                    notification['error']({
                        message: translate(`common.message.error`),
                        description: data.message,
                    });
                }
            })
            .catch((error: any) => {
                setLoading(false);
                setError(true);
                notification['error']({
                    message: translate(`common.message.error`),
                    description: translate(`common.message.unknown_error_try_again`),
                });
            });
    }, [dataProvider, prods.botId, translate]);

    /**
     * Load intent list
     */
    const loadIntentList = useCallback(async () => {
        IntentService.search(dataProvider, prods.botId, DEFAULT_INTENT_PARAMS)
            .then(({ data }: any) => {
                const { intents, mapColor } = setAnnotationColor(data.list);
                setIntentList(intents);
                setMapColor(mapColor);
                return data;
            })
            .catch((error: any) => {
                setError(error);
            });
    }, [dataProvider, prods.botId]);

    // end: intent event handler
    useEffect(() => {
        loadBotGroupInfo().then();
    }, [loadBotGroupInfo]);

    useEffect(() => {
        loadIntentList().then();
    }, [loadIntentList]);

    if (!botGroup) return null;
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
                        Confirm Intents ({intentList.length})
                    </h5>
                </Col>
                <Col span={16} style={{ textAlign: 'right' }}>
                    {intentList.length > 0 && (
                        <Space>
                            <Button
                                icon={<ReloadOutlined />}
                                onClick={() => loadBotGroupInfo()}
                                className="mz-link-btn"
                            >
                                {translate(`common.button.reload`)}
                            </Button>
                            <Button icon={<DownloadOutlined />} className="mz-link-btn">
                                {translate(`common.button.import`)}
                            </Button>
                            <Button icon={<UploadOutlined />} className="mz-link-btn">
                                {translate(`common.button.export`)}
                            </Button>
                        </Space>
                    )}
                </Col>
            </Row>
            <Row>
                <Col span={24} style={{ paddingBottom: 16 }}>
                    {(setLoading || intentList.length > 0) && (
                        <BotGroupIntentsList
                            loading={loading}
                            intentList={intentList}
                            botGroup={botGroup}
                            onChange={loadBotGroupInfo}
                        />
                    )}

                    {!setLoading && intentList.length === 0 && (
                        <Empty
                            className="mz-empty-big"
                            description={
                                <span>
                                    ( <SmileOutlined /> No confirm intent yet! )
                                </span>
                            }
                        />
                    )}
                </Col>
            </Row>
        </div>
    );
};

export default BotGroupIntents;
