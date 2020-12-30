import React, { FC, Fragment } from 'react';
import { Avatar, Col, List, Row, Typography } from 'antd';

const { Title } = Typography;

const BotList: FC = () => {
    const data = [
        {
            title: '챗봇플랫폼 설명 봇',
            description: '나는 지금 거짓말을 하고 있다...',
            length: 12,
        },
        {
            title: '빨리 영화 예매하라우',
            description: '영화 재밌지 그치?',
            length: 14,
        },
        {
            title: '용돈기입냥',
            description: '이번달은 돈을 아껴써야해요...',
            length: 17,
        },
        {
            title: '대신읽어줄게2',
            description: '문자를 대신 읽어주고 찾아...',
            length: 20,
        },
    ];

    return (
        <Fragment>
            <Row className="bot-list-title">
                <Col span={24}>
                    <Title level={4}>BOTS (23)</Title>
                </Col>
            </Row>
            <List
                className="bot-list-contents"
                itemLayout="horizontal"
                dataSource={data}
                renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                            title={<a style={{ color: '#1890FF' }}>{item.title}</a>}
                            description={item.description}
                        />
                        <div>{item.length}</div>
                    </List.Item>
                )}
            />
        </Fragment>
    );
};

export default BotList;
