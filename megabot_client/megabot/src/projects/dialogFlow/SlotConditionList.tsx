import React, { FC } from 'react';
import { Checkbox, Popconfirm, Table, Empty } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { SlotTable } from '../../types';
import { uuid } from '../../utils/uuid';
import { useTranslate } from 'ra-core';

interface Props {
    slotTables: SlotTable[];
    onDeleteSlot: any;
    onEditSlot: any;
    orderNo: number;
}
const SlotConditionList: FC<Props> = props => {
    const translate = useTranslate();
    const onDelete = () => {};

    const onDeleteSlotTable = (slot: any) => {
        props.onDeleteSlot(slot, props.orderNo);
    };
    const columns = [
        {
            title: translate(`resources.context_flow.slot.table.required`),
            render: (record: any) => (
                <>{record.require ? <Checkbox disabled={true} defaultChecked /> : <Checkbox disabled={true} />}</>
            ),
        },
        {
            title: translate(`resources.context_flow.slot.table.slot`),
            dataIndex: 'name',
        },
        {
            title: translate(`resources.context_flow.slot.table.default_value`),
            dataIndex: 'defaultValue',
        },
        {
            title: translate(`resources.context_flow.slot.table.ask_to_user`),
            dataIndex: 'promptToUser',
            render: (pt: []) => <>{pt && pt.length > 0 && <label> {pt.length}</label>}</>,
        },
        {
            width: 20,
            render: (slot: any) => (
                <div className="mz-table-extra">
                    <EditOutlined className="edit-btn" onClick={() => props.onEditSlot(slot, props.orderNo)} />
                </div>
            ),
        },
        {
            width: 20,
            render: (record: any) => (
                <div className="mz-table-extra">
                    <Popconfirm
                        placement="left"
                        title="Are you sure delete this slot?"
                        onConfirm={() => onDelete()}
                        okText="Yes"
                        cancelText="No"
                    >
                        <DeleteOutlined className="trash-btn" onClick={() => onDeleteSlotTable(record)} />
                    </Popconfirm>
                </div>
            ),
        },
    ];
    return (
        <Table
            dataSource={props.slotTables}
            columns={columns}
            size="small"
            pagination={false}
            rowKey={uuid()}
            scroll={{ y: 100 }}
        />
    );
};

export default SlotConditionList;
