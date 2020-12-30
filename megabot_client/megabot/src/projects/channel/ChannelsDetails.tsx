import React from 'react';
import { Row, Col, Divider } from 'antd';

import 'antd/dist/antd.css';
import './scss/Channels.scss';

const ChannelsDetails = () => {
    return (
        <div>
            <p>
                To add Google RCS Business Messaging as a channel, please submit your request to Kore.ai support team
                and follow the instructions as detailed below:
            </p>
            <Divider />
            <p>Step 1: Requesting access to enable Google RCS Business messaging as a channel</p>
            <p>
                Navigate to 'Configurations' tab , select 'Request Access' as 'Yes' and click on 'Save' button. You will
                receive an email from Kore.ai support team with instructions for creating a Bot Agent on Google RCS
                Business Messaging.
            </p>
            <Divider />
            <p>Step 2: Create an App and Publish the bot for the business to initiate the testing process</p>
            <p>
                Our support team will create a Bot Agent (on Google RCS) based on inputs received from you. You will be
                notified and will need to then
            </p>
        </div>
    );
};

export default ChannelsDetails;
