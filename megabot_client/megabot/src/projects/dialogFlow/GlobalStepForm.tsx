import React, { FC } from 'react';
import { Col, Input, Row, Select, Switch } from 'antd';
import {
    STEP_TYPE_BOT_INNER,
    STEP_TYPE_BUSINESS,
    STEP_TYPE_END,
    STEP_TYPE_GLOBAL,
    STEP_TYPE_START,
} from '../common/Constants';

const { Option } = Select;

const GlobalStepForm = (props: any) => {
    const eleName = props.eleName;
    const setElementName = props.setElementName;
    return (
        <Row style={{ backgroundColor: '#F0F0F0', padding: 10, height: 50 }}>
            <Col span={10} style={{ padding: '0 5px' }}>
                <Input
                    placeholder="Step Name"
                    autoComplete="off"
                    value={eleName}
                    onChange={event => setElementName(event.target.value)}
                />
            </Col>
            <Col span={8} style={{ padding: '0 5px' }}>
                <Select defaultValue="business" style={{ width: '100%' }}>
                    <Option value={STEP_TYPE_START}>Start</Option>
                    <Option value={STEP_TYPE_GLOBAL}>Global</Option>
                    <Option value={STEP_TYPE_BUSINESS}>Business</Option>
                    <Option value={STEP_TYPE_BOT_INNER}>BotInner</Option>
                    <Option value={STEP_TYPE_END}>End</Option>
                </Select>
            </Col>
            <Col span={6} style={{ padding: '0 5px', marginTop: 5 }}>
                {/*Trigger global step <Switch defaultChecked />*/}
            </Col>
        </Row>
    );
};

export default GlobalStepForm;
