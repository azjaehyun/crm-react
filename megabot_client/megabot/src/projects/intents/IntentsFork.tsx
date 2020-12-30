import React, { FC, Fragment } from 'react';
import { Button, Card, List, Popconfirm, Tag } from 'antd';
import { SwapOutlined, LeftOutlined, RightOutlined, CommentOutlined } from '@ant-design/icons';
import IntentService from '../service/intentService';
import { useDataProvider } from 'ra-core';
import { useTranslate } from 'react-admin';

interface Props {
    keyword?: String;
    list?: any;
}

const { Meta } = Card;

const IntentsFork: FC<Props> = props => {
    const dataProvider = useDataProvider();
    const translate = useTranslate();

    const confirm = (botId: string, botIntentId: string, intentName: string) => {
        IntentService.fork(dataProvider, botId, botIntentId, { intentName: intentName })
            .then(({ data }: any) => {
                console.log(data);
            })
            .catch((error: any) => {
                console.log(error);
            });
    };

    return (
        <Fragment>
            <List
                className="intent-fork-list"
                style={{ margin: '15px 0 30px 0' }}
                dataSource={props.list}
                pagination={{
                    pageSize: 3,
                }}
                renderItem={(item: any) => (
                    <List.Item style={{ border: 'none', padding: '5px 0' }}>
                        <Card style={{ width: '100%' }}>
                            <Meta
                                title={
                                    <div>
                                        <span style={{ color: '#28A0FF' }}>{item.bot.user.username}</span>
                                        <span> / </span>
                                        <span style={{ color: '#28A0FF' }}>{item.bot.name}</span>
                                        <span> / </span>
                                        <span style={{ color: '#0078FF' }}>#{item.name}</span>
                                        <Popconfirm
                                            placement="top"
                                            title="Are you sure to fork this intent?"
                                            onConfirm={() => confirm(item.bot.id, item.id, item.name)}
                                            okText="Yes"
                                            cancelText="No"
                                        >
                                            <Button
                                                type="primary"
                                                ghost
                                                icon={<SwapOutlined />}
                                                style={{ float: 'right' }}
                                            >
                                                Fork
                                            </Button>
                                        </Popconfirm>
                                    </div>
                                }
                                description={
                                    item.bot.description
                                        ? item.bot.description
                                        : translate(`common.label.no_description`)
                                }
                            />
                            <div style={{ marginTop: 10 }}>
                                <Tag title={`There are ${item.sampleCount} samples`} className="mz-tag mz-tag-white">
                                    <CommentOutlined />
                                    <span className="mz-tag-content">{item.sampleCount}</span>
                                </Tag>
                            </div>
                        </Card>
                    </List.Item>
                )}
            />
        </Fragment>
    );
};

export default IntentsFork;
