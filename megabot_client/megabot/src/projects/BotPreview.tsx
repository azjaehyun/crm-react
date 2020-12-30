import { BOT_LANGUAGES, Icon_SingleBot, NO_PHOTO } from './common/Constants';
import { Avatar, Button, Col, Descriptions, Modal, notification, Popover, Row, Spin, Tag, Typography } from 'antd';
import React, { FC, useCallback, useEffect, useState } from 'react';
import BotService from './service/botService';
import { useDataProvider, useTranslate } from 'react-admin';
import SmartCardPreview from './smartcard/SmartCardPreview';
import IntentService, { IntentQuery } from './service/intentService';
import { setAnnotationColor } from './intents';
import EntityService from './service/entityService';
import IntentsList from './intents/IntentsList';
import MyEntities from './entities/MyEntities';
const { Paragraph } = Typography;
interface Props {
    bot: any;
    loginUsername: any;
}
let DEFAULT_INTENT_PARAMS: IntentQuery = {
    responseType: 'ALL',
    offset: 0,
    limit: 10000,
};
const BotPreview: FC<Props> = props => {
    const dataProvider = useDataProvider();
    const translate = useTranslate();
    const [bot, setBot] = useState(props.bot);
    const [loading, setLoading] = useState(false);

    const [entities, setEntities] = useState();
    const [totalEntities, setTotalEntities] = useState(0);

    const [totalIntents, setTotalIntents] = useState(0);
    const [viewType, setViewType] = useState('');
    const [intents, setIntents] = useState([]);
    const onViewIntent = () => {
        setViewType('VIEW_INTENT');
        setLoading(true);
        IntentService.search(dataProvider, props.bot.id, DEFAULT_INTENT_PARAMS)
            .then(({ data }: any) => {
                // console.log(data);
                setLoading(false);

                const { intents, mapColor } = setAnnotationColor(data.list);
                setIntents(intents);
                setTotalIntents(data.totalCount);
                console.log('intents', intents);
            })
            .catch((error: any) => {
                setLoading(false);
            });
    };
    const closeModal = () => {
        setViewType('');
    };
    const onRowCheckChange = () => {};

    const onViewEntity = () => {
        setViewType('VIEW_ENTITIES');
        setLoading(true);
        EntityService.getList(dataProvider, props.bot.id, {})
            .then(({ data }: any) => {
                console.log('data: ', data);
                setLoading(false);
                setEntities(data.list);
            })
            .catch((error: any) => {
                setLoading(false);
                console.log(error);
            });
    };
    const onSelectedEntity = () => {};
    const deleteEntity = () => {};
    const onForkBot = () => {
        setLoading(true);
        BotService.forkBot(dataProvider, props.bot.id, props.loginUsername)
            .then(({ data }: any) => {
                notification['success']({
                    message: 'Success',
                    description: `Fork bot named ${bot.name} successful!`,
                });
                setLoading(false);
            })
            .catch((error: any) => {
                console.log(error);
                setLoading(false);
            });
    };
    useEffect(() => {
        setBot(props.bot);
    }, [props.bot]);

    return (
        <div>
            <Row className="content-body-header">
                <Col span={8}>
                    <Avatar
                        shape="square"
                        size="large"
                        src={bot.thumbnail ? bot.thumbnail : Icon_SingleBot}
                        style={{ width: 80, height: 80 }}
                    />
                </Col>
                <Col span={16}>
                    <Avatar
                        alt={BOT_LANGUAGES[bot.language].name}
                        size={20}
                        style={{ marginRight: '5px' }}
                        shape="square"
                        src={BOT_LANGUAGES[bot.language].icon}
                    />
                    <label style={{ fontWeight: 'bold', fontSize: '14px' }}>{bot.name}</label>
                    <Paragraph
                        ellipsis={{
                            rows: 2,
                            expandable: true,
                        }}
                    >
                        {bot.description ? bot.description : translate(`common.label.no_description`)}
                    </Paragraph>
                    {/*<Paragraph>*/}
                    {/*    Author: <label style={{ color: 'blue' }}>{bot.botOwner.username}</label>*/}
                    {/*</Paragraph>*/}
                    {/*<Paragraph>*/}
                    {/*    <Descriptions.Item label="Type">*/}
                    {/*        <Tag color="green">{bot.botType}</Tag>*/}
                    {/*    </Descriptions.Item>*/}
                    {/*</Paragraph>*/}
                </Col>
            </Row>

            <Row>
                <Col span={6}>Author: </Col>
                <Col span={18}>
                    <label style={{ color: 'blue' }}>{bot.user.username}</label>
                </Col>
            </Row>
            <Row>
                <Col span={6}>Bot type: </Col>
                <Col span={18}>
                    <Tag color="green">{bot.botType}</Tag>
                </Col>
            </Row>
            <Row>
                <Col span={6}>Created on: </Col>
                <Col span={18}>{bot.createdOn}</Col>
            </Row>
            <Row>
                <Col span={6}>Last updated: </Col>
                <Col span={18}>{bot.updatedOn}</Col>
            </Row>
            <Row>
                <Col span={6}>Published on:</Col>
                <Col>{bot.publishingDate}</Col>
            </Row>
            <Row>
                <Col span={6}>Use small talk</Col>
                <Col span={18}>{bot.turnOffIrQA ? 'FALSE' : 'TRUE'}</Col>
            </Row>
            <Row>
                <Col span={6}>Default Reply</Col>
                <Col span={18}>{bot.defaultReplyType}</Col>
            </Row>
            <Row>
                <Col span={6}>Intent:</Col>
                <Col span={18}>
                    {/*<span style={{ color: '#1890FF' }}>*/}
                    {/*    <a>#ask_weather</a>*/}
                    {/*</span>*/}
                    {/*<span style={{ color: '#1890FF', paddingLeft: '10px' }}>*/}
                    {/*    <a>#order_coffee</a>*/}
                    {/*</span>*/}
                    {/*<span style={{ color: '#1890FF', paddingLeft: '10px' }}>*/}
                    {/*    <a>#order_pizza</a>*/}
                    {/*</span>*/}
                    <a onClick={onViewIntent}>View Intents</a>
                </Col>
            </Row>
            <Row>
                <Col span={6}>Entities:</Col>
                <Col span={18}>
                    {/*<span style={{ color: '#1890FF' }}>*/}
                    {/*    <a>@coffee</a>*/}
                    {/*</span>*/}
                    {/*<span style={{ color: '#1890FF', paddingLeft: '10px' }}>*/}
                    {/*    <a>@pizza</a>*/}
                    {/*</span>*/}
                    {/*<span style={{ color: '#1890FF', paddingLeft: '10px' }}>*/}
                    {/*    <a>@location</a>*/}
                    {/*</span>*/}
                    <a onClick={onViewEntity}>View Entities</a>
                </Col>
            </Row>
            {/*<div>*/}
            {/*    <Button onClick={onForkBot} loading={loading}>*/}
            {/*        Save to account*/}
            {/*    </Button>*/}
            {/*</div>*/}

            <Modal
                className="bot-responses-modal"
                title="Bot Intents"
                visible={viewType === 'VIEW_INTENT'}
                style={{ position: 'absolute', right: 500 }}
                width={700}
                bodyStyle={{ height: 505 }}
                footer={null}
                onCancel={closeModal}
            >
                <Spin spinning={loading}>
                    <IntentsList loading={loading} intentList={intents} onRowCheckChange={onRowCheckChange} />
                </Spin>
            </Modal>

            <Modal
                className="bot-responses-modal"
                title="Bot Entities"
                visible={viewType === 'VIEW_ENTITIES'}
                style={{ position: 'absolute', right: 500 }}
                width={700}
                bodyStyle={{ height: 505 }}
                footer={null}
                onCancel={closeModal}
            >
                <Spin spinning={loading}>
                    <MyEntities entityList={entities} onSelectedEntity={onSelectedEntity} deleteEntity={deleteEntity} />
                </Spin>
            </Modal>
        </div>
    );
};
export default BotPreview;
