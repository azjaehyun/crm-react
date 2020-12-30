import React, { FC, Fragment, useState } from 'react';
import { Avatar, Card, List, Tag, Drawer, Descriptions } from 'antd';
import { BOT_LANGUAGES, Icon_SingleBot, PAGE_SIZE } from './common/Constants';
import { Record } from 'ra-core';
import { Typography } from 'antd';
import BotPreview from './BotPreview';
import { useTranslate } from 'react-admin';

const { Paragraph } = Typography;
const { Meta } = Card;

interface Props {
    sharedBots: Record[];
    loading: any;
    loginUsername: any;
}

const SharedList: FC<Props> = props => {
    const translate = useTranslate();
    const [visible, setVisible] = useState(false);
    const [botPreview, setBotPreview] = useState();
    const onPreview = (bot: any) => {
        setVisible(true);
        setBotPreview(bot);
    };

    const onClose = () => {
        setVisible(false);
    };

    return (
        <Fragment>
            <List
                className="shared-list"
                dataSource={props.sharedBots}
                loading={props.loading}
                pagination={{ pageSize: PAGE_SIZE }}
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
                    <List.Item style={{ border: 'none', padding: '10px 0' }}>
                        <Card className="shared-items" style={{ width: '100%' }} onClick={e => onPreview(bot)}>
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
                                        <Avatar
                                            alt={BOT_LANGUAGES[bot.language].name}
                                            size={20}
                                            style={{ marginRight: '5px' }}
                                            shape="square"
                                            src={BOT_LANGUAGES[bot.language].icon}
                                        />
                                        <label style={{ color: 'blue' }}>{bot.user.username}</label>/{bot.name}
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
                                            {bot.description
                                                ? bot.description
                                                : translate(`common.label.no_description`)}
                                        </Paragraph>
                                        <Descriptions title="" column={5}>
                                            <Descriptions.Item label="Owner">
                                                <label style={{ color: 'blue' }}>{bot.user.username}</label>
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
                    </List.Item>
                )}
            />
            <Drawer title="Bot preview" placement="right" onClose={onClose} visible={visible} width="500">
                <BotPreview bot={botPreview} loginUsername={props.loginUsername} />
            </Drawer>
        </Fragment>
    );
};

export default SharedList;
