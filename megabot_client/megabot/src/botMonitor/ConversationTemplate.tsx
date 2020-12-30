import React, { FC, Fragment } from 'react';
import { useTranslate } from 'ra-core';
import { Avatar, Col, Input, Row, Typography } from 'antd';
import { ArrowLeftOutlined, ArrowRightOutlined, BellFilled, CloseOutlined, UserOutlined } from '@ant-design/icons/lib';

const { Text } = Typography;

const ConversationTemplate: FC = () => {
    const translate = useTranslate();

    return (
        <Fragment>
            <Row className="conversation-contents-row">
                <Col span={8} className="conversation-template-wrapper">
                    <div className="conversation-template empty">Conversation Zone</div>
                </Col>
                <Col span={8} className="conversation-template-wrapper">
                    <div className="conversation-template">
                        <div className="conversation-template-header">
                            <Row>
                                <Col span={18}>
                                    <UserOutlined style={{ marginRight: 5, color: '#0A82FF' }} />
                                    <Text strong>C0001</Text>
                                    <Text type="secondary">(30m 20s)</Text>
                                </Col>
                                <Col span={6} style={{ textAlign: 'right' }}>
                                    <ArrowLeftOutlined />
                                    <CloseOutlined style={{ marginLeft: 5 }} />
                                </Col>
                            </Row>
                        </div>
                        <div className="conversation-template-body">
                            <div className="bot-block">
                                <Avatar
                                    className="bot-avatar"
                                    size={24}
                                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                />
                                <div className="block-content">
                                    <Text className="message-time">09:32AM</Text>
                                    <div className="message-text-wrapper">
                                        <div className="message-text">
                                            <pre>안녕하세요. 반가워요.</pre>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="user-block">
                                <div className="block-content">
                                    <Text className="message-time">09:34AM</Text>
                                    <div className="message-text">안녕하세요.</div>
                                </div>
                            </div>
                        </div>
                        <div className="conversation-template-footer">
                            <Input
                                className="user-input"
                                placeholder={translate(`resources.botmonitor.placeholder`)}
                                prefix={<UserOutlined />}
                            />
                        </div>
                    </div>
                </Col>
                <Col span={8} className="conversation-template-wrapper">
                    <div className="conversation-template">
                        <div className="conversation-template-header">
                            <Row>
                                <Col span={18}>
                                    <UserOutlined style={{ marginRight: 5, color: '#0A82FF' }} />
                                    <Text strong>C0002</Text>
                                    <Text type="secondary">(30m 20s)</Text>
                                </Col>
                                <Col span={6} style={{ textAlign: 'right' }}>
                                    <CloseOutlined style={{ marginLeft: 5 }} />
                                </Col>
                            </Row>
                        </div>
                        <div className="conversation-template-body">
                            <div className="bot-block">
                                <Avatar
                                    className="bot-avatar"
                                    size={16}
                                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                />
                                <div className="block-content">
                                    <Text className="message-time">09:32</Text>
                                    <div className="message-text-wrapper">
                                        <div className="message-text">
                                            <pre>
                                                안녕하세요, 저와 함께 스마트 쇼핑여정을 시작해보실까요? 도와 드릴까요?
                                            </pre>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="user-block">
                                <div className="block-content">
                                    <Text className="message-time">09:34</Text>
                                    <div className="message-text">
                                        내일 아침에 성인 3 명과 어린이 1 명과 함께 로스 앤젤레스 발 서울행 항공편을
                                        예약하고 싶습니다.
                                    </div>
                                </div>
                            </div>
                            <div className="bot-block">
                                <Avatar
                                    className="bot-avatar"
                                    size={16}
                                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                />
                                <div className="block-content">
                                    <Text className="message-time">09:32</Text>
                                    <div className="message-text-wrapper">
                                        <div className="message-text">
                                            <pre>
                                                안녕하세요, 저와 함께 스마트 쇼핑여정을 시작해보실까요? 도와 드릴까요?
                                            </pre>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="user-block">
                                <div className="block-content">
                                    <Text className="message-time">09:34</Text>
                                    <div className="message-text">
                                        내일 아침에 성인 3 명과 어린이 1 명과 함께 로스 앤젤레스 발 서울행 항공편을
                                        예약하고 싶습니다.
                                    </div>
                                </div>
                            </div>
                            <div className="bot-block">
                                <Avatar
                                    className="bot-avatar"
                                    size={16}
                                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                />
                                <div className="block-content">
                                    <Text className="message-time">09:32</Text>
                                    <div className="message-text-wrapper">
                                        <div className="message-text">
                                            <pre>
                                                안녕하세요, 저와 함께 스마트 쇼핑여정을 시작해보실까요? 도와 드릴까요?
                                            </pre>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="user-block">
                                <div className="block-content">
                                    <Text className="message-time">09:34</Text>
                                    <div className="message-text">
                                        내일 아침에 성인 3 명과 어린이 1 명과 함께 로스 앤젤레스 발 서울행 항공편을
                                        예약하고 싶습니다.
                                    </div>
                                </div>
                            </div>
                            <div className="bot-block">
                                <Avatar
                                    className="bot-avatar"
                                    size={16}
                                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                />
                                <div className="block-content">
                                    <Text className="message-time">09:32</Text>
                                    <div className="message-text-wrapper">
                                        <div className="message-text">
                                            <pre>
                                                안녕하세요, 저와 함께 스마트 쇼핑여정을 시작해보실까요? 도와 드릴까요?
                                            </pre>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="user-block">
                                <div className="block-content">
                                    <Text className="message-time">09:34</Text>
                                    <div className="message-text">
                                        내일 아침에 성인 3 명과 어린이 1 명과 함께 로스 앤젤레스 발 서울행 항공편을
                                        예약하고 싶습니다.
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="conversation-template-footer">
                            <Input
                                className="user-input"
                                placeholder={translate(`resources.botmonitor.placeholder`)}
                                prefix={<UserOutlined style={{ color: '#d9d9d9' }} />}
                            />
                        </div>
                    </div>
                </Col>
                <Col span={8} className="conversation-template-wrapper">
                    <div className="conversation-template notice">
                        <div className="conversation-template-header">
                            <Row>
                                <Col span={18}>
                                    <BellFilled style={{ color: '#FF4646', marginRight: 5 }} />
                                    <Text strong>C0002</Text>
                                    <Text type="secondary">(30m 20s)</Text>
                                </Col>
                                <Col span={6} style={{ textAlign: 'right' }}>
                                    <CloseOutlined style={{ marginLeft: 5 }} />
                                </Col>
                            </Row>
                        </div>
                        <div className="conversation-template-body">
                            <div className="bot-block">
                                <Avatar
                                    className="bot-avatar"
                                    size={24}
                                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                />
                                <div className="block-content">
                                    <Text className="message-time">09:32AM</Text>
                                    <div className="message-text-wrapper">
                                        <div className="message-text">
                                            <pre>안녕하세요. 반가워요.</pre>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="user-block">
                                <div className="block-content">
                                    <Text className="message-time">09:34AM</Text>
                                    <div className="message-text">안녕하세요.</div>
                                </div>
                            </div>
                        </div>
                        <div className="conversation-template-footer">
                            <Input
                                className="user-input"
                                placeholder={translate(`resources.botmonitor.placeholder`)}
                                prefix={<UserOutlined />}
                            />
                        </div>
                    </div>
                </Col>
                <Col span={8} className="conversation-template-wrapper">
                    <div className="conversation-template">
                        <div className="conversation-template-header">
                            <Row>
                                <Col span={18}>
                                    <UserOutlined style={{ marginRight: 5, color: '#0A82FF' }} />
                                    <Text strong>C0002</Text>
                                    <Text type="secondary">(30m 20s)</Text>
                                </Col>
                                <Col span={6} style={{ textAlign: 'right' }}>
                                    <ArrowRightOutlined />
                                    <CloseOutlined style={{ marginLeft: 5 }} />
                                </Col>
                            </Row>
                        </div>
                        <div className="conversation-template-body">
                            <div className="bot-block">
                                <Avatar
                                    className="bot-avatar"
                                    size={24}
                                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                />
                                <div className="block-content">
                                    <Text className="message-time">09:32AM</Text>
                                    <div className="message-text-wrapper">
                                        <div className="message-text">
                                            <pre>안녕하세요</pre>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="user-block">
                                <div className="block-content">
                                    <Text className="message-time">09:34AM</Text>
                                    <div className="message-text">도움이 필요합니다.</div>
                                </div>
                            </div>
                            <div className="bot-block">
                                <Avatar
                                    className="bot-avatar"
                                    size={24}
                                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                />
                                <div className="block-content">
                                    <Text className="message-time">09:38AM</Text>
                                    <div className="message-text-wrapper">
                                        <div className="message-text">
                                            <pre>무엇을 도와 드릴까요?</pre>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="user-block">
                                <div className="block-content">
                                    <Text className="message-time">09:34AM</Text>
                                    <div className="message-text">HyperBot을 설명해주세요</div>
                                </div>
                            </div>
                            <div className="user-block">
                                <div className="block-content">
                                    <Text className="message-time">09:34AM</Text>
                                    <div className="message-text">제가 어떻게 쓰면 될까요?</div>
                                </div>
                            </div>
                        </div>
                        <div className="conversation-template-footer">
                            <Input
                                className="user-input"
                                placeholder={translate(`resources.botmonitor.placeholder`)}
                                prefix={<UserOutlined />}
                            />
                        </div>
                    </div>
                </Col>
                <Col span={8} className="conversation-template-wrapper">
                    <div className="conversation-template empty">Conversation Zone</div>
                </Col>
            </Row>
        </Fragment>
    );
};

export default ConversationTemplate;
