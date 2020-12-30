import React, { useState } from 'react';
import { Row, Col, Divider, Form, Input } from 'antd';

import 'antd/dist/antd.css';
import './scss/Channels.scss';

const ChannelsForm = () => {
    return (
        <div>
            <p>Capture the following information from your Jabber App and enter below:</p>
            {/* <Form name="form">
                <Form.Item name="website" label="Website" >
                    <Input defaultValue="a"  />
                </Form.Item>
                <Form.Item name="ACCESS TOKEN" label="ACCESS TOKEN">
                    <Input />
                </Form.Item>
                <Form.Item name="Webhook URL" label="Webhook URL">
                    <Input />
                </Form.Item>
                <Form.Item name="Enable Channel" label="Enable Channel">
                    <Input />
                </Form.Item>
            </Form> */}
            <div style={{ marginBottom: 16 }}>
                <Input addonBefore="http://" addonAfter=".com" defaultValue="mysite" />
            </div>
            <div style={{ marginBottom: 16 }}>
                <Input addonBefore="http://" suffix=".com" defaultValue="mysite" />
            </div>
        </div>
    );
};

export default ChannelsForm;
