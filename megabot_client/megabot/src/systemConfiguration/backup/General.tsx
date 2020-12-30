import React, { FC, Fragment } from 'react';
import { Button, Col, Input, Row, Typography } from 'antd';

const { Paragraph, Text } = Typography;

const General: FC = () => {
    const menuData = [
        {
            title: 'Temporary User Lock Duration',
            description: 'Lock duration time in seconds. Default is 30s',
            render: <Input />,
        },
        {
            title: 'Log Folder of API Server',
            description: 'Log folder path. Default is located at /tmp/analytics/dialogflow-resources/apiServer/logs',
            render: <Input />,
        },
        {
            title: 'Log Extension',
            description: 'Log file extension. E.g: log,log.gz',
            render: <Input />,
        },
        {
            title: 'Log Folder of Chat Server',
            description:
                'Log folder path of ChatServer. Default is located at /tmp/analytics/dialogflow-resources/chatserver/logs',
            render: <Input />,
        },
        {
            title: 'Cleanup Status',
            description: 'Cleaning up status',
            render: <Input />,
        },
        {
            title: 'Cleanup Condition',
            description: 'The keeping date setting. By default, all conversation logs will be kept until 10 days',
            render: <Input />,
        },
        {
            title: 'Long Cleanup Condition',
            description:
                'The keeping date setting for system log. By default, system log files will be kept until 30 days',
            render: <Input />,
        },
    ];
    return (
        <Fragment>
            <div className="sysyem-config-header" />
            <div className="sysyem-config-body">
                <Row gutter={16}>
                    {menuData.map(item => (
                        <Col className="general-col" xs={24} sm={24} md={24} lg={24} xl={12}>
                            <Paragraph strong>{item.title}</Paragraph>
                            <Text>{item.description}</Text>
                            {item.render}
                            <Button type="primary">Save</Button>
                        </Col>
                    ))}
                </Row>
            </div>
        </Fragment>
    );
};

export default General;
