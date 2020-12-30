import React, { FC, useState } from 'react';
import { Input, Table, Tag, Popconfirm, Row, Col, Empty, Button, Modal, Typography } from 'antd';
import { DeleteOutlined, PlusOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { SmileOutlined } from '@ant-design/icons/lib';
import { useTranslate } from 'react-admin';
import EntitiesFork from './EntitiesFork';
import { useParams } from 'react-router';
import EntityService from '../service/entityService';
import { useDataProvider } from 'ra-core';
const { Search } = Input;
const { Paragraph, Text } = Typography;
interface Props {
    entityList: any;
    onSelectedEntity: any;
    openEditForm?: any;
    deleteEntity: any;
}

const MyEntities: FC<Props> = (props: any) => {
    const dataProvider = useDataProvider();
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [keyword, setKeyword] = useState();
    const [visibleModal, setVisibleModal] = useState(false);
    const [searchEntityList, setSearchEntityList] = useState([]);
    const translate = useTranslate();
    let { botId } = useParams();

    // my entity table checkbox change event
    const onSelectChange = (selectedRowKeys: any) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        setSelectedRowKeys(selectedRowKeys);
    };

    // my entity table checkbox
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    // search entity
    const searchEntity = (value: any) => {
        setKeyword(value);
        setVisibleModal(true);

        const params = {
            name: value,
            language: 'UNKNOWN',
            offset: 0,
            limit: 25,
        };

        EntityService.entitiesSearch(dataProvider, params)
            .then(({ data }: any) => {
                console.log(data);
                setSearchEntityList(data.list);
            })
            .catch((error: any) => {
                console.log(error);
            });
    };

    // delete entity
    const deleteEntity = (row: any) => {
        console.log('delete row: ', row);
        if (row.id) {
            props.deleteEntity(row.id);
        }
    };

    const closeModal = () => {
        setKeyword('');
        setVisibleModal(false);
    };

    const columns = [
        {
            title: translate(`resources.entities.table_header.entity`),
            width: 200,
            render: (entity: any) => (
                <span style={{ color: '#1890FF' }}>
                    <a onClick={() => props.onSelectedEntity(entity)}>@{entity.name}</a>
                </span>
            ),
        },
        {
            title: translate(`resources.entities.table_header.values`),
            render: (entity: any) => (
                <Paragraph
                    ellipsis={{
                        rows: 2,
                        expandable: true,
                        symbol: translate('common.label.more'),
                    }}
                >
                    {entity.enrichmentBy && entity.enrichmentBy !== '' && (
                        <Tag icon={<CheckCircleOutlined />} color="blue">
                            {entity.enrichmentBy}
                        </Tag>
                    )}
                    {entity.values
                        .filter((en: any) => en.value !== '')
                        .map((value: any, index: number) => {
                            return <Tag key={index}>{value.value}</Tag>;
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
                </Paragraph>
            ),
        },
        {
            width: 45,
            render: (record: any) => (
                <Popconfirm
                    title={translate(`resources.entities.message.confirm_delete`)}
                    onConfirm={() => deleteEntity(record)}
                    okText="Yes"
                    cancelText="No"
                >
                    <DeleteOutlined />
                </Popconfirm>
            ),
        },
    ];

    if (!props.entityList || props.entityList.length == 0) {
        return (
            <Row>
                <Col span={24}>
                    <Empty
                        className="mz-empty-big"
                        description={
                            <span>
                                ( <SmileOutlined /> {translate(`resources.entities.message.empty`)} )
                            </span>
                        }
                    >
                        <Button type="primary" icon={<PlusOutlined />} onClick={props.openEditForm}>
                            {translate(`resources.entities.button.create_entity`)}
                        </Button>
                    </Empty>
                </Col>
            </Row>
        );
    }
    return (
        <>
            <Row>
                <Col span={24}>
                    <div>
                        <Search
                            placeholder={translate(`resources.entities.placeholder`)}
                            onSearch={searchEntity}
                            style={{ height: 31, float: 'left', width: '91%', marginBottom: 10 }}
                        />
                        <Button
                            icon={<DeleteOutlined />}
                            style={{ width: '9%', height: 31 }}
                            disabled={selectedRowKeys.length == 0}
                        >
                            {translate(`common.button.delete`)}
                        </Button>
                    </div>

                    <Table
                        id="my-entity-table"
                        size="small"
                        className="mz-table"
                        rowSelection={rowSelection}
                        dataSource={props.entityList}
                        columns={columns}
                        pagination={false}
                        rowKey="id"
                    />
                </Col>
            </Row>
            <Modal title="Fork Entity" visible={visibleModal} footer={null} onCancel={closeModal} width={700}>
                {/*<Search placeholder="Search and fork an Entity from community" prefix="@" value={keyword} enterButton />*/}
                <EntitiesFork keyword={keyword} list={searchEntityList} />
            </Modal>
        </>
    );
};

export default MyEntities;
