import React, { useState } from 'react';
import { Card, Avatar } from 'antd';
// import { useTranslate } from 'react-admin';

import ChannelDrawer from './ChannelDrawer';
import 'antd/dist/antd.css';
import './scss/Channels.scss';

const { Meta } = Card;

const EnterpriseChannel = () => {
    const socialCh = [
        {
            key: 'channels1',
            title: 'Amazon Alexa',
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        },
        {
            key: 'channels2',
            title: 'IVR',
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        },
        {
            key: 'channels3',
            title: 'Twillo Voice',
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        },
    ];
    // const translate = useTranslate();
    const [visible, setVisible] = useState(false);
    const [chTitle, setChTitle] = useState('');

    const showDrawer = (item: any) => {
        setChTitle(item.key);
        setVisible(true);
        console.log(item.key, item.tabLength);
    };
    const onClose = () => {
        setVisible(false);
    };

    return (
        <div>
            <div className="channel-wrapper">
                <h2 className="channel-head">Social Channels</h2>
                {socialCh.map(item => (
                    <Card className="channel-area" hoverable={true} key={item.key} onClick={() => showDrawer(item)}>
                        <Meta avatar={<Avatar src={item.avatar} />} title={item.title} />
                    </Card>
                ))}
            </div>
            <ChannelDrawer chTitle={chTitle} visible={visible} onClose={onClose} />
        </div>
    );
};

export default EnterpriseChannel;
