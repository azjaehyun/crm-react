import React from 'react';
import { Typography } from 'antd';

import 'antd/dist/antd.css';
import './scss/Channels.scss';

const { Paragraph } = Typography;

const ChannelsDesc = () => {
    return (
        <div>
            <Paragraph className="desc">
                Configure destinations for your bot to communicate with one or more of the channel selection below. Each
                channel may have a unique process to enable it but the instructions are provided.
            </Paragraph>
        </div>
    );
};

export default ChannelsDesc;
