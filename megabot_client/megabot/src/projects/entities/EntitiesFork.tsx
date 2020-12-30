import React, { FC, Fragment } from 'react';
import { Button, Card, List, Popconfirm, Tag } from 'antd';
import { SwapOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import { useDataProvider } from 'ra-core';
import EntityService from '../service/entityService';
import { useTranslate } from 'react-admin';

interface Props {
    keyword?: String;
    list?: any;
}

const { Meta } = Card;

const EntitiesFork: FC<Props> = props => {
    const dataProvider = useDataProvider();
    const translate = useTranslate();

    const confirm = (botId: string, entityId: string) => {
        EntityService.fork(dataProvider, botId, entityId)
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
                className="entity-fork-list"
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
                                        <span style={{ color: '#28A0FF' }}>{item.originalBot.user.username}</span>
                                        <span> / </span>
                                        <span style={{ color: '#28A0FF' }}>{item.originalBot.name}</span>
                                        <span> / </span>
                                        <span style={{ color: '#0078FF' }}>@{item.name}</span>
                                        <Popconfirm
                                            placement="top"
                                            title="Are you sure to fork this intent?"
                                            onConfirm={() => confirm(item.originalBot.id, item.id)}
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
                                    item.description ? item.description : translate(`common.label.no_description`)
                                }
                            />
                            <div style={{ marginTop: 10 }}>
                                {item.values.map((value: any, index: number) => {
                                    return (
                                        <Tag key={index} title={value.value} className="mz-tag-white">
                                            {value.value}
                                        </Tag>
                                    );
                                })}
                            </div>
                        </Card>
                    </List.Item>
                )}
            />
        </Fragment>
    );
};

export default EntitiesFork;
