import React, { FC, Fragment } from 'react';
import { Avatar, Typography } from 'antd';
import { Turn } from './data/Conversation';
const { Text } = Typography;

interface Prods {
    bot: any;
    turn: Turn;
}

const UserBlock: FC<Prods> = (prods: any) => {
    return (
        <div className="user-block">
            <div className="block-content">
                <Text className="message-time">{prods.turn.question.time}</Text>
                <div className="message-text">{prods.turn.question.message}</div>
            </div>
        </div>
    );
};

export default UserBlock;
