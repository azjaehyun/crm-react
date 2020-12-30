import React, { FC, useState } from 'react';
import { Button, Collapse, notification, Radio, Slider, Spin, Switch, Typography } from 'antd';
import BotService from '../service/botService';
import { useDataProvider } from 'ra-core';
import { useTranslate } from 'react-admin';

const { Panel } = Collapse;
const { Paragraph } = Typography;

interface Props {
    botId: any;
    defaultReplyType: string;
    enableSystemWelcome: boolean;
    triggerStartStep: boolean;
    reloadBot?: any;
}
const MessageSettings: FC<Props> = props => {
    const dataProvider = useDataProvider();
    const translate = useTranslate();
    const [loading, setLoading] = useState(false);
    const [msgSetting, setMsgSetting] = useState({
        enableSystemWelcome: props.enableSystemWelcome || false,
        // triggerStartStep: props.triggerStartStep || false,
        defaultReplyType: props.defaultReplyType,
    });
    const isCollapseOpen = (key: any) => {
        console.log(key);
    };

    const marks = {
        0: 0,
        1: 1,
    };

    const onChangeSetting = () => {
        setLoading(true);
        const { botId } = props;
        BotService.settingMessage(dataProvider, botId, msgSetting)
            .then((resp: any) => {
                setLoading(false);
                if (resp.status === 200) {
                    if (props.reloadBot) {
                        props.reloadBot();
                    }
                    notification['success']({
                        message: 'Success',
                        description: `Update QA setting successful!`,
                    });
                } else {
                    notification['error']({
                        message: 'Error',
                        description: resp.data.message,
                    });
                }
            })
            .catch((error: any) => {
                setLoading(false);
                console.log(error);
            });
    };
    const radioStyle = {
        display: 'block',
        height: '30px',
        lineHeight: '30px',
    };
    return (
        <div className="ml-setting-container">
            <Spin spinning={loading}>
                <Collapse onChange={isCollapseOpen} bordered={false} defaultActiveKey={['1', '2', '3']}>
                    <Panel header="Enable system welcome" key="1">
                        <Paragraph>Enable to using the system's welcome</Paragraph>
                        <span style={{ color: msgSetting.enableSystemWelcome ? '#B4B4B4' : 'inherit' }}>
                            {translate(`common.switch.disable`)}
                        </span>
                        <Switch
                            size="small"
                            className="bot-summary-switch"
                            checked={msgSetting.enableSystemWelcome}
                            onChange={checked => setMsgSetting({ ...msgSetting, enableSystemWelcome: checked })}
                        />
                        <span style={{ color: !msgSetting.enableSystemWelcome ? '#B4B4B4' : 'inherit' }}>
                            {translate(`common.switch.enable`)}
                        </span>
                    </Panel>
                    {/*<br />*/}
                    {/*<Panel header="Trigger start step" key="2">*/}
                    {/*    <Paragraph>Allow to trigger the step with type START when start conversation</Paragraph>*/}
                    {/*    <span style={{ color: '#B4B4B4' }}>Disable</span>*/}
                    {/*    <Switch*/}
                    {/*        size="small"*/}
                    {/*        className="bot-summary-switch"*/}
                    {/*        checked={msgSetting.triggerStartStep}*/}
                    {/*        onChange={checked => setMsgSetting({ ...msgSetting, triggerStartStep: checked })}*/}
                    {/*    />*/}
                    {/*    <span>Enable</span>*/}
                    {/*</Panel>*/}
                    <br />
                    <Panel header="Default Answer" key="3">
                        <p>
                            Defines what kind of answer will be used when the Bot can not understand what did the user
                            said. Either by user's predefined messages or the general Q&A system
                        </p>
                        <Radio.Group
                            onChange={e => setMsgSetting({ ...msgSetting, defaultReplyType: e.target.value })}
                            value={msgSetting.defaultReplyType}
                        >
                            <Radio style={radioStyle} value="GENERAL_QA">
                                General Q&A
                            </Radio>
                            <Radio style={radioStyle} value="USER_DEFINE">
                                User-defined
                            </Radio>
                        </Radio.Group>
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

export default MessageSettings;
