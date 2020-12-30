import React, { FC } from 'react';
import { Avatar, Typography } from 'antd';
import { SC002Data } from '../types';
const { Paragraph } = Typography;
interface Prods {
    data?: SC002Data;
}

/**
 * Basic card with image on left
 * @param prods
 * @constructor
 */
const SC002: FC<Prods> = (prods: any) => {
    return (
        <div className="sc002">
            <div className="img-area">
                <Avatar src={prods.data.imageUrl} shape="square" />
            </div>
            <div className="body-area">
                <Paragraph className="title" ellipsis={{ rows: 2 }} title={prods.data.title}>
                    {prods.data.title}
                </Paragraph>
                <Paragraph className="description" ellipsis={{ rows: 4 }} title={prods.data.description}>
                    {prods.data.description}
                </Paragraph>
            </div>
        </div>
    );
};

export default SC002;
