import React, { FC, Fragment } from 'react';
import { Button, Col, Input, Row, Typography } from 'antd';

const { Paragraph, Text, Title } = Typography;

const ServerConfig: FC = () => {
    const dMenu = {
        title: 'ChatServer Timeout',
        description: 'ChatServer Timeout in seconds. Default is 300 seconds',
        render: <Input />,
    };

    const nMenu = [
        {
            title: 'NLU Server',
            description: 'NLU Server API Configuration. E.g: http://127.0.0.1:5001/api/v1',
            render: <Input />,
        },
        {
            title: 'ML Threshold',
            description: 'Define the minimum ML score to qunlity an intent as a probable match',
            render: <Input />,
        },
    ];

    const pMenu = [
        {
            title: 'Plugin Server',
            description: 'Plugin Server API Configuration. E.g: http://127.0.0.1:9000',
            render: <Input />,
        },
        {
            title: 'Plugin Executor',
            description: 'Plugin Executor RESTful API. E.g: http://127.0.0.1:9000/api/v1/script/execute',
            render: <Input />,
        },
    ];

    const qMenu = {
        title: 'Q&A Server',
        description: 'Q&A Server Configuration. E.g: http://127.0.0.1:5000/api/v1/irqa',
        render: <Input />,
    };

    return (
        <Fragment>
            <div className="sysyem-config-header" />
            <div className="sysyem-config-body">
                <Title level={4}>Distribution Server</Title>
                <Row>
                    <Col className="server-col" span={24}>
                        <Paragraph strong>{dMenu.title}</Paragraph>
                        <Text>{dMenu.description}</Text>
                        {dMenu.render}
                        <Button type="primary">Save</Button>
                    </Col>
                </Row>

                <Title level={4}>NLP/NLU Server</Title>
                <Row gutter={16}>
                    {nMenu.map(item => (
                        <Col className="server-col" xs={24} sm={24} md={24} lg={24} xl={12}>
                            <Paragraph strong>{item.title}</Paragraph>
                            <Text>{item.description}</Text>
                            {item.render}
                            <Button type="primary">Save</Button>
                        </Col>
                    ))}
                </Row>

                <Title level={4}>Plugin Server</Title>
                <Row gutter={16}>
                    {pMenu.map(item => (
                        <Col className="server-col" xs={24} sm={24} md={24} lg={24} xl={12}>
                            <Paragraph strong>{item.title}</Paragraph>
                            <Text>{item.description}</Text>
                            {item.render}
                            <Button type="primary">Save</Button>
                        </Col>
                    ))}
                </Row>

                <Title level={4}>QA Server</Title>
                <Row>
                    <Col className="server-col" span={24}>
                        <Paragraph strong>{qMenu.title}</Paragraph>
                        <Text>{qMenu.description}</Text>
                        {qMenu.render}
                        <Button type="primary">Save</Button>
                    </Col>
                </Row>
            </div>
        </Fragment>
    );
};

export default ServerConfig;
