import React, { FC, Fragment } from 'react';
import { Bot } from '../types';
import { Link } from 'react-router-dom';
import { Avatar, Card, List, Tag, Descriptions, Typography, Space, Tooltip } from 'antd';
import { BOT_LANGUAGES, BOT_TYPES, BotPrivateColor, BotPublicColor } from './common/Constants';
import { useTranslate } from 'react-admin';
import { LockOutlined, UnlockOutlined, UserOutlined } from '@ant-design/icons/lib';
import Moment from 'react-moment';
import { IconText } from './common/IconText';

const { Paragraph, Text } = Typography;
const { Meta } = Card;

interface Props {
    pList?: Bot[];
    total?: number;
    pageSize?: number;
    loading: any;
    reload: any;
    onDeleteBot: any;
}

const MyProjectsList: FC<Props> = props => {
    const translate = useTranslate();
    return (
        <List
            dataSource={props.pList}
            loading={props.loading}
            pagination={{
                size: 'small',
                total: props.total,
                pageSize: props.pageSize,
                onChange: e => props.reload(e),
                showTotal: (total: any, range: any) => `${range[0]}-${range[1]} of ${total} items`,
            }}
            grid={{
                gutter: 16,
                xs: 1,
                sm: 1,
                md: 1,
                lg: 1,
                xl: 1,
                xxl: 1,
            }}
            renderItem={bot => (
                <List.Item className="project-list-item">
                    <Card className="project-card">
                        <Meta
                            avatar={
                                <Link to={`/project-details/${bot.id}/summary`}>
                                    <Avatar
                                        shape="square"
                                        style={{ backgroundColor: 'transparent' }}
                                        src={bot.thumbnail}
                                        size={50}
                                        icon={<Avatar shape="square" size={50} src={BOT_TYPES[bot.botType].icon} />}
                                    />
                                </Link>
                            }
                            title={
                                <Fragment>
                                    <Link to={`/project-details/${bot.id}/summary`}>{bot.name}</Link>
                                    <div style={{ float: 'right' }}>
                                        {bot.private ? (
                                            <Tooltip title={translate(`common.label.private`)}>
                                                <span>
                                                    <IconText
                                                        icon={<LockOutlined style={{ color: BotPrivateColor }} />}
                                                        text={null}
                                                    />
                                                </span>
                                            </Tooltip>
                                        ) : (
                                            <Tooltip title={translate(`common.label.public`)}>
                                                <span>
                                                    <IconText
                                                        icon={<UnlockOutlined style={{ color: BotPublicColor }} />}
                                                        text={null}
                                                    />
                                                </span>
                                            </Tooltip>
                                        )}
                                    </div>
                                </Fragment>
                            }
                            description={
                                <div style={{ paddingRight: 40 }}>
                                    <Paragraph
                                        ellipsis={{
                                            rows: 2,
                                            expandable: true,
                                            symbol: translate('common.label.more'),
                                        }}
                                    >
                                        {bot.description ? bot.description : translate(`common.label.no_description`)}
                                    </Paragraph>
                                    <div>
                                        <Space size="large">
                                            <IconText icon={<UserOutlined />} text={bot.botOwner.username} />
                                            <IconText
                                                icon={
                                                    <Text style={{ color: '#000' }}>
                                                        {BOT_LANGUAGES[bot.language].icon}
                                                    </Text>
                                                }
                                                text={BOT_LANGUAGES[bot.language].name}
                                            />
                                            <IconText icon={'Type:'} text={BOT_TYPES[bot.botType].name} />
                                            <div>
                                                {bot.tags && bot.tags.length > 0 && (
                                                    <Descriptions.Item label="Tags">
                                                        {bot.tags.map((tag: any, idx: number) => (
                                                            <Tag key={`tag-${idx}`} className="project-items-tag">
                                                                {tag}
                                                            </Tag>
                                                        ))}
                                                    </Descriptions.Item>
                                                )}
                                            </div>
                                            <Tooltip title={bot.updatedOn}>
                                                <span>
                                                    {translate('common.label.updated_on')}{' '}
                                                    <Moment fromNow withTitle={false} locale={bot.language}>
                                                        {bot.updatedOn}
                                                    </Moment>
                                                </span>
                                            </Tooltip>
                                        </Space>
                                    </div>
                                    <div style={{ float: 'right' }} />
                                </div>
                            }
                        />
                    </Card>
                </List.Item>
            )}
        />
    );
};

export default MyProjectsList;
