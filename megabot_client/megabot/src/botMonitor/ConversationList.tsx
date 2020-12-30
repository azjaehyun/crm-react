import React, { FC, Fragment } from 'react';
import { Avatar, Col, List, Row, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { Text, Title } = Typography;

const ConversationList: FC = () => {
    const data = [
        {
            id: 'C0001',
            description: 'I want to buy ticket to go to Seoul...',
            createTime: '2h',
            updateTime: '1h ago',
        },
        {
            id: 'C0002',
            description: 'I want to buy ticket to go to Seoul...',
        },
        {
            id: 'C0003',
            description: 'I want to buy ticket to go to Seoul...',
            createTime: '30m',
            updateTime: '30m ago',
        },
        {
            id: 'C0004',
            description: 'I want to buy ticket to go to Seoul...',
        },
        {
            id: 'C0005',
            description: 'I want to buy ticket to go to Seoul...',
            createTime: '30m',
            updateTime: 'Interrupt',
        },
    ];

    const addConversation = () => {
        console.log('Add Conversation');
    };

    return (
        <Fragment>
            <Row className="conversation-list-title">
                <Col span={24}>
                    <Title level={4}>빨리 영화 예매하라우 (3)</Title>
                </Col>
            </Row>
            <List
                className="conversation-list-contents"
                itemLayout="horizontal"
                dataSource={data}
                renderItem={item => (
                    <List.Item>
                        <Row style={{ width: '100%' }}>
                            <Col flex="auto">
                                <List.Item.Meta
                                    avatar={
                                        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                    }
                                    title={<a>{item.id}</a>}
                                    description={item.description}
                                />
                            </Col>
                            <Col flex="60px" style={{ marginLeft: 10 }}>
                                {item.createTime ? (
                                    <div style={{ textAlign: 'right', padding: '5px 5px 5px 0' }}>
                                        <Text strong style={{ display: 'block' }}>
                                            {item.createTime}
                                        </Text>
                                        <Text type="secondary">{item.updateTime}</Text>
                                    </div>
                                ) : (
                                    <div
                                        style={{
                                            textAlign: 'center',
                                            padding: 15,
                                            borderLeft: '1px solid #F0F0F0',
                                            cursor: 'pointer',
                                        }}
                                        onClick={addConversation}
                                    >
                                        <PlusOutlined style={{ fontSize: 16 }} />
                                    </div>
                                )}
                            </Col>
                        </Row>
                    </List.Item>
                )}
            />
        </Fragment>
    );
};

export default ConversationList;
