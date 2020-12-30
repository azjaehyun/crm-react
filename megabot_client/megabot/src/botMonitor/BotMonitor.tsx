import React, { FC } from 'react';
import { Row, Col } from 'antd';
import BotList from './BotList';
import ConversationList from './ConversationList';
import Conversation from './Conversation';

import './scss/BotMonitor.scss';

const BotMonitor: FC = () => {
    return (
        <Row className="bot-monitor-wrapper">
            <Col className="bot-monitor-container" span={4}>
                <BotList />
            </Col>
            <Col className="bot-monitor-container" span={4}>
                <ConversationList />
            </Col>
            <Col className="bot-monitor-container" span={16}>
                <Conversation />
            </Col>
        </Row>
    );
};

export default BotMonitor;
