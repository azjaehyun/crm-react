import React, { FC, useEffect, useState, Fragment } from 'react';
import { Card, List, Empty } from 'antd';
import { MessageEntity } from '../../service/automateTaskService';
import MessageTableItem from './MessageTableItem';
import { useTranslate } from 'ra-core';
import { IndicatorIcon } from '../../common/Constants';
import { SmileOutlined } from '@ant-design/icons/lib';

interface Props {
    bot: any;
    loading: boolean;
    messageList: Array<MessageEntity>;
    onDelete(messageId: number): any;
    onEditSmartCardClick(messageEntity: MessageEntity): any;
}

const MessageTable: FC<Props> = props => {
    const translate = useTranslate();
    const [messageList, setMessageList] = useState();

    const spin = {
        indicator: IndicatorIcon,
        spinning: props.loading,
        tip: translate(`common.message.loading`),
    };

    useEffect(() => {
        setMessageList(props.messageList);
        console.log('MessageTable reload', props.messageList);
    }, [props.messageList]);

    return (
        <Fragment>
            {!props.loading && props.messageList.length === 0 && (
                <Empty
                    className="mz-empty-big"
                    description={
                        <span>
                            ( <SmileOutlined /> No messages yet! )
                        </span>
                    }
                />
            )}

            {(props.loading || props.messageList.length > 0) && (
                <List
                    loading={spin}
                    dataSource={messageList}
                    renderItem={(item: MessageEntity) => (
                        <MessageTableItem
                            botId={props.bot.id}
                            messageEntity={item}
                            onDeleteClick={messageId => {
                                props.onDelete(messageId);
                            }}
                            onEditSmartCardClick={(messageEntity: MessageEntity) =>
                                props.onEditSmartCardClick(messageEntity)
                            }
                        />
                    )}
                />
            )}
        </Fragment>
    );
};

export default MessageTable;
