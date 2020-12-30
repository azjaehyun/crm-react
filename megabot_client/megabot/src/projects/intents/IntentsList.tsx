import React, { FC } from 'react';
import { Popconfirm, Space, Table, Tag } from 'antd';
import { CommentOutlined } from '@ant-design/icons';
import { DeleteOutlined } from '@ant-design/icons/lib';
import { IndicatorIcon } from '../common/Constants';
import { useTranslate } from 'react-admin';
import Moment from 'react-moment';

interface Prods {
    loading: any;
    intentList: any;
    onClickIntent?: any;
    onDeleteIntent?: any;
    onRowCheckChange: any;
}

const IntentsList: FC<Prods> = (prods: any) => {
    const translate = useTranslate();
    const onRowCheckChange = (selectedRowKeys: any) => {
        prods.onRowCheckChange(selectedRowKeys);
    };

    const spin = {
        indicator: IndicatorIcon,
        spinning: prods.loading,
        tip: translate(`common.message.loading`),
    };

    const columns = [
        {
            title: translate(`resources.intents.table_header.intent`),
            width: 200,
            render: (intent: any) => (
                <Space>
                    <a
                        href="javascript:void(0)"
                        onClick={() => {
                            prods.onClickIntent(intent);
                        }}
                    >
                        #{intent.name}
                    </a>
                </Space>
            ),
        },
        {
            title: translate(`resources.intents.table_header.information`),
            minWidth: 300,
            render: (record: any) => (
                <div>
                    <Tag title={`There are ${record.sampleCount} samples`} className="mz-tag mz-tag-white">
                        <CommentOutlined />
                        <span className="mz-tag-content">{record.sampleCount}</span>
                    </Tag>
                    {record.slots.map((slot: any, index: number) => {
                        return (
                            <Tag color={slot.color} key={index} title={slot.name} className="mz-tag-white">
                                {slot.name}
                            </Tag>
                        );
                    })}
                </div>
            ),
        },
        {
            width: 40,
            render: (intent: any) => (
                <div className="mz-table-extra">
                    <Popconfirm
                        placement="left"
                        title={translate(`resources.intents.message.delete_intent_confirm`)}
                        onConfirm={() => prods.onDeleteIntent(intent.id, intent.name)}
                        okText={translate(`common.button.yes`)}
                        cancelText={translate(`common.button.no`)}
                    >
                        <DeleteOutlined className="trash-btn" />
                    </Popconfirm>
                </div>
            ),
        },
    ];

    return (
        <Table
            id="intent-table"
            className="mz-table"
            loading={spin}
            rowSelection={{
                type: 'checkbox',
                onChange: onRowCheckChange,
            }}
            dataSource={prods.intentList}
            columns={columns}
            pagination={false}
            size="small"
            rowKey="id"
        />
    );
};

export default IntentsList;
