import React, { FC, useEffect, useRef, Fragment } from 'react';
import { Typography } from 'antd';
import { uuid } from '../../utils/uuid';
import BotBlock from './BotBlock';
import { Scrollbars } from 'react-custom-scrollbars';
import UserBlock from './UserBlock';
import DebugBlock from './DebugBlock';

interface Prods {
    bot: any;
    turnList: any;
    onSelected: any;
    debugMode: Boolean;
}

const ConversationList: FC<Prods> = (prods: any) => {
    const scrollBar = useRef<Scrollbars>(null);
    useEffect(() => {
        setTimeout(() => {
            if (scrollBar.current) {
                scrollBar.current.scrollToBottom();
                // console.log('scroll to bottom');
            }
        }, 500);
    }, [prods.turnList]);

    if (!prods.turnList) return null;

    return (
        <Scrollbars ref={scrollBar} autoHide autoHideTimeout={500} autoHideDuration={100}>
            <div style={{ paddingRight: 20 }}>
                {prods.turnList.map((turn: any) => (
                    <Fragment key={uuid()}>
                        {turn.question && <UserBlock bot={prods.bot} turn={turn} />}
                        {turn.answer && (
                            <BotBlock
                                bot={prods.bot}
                                turn={turn}
                                onSelected={prods.onSelected}
                                debugMode={prods.debugMode}
                            >
                                {prods.debugMode &&
                                    turn.turnId !== 0 &&
                                    !turn.answer.isWaiting &&
                                    turn.answer.context && <DebugBlock turn={turn} />}
                            </BotBlock>
                        )}
                    </Fragment>
                ))}
            </div>
        </Scrollbars>
    );
};

export default ConversationList;
