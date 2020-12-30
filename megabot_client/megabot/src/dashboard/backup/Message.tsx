import React, { FC } from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import { List } from 'antd';

const Message: FC = () => {
    return (
        <div style={{ display: 'flex' }}>
            <Card style={{ height: 150, flex: 1, marginRight: 10 }}>
                <CardContent>
                    <Typography className="card-title" color="textSecondary" gutterBottom>
                        Message
                    </Typography>
                    <List size="small">
                        <List.Item>
                            <span className="msg-label">Welcome Message</span>
                            <span className="msg-cnt welcome">13</span>
                        </List.Item>
                        <List.Item>
                            <span className="msg-label">Not-Understand Message</span>
                            <span className="msg-cnt not-understand">5</span>
                        </List.Item>
                    </List>
                </CardContent>
            </Card>
            <Card style={{ height: 200, flex: 1 }}>
                <CardContent>
                    <Typography className="card-title" color="textSecondary" gutterBottom>
                        Others
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
};

export default Message;
