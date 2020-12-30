import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { Avatar, Drawer, Input, Space, Spin, Tooltip } from 'antd';
import { BOT_TYPES, Icon_SingleBot, IndicatorIcon, MESSAGE_CONTENT_TYPE } from '../common/Constants';
import {
    AudioOutlined,
    BugOutlined,
    CameraOutlined,
    FunctionOutlined,
    LinkOutlined,
    ReloadOutlined,
} from '@ant-design/icons/lib';
import { SendMessageParam } from '../service/chatService';
import Conversation, { Turn } from './data/Conversation';
import ConversationList from './ConversationList';
import ReactJson from 'react-json-view';
import { Scrollbars } from 'react-custom-scrollbars';
import { useDataProvider, useTranslate } from 'ra-core';
import ChatService from '../service/chatService';
import useSpeechRecognition from './mrc/useSpeechRecognition';

interface Prods {
    bot: any;
    visible: boolean;
    onClose(): any;
}

const enableColor = '#1890ff';
const normalColor = '#d9d9d9';

const TestZone: FC<Prods> = (prods: Prods) => {
    const dataProvider = useDataProvider();
    const translate = useTranslate();

    const [initializing, setInitializing] = useState(false);
    const [enableVoice, setEnableVoice] = useState(false);
    const [enableCamera, setEnableCamera] = useState(false);
    const [debugMode, setDebugMode] = useState(true);
    const [jsonMode, setJsonMode] = useState(false);
    const [turnList, setTurnList] = useState<Turn[]>();
    const [conversationId, setConversationId] = useState();
    const [currentContext, setCurrentContext] = useState();
    const input = useRef<Input>(null);

    const onEnd = () => {
        // You could do something here after listening has finished
    };

    const onResult = (result: any) => {
        if (input.current !== null) {
            input.current.setValue(result);
        }
    };

    const { listen, listening, stop } = useSpeechRecognition({ onResult, onEnd });

    const onVoice = () => {
        setEnableVoice(!enableVoice);
        listen('ko-KR');
    };

    const offVoice = () => {
        setEnableVoice(!enableVoice);
        stop();
    };

    const setVoice = listening ? offVoice : onVoice;

    /**
     * using for view smart-card data in json format
     * @param botResp
     */
    const reformatContextSmartCard = (botResp: any) => {
        if (botResp.responses) {
            botResp.responses.forEach((resp: any) => {
                if (resp.type === MESSAGE_CONTENT_TYPE.SMART_CARD) {
                    try {
                        resp.content = JSON.parse(resp.content);
                    } catch (e) {
                        // resp.json = {};
                    }
                }
            });
        }
        return botResp;
    };

    const stopConversation = useCallback(async () => {
        ChatService.stopConversation(dataProvider, prods.bot.id, conversationId);
    }, [conversationId, dataProvider, prods.bot.id]);

    /**
     * Start new conversation
     */
    const startConversation = useCallback(async () => {
        setInitializing(true);
        ChatService.startConversation(dataProvider, prods.bot.id)
            .then(({ data }: any) => {
                setInitializing(false);
                //console.log('startConversation resp', data);
                setCurrentContext(reformatContextSmartCard(data));
                setConversationId(data.conversationId);

                const convers = new Conversation(prods.bot.id, []);
                convers.addAnswer(data);

                // console.log('conversation', convers);
                setTurnList([...convers.turnList]);

                if (input.current !== null) {
                    input.current.focus();
                }
            })
            .catch((error: any) => {
                console.log(error);
                setInitializing(false);
            });
    }, [dataProvider, prods.bot.id]);

    /**
     * Send a user message to bot
     * @param message
     */
    const sendMessage = async (message: any) => {
        const convers = new Conversation(prods.bot.id, [...(turnList || [])]);
        const turnId = convers.addQuestion(message);
        setTurnList([...convers.turnList]);

        const param: SendMessageParam = {
            botId: prods.bot.id,
            conversationId: conversationId,
            turnNo: turnId,
            message: message,
        };

        if (input.current != null) {
            input.current.setValue('');
        }

        ChatService.sendMessage(dataProvider, param)
            .then(({ data }: any) => {
                setCurrentContext(reformatContextSmartCard(data));
                convers.addAnswer(data);
                setTurnList([...convers.turnList]);

                if (input.current !== null) {
                    input.current.focus();
                }
            })
            .catch((error: any) => {
                console.log(error);
            });
    };

    /**
     * User enter a message
     * @param e
     */
    const onUserEnter = (e: any) => {
        e.preventDefault();
        if (e.target.value.length > 0) {
            sendMessage(e.target.value).then();
        }
    };

    /**
     * User select item in smart card
     * @param selectedValue
     */
    const onSelected = (selectedValue: any) => {
        sendMessage(selectedValue).then();
    };

    /**
     * on click to reset conversation button
     */
    const onResetConversation = async () => {
        setInitializing(true);
        if (conversationId) {
            await stopConversation();
        }
        startConversation().then();
    };

    /**
     * on click to close test-zone
     */
    const onClose = async () => {
        await stopConversation();
        setJsonMode(false);
        setConversationId(null);
        setCurrentContext(null);
        setTurnList([]);
        prods.onClose();
    };

    useEffect(() => {
        if (prods.visible) {
            startConversation().then();
        }
        if (input.current !== null) {
            input.current.focus();
        }
    }, [prods.visible, startConversation]);

    return (
        <Drawer
            className="test-zone"
            title={
                <div className="test-zone-header">
                    <Avatar
                        style={{ backgroundColor: 'transparent' }}
                        size={24}
                        src={prods.bot.thumbnail}
                        icon={<Avatar size={24} src={BOT_TYPES[prods.bot.botType].icon} />}
                    />
                    <span className="bot-name">{prods.bot.fullName ? prods.bot.fullName : prods.bot.name}</span>
                    <div className="action">
                        <Space>
                            <Tooltip title="Reset conversation" placement="left">
                                <ReloadOutlined width={32} onClick={onResetConversation} className="mz-icon-btn" />
                            </Tooltip>
                            <FunctionOutlined
                                width={32}
                                style={{ color: `${jsonMode ? enableColor : normalColor}` }}
                                onClick={() => setJsonMode(!jsonMode)}
                            />
                            <Tooltip
                                title={`Debug mode: ${debugMode ? 'ON' : 'OFF'}`}
                                placement="left"
                                className="mz-icon-btn"
                            >
                                <BugOutlined
                                    width={32}
                                    style={{ color: `${debugMode ? enableColor : normalColor}` }}
                                    onClick={() => setDebugMode(!debugMode)}
                                />
                            </Tooltip>
                        </Space>
                    </div>
                </div>
            }
            placement="right"
            onClose={onClose}
            visible={prods.visible}
            width="500"
            maskClosable={false}
            keyboard={false}
            destroyOnClose={true}
            footer={
                <Input
                    ref={input}
                    disabled={initializing}
                    className="user-input"
                    placeholder={translate(`resources.testzone.placeholder`)}
                    suffix={
                        <div>
                            <Tooltip title={enableCamera ? 'Camera: ON' : 'Camera: OFF'} placement="topRight">
                                <CameraOutlined
                                    width={24}
                                    style={{ color: enableCamera ? enableColor : normalColor, marginRight: 10 }}
                                    onClick={() => setEnableCamera(!enableCamera)}
                                />
                            </Tooltip>
                            <Tooltip title="File Upload" placement="topRight">
                                <LinkOutlined width={24} style={{ color: normalColor, marginRight: 10 }} />
                            </Tooltip>
                            <Tooltip title={enableVoice ? 'Voice: ON' : 'Voice: OFF'} placement="topRight">
                                <AudioOutlined
                                    width={24}
                                    style={{ color: enableVoice ? enableColor : normalColor }}
                                    // onClick={() => setEnableVoice(!enableVoice)}
                                    onClick={setVoice}
                                />
                            </Tooltip>
                        </div>
                    }
                    onPressEnter={onUserEnter}
                />
            }
        >
            <Spin
                wrapperClassName="mz-drawer-spin"
                indicator={IndicatorIcon}
                spinning={initializing}
                tip="Initializing..."
            >
                <ConversationList debugMode={debugMode} bot={prods.bot} turnList={turnList} onSelected={onSelected} />
                <div className="debug-json-viewer" style={{ display: jsonMode ? 'block' : 'none' }}>
                    <div className="debug-header">
                        <span className="ant-drawer-title">
                            TURN {currentContext && currentContext.turnContext ? currentContext.turnContext.turnNo : ''}
                        </span>
                    </div>
                    <div className="debug-body">
                        <Scrollbars autoHide autoHideTimeout={300} autoHideDuration={100}>
                            <ReactJson
                                src={currentContext}
                                theme="monokai"
                                collapsed={false}
                                enableClipboard={false}
                                displayObjectSize={false}
                                displayDataTypes={false}
                            />
                        </Scrollbars>
                    </div>
                </div>
            </Spin>
        </Drawer>
    );
};

export default TestZone;
