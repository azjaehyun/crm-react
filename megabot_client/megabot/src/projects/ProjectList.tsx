import React, { FC, Fragment } from 'react';
import { Bot } from '../types';
import { Link, useRouteMatch } from 'react-router-dom';
import { Card, List, Popconfirm } from 'antd';
import { RedditOutlined, DeleteOutlined, SettingOutlined } from '@ant-design/icons';

import './scss/ProjectList.scss';

const { Meta } = Card;

interface Props {
    pList?: Bot[];
    loading?: Boolean;
}

const ProjectList: FC<Props> = props => {
    let match = useRouteMatch();

    const performDeleteBot = (botId: any) => {
        console.log('delete bot', botId);
    };

    return (
        <Fragment>
            <List
                grid={{
                    gutter: 24,
                    xs: 1,
                    sm: 1,
                    md: 2,
                    lg: 3,
                    xl: 4,
                    xxl: 5,
                }}
                dataSource={props.pList}
                renderItem={bot => (
                    <List.Item>
                        <Card
                            key={bot.id}
                            className="chat-bot-contents"
                            actions={[
                                <SettingOutlined key="edit" />,
                                <Popconfirm
                                    title="Are you sure delete this bot?"
                                    onConfirm={() => performDeleteBot(bot.id)}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    <DeleteOutlined key="deleteMessage" />
                                </Popconfirm>,
                            ]}
                        >
                            <Meta
                                avatar={<RedditOutlined className="card-icon" />}
                                title={<Link to={`${match.path}/${bot.id}`}>{bot.name}</Link>}
                                description={bot.description || '[no description]'}
                            />
                        </Card>
                    </List.Item>
                )}
            />
        </Fragment>
    );
};

export default ProjectList;
