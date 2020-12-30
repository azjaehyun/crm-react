import React, { useState } from 'react';
import { Row, Col, Divider, Form, Input } from 'antd';

import 'antd/dist/antd.css';
import './scss/Channels.scss';

const ChannelsForm = () => {
    return (
        <div>
            <p>Channel Configuration.. </p>
            <Form name="form">
                <Form.Item name="" label="">
                    {/* <Input defaultValue="a" /> */}
                    <Input
                        addonBefore="website"
                        defaultValue="https://ai.mz.co.kr/3b4d1a9ba86142b9b939a473fa7a982d/channel"
                        disabled
                    />
                </Form.Item>
                <Form.Item name="" label="">
                    {/* <Input /> */}
                    <Input
                        addonBefore="ACCESS TOKEN"
                        defaultValue="xoxb-667050256470-1305241909301-rkDYsGjuM1teBIRGczOf2gVB"
                        disabled
                    />
                </Form.Item>
                <Form.Item name="" label="">
                    {/* <Input /> */}
                    <Input
                        addonBefore="Webhook URL"
                        defaultValue="https://hooks.slack.com/services/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"
                        disabled
                    />
                </Form.Item>
                <Form.Item name="" label="">
                    {/* <Input /> */}
                    <Input
                        addonBefore="Redirect URL"
                        defaultValue="https://ai.mz.co.kr/3b4d1a9ba86142b9b939a473fa7a982d/callback"
                        disabled
                    />
                </Form.Item>
                <Form.Item name="" label="">
                    {/* <Input /> */}
                    <Input addonBefore="Enable Channel" defaultValue="True" disabled />
                </Form.Item>
            </Form>
        </div>
    );
};

export default ChannelsForm;
