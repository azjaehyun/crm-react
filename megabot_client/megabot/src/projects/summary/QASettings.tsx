import React, { FC, useState } from 'react';
import { Collapse, Switch, Radio, Button, Form, Spin, notification, Slider, Typography, Select } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { useDataProvider } from 'ra-core';
import BotService from '../service/botService';
import { useTranslate } from 'react-admin';
import { Bot } from '../../types';

const { Option } = Select;
const { Panel } = Collapse;
const { Paragraph } = Typography;
interface Props {
    botId: string;
    turnOffIrQA: boolean;
    reloadBot: any;
    isActive: any;
    threshold: any;
    algorithm: any;
    irQAType: any;
}
const QASettings: FC<Props> = props => {
    const dataProvider = useDataProvider();
    const translate = useTranslate();
    const [loading, setLoading] = useState(false);
    const [configQA, setConfigQA] = useState({
        threshold: props.threshold,
        modelType: props.algorithm,
        turnOffIrQA: props.turnOffIrQA,
        irQAType: props.irQAType,
    });

    const isCollapseOpen = (key: any) => {
        console.log(key);
    };

    const isSmallTalk = (checked: boolean) => {
        console.log(`switch to ${checked}`);
        setConfigQA({ ...configQA, turnOffIrQA: !checked });
    };

    const saveChange = () => {
        console.log(props, props.botId);
        setLoading(true);
        const { botId } = props;
        BotService.updateQA(dataProvider, botId, configQA)
            .then((response: any) => {
                setLoading(false);
                if (response.status === 200) {
                    props.reloadBot();
                    notification['success']({
                        message: 'Success',
                        description: `Update QA setting successful!`,
                    });
                } else {
                    notification['error']({
                        message: 'Error',
                        description: response.data.message,
                    });
                }
            })
            .catch((error: any) => {
                setLoading(false);
                console.log(error);
            });
    };

    const radioStyle = {
        // display: 'block',
        height: '30px',
        lineHeight: '30px',
    };
    const containerStyle = {
        padding: '15px 10px',
    };
    return (
        <div className="qa-settings-container">
            <div
                style={{
                    padding: '15px 10px',
                    backgroundColor: '#eff2f5',
                    marginBottom: 10,
                }}
            >
                <InfoCircleOutlined style={{ margin: '0 10px' }} />
                These settings define the way your bot answer in the case can't understand user intent.
            </div>
            <Spin spinning={loading}>
                <div style={containerStyle}>
                    <h3>Small Talk</h3>
                    <p>
                        Your bot can learn how to support talk without ant extra development. By default, it will
                        respond with predefined phrases. Use the form below to customize responses to the most popular
                        repuests.
                    </p>
                    <span style={{ color: '#B4B4B4' }}>{translate(`common.switch.disable`)}</span>
                    <Switch
                        size="small"
                        className="small-talk-switch"
                        checked={!configQA.turnOffIrQA}
                        onChange={isSmallTalk}
                    />
                    <span>{translate(`common.switch.enable`)}</span>
                </div>
                <div style={containerStyle}>
                    <h3>QA algorithm</h3>
                    <Select
                        style={{ width: '200px' }}
                        placeholder="Select model type"
                        value={configQA.modelType}
                        onChange={e => setConfigQA({ ...configQA, modelType: e })}
                    >
                        <Option value="TOKEN_BASE">Token Base</Option>
                        <Option value="CONTEXT_BASE">Contextual</Option>
                    </Select>
                </div>
                <div style={containerStyle}>
                    <h3>Default answer</h3>
                    <p>Choose the system will be used for getting an answer when Bot unable to recognize.</p>
                    <Radio.Group
                        value={configQA.irQAType}
                        onChange={e => setConfigQA({ ...configQA, irQAType: e.target.value })}
                    >
                        <Radio style={radioStyle} value="MRC">
                            Machine Reading Comprehension(MRC)
                        </Radio>
                        <Radio style={radioStyle} value="SMALL_TALK">
                            Small talk
                        </Radio>
                    </Radio.Group>
                </div>
                <div style={containerStyle}>
                    <h3>QA Classification Threshold</h3>
                    <Paragraph>Define the threshold value for the confidence score of the QA system.</Paragraph>
                    <Slider
                        marks={{ 0: 0, 1: 1 }}
                        min={0}
                        max={1}
                        step={0.05}
                        style={{ width: 200 }}
                        // tooltipVisible={props.isActive}
                        tooltipPlacement="bottom"
                        value={configQA.threshold}
                        onChange={(value: any) => setConfigQA({ ...configQA, threshold: value })}
                    />
                </div>
            </Spin>
            <br />
            <br />
            <Button type="primary" style={{ width: 100 }} onClick={saveChange}>
                {translate(`common.button.save`)}
            </Button>
        </div>
    );
};

export default QASettings;
