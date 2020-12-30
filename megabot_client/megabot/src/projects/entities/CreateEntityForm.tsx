import React, { FC, useEffect, useRef, useState } from 'react';
import {
    Col,
    Form,
    Input,
    Row,
    Checkbox,
    Button,
    Table,
    Select,
    Tag,
    Drawer,
    Popconfirm,
    Tooltip,
    Spin,
    Space,
} from 'antd';
import { PlusOutlined, DeleteOutlined, EditOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Error, useTranslate } from 'react-admin';
import { IndicatorIcon } from '../common/Constants';
import { Entity } from '../../types';

const { Option, OptGroup } = Select;

interface Props {
    saving: any;
    onClose: any;
    visible?: any;
    entity: Entity;
    form: any;
    onFinish: any;
    onFinishFailed?: any;
    systemEntities: any;
    entities: any;
}
const CreateEntityForm: FC<Props> = props => {
    const [entity, setEntity] = useState<Entity>(props.entity);
    const [enrichment, setEnrichment] = useState(false);
    const [preSelected, setPreSelected] = useState('Prefix');
    const [inputValue, setInputValue] = useState({ value: '', synonyms: [] as any, regex: [] as any });
    const [editingValue, setEditingValue] = useState('');
    const translate = useTranslate();

    const isSystemEntity = props.entity.entityType === 'SYSTEM';
    const [form] = Form.useForm();
    const entityNameRef = useRef<Input>(null);

    const text = (
        <span>
            Entity name should start with a letter and can contain only the following:
            A-Z,a-z,0-9,_(underscore),-(dash).
        </span>
    );

    useEffect(() => {
        if (props.entity) {
            setEntity(props.entity);
            setEnrichment(props.entity.enrichmentBy && props.entity.enrichmentBy !== '');
            setEntity(props.entity);
        }
        if (entityNameRef.current !== null) {
            entityNameRef.current.focus();
        }
    }, [props.entity]);

    const handleChangePrefix = (value: any) => {
        if (preSelected == 'Prefix') {
            setEntity({ ...entity, prefixes: value });
        } else {
            setEntity({ ...entity, suffixes: value });
        }
    };

    const concatSynonyms = (current: any[], synonyms: [], regexs: []) => {
        let response = current;
        if (current.length == 0) {
            return current.concat(synonyms).concat(regexs);
        }
        if (synonyms.length > 0) {
            synonyms.map((syn: any) => {
                if (
                    current.filter((val: any) => val.rawText === syn.rawText && val.dataType == 'LEXICAL').length == 0
                ) {
                    response.push(syn);
                }
            });
        }
        if (regexs.length > 0) {
            regexs.map((reg: any) => {
                if (current.filter((val: any) => val.rawText === reg.rawText && val.dataType == 'REGEX').length == 0) {
                    response.push(reg);
                }
            });
        }
        return response;
    };
    const addValue = () => {
        const input_synonyms = inputValue.synonyms.map((sys: string) => {
            return { rawText: sys, dataType: 'LEXICAL' };
        });
        const input_regexs = inputValue.regex.map((reg: string) => {
            return { rawText: reg, dataType: 'REGEX' };
        });
        const name = inputValue.value;
        let merge_values = entity.values || [];
        const exist = merge_values.filter((val: any) => val.value === name);
        if (exist.length > 0) {
            merge_values = merge_values.map((val: any) =>
                val.value === name
                    ? { ...val, synonyms: concatSynonyms(val.synonyms, input_synonyms, input_regexs) }
                    : val
            );
            setEntity({
                ...entity,
                values: merge_values,
            });
        } else {
            const row = { value: inputValue.value, synonyms: input_synonyms.concat(input_regexs) };
            setEntity({ ...entity, values: [row, ...entity.values] });
        }

        // reset form input
        setInputValue({ value: '', synonyms: [], regex: [] });
    };

    const checkEntityName = (rule: any, value: any) => {
        if (isSystemEntity) {
            return Promise.resolve();
        }
        if (!value || value.length === 0) {
            return Promise.reject(translate(`resources.entities.form.entity_name.error.required`));
        }

        const regex = /^[a-zA-z0-9-_]+$/gm;
        if (regex.exec(value) === null) {
            return Promise.reject(translate(`resources.intents.form.intent_name.error.invalid`));
        }

        return Promise.resolve();
    };
    const saveEntity = (form: any) => {
        console.log(form);
        props.onFinish(entity);
    };

    const clickToSave = (e: any) => {
        console.log(e);
        e.preventDefault();
        props.form.submit();
    };

    const deleteEntityValue = (e: any) => {
        setEntity({
            ...entity,
            values: entity.values.filter((val: any) => {
                return val.value !== e.value;
            }),
        });
    };

    const isEditing = (record: any) => {
        return record.value === editingValue;
    };

    const onSetEnrichment = (isUse: boolean) => {
        setEnrichment(isUse);
        if (isUse === false) {
            setEntity({ ...entity, enrichmentBy: '' });
        }
    };
    const editValue = (record: any) => {
        console.log(record);
        form.setFieldsValue({ value: '', synonyms: '', address: '', ...record });
        setEditingValue(record.value);
    };

    const isInvalidInput = () => {
        if (inputValue.value !== '' || (inputValue.regex.length > 0 && inputValue.synonyms.length == 0)) {
            return false;
        }
        return false;
    };
    const columns = [
        {
            title: translate(`resources.entities.label.value`),
            dataIndex: 'value',
            width: 155,
            editable: true,
        },
        {
            title: translate(`resources.entities.label.synonym`),
            dataIndex: 'synonyms',
            width: 230,
            editable: true,
            render: (synonyms: any) => (
                <>
                    {synonyms &&
                        synonyms.map((synonym: any, index: number) => {
                            if (synonym.dataType === 'LEXICAL')
                                return (
                                    <Tag key={index} style={{ fontSize: 13 }}>
                                        {synonym.rawText}
                                    </Tag>
                                );
                        })}
                </>
            ),
        },
        {
            title: translate(`resources.entities.label.regex`),
            dataIndex: 'synonyms',
            width: 230,
            editable: true,
            render: (synonyms: any) => (
                <>
                    {synonyms &&
                        synonyms.map((synonym: any, index: number) => {
                            if (synonym.dataType === 'REGEX')
                                return (
                                    <Tag key={index} style={{ fontSize: 13 }}>
                                        {synonym.rawText}
                                    </Tag>
                                );
                        })}
                </>
            ),
        },
        // {
        //     className: 'edit-icon',
        //     width: 25,
        //     render: (_: any, record: any) => {
        //         const editable = isEditing(record);
        //         return editable ? (
        //             <span>
        //                 <a href="javascript:;" onClick={() => save(record)} style={{ marginRight: 8 }}>
        //                     Save
        //                 </a>
        //                 <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
        //                     <a>Cancel</a>
        //                 </Popconfirm>
        //             </span>
        //         ) : (
        //             <EditOutlined disabled={editingValue !== ''} onClick={() => editValue(record)}>
        //                 Edit
        //             </EditOutlined>
        //         );
        //     },
        // },
        {
            className: 'delete-icon',
            width: 25,
            render: (text: any, record: any) => <DeleteOutlined onClick={() => deleteEntityValue(record)} />,
        },
    ];

    const mergedColumns = columns.map(col => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record: any) => ({
                record,
                inputType: 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });
    return (
        <Drawer
            title={
                entity.id && entity.id !== ''
                    ? translate(`resources.entities.label.update_entity`)
                    : translate(`resources.entities.label.create_entity`)
            }
            placement="right"
            maskClosable={false}
            onClose={props.onClose}
            visible={props.visible}
            width="800px"
            footer={
                <div
                    style={{
                        textAlign: 'right',
                    }}
                >
                    <Space>
                        <Button onClick={props.onClose} className="mz-btn mz-drawer-btn-footer">
                            {translate(`common.button.cancel`)}
                        </Button>
                        <Button
                            type="primary"
                            // loading={props.saving}
                            onClick={clickToSave}
                            className="mz-btn mz-drawer-btn-footer"
                        >
                            {translate(`common.button.save`)}
                        </Button>
                    </Space>
                </div>
            }
        >
            <Spin indicator={IndicatorIcon} spinning={props.saving} tip={translate(`common.message.processing`)}>
                <Form layout="vertical" form={props.form} onFinish={saveEntity} onFinishFailed={props.onFinishFailed}>
                    <Row>
                        <Col span={12}>
                            <Form.Item
                                name="name"
                                label={translate(`resources.entities.form.entity_name.label`)}
                                rules={[
                                    {
                                        required: true,
                                        validator: checkEntityName,
                                    },
                                ]}
                            >
                                <Input
                                    autoComplete="off"
                                    ref={entityNameRef}
                                    placeholder={translate(`resources.entities.form.entity_name.placeholder`)}
                                    prefix="@"
                                    style={{ height: 35, width: 370 }}
                                    readOnly={isSystemEntity}
                                    onChange={(e: any) => setEntity({ ...entity, name: e.target.value })}
                                    suffix={
                                        <Tooltip
                                            placement="left"
                                            title={translate(`resources.entities.form.entity_name.hint`)}
                                            overlayStyle={{ width: '400px' }}
                                        >
                                            <InfoCircleOutlined
                                                style={{
                                                    color: 'rgba(0,0,0,.45)',
                                                }}
                                            />
                                        </Tooltip>
                                    }
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: 25 }}>
                        <Col span={12} style={{ paddingRight: 5 }}>
                            <div style={{ backgroundColor: '#E1E1E1', padding: 10 }}>
                                <Checkbox
                                    disabled={isSystemEntity}
                                    onChange={e => setEntity({ ...entity, prefix: e.target.checked })}
                                    checked={entity.prefix ? true : false}
                                >
                                    {translate(`resources.entities.label.use_prefix_suffix`)}
                                </Checkbox>
                                <div className={`prefix-suffix empty ${entity.prefix ? '' : 'selected'}`}>
                                    <Button
                                        type="dashed"
                                        disabled
                                        style={{
                                            width: '100%',
                                            height: 33,
                                        }}
                                    >
                                        {translate(`resources.entities.label.not_set`)}
                                    </Button>
                                </div>
                                <div
                                    className={`prefix-suffix no-empty ${entity.prefix ? 'selected' : ''}`}
                                    style={{ marginTop: 10, height: 33 }}
                                >
                                    <Select
                                        onChange={(val: any) => setPreSelected(val)}
                                        style={{ width: 100 }}
                                        value={preSelected}
                                    >
                                        <Option value="Prefix">Prefix</Option>
                                        <Option value="Suffix">Suffix</Option>
                                    </Select>
                                    <span style={{ margin: '0 10px' }}>is</span>
                                    <Select
                                        dropdownStyle={{ display: 'none' }}
                                        allowClear={true}
                                        onDeselect={handleChangePrefix}
                                        mode="tags"
                                        style={{ width: 210 }}
                                        onChange={handleChangePrefix}
                                        value={preSelected === 'Prefix' ? entity.prefixes : entity.suffixes}
                                    />
                                </div>
                            </div>
                        </Col>
                        <Col span={12} style={{ paddingLeft: 5 }}>
                            <div style={{ backgroundColor: '#E1E1E1', padding: 10 }}>
                                <Checkbox
                                    onChange={e => onSetEnrichment(e.target.checked)}
                                    checked={enrichment}
                                    disabled={isSystemEntity}
                                >
                                    {translate(`resources.entities.label.enrichment`)}
                                </Checkbox>
                                <div
                                    className={`enrichment empty ${enrichment ? '' : 'selected'}`}
                                    style={{ marginTop: 10 }}
                                >
                                    <Button
                                        type="dashed"
                                        disabled
                                        style={{
                                            width: '100%',
                                            height: 33,
                                        }}
                                    >
                                        {translate(`resources.entities.label.not_set`)}
                                    </Button>
                                </div>
                                <div
                                    className={`enrichment no-empty ${enrichment ? 'selected' : ''}`}
                                    style={{ marginTop: 10, height: 33 }}
                                >
                                    <Select
                                        style={{ width: 350 }}
                                        onChange={(name: any) => setEntity({ ...entity, enrichmentBy: name })}
                                        value={entity.enrichmentBy}
                                    >
                                        <OptGroup label="System entities">
                                            {props.systemEntities.map((se: any) => (
                                                <Option value={se.name} key={se.name}>
                                                    @{se.name}
                                                </Option>
                                            ))}
                                        </OptGroup>
                                        <OptGroup label="Custom entities">
                                            {props.entities.map((se: any) => (
                                                <Option value={se.name} key={se.name}>
                                                    @{se.name}
                                                </Option>
                                            ))}
                                        </OptGroup>
                                    </Select>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <p style={{ color: '#000' }}>{translate(`resources.entities.label.value_definition`)}</p>
                    <Row style={{ marginBottom: 15 }}>
                        <Col flex="155px" style={{ padding: 3 }}>
                            <label>{translate(`resources.entities.label.value`)}</label>
                            <Input
                                placeholder="Representative value"
                                value={inputValue.value}
                                onChange={val => setInputValue({ ...inputValue, value: val.target.value })}
                                onPressEnter={addValue}
                            />
                        </Col>
                        <Col flex="230px" style={{ padding: 3 }}>
                            <div>
                                <label>{translate(`resources.entities.label.synonym`)}</label>
                                <Select
                                    dropdownStyle={{ display: 'none' }}
                                    allowClear={true}
                                    onDeselect={e => setInputValue({ ...inputValue, synonyms: inputValue.synonyms })}
                                    mode="tags"
                                    value={inputValue.synonyms}
                                    style={{ width: '100%' }}
                                    onChange={(syn: []) => setInputValue({ ...inputValue, synonyms: syn })}
                                />
                            </div>
                        </Col>
                        <Col flex="auto" style={{ padding: 3 }}>
                            <div>
                                <label>{translate(`resources.entities.label.regex`)}</label>
                                <Select
                                    dropdownStyle={{ display: 'none' }}
                                    allowClear={true}
                                    onDeselect={e => setInputValue({ ...inputValue, regex: inputValue.regex })}
                                    mode="tags"
                                    value={inputValue.regex}
                                    style={{ width: '100%' }}
                                    onChange={(reg: []) => setInputValue({ ...inputValue, regex: reg })}
                                />
                            </div>
                        </Col>
                        <Col flex="38px" style={{ padding: 3, marginTop: 20 }}>
                            <Button
                                type="primary"
                                icon={<PlusOutlined />}
                                onClick={addValue}
                                disabled={
                                    inputValue.value !== '' ||
                                    (inputValue.regex.length > 0 && inputValue.synonyms.length == 0)
                                        ? false
                                        : true
                                }
                            >
                                Add
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Form form={form} component={false}>
                                <Table
                                    columns={columns}
                                    rowClassName="editable-row"
                                    dataSource={entity.values}
                                    size="small"
                                    showHeader={true}
                                    rowKey="value"
                                />
                            </Form>
                        </Col>
                    </Row>
                </Form>
            </Spin>
        </Drawer>
    );
};

export default CreateEntityForm;
