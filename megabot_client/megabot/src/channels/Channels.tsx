import React, { useState } from 'react';
import { Card, Avatar, Button, Drawer, Tabs } from 'antd';
import { Title, useTranslate } from 'react-admin';
import ChannelsDesc from './ChannelsDesc';
import EnterpriseChannel from './EnterpriseChannel';
import SocialChannel from './SocialChannel';
import VoiceChannel from './VoiceChannel';

import 'antd/dist/antd.css';
import './scss/Channels.scss';

const { Meta } = Card;
const { TabPane } = Tabs;

const steps = 2;

const Channels = () => {
    const translate = useTranslate();

    return (
        <div>
            <Title title={translate('resources.channels.name')} />

            <div className="channel-container">
                <ChannelsDesc />
                <EnterpriseChannel />
                <SocialChannel />
                <VoiceChannel />
            </div>
        </div>
    );
};

export default Channels;
