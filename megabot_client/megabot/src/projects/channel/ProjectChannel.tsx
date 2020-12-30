import React, { FC, useEffect, useState, Fragment } from 'react';
import { Button, Input, Tabs, Card, Form, Select, Upload, Space, Spin, notification, Collapse, Typography } from 'antd';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
// import BackupRestore from './BackupRestore';
// import MLSettings from './MLSettings';
// import DangerZone from './DangerZone';
// import QASettings from './QASettings';
import BotService from '../service/botService';
import { BOT_LANGUAGES, Icon_ServiceBot, Icon_SingleBot } from '../common/Constants';
import { useTranslate } from 'react-admin';
import { useDataProvider } from 'ra-core';
// import MessageSettings from './MessageSettings';
import { Bot } from '../../types';
import ChannelDrawer from './ChannelDrawer';
const { TabPane } = Tabs;
const { Meta } = Card;
interface Props {
    botId: any;
}
const ProjectChannel: FC<Props> = props => {
    const dataProvider = useDataProvider();
    const translate = useTranslate();
    const [form] = Form.useForm();

    const [loading, setLoading] = useState(false);
    const [tabActive, setTabActive] = useState('1');

    const radioStyle = {
        display: 'block-inline',
        height: '30px',
        lineHeight: '30px',
    };
    return (
        <Fragment>
            <Spin spinning={loading}>
                <div className="summary-body">
                    <Tabs defaultActiveKey="1" onChange={e => setTabActive(e)}>
                        <TabPane tab={translate(`resources.projects.social_channels.tab.slack`)} key="1">
                            <ChannelDrawer botId={props.botId} />
                        </TabPane>

                        <TabPane tab={translate(`resources.projects.social_channels.tab.facebook`)} key="2">
                            {/* <MessageSettings
                                botId={props.bot.id}
                                enableSystemWelcome={props.bot.enableSystemWelcome}
                                triggerStartStep={props.bot.triggerStartStep}
                                defaultReplyType={props.bot.defaultReplyType}
                            /> */}
                        </TabPane>
                        <TabPane tab={translate(`resources.projects.social_channels.tab.telegram`)} key="3">
                            {/* <MLSettings
                                botId={props.bot.id}
                                threshold={props.bot.threshold}
                                stopWords={props.bot.discardStopwords}
                                synonym={props.bot.discardStopwords}
                                reloadBot={props.callBackUpdate}
                                modelType={props.bot.modelType}
                                isActive={tabActive === '3'}
                            /> */}
                        </TabPane>
                        <TabPane tab={translate(`resources.projects.social_channels.tab.twitter`)} key="4">
                            {/* <QASettings
                                botId={bot.id}
                                turnOffIrQA={props.bot.turnOffIrQA}
                                reloadBot={props.callBackUpdate}
                                isActive={tabActive === '4'}
                                threshold={props.bot.qaThreshold}
                                algorithm={props.bot.qaEmbeddingModelType}
                                irQAType={props.bot.irQAType}
                            /> */}
                        </TabPane>
                        <TabPane tab={translate(`resources.projects.social_channels.tab.line`)} key="5">
                            {/* <DangerZone botId={bot.id} private={props.bot.private} reloadBot={props.callBackUpdate} /> */}
                        </TabPane>
                    </Tabs>
                </div>
            </Spin>
        </Fragment>
    );
};

export default ProjectChannel;
