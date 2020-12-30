import React, { FC, useState, Fragment, useEffect, useRef, useCallback } from 'react';
import { Popconfirm, notification } from 'antd';
import AutomateTaskService, { MessageEntity } from '../../service/automateTaskService';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons/lib';
import { useDataProvider, useTranslate } from 'ra-core';
import TextEditable from '../../smartcard/TextEditable';
import SmartCardPreview from '../../smartcard/SmartCardPreview';
import { MESSAGE_CONTENT_TYPE } from '../../common/Constants';

interface Props {
    botId: string;
    messageEntity: MessageEntity;
    onDeleteClick(messageId: number): any;
    onEditSmartCardClick(messageEntity: MessageEntity): any;
}

const MessageTableItem: FC<Props> = props => {
    const dataProvider = useDataProvider();
    const translate = useTranslate();
    const [messageEntity, setMessageEntity] = useState();
    const [messageText, setMessageText] = useState();
    const [editing, setEditing] = useState(false);

    const divRef = useRef<HTMLDivElement>(null);

    const onChange = (text: string) => {
        if (text.length > 0) {
            const entity = { ...props.messageEntity, message: text };
            setEditing(false);

            updateMessage(entity).then();
        }
    };

    const updateMessage = useCallback(
        async (message: MessageEntity) => {
            AutomateTaskService.update(dataProvider, props.botId, message)
                .then(({ data }: any) => {
                    console.log('edit resp', data);
                    setMessageEntity(data);
                    setMessageText(data.message);
                })
                .catch((error: any) => {
                    notification['error']({
                        message: translate(`common.message.error`),
                        description: translate(`common.message.unknown_error_try_again`),
                    });
                });
        },
        [dataProvider, props.botId, translate]
    );

    useEffect(() => {
        setMessageEntity(props.messageEntity);
        setMessageText(props.messageEntity.message);
    }, [props.messageEntity]);

    if (!messageEntity) return null;

    return (
        <Fragment>
            <div className="message-item" ref={divRef}>
                {messageEntity.contentType === MESSAGE_CONTENT_TYPE.TEXT && (
                    <TextEditable text={messageText} onChange={onChange} editing={editing} />
                )}

                {messageEntity.contentType === MESSAGE_CONTENT_TYPE.SMART_CARD && (
                    <SmartCardPreview
                        data={messageEntity.jsonMessage}
                        templateCode={messageEntity.jsonMessage.templateCode}
                    />
                )}

                <div className="message-action">
                    <EditOutlined
                        className="mz-icon-btn"
                        title="Edit this example"
                        onClick={e => {
                            e.stopPropagation();
                            if (messageEntity.contentType === MESSAGE_CONTENT_TYPE.TEXT) {
                                setEditing(true);
                            }

                            if (messageEntity.contentType === MESSAGE_CONTENT_TYPE.SMART_CARD) {
                                props.onEditSmartCardClick(messageEntity);
                            }
                        }}
                    />
                    <Popconfirm
                        placement="top"
                        title={translate(`resources.intents.message.delete_intent_confirm`)}
                        onConfirm={() => props.onDeleteClick(messageEntity.id)}
                        okText={translate(`common.button.yes`)}
                        cancelText={translate(`common.button.no`)}
                    >
                        <DeleteOutlined className="trash-btn" />
                    </Popconfirm>
                </div>
            </div>
        </Fragment>
    );
};

export default MessageTableItem;
