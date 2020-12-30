import React, { FC, Fragment } from 'react';
import { Button, Col, Input, Row, Switch, Typography } from 'antd';

const { Paragraph, Text } = Typography;

const EmailSettings: FC = () => {
    const menuData = [
        {
            title: 'Protocol',
            description: 'The SMTP protocol provider',
            render: <Input />,
        },
        {
            title: 'Host',
            description: 'The SMTP server to connect to',
            render: <Input />,
        },
        {
            title: 'Port',
            description:
                "The SMTP server port to connect to, if the connect() method doesn't explicitly specify one. Defaults to 25",
            render: <Input />,
        },
        {
            title: 'SMTP Auth',
            description: 'If true, attempt to authenticate the user using the AUTH command. Defaults to false',
            render: <Switch />,
        },
        {
            title: 'SMTP StartTLS Enable',
            description:
                'If true, enables the use of the STARTTLS command (if supported by the server) to switch the connection to a TLS-protected connection before issuing any login commands.',
            render: <Switch />,
        },
        {
            title: 'Debug',
            description: 'Debug flag',
            render: <Switch />,
        },
        {
            title: 'Username',
            description: 'SMTP username',
            render: <Input />,
        },
        {
            title: 'Password',
            description: 'SMTP password',
            render: <Input type="password" />,
            //render: <Input.Password />,
        },
        {
            title: 'From Sender',
            description: 'Sender information',
            render: <Input />,
        },
    ];

    return (
        <Fragment>
            <div className="sysyem-config-header" />
            <div className="sysyem-config-body">
                <Row gutter={16}>
                    {menuData.map(item => (
                        <Col className="email-settings-col" xs={24} sm={24} md={24} lg={24} xl={12}>
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

export default EmailSettings;
