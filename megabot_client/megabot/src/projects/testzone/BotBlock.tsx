import React, { FC, Fragment } from 'react';
import { Avatar, Badge, Typography } from 'antd';
import { BOT_TYPES, Icon_SingleBot, MESSAGE_CONTENT_TYPE } from '../common/Constants';
import { Turn } from './data/Conversation';
import { uuid } from '../../utils/uuid';
import SmartCard from './SmartCard';
import { EllipsisOutlined } from '@ant-design/icons';
import { useTranslate } from 'ra-core';
const { Text, Paragraph } = Typography;

interface Prods {
    bot: any;
    turn: Turn;
    debugMode: Boolean;
    className?: any;
    onSelected?: any;
}

const BotBlock: FC<Prods> = (prods: any) => {
    const translate = useTranslate();
    return (
        <div className="bot-block">
            <Avatar
                className="bot-avatar"
                size={24}
                src={prods.bot.thumbnail}
                icon={<Avatar size={24} src={BOT_TYPES[prods.bot.botType].icon} />}
            />
            {!prods.turn.answer.isWaiting && (
                <div className="block-content">
                    <Text className="message-time">{prods.turn.answer.time}</Text>
                    {prods.turn.answer.error && (
                        <div className="message-text-wrapper">
                            <div key={uuid()} className="message-text--error">
                                {prods.turn.answer.error}
                            </div>
                        </div>
                    )}

                    {prods.children}

                    {!prods.turn.answer.error &&
                        prods.turn.answer.responses &&
                        prods.turn.answer.responses.map((reply: any) => (
                            <Fragment key={uuid()}>
                                {reply.type === MESSAGE_CONTENT_TYPE.TEXT && (
                                    <div className="message-text-wrapper">
                                        <div key={uuid()} className="message-text">
                                            <pre>{reply.content}</pre>
                                            {prods.debugMode && (
                                                <Text className="confidence">
                                                    (Confidence:{' '}
                                                    {reply.confidence && reply.confidence > 0
                                                        ? reply.confidence.toFixed(3)
                                                        : 0}
                                                    )
                                                </Text>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {reply.type === MESSAGE_CONTENT_TYPE.SMART_CARD && (
                                    <SmartCard
                                        templateCode={reply.content.templateCode}
                                        data={reply.content}
                                        onSelected={prods.onSelected}
                                    />
                                )}

                                {reply.type === MESSAGE_CONTENT_TYPE.INTERNAL_SERVER_ERROR && (
                                    <div className="message-text-wrapper">
                                        <div key={uuid()} className="message-text--error">
                                            {reply.content && reply.content.length > 0
                                                ? reply.content
                                                : translate('common.message.unknown_error')}
                                        </div>
                                    </div>
                                )}
                            </Fragment>
                        ))}
                </div>
            )}

            {prods.turn.answer.isWaiting && (
                <div className="block-content">
                    <Text className="message-time">{prods.turn.answer.time}</Text>
                    <div className="message-text-wrapper">
                        <div className="message-text">
                            <EllipsisOutlined />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BotBlock;
