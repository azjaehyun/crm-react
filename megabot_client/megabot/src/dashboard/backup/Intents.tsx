import React, { FC } from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import { List } from 'antd';

const Intents: FC = () => {
    return (
        <Card style={{ marginBottom: 10, height: 230 }}>
            <CardContent>
                <Typography className="card-title" color="textSecondary" gutterBottom>
                    Intents
                </Typography>
                <List
                    className="intent-list"
                    size="small"
                    pagination={{
                        pageSize: 3,
                    }}
                >
                    <List.Item>
                        BOOK_MEETING_ROOM
                        <span
                            style={{
                                float: 'right',
                                color: '#1890FF',
                                background: '#E6F7FF',
                                border: '1px solid #91D5FF',
                                padding: '0 7px',
                                borderRadius: 5,
                                width: 30,
                                textAlign: 'center',
                                fontSize: 13,
                            }}
                        >
                            7
                        </span>
                    </List.Item>
                    <List.Item>
                        BOOK_MEETING_ROOM2
                        <span
                            style={{
                                float: 'right',
                                color: '#1890FF',
                                background: '#E6F7FF',
                                border: '1px solid #91D5FF',
                                padding: '0 7px',
                                borderRadius: 5,
                                width: 30,
                                textAlign: 'center',
                                fontSize: 13,
                            }}
                        >
                            2
                        </span>
                    </List.Item>
                </List>
            </CardContent>
        </Card>
    );
};

export default Intents;
