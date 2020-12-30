import React, { useState, FC } from 'react';
import { Button, Drawer, Tabs } from 'antd';

import ChannelsDetails from './ChannelsDetails';
import ChannelsForm from './ChannelsForm';

import 'antd/dist/antd.css';
import './scss/Channels.scss';

const { TabPane } = Tabs;

interface Props {
    chTitle?: String;
    visible?: boolean;
    onClose: () => void;
}

const ChannelDrawer: FC<Props> = ({ chTitle, visible, onClose }) => {
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
        <Drawer title={chTitle} onClose={onClose} visible={visible} width="700">
            <div className="steps-action">
                {current < 1 && (
                    <Button type="primary" onClick={() => next()}>
                        Next
                    </Button>
                )}
                {current === 1 && <Button type="primary">Save</Button>}
            </div>
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
        </Drawer>
    );
};

export default ChannelDrawer;
