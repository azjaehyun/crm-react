import React, { FC, Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { Avatar, Button, Col, Divider, Input, notification, Row, Space, Upload } from 'antd';
import {
    API_ERROR_MESSAGES,
    AUTOMATE_MESSAGE_TYPE,
    Icon_SingleBot,
    MESSAGE_CONTENT_TYPE,
    PrimaryColor,
} from '../../common/Constants';
import { useDataProvider, useTranslate } from 'ra-core';
import { DownloadOutlined, EnterOutlined, PlusOutlined, SearchOutlined, UploadOutlined } from '@ant-design/icons/lib';
import AddSmartCardForm from './AddSmardCardForm';
import MessageTable from './MessageTable';
import AutomateTaskService, { MessageEntity, MessageQuery } from '../../service/automateTaskService';
import SaveFile from '../../common/SaveFile';
import moment from 'moment';
import IntentService from '../../service/intentService';

interface Props {
    bot: any;
    messageType: string;
    messageList: Array<any>;
    onChange(): void;
    loading: boolean;
}

const MessageBody: FC<Props> = props => {
    const dataProvider = useDataProvider();
    const translate = useTranslate();
    const [messageList, setMessageList] = useState();
    const [selectedMessage, setSelectedMessage] = useState();
    const [visibleSmartCardForm, setVisibleSmartCardForm] = useState(false);
    const [filterContentType, setFilterContentType] = useState(MESSAGE_CONTENT_TYPE.ALL);
    const [loading, setLoading] = useState(false);
    const inputRef = useRef<Input>(null);

    const createDefaultSCMessage = () => {
        let entity = {
            contentType: MESSAGE_CONTENT_TYPE.SMART_CARD,
            type: props.messageType,
            language: props.bot.language,
            message: '',
            state: 'ACTIVE',
            createdType: 'DEFAULT',
            jsonMessage: null,
        };
        return entity;
    };

    /**
     * add text message
     * @param messageText
     */
    const onEnterMessageText = (messageText: string) => {
        if (messageText.length > 0) {
            const message: MessageEntity = {
                contentType: MESSAGE_CONTENT_TYPE.TEXT,
                type: props.messageType,
                language: props.bot.language,
                message: messageText,
                state: 'ACTIVE',
                createdType: 'DEFAULT',
            };

            AutomateTaskService.insert(dataProvider, props.bot.id, message)
                .then(({ data }: any) => {
                    notification['success']({
                        message: translate(`common.message.success`),
                        description: 'Success',
                    });
                    props.onChange();
                    if (inputRef.current) {
                        inputRef.current.setValue('');
                        inputRef.current.focus();
                    }
                })
                .catch((error: any) => {
                    notification['error']({
                        message: translate(`common.message.error`),
                        description: translate(`common.message.unknown_error_try_again`),
                    });
                });
        }
    };

    /**
     * click add/edit smart-card
     * @param messageEntity
     */
    const showSmartCardEditor = (messageEntity: any) => {
        if (messageEntity) {
            setSelectedMessage(messageEntity);
        } else {
            setSelectedMessage(createDefaultSCMessage);
        }
        setVisibleSmartCardForm(true);
    };

    const closeSmartCardEditor = () => {};

    /**
     * call api to delete message
     */

    const deleteMessage = useCallback(
        async (messageId: number) => {
            AutomateTaskService.delete(dataProvider, props.bot.id, [messageId])
                .then(({ data }: any) => {
                    notification['success']({
                        message: translate(`common.message.success`),
                        description: translate(`common.message.delete_completed`, { objectName: 'Message' }),
                    });

                    let list = [...messageList];
                    const index = list.findIndex((m: MessageEntity) => m.id === messageId);
                    list.splice(index, 1);

                    console.log('after delete', list);
                    setMessageList(list);
                })
                .catch((error: any) => {
                    notification['error']({
                        message: translate(`common.message.error`),
                        description: translate(`common.message.unknown_error_try_again`),
                    });
                });

            // dataProvider.deleteWithBody(
            //     `bots/message/${props.bot.id}`,
            //     [messageId]
            // ).then(({ data }: any) => {
            //     notification['success']({
            //         message: translate(`common.message.success`),
            //         description: translate(`common.message.delete_completed`, { objectName: 'Message' }),
            //     });
            //
            //     let list = [...messageList];
            //     const index = list.findIndex((m: MessageEntity) => m.id === messageId);
            //     list.splice(index, 1);
            //
            //     console.log('after delete', list);
            //     setMessageList(list);
            // })
            // .catch((error: any) => {
            //     notification['error']({
            //         message: translate(`common.message.error`),
            //         description: translate(`common.message.unknown_error_try_again`),
            //     });
            // });
        },
        [dataProvider, messageList, props.bot.id, translate]
    );

    /**
     * Update message ui info after call api
     * @param message
     */
    const updateMessageUi = (message: MessageEntity) => {
        let list = [...messageList];
        const index = list.findIndex((m: MessageEntity) => m.id === message.id);
        if (index >= 0) {
            // edit smart-card message
            list[index] = message;
            setMessageList(list);
        } else {
            // add new smart-card message
            props.onChange();
        }
    };

    const handleImportJson = (file: any) => {
        const isJpgOrPng = file.type === 'json';
        if (!isJpgOrPng) {
            console.log('You can only upload JSON file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            console.log('Image must smaller than 2MB!');
        }
        const isWelcome = props.messageType === AUTOMATE_MESSAGE_TYPE.WELCOME;
        setLoading(true);
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = (e: any) => {
            AutomateTaskService.importJson(dataProvider, props.bot.id, isWelcome, JSON.parse(e.target.result))
                .then((resp: any) => {
                    setLoading(false);
                    if (resp.status === 200) {
                        notification['success']({
                            message: 'Success',
                            description: `Import ${resp.data.rowsAffected} messages successful!`,
                        });
                        props.onChange();
                    } else {
                        const message = resp.data ? resp.data.message : API_ERROR_MESSAGES[resp.status];
                        notification['error']({
                            message: 'Error',
                            description: message,
                        });
                    }
                })
                .catch((error: any) => {});
        };
        return isJpgOrPng && isLt2M;
    };

    const handleExportJson = () => {
        const query: MessageQuery = {
            language: props.bot.language,
            type: props.messageType,
        };
        AutomateTaskService.exportJson(dataProvider, props.bot.id, query)
            .then((resp: any) => {
                if (resp.status === 200) {
                    const fileName = 'automateTask_' + moment() + '.json';
                    SaveFile.saveJson(resp.data, fileName);
                }
            })
            .catch((error: any) => {});
    };
    useEffect(() => {
        setMessageList(props.messageList);
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [props.messageList, props.messageType]);

    return (
        <Fragment>
            <Row style={{ marginBottom: '15px' }}>
                <Col span={8}>
                    <h5
                        className="ant-typography"
                        style={{
                            fontWeight: 'normal',
                            marginBottom: '0px',
                        }}
                    >
                        {props.messageType === AUTOMATE_MESSAGE_TYPE.WELCOME
                            ? translate(`resources.automate.message_type.welcome`)
                            : translate(`resources.automate.message_type.default_answer`)}
                    </h5>
                </Col>
                <Col span={16} style={{ textAlign: 'right' }}>
                    <Space>
                        <Upload name="file" showUploadList={false} beforeUpload={handleImportJson}>
                            <Button loading={loading} icon={<UploadOutlined />} className="mz-link-btn">
                                {translate(`common.button.import`)}
                            </Button>
                        </Upload>
                        <Button
                            loading={loading}
                            icon={<DownloadOutlined />}
                            className="mz-link-btn"
                            onClick={handleExportJson}
                        >
                            {translate(`common.button.export`)}
                        </Button>
                        <Input
                            placeholder={translate(`common.message.search`)}
                            suffix={<SearchOutlined style={{ color: PrimaryColor }} />}
                            style={{ width: 300 }}
                        />
                    </Space>
                </Col>
            </Row>
            <Row className="text-message-form">
                <Col flex="32px">
                    <Avatar src={Icon_SingleBot} shape="square" size={24} />
                </Col>
                <Col flex="500px">
                    <Input
                        ref={inputRef}
                        placeholder={translate(`resources.automate.placeholder`)}
                        className="message-input"
                        suffix={<EnterOutlined />}
                        onPressEnter={(e: any) => {
                            onEnterMessageText(e.target.value.trim());
                        }}
                    />
                    <Space direction="horizontal" className="message-filter">
                        <a
                            type="link"
                            className={filterContentType === MESSAGE_CONTENT_TYPE.ALL ? 'selected' : ''}
                            onClick={e => setFilterContentType(MESSAGE_CONTENT_TYPE.ALL)}
                        >
                            {translate(`resources.automate.filter.all`)} ({messageList ? messageList.length : 0})
                        </a>
                        <Divider type="vertical" />
                        <a
                            type="link"
                            className={filterContentType === MESSAGE_CONTENT_TYPE.TEXT ? 'selected' : ''}
                            onClick={e => setFilterContentType(MESSAGE_CONTENT_TYPE.TEXT)}
                        >
                            {translate(`resources.automate.filter.text_message`)} (
                            {messageList
                                ? messageList.filter((m: MessageEntity) => m.contentType === MESSAGE_CONTENT_TYPE.TEXT)
                                      .length
                                : 0}
                            )
                        </a>
                        <Divider type="vertical" />
                        <a
                            type="link"
                            className={filterContentType === MESSAGE_CONTENT_TYPE.SMART_CARD ? 'selected' : ''}
                            onClick={e => setFilterContentType(MESSAGE_CONTENT_TYPE.SMART_CARD)}
                        >
                            {translate(`resources.automate.filter.smart_card`)} (
                            {messageList
                                ? messageList.filter(
                                      (m: MessageEntity) => m.contentType === MESSAGE_CONTENT_TYPE.SMART_CARD
                                  ).length
                                : 0}
                            )
                        </a>
                    </Space>
                    <Button
                        style={{ float: 'right' }}
                        icon={<PlusOutlined />}
                        className="mz-link-btn"
                        onClick={() => showSmartCardEditor(null)}
                    >
                        {translate(`resources.automate.button.create`)}
                    </Button>
                </Col>
            </Row>
            <Row className="message-list">
                <Col flex="32px" />
                <Col flex="500px">
                    <MessageTable
                        bot={props.bot}
                        loading={props.loading}
                        messageList={
                            messageList
                                ? filterContentType !== MESSAGE_CONTENT_TYPE.ALL
                                    ? messageList.filter((m: MessageEntity) => m.contentType === filterContentType)
                                    : messageList
                                : []
                        }
                        onDelete={(messageId: number) => deleteMessage(messageId)}
                        onEditSmartCardClick={(messageEntity: MessageEntity) => showSmartCardEditor(messageEntity)}
                    />
                </Col>
            </Row>

            <AddSmartCardForm
                bot={props.bot}
                messageEntity={selectedMessage}
                type={props.messageType}
                visible={visibleSmartCardForm}
                saving={false}
                onClose={() => {
                    setSelectedMessage(null);
                    setVisibleSmartCardForm(false);
                }}
                onFinish={(message: MessageEntity) => updateMessageUi(message)}
            />
        </Fragment>
    );
};

export default MessageBody;
