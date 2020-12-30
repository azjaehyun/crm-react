import React, { FC, useEffect, useState } from 'react';
import { Popconfirm, Space, Table, Typography } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { EditOutlined } from '@ant-design/icons/lib';
import { useTranslate } from 'react-admin';
import { IndicatorIcon } from '../../common/Constants';

const { Paragraph } = Typography;

interface QAItem {
    id: number;
    question: string;
    answer: string;
}

interface Prods {
    botId: any;
    irqaList: any;
    pagination: any;
    loading: Boolean;
    onPageChange: any;
    onEditClick: any;
    onDeleteClick: any;
}

const SmallTalkQAList: FC<Prods> = (prods: any) => {
    const translate = useTranslate();
    const [data, setData] = useState();

    const onPageChange = (page: any) => {
        // console.log('onPageChange', page);
        prods.onPageChange(page);
    };

    const onRowCheckChange = (selectedRowKeys: any) => {
        // prods.onRowCheckChange(selectedRowKeys);
    };

    const columns = [
        {
            title: translate(`resources.smalltalk.table_header.question`),
            dataIndex: 'question',
            width: '30%',
            render: (question: any) => {
                return <Paragraph ellipsis={{ rows: 2, expandable: true, symbol: 'more' }}>{question}</Paragraph>;
            },
        },
        {
            title: translate(`resources.smalltalk.table_header.answer`),
            dataIndex: 'answer',
            render: (answer: any) => {
                return <Paragraph ellipsis={{ rows: 2, expandable: true, symbol: 'more' }}>{answer}</Paragraph>;
            },
        },
        {
            width: 100,
            className: 'small-talk--actions',
            dataIndex: 'operation',
            render: (_: any, record: QAItem) => {
                return (
                    <Space size="small">
                        <EditOutlined onClick={() => prods.onEditClick(record)} />
                        <Popconfirm
                            placement="left"
                            title={translate(`resources.smalltalk.message.delete_confirm`)}
                            onConfirm={() => prods.onDeleteClick(record)}
                            okText={translate(`common.button.yes`)}
                            cancelText={translate(`common.button.no`)}
                        >
                            <DeleteOutlined title="Delete" className="trash-btn" />
                        </Popconfirm>
                    </Space>
                );
            },
        },
    ];

    const spin = {
        indicator: IndicatorIcon,
        spinning: prods.loading,
        tip: translate(`common.message.loading`),
    };

    useEffect(() => {
        setData(prods.irqaList);
    }, [prods.irqaList]);

    return (
        <Table
            id="small-talk-table"
            className="mz-table"
            dataSource={data}
            columns={columns}
            rowSelection={{
                type: 'checkbox',
                onChange: onRowCheckChange,
            }}
            showHeader={true}
            pagination={{ ...prods.pagination, size: 'small', onChange: onPageChange }}
            size="small"
            rowKey="id"
            loading={spin}
        />
    );
};

export default SmallTalkQAList;
