import React, { FC, useEffect, useState, Fragment } from 'react';
import { Button, Input, Tabs, Card, Form, Select, Upload, Space, Spin, notification, Collapse, Typography } from 'antd';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import BackupRestore from './BackupRestore';
import MLSettings from './MLSettings';
import DangerZone from './DangerZone';
import QASettings from './QASettings';
import BotService from '../service/botService';
import { BOT_LANGUAGES, Icon_ServiceBot, Icon_SingleBot } from '../common/Constants';
import { useTranslate } from 'react-admin';
import { useDataProvider } from 'ra-core';
import MessageSettings from './MessageSettings';
import { Bot } from '../../types';
const { TabPane } = Tabs;
const { Meta } = Card;
interface Props {
    bot: Bot;
    callBackUpdate?: any;
}

const BotSummary: FC<Props> = props => {
    const dataProvider = useDataProvider();
    const translate = useTranslate();
    const [form] = Form.useForm();
    const [bot, setBot] = useState({
        ...props.bot,
        botOwnerId: props.bot.botOwner.id,
        thumbnail: Object.assign({ thumbnail: '' }, props.bot).thumbnail.replace(
            String(process.env.REACT_APP_MEGA_DIALOGFLOW_INNER_IP_API_URL),
            String(process.env.REACT_APP_MEGA_DIALOGFLOW_API_URL)
        ),
    });
    const [loading, setLoading] = useState(false);
    const [tabActive, setTabActive] = useState('1');
    form.setFieldsValue(bot);
    useEffect(() => {
        // setBot({ ...props.bot, botOwnerId: bot.botOwner.id });
        form.setFieldsValue(bot);
    }, [bot, form]);

    const onUpdate = (form: any) => {
        setLoading(true);
        BotService.updateBot(dataProvider, bot.id, bot)
            .then((resp: any) => {
                setLoading(false);
                if (resp.status === 200) {
                    notification['success']({
                        message: 'Success',
                        description: `Update setting for bot successful!`,
                    });
                    if (props.callBackUpdate) {
                        props.callBackUpdate(resp.data);
                    }
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

    const setFieldsValue = (form: any, allField: any) => {
        setBot(allField);
    };

    const updateFailure = () => {
        console.log('update failure');
    };
    const beforeUpload = (file: any) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            console.log('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            console.log('Image must smaller than 2MB!');
        }
        const fd = new FormData();
        fd.append('files', file);
        BotService.uploadThumb(dataProvider, bot.id, fd)
            .then((resp: any) => {
                if (resp.status === 200) {
                    setBot({
                        ...bot,
                        thumbnail: resp.data.thumbnail.replace(
                            String(process.env.REACT_APP_MEGA_DIALOGFLOW_INNER_IP_API_URL),
                            String(process.env.REACT_APP_MEGA_DIALOGFLOW_API_URL)
                        ),
                    });
                    notification['success']({
                        message: 'Success',
                        description: `Upload thumbnail for bot ${bot.name} successful!`,
                    });
                } else {
                    notification['error']({
                        message: 'Error',
                        description: resp.data.message,
                    });
                }
            })
            .catch((error: any) => {
                console.log(error);
            });
        return isJpgOrPng && isLt2M;
    };
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
                        <TabPane tab={translate(`resources.projects.bot_summary.tab.general`)} key="1">
                            <div className="general-container">
                                <Form
                                    layout="vertical"
                                    form={form}
                                    onFinish={onUpdate}
                                    onFinishFailed={updateFailure}
                                    onValuesChange={setFieldsValue}
                                >
                                    <p className="menu-title">
                                        {translate(`resources.projects.bot_summary.general.title`)}
                                    </p>
                                    <div className="upload-img-container">
                                        <Form.Item name="thumbnail" label="" valuePropName="" extra="">
                                            <Upload
                                                name="file"
                                                listType="picture-card"
                                                className="avatar-uploader"
                                                showUploadList={false}
                                                beforeUpload={beforeUpload}
                                            >
                                                {bot.thumbnail ? (
                                                    <img
                                                        src={bot.thumbnail}
                                                        alt="avatar"
                                                        style={{
                                                            width: '100%',
                                                        }}
                                                    />
                                                ) : (
                                                    <div>
                                                        <PlusOutlined /> <div className="ant-upload-text">Upload</div>
                                                    </div>
                                                )}
                                                <br />
                                                <Button>
                                                    <UploadOutlined /> Click to Upload
                                                </Button>
                                            </Upload>
                                        </Form.Item>
                                    </div>
                                    <div className="bot-profile">
                                        <div>
                                            <Form.Item
                                                name="name"
                                                label={translate(`resources.projects.bot_summary.general.name`)}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Enter bot name',
                                                    },
                                                ]}
                                            >
                                                <Input placeholder="Enter bot name" />
                                            </Form.Item>
                                        </div>
                                        <div>
                                            <Form.Item
                                                name="fullName"
                                                label={translate(`resources.projects.bot_summary.general.full_name`)}
                                                rules={[
                                                    {
                                                        required: false,
                                                        message: 'Enter bot display name',
                                                    },
                                                ]}
                                            >
                                                <Input placeholder="Enter full name" />
                                            </Form.Item>
                                        </div>
                                        <div>
                                            <Form.Item
                                                name="description"
                                                label={translate(`resources.projects.bot_summary.general.description`)}
                                                rules={[
                                                    {
                                                        required: false,
                                                        message: 'Enter the description',
                                                    },
                                                ]}
                                            >
                                                <Input.TextArea rows={5} placeholder="Enter the description" />
                                            </Form.Item>
                                        </div>
                                        <div>
                                            <Form.Item
                                                name="language"
                                                label={translate(`resources.projects.bot_summary.general.language`)}
                                            >
                                                <div style={{ display: 'flex', color: '#000' }}>
                                                    <span style={{ marginRight: '10px', fontSize: 24 }}>
                                                        {BOT_LANGUAGES[props.bot.language].icon}
                                                    </span>
                                                    <span style={{ display: 'inline-block', lineHeight: '40px' }}>
                                                        {BOT_LANGUAGES[props.bot.language].name}
                                                    </span>
                                                </div>
                                            </Form.Item>
                                        </div>
                                    </div>
                                    <label>
                                        {translate(`resources.projects.bot_summary.general.bot_type.title`)}:{' '}
                                    </label>
                                    <a>{bot.botType}</a>
                                    <div>
                                        <Space>
                                            <Card
                                                className={
                                                    bot.botType == 'NORMAL' ? 'bot-type-card selected' : 'bot-type-card'
                                                }
                                                hoverable
                                                cover={<img alt="Single bot" src={Icon_SingleBot} />}
                                                onClick={() =>
                                                    setBot({
                                                        ...bot,
                                                        botType: 'NORMAL',
                                                    })
                                                }
                                                style={{ marginRight: 10 }}
                                            >
                                                <Meta title="SINGLE BOT" />
                                            </Card>
                                            <Card
                                                className={
                                                    bot.botType == 'SERVICE_BOT'
                                                        ? 'bot-type-card selected'
                                                        : 'bot-type-card'
                                                }
                                                hoverable
                                                cover={<img alt="bot Service" src={Icon_ServiceBot} />}
                                                onClick={() =>
                                                    setBot({
                                                        ...bot,
                                                        botType: 'SERVICE_BOT',
                                                    })
                                                }
                                            >
                                                <Meta title="BOT SERVICE" />
                                            </Card>
                                        </Space>
                                    </div>
                                    <br />
                                    <Form.Item>
                                        <Button type="primary" htmlType="submit">
                                            {translate(`common.button.save`)}
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </div>
                        </TabPane>

                        <TabPane tab={translate(`resources.projects.bot_summary.tab.message_setting`)} key="2">
                            <MessageSettings
                                botId={props.bot.id}
                                enableSystemWelcome={props.bot.enableSystemWelcome}
                                triggerStartStep={props.bot.triggerStartStep}
                                defaultReplyType={props.bot.defaultReplyType}
                            />
                        </TabPane>
                        <TabPane tab={translate(`resources.projects.bot_summary.tab.ml_setting`)} key="3">
                            <MLSettings
                                botId={props.bot.id}
                                threshold={props.bot.threshold}
                                stopWords={props.bot.discardStopwords}
                                synonym={props.bot.discardStopwords}
                                reloadBot={props.callBackUpdate}
                                modelType={props.bot.modelType}
                                isActive={tabActive === '3'}
                            />
                        </TabPane>
                        <TabPane tab={translate(`resources.projects.bot_summary.tab.qa_setting`)} key="4">
                            <QASettings
                                botId={bot.id}
                                turnOffIrQA={props.bot.turnOffIrQA}
                                reloadBot={props.callBackUpdate}
                                isActive={tabActive === '4'}
                                threshold={props.bot.qaThreshold}
                                algorithm={props.bot.qaEmbeddingModelType}
                                irQAType={props.bot.irQAType}
                            />
                        </TabPane>
                        <TabPane tab={translate(`resources.projects.bot_summary.tab.danger_zone`)} key="5">
                            <DangerZone botId={bot.id} private={props.bot.private} reloadBot={props.callBackUpdate} />
                        </TabPane>
                        <TabPane tab={translate(`resources.projects.bot_summary.tab.backup_restore`)} key="6">
                            <BackupRestore />
                        </TabPane>
                    </Tabs>
                </div>
            </Spin>
        </Fragment>
    );
};

export default BotSummary;
