import React, { FC } from 'react';
import { Table, Tag } from 'antd';
import { CommentOutlined } from '@ant-design/icons';
import { IndicatorIcon, PrimaryColor } from '../common/Constants';
import { useTranslate } from 'react-admin';

interface Prods {
    loading: any;
    intentList: any;
    botGroup: any;
    onChange: () => void;
}

const BotGroupLinkedIntentList: FC<Prods> = (prods: Prods) => {
    const translate = useTranslate();

    const spin = {
        indicator: IndicatorIcon,
        spinning: prods.loading,
        tip: translate(`common.message.loading`),
    };
    const columns = [
        {
            title: translate(`resources.intents.table_header.intent`),
            width: 400,
            render: (intent: any) => <span style={{ color: PrimaryColor }}>#{intent.fullConfirmIntent}</span>,
        },
        {
            title: translate(`resources.intents.table_header.information`),
            width: 'auto',
            render: (record: any) => (
                <div>
                    <Tag title={`There are ${record.sampleCount || 0} samples`} className="mz-tag mz-tag-white">
                        <CommentOutlined />
                        <span className="mz-tag-content">{record.sampleCount || 0}</span>
                    </Tag>
                    {(record.slots || []).map((slot: any, index: number) => {
                        return (
                            <Tag color={slot.color} key={index} title={slot.name} className="mz-tag-white">
                                {slot.name}
                            </Tag>
                        );
                    })}
                </div>
            ),
        },
    ];

    if (!prods.botGroup) return null;

    return (
        <Table
            className="mz-table"
            loading={spin}
            dataSource={prods.intentList}
            columns={columns}
            pagination={false}
            size="small"
            rowKey="id"
        />
    );
};

export default BotGroupLinkedIntentList;
