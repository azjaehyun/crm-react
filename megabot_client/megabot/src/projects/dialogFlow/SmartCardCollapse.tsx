import React, { FC } from 'react';
import { Collapse } from 'antd';

const { Panel } = Collapse;

const SmartCardCollapse: FC = () => {
    return (
        <Collapse defaultActiveKey={['1']} style={{ marginBottom: 10 }} expandIconPosition="right">
            <Panel header="Smart Card" key="1" />
        </Collapse>
    );
};

export default SmartCardCollapse;
