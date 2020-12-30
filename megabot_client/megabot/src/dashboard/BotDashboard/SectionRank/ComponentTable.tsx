import React, { FC } from 'react';
import ComponentWordcloud, { WordCloudDataList } from './ComponentWordcloud';
import { Col, Table } from 'antd';

interface Props {
    data: WordCloudDataList;
}

const ComponentTable: FC<Props> = props => {
    return (
        <Table
            dataSource={props.data.map((data, index) => {
                return { key: index + 1, text: data.label, value: data.value };
            })}
            columns={[
                { title: 'rank', width: 50, dataIndex: 'key' },
                { title: 'text', dataIndex: 'text' },
                { title: 'value', dataIndex: 'value' },
            ]}
            style={{ minHeight: 240 }}
            scroll={{ y: 240 }}
        />
    );
};

export default ComponentTable;
