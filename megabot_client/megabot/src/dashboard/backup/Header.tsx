import React, { FC } from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import { Select } from 'antd';
import { Bot } from '../../types';

const { Option } = Select;

interface Props {
    pList?: Bot[];
}

const Header: FC<Props> = props => {
    console.log(props);

    return (
        <Card style={{ height: 80, boxShadow: 'none', background: '#E5E8EC' }}>
            <CardContent style={{ display: 'flex', padding: 10 }}>
                <div style={{ flex: '1 1 0%' }}>
                    <Typography className="card-title" color="textSecondary" gutterBottom>
                        Project Name
                    </Typography>
                    <Typography
                        className="card-contents"
                        style={{
                            color: '#26344A',
                            fontSize: 14,
                            paddingLeft: 10,
                        }}
                        gutterBottom
                    >
                        BOOK_MEETING_ROOM
                    </Typography>
                </div>
                <div style={{ flex: '1 1 0%' }}>
                    <Typography className="card-title" color="textSecondary" gutterBottom>
                        Description
                    </Typography>
                    <Typography
                        className="card-contents"
                        style={{
                            color: '#26344A',
                            fontSize: 14,
                            paddingLeft: 10,
                        }}
                        gutterBottom
                    >
                        No Description
                    </Typography>
                </div>
                <div style={{ flex: '1 1 0%' }}>
                    <Typography className="card-title" color="textSecondary" gutterBottom>
                        Select Project
                    </Typography>
                    <Select style={{ width: 200, paddingLeft: 10 }} placeholder="Select Project">
                        <Option value="jack">Jack</Option>
                    </Select>
                </div>
            </CardContent>
        </Card>
    );
};

export default Header;
