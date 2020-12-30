import React, { useState, FC } from 'react';
import { Button, Drawer, Tabs } from 'antd';

import ChannelsDetails from './ChannelsDetails';
import ChannelsForm from './ChannelsForm';

import 'antd/dist/antd.css';
import './scss/Channels.scss';

const { TabPane } = Tabs;

interface Props {
    botId: any;
}

const ChannelDrawer: FC<Props> = props => {
    const [key, setTabs] = useState('1');
    const [current, setSteps] = useState(0);

    const next = () => {
        setSteps(current + 1);
        setTabs((parseInt(key) + 1).toString());
    };
    const prev = () => {
        setSteps(current - 1);
        setTabs((parseInt(key) - 1).toString());
    };
    const tabChange = () => {
        if (key === '1') {
            next();
        } else {
            prev();
        }
    };
    return (
        <Tabs activeKey={key} onChange={key => tabChange()}>
            <TabPane tab="Instructions" key="1">
                Content of Tab Pane 1
                <ChannelsDetails />
            </TabPane>
            <TabPane tab="Configuration" key="2">
                Content of Tab Pane 2
                <ChannelsForm />
            </TabPane>
        </Tabs>
    );
};

export default ChannelDrawer;
