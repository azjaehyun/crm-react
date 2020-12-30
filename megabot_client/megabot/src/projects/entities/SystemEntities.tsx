import React, { FC, useState } from 'react';
import { Table, Switch, Row, Col, Button, Tag } from 'antd';
import { PlusSquareOutlined } from '@ant-design/icons/lib';
import { Error, useTranslate } from 'react-admin';

interface Props {
    activeLoading: any;
    systemEntities: [];
    turnOnSystemEntityEvent: any;
    openEditForm: any;
}
const SystemEntities: FC<Props> = props => {
    const [onActiveName, setOnActiveName] = useState();
    const translate = useTranslate();

    const onSwitch = (raw: any) => {
        setOnActiveName(raw.name);
        props.turnOnSystemEntityEvent(raw);
    };

    const addSynonym = (record: any) => {
        const entity = { name: record.name, type: 'SYSTEM' };
        console.log('add synonym: ', record);
        props.openEditForm(record);
    };

    const columns = [
        {
            title: translate(`resources.entities.table_header.entity`),
            dataIndex: 'name',
            width: 150,
            render: (text: string) => <span style={{ verticalAlign: 'top', color: '#1890FF' }}>@{text}</span>,
        },
        {
            title: translate(`resources.entities.table_header.description`),
            render: (entity: any) => (
                <>
                    <p>{entity.description}</p>
                    {entity.values && entity.values.length > 0 && (
                        <>
                            {/*<Select mode="tags" style={{ width: '85%' }} onChange={val => setSynonym(val)} />*/}

                            {/*<p style={{ color: '#000' }}>VALUES DEFINITION</p>*/}
                            {entity.values
                                .filter((en: any) => en.value !== '')
                                .map((value: any, index: number) => {
                                    return (
                                        <Tag key={index} color="cyan">
                                            {value.value}
                                        </Tag>
                                    );
                                })}
                            {entity.values.map((value: any, index: number) => {
                                return value.synonyms.map((syn: any, id: number) => {
                                    if (syn.dataType === 'REGEX') {
                                        return (
                                            <Tag key={index + '' + id} color="magenta">
                                                {syn.rawText}
                                            </Tag>
                                        );
                                    }
                                });
                            })}
                        </>
                    )}
                </>
            ),
        },
        {
            title: translate(`resources.entities.table_header.turn_on`),
            width: 85,
            render: (record: any) => (
                <>
                    <Switch
                        size="small"
                        loading={props.activeLoading && onActiveName === record.name}
                        checked={record.turnOn}
                        onChange={(e: boolean) => onSwitch(record)}
                    />
                    {record.turnOn && (
                        <Button
                            icon={<PlusSquareOutlined />}
                            className="mz-link-btn"
                            onClick={() => addSynonym(record)}
                        >
                            {translate(`resources.entities.button.add_synonym`)}
                        </Button>
                    )}
                </>
            ),
        },
    ];

    return (
        <Row>
            <Col span={24}>
                <p>{translate(`resources.entities.system_entities_description`)}</p>
                <Table
                    id="system-entity-table"
                    size="small"
                    className="mz-table"
                    dataSource={props.systemEntities}
                    columns={columns}
                    pagination={false}
                    rowKey="name"
                />
            </Col>
        </Row>
    );
};

export default SystemEntities;
