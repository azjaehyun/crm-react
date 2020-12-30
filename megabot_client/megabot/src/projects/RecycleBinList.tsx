import React, { FC } from 'react';
import { Bot } from '../types';
import { Link } from 'react-router-dom';
import { Avatar, Card, List, Tag, Descriptions } from 'antd';
import { Typography } from 'antd';
import { Icon_SingleBot } from './common/Constants';

const { Paragraph } = Typography;
const { Meta } = Card;

interface Props {
    deletedBots: Bot[];
    total: number;
    pageSize: number;
    loading: any;
    reload: any;
}

const RecycleBinList: FC<Props> = props => {
    return (
        <List
            className="project-list"
            dataSource={props.deletedBots}
            loading={props.loading}
            pagination={{
                total: props.total,
                pageSize: props.pageSize,
                onChange: e => props.reload(e),
            }}
            grid={{
                gutter: 24,
                xs: 1,
                sm: 1,
                md: 1,
                lg: 1,
                xl: 1,
                xxl: 1,
            }}
            renderItem={bot => (
                <List.Item style={{ border: 'none' }}>
                    <Link to={`/project-details/${bot.id}`}>
                        <Card className="project-items">
                            <Meta
                                avatar={
                                    <Avatar
                                        shape="square"
                                        size="large"
                                        src={bot.thumbnail ? bot.thumbnail : Icon_SingleBot}
                                        style={{ width: 80, height: 80 }}
                                    />
                                }
                                title={
                                    <div>
                                        <label>{bot.name}</label>
                                        {bot.private && (
                                            <Tag
                                                color="gold"
                                                style={{
                                                    marginRight: '10px',
                                                }}
                                            >
                                                private
                                            </Tag>
                                        )}
                                    </div>
                                }
                                description={
                                    <div>
                                        <Paragraph
                                            ellipsis={{
                                                rows: 2,
                                                expandable: true,
                                            }}
                                        >
                                            {bot.description ? bot.description : 'No description'}
                                        </Paragraph>
                                        <Descriptions title="" column={5}>
                                            <Descriptions.Item label="Owner">
                                                <label style={{ color: 'blue' }}>{bot.botOwner.username}</label>
                                            </Descriptions.Item>
                                            <Descriptions.Item label="Type">
                                                <Tag color="green">{bot.botType}</Tag>
                                            </Descriptions.Item>
                                            <Descriptions.Item label="Last updated">{bot.updatedOn}</Descriptions.Item>
                                            {bot.tags && bot.tags.length > 0 && (
                                                <Descriptions.Item label="Tags">
                                                    {bot.tags.map((tag: any, idx: number) => (
                                                        <Tag key={`tag${idx}`} className="project-items-tag">
                                                            {tag}
                                                        </Tag>
                                                    ))}
                                                </Descriptions.Item>
                                            )}
                                        </Descriptions>
                                    </div>
                                }
                            />
                        </Card>
                    </Link>
                </List.Item>
            )}
        />
    );
};

export default RecycleBinList;
