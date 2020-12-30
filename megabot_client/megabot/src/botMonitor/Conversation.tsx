import React, { FC, Fragment } from 'react';
import { Col, Row, Typography } from 'antd';
import ConversationTemplate from './ConversationTemplate';

const { Title } = Typography;

const Conversation: FC = () => {
    return (
        <Fragment>
            <Row className="conversation-title">
                <Col span={24}>
                    <Title level={4}>Monitor</Title>
                </Col>
            </Row>
            <div className="conversation-contents">
                <ConversationTemplate />
            </div>
        </Fragment>
    );
};

export default Conversation;
