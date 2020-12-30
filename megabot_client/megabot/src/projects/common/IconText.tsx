import { Space } from 'antd';
import React from 'react';

export const IconText = ({ icon, text }: any) => {
    return (
        <Space>
            {icon}
            {text}
        </Space>
    );
};
