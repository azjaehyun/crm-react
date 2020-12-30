import React, { FC, useState } from 'react';
import { Button, Collapse, notification, Select, Slider, Spin, Switch, Typography } from 'antd';
import BotService from '../service/botService';
import { useDataProvider } from 'ra-core';
import { useTranslate } from 'react-admin';
const { Option } = Select;
const { Panel } = Collapse;
const { Paragraph } = Typography;

interface Props {
    botId: any;
    threshold: any;
    stopWords: boolean;
    synonym: boolean;
    reloadBot: any;
    isActive: any;
    modelType: any;
}
const MLSettings: FC<Props> = props => {
    const dataProvider = useDataProvider();
    const translate = useTranslate();
    const [loading, setLoading] = useState(false);
    const [configML, setConfigML] = useState({
        threshold: props.threshold,
        stopWords: props.stopWords,
        synonym: props.synonym,
        modelType: props.modelType,
    });
    const isCollapseOpen = (key: any) => {
        console.log(key);
    };

    const marks = {
        0: 0,
        1: 1,
    };

    const onChangeSetting = () => {
        console.log(configML);
        setLoading(true);
        const { botId } = props;
        BotService.updateMLSetting(dataProvider, props.botId, configML)
            .then((response: any) => {
                setLoading(false);
                if (response.status == 200) {
                    props.reloadBot();
                    notification['success']({
                        message: 'Success',
                        description: `Update ML setting successful!`,
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
    console.log(configML);

    return (
        <div className="ml-setting-container">
            <Spin spinning={loading}>
                <Collapse onChange={isCollapseOpen} bordered={false} defaultActiveKey={['1', '2', '3', '4']}>
                    <Panel header="Bot Synonyms" key="1">
                        <Paragraph>
                            Use bot synonyms for intent detection. This setting is Disabled by default. Enable this
                            option if you would like to consider intent synonyms in building the ML model.
                        </Paragraph>
                        <span style={{ color: configML.synonym ? '#B4B4B4' : 'inherit' }}>
                            {translate(`common.switch.disable`)}
                        </span>
                        <Switch
                            size="small"
                            className="bot-summary-switch"
                            checked={configML.synonym}
                            onChange={checked => setConfigML({ ...configML, synonym: checked })}
                        />
                        <span style={{ color: !configML.synonym ? '#B4B4B4' : 'inherit' }}>
                            {translate(`common.switch.enable`)}
                        </span>
                    </Panel>
                    <br />
                    <Panel header="Stopwords" key="2">
                        <Paragraph>
                            Discard stop words present in user utterance for detecting intents. This setting is Disabled
                            be default. Enable this option if you would like to remove the stop words in the training
                            utterances in building the ML model.
                        </Paragraph>
                        <span style={{ color: '#B4B4B4' }}>{translate(`common.switch.disable`)}</span>
                        <Switch
                            size="small"
                            className="bot-summary-switch"
                            checked={configML.stopWords}
                            onChange={checked => setConfigML({ ...configML, stopWords: checked })}
                        />
                        <span>{translate(`common.switch.enable`)}</span>
                    </Panel>
                    <br />
                    <Panel key={'4'} header="ML algorithm model type">
                        <Select
                            style={{ width: '200px' }}
                            placeholder="Select model type"
                            value={configML.modelType}
                            onChange={e => setConfigML({ ...configML, modelType: e })}
                        >
                            <Option value="GUSE">Sentence Embedding</Option>
                            <Option value="SENT2VEC">Sentence To Vector</Option>
                        </Select>
                    </Panel>
                    <br />
                    <Panel header="ML Classification Threshold" key="3">
                        <Paragraph>
                            Define ths threshold value for the confidence score. If the returned values is less than the
                            threshold value, then a fallback intent will be triggered, or if there is no fallback
                            intents defined, no intent will be triggered.
                        </Paragraph>
                        <Slider
                            marks={marks}
                            min={0}
                            max={1}
                            step={0.05}
                            style={{ width: 200 }}
                            // tooltipVisible={props.isActive}
                            tooltipPlacement="bottom"
                            value={configML.threshold}
                            onChange={(value: any) => setConfigML({ ...configML, threshold: value })}
                        />
                    </Panel>
                </Collapse>
                <br />
                <br />
                <Button type="primary" className="mz-btn" onClick={onChangeSetting}>
                    SAVE
                </Button>
            </Spin>
        </div>
    );
};

export default MLSettings;
