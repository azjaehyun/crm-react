import React, { FC, useCallback, useEffect, useState } from 'react';
import { Col, Row, Card, Space, notification } from 'antd';
import MessageBody from './components/MessageBody';
import { AUTOMATE_MESSAGE_TYPE } from '../common/Constants';
import AutomateTaskService, { MessageQuery } from '../service/automateTaskService';
import { useDataProvider, useTranslate } from 'ra-core';
const { Meta } = Card;

interface Props {
    bot: any;
}

const AutomateTasks: FC<Props> = props => {
    const dataProvider = useDataProvider();
    const translate = useTranslate();
    const [loading, setLoading] = useState(false);
    const [messageType, setMessageType] = useState(AUTOMATE_MESSAGE_TYPE.WELCOME);
    const [messageList, setMessageList] = useState([]);
    const loadMessage = useCallback(async () => {
        setLoading(true);
        const query: MessageQuery = {
            language: props.bot.language,
            type: messageType,
        };

        AutomateTaskService.select(dataProvider, props.bot.id, query)
            .then(({ data }: any) => {
                setLoading(false);
                setMessageList(data);
            })
            .catch((error: any) => {
                setLoading(false);
                notification['error']({
                    message: translate(`common.message.error`),
                    description: translate(`common.message.unknown_error_try_again`),
                });
            });
    }, [dataProvider, messageType, props.bot.id, props.bot.language, translate]);
    useEffect(() => {
        loadMessage().then();
    }, [loadMessage, messageType]);

    return (
        <div className="content-body automate-tasks-body">
            <Row>
                <Col flex="220px">
                    <h5
                        className="ant-typography"
                        style={{
                            fontWeight: 'normal',
                            marginBottom: '0px',
                        }}
                    >
                        {translate(`resources.automate.name`)}
                    </h5>
                    <Space direction="vertical" className="automate-tasks--options">
                        <Card
                            size="small"
                            onClick={() => setMessageType(AUTOMATE_MESSAGE_TYPE.WELCOME)}
                            className={
                                'option-item' + (messageType === AUTOMATE_MESSAGE_TYPE.WELCOME ? '--selected' : '')
                            }
                        >
                            <Meta
                                title={translate(`resources.automate.message_type.welcome`)}
                                description={translate(`resources.automate.message_description.welcome`)}
                            />
                        </Card>
                        <Card
                            size="small"
                            onClick={() => setMessageType(AUTOMATE_MESSAGE_TYPE.DEFAULT_REPLY)}
                            className={
                                'option-item' +
                                (messageType === AUTOMATE_MESSAGE_TYPE.DEFAULT_REPLY ? '--selected' : '')
                            }
                        >
                            <Meta
                                title={translate(`resources.automate.message_type.default_answer`)}
                                description={translate(`resources.automate.message_description.default_answer`)}
                            />
                        </Card>
                    </Space>
                </Col>
                <Col flex="auto">
                    <div className="automate-tasks-container">
                        <MessageBody
                            loading={loading}
                            bot={props.bot}
                            messageType={messageType}
                            messageList={messageList}
                            onChange={loadMessage}
                        />
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default AutomateTasks;
