import React, { FC, Fragment, useCallback, useEffect, useState } from 'react';
import smartCardDataHelper, { SmartCardData, SmartCardField } from './types';
import { AutoComplete, Form, Input, Mentions, Space, Tooltip, Typography } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons/lib';
import RuntimeService, { Script } from '../service/runtimeService';
import { useParams } from 'react-router';
import jsonUtils from '../../utils/jsonUtils';
import { useDataProvider } from 'ra-core';
import bot from '../service/bot';
import MZBotMentions from '../common/MZMentions';

const { Text } = Typography;
const { Option } = Mentions;

interface Props {
    scData: SmartCardData;
    onChange?: (scData: SmartCardData) => void;
}

const actionDisplayField: SmartCardField = {
    name: 'display',
    label: 'Display Text',
    value: '',
    required: true,
};

const actionPostBackField: SmartCardField = {
    name: 'postBackValue',
    label: 'Postback value',
    value: '',
    required: true,
};

const MOCK_DATA: any = {
    '@': ['location', 'date', 'time'],
    '#': ['ASK_WEATHER', 'GREETING', 'GOODBYE'],
    $: ['GET_WEATHER', 'GET_WEATHER.currently[0].summary', 'GET_WEATHER.currently[0].time'],
};

const FieldsEditor: FC<Props> = (props: Props) => {
    const dataProvider = useDataProvider();
    // const [scData, setData] = useState();
    const [scriptPropertyPaths, setScriptPropertyPaths] = useState<Array<string>>([]);
    const [selectedArray, setSelectedArray] = useState<string>('');
    const [scriptPropertyArrayPaths, setScriptPropertyArrayPaths] = useState<Array<string>>([]);
    const [prefix, setPrefix] = useState();
    const [runtimeVariables, setRuntimeVariables] = useState<Array<string>>([]);

    const [textForm] = Form.useForm();
    const [listForm] = Form.useForm();
    const { botId } = useParams();

    const onTextDataChange = () => {
        const values = textForm.getFieldsValue();
        const newScData = { ...props.scData };
        smartCardDataHelper.setFieldValuesForTextItem(newScData, values);
        if (props.onChange) {
            props.onChange({ ...newScData });
        }
    };

    const onListDataChange = () => {
        const values = listForm.getFieldsValue();
        // console.log('FieldsEditor.tsx -> onListDataChange -> form values', values);
        const newScData = { ...props.scData };
        smartCardDataHelper.setListItemMetaValue(newScData, selectedArray, values);
        // console.log('FieldsEditor.tsx -> onListDataChange -> newScData', newScData);
        if (props.onChange) {
            props.onChange({ ...newScData });
        }
    };

    const renderInputPrefix = (field: SmartCardField) => {
        return (
            <Space className="ant-form-item-label">
                <Text className={field.required ? 'ant-form-item-required' : ''}>{field.label}</Text>
                {field.hint && field.hint.length > 0 && (
                    <Tooltip title={field.hint} placement={'top'}>
                        <QuestionCircleOutlined />
                    </Tooltip>
                )}
            </Space>
        );
    };

    /**
     * Load entities & intent
     */
    const loadRuntimeVariable = useCallback(async () => {
        RuntimeService.getBotResource(dataProvider, botId)
            .then(({ data }: any) => {
                setRuntimeVariables(data);
            })
            .catch((error: any) => {
                console.log(error);
                setRuntimeVariables([]);
            });
    }, [botId, dataProvider]);

    /**
     * Load action tasks
     */
    const loadActionScripts = useCallback(async () => {
        RuntimeService.getScripts(dataProvider, botId as string)
            .then(({ data }: any) => {
                let pathList = RuntimeService.getPropertyFromScripList(data);

                console.log('FieldsEditor.tx -> loadActionScripts -> pathList', pathList);

                setScriptPropertyPaths(pathList);
                setScriptPropertyArrayPaths(jsonUtils.filterArrayPath(pathList));
            })
            .catch((error: any) => {
                console.log(error);
                setScriptPropertyPaths([]);
                setScriptPropertyArrayPaths([]);
            });
    }, [botId, dataProvider]);

    useEffect(() => {
        // console.log('FieldsEditor.tsx -> init', props.scData);
        // setData(props.scData);
        textForm.setFieldsValue(smartCardDataHelper.getTextItemValues(props.scData));
        listForm.setFieldsValue(smartCardDataHelper.getListItemMetaValues(props.scData));
        setSelectedArray(jsonUtils.getArrayObjectFromPath(smartCardDataHelper.getArrayObjectPath(props.scData)));
    }, [textForm, props.scData, listForm]);

    useEffect(() => {
        loadRuntimeVariable().then();
        loadActionScripts().then();
    }, [botId, dataProvider, loadActionScripts, loadRuntimeVariable]);

    const editForm = (
        <Fragment>
            {props.scData.textItem && (
                <Form
                    form={textForm}
                    layout="vertical"
                    className="smart-card-property-form"
                    onChange={onTextDataChange}
                >
                    <div className="smart-card-property-form--group">
                        <h5 style={{ fontSize: 12 }}>Object fields:</h5>
                        {props.scData.textItem.map((field: SmartCardField, index: number) => (
                            <Form.Item
                                shouldUpdate
                                name={field.name}
                                key={index}
                                rules={[{ required: field.required, message: '' }]}
                            >
                                {/*<MZBotMentions*/}
                                {/*    label={field.label ? field.label : ''}*/}
                                {/*    required={field.required}*/}
                                {/*    itents={runtimeVariables.filter(v => v.startsWith('#'))}*/}
                                {/*    entities={runtimeVariables.filter(v => v.startsWith('@'))}*/}
                                {/*    scripts={scriptPropertyPaths}*/}
                                {/*    value={field.value}*/}
                                {/*/>*/}

                                <Input
                                    prefix={renderInputPrefix(field)}
                                    autoComplete="off"
                                    className="sm-input-text"
                                    placeholder={field.label}
                                />
                            </Form.Item>
                        ))}
                    </div>
                </Form>
            )}

            {props.scData.listItem && (
                <Form
                    form={listForm}
                    layout="horizontal"
                    className="smart-card-property-form"
                    onChange={onListDataChange}
                >
                    <div className="smart-card-property-form--group">
                        <h5 style={{ fontSize: 12 }}>Select object list:</h5>
                        <AutoComplete
                            options={scriptPropertyArrayPaths.map(path => {
                                return { value: path };
                            })}
                            style={{ display: 'block', marginBottom: 10 }}
                            onSearch={(value: string) => {
                                // console.log('FieldsEditor.tsx', value);
                                return scriptPropertyArrayPaths.filter((path: string) => path.indexOf(value) >= 0);
                            }}
                            onSelect={(value: string) => {
                                setSelectedArray(value);
                            }}
                            value={selectedArray}
                        >
                            <Input
                                placeholder="Select object list"
                                onChange={(e: any) => setSelectedArray(e.target.value)}
                            />
                        </AutoComplete>

                        <h5 style={{ fontSize: 12 }}>Object fields:</h5>
                        {props.scData.listItem.meta.map((field: SmartCardField, index: number) => (
                            <Form.Item
                                name={field.name}
                                key={index}
                                rules={[{ required: field.required, message: '' }]}
                            >
                                <AutoComplete
                                    className="sm-input-text"
                                    style={{ display: 'block' }}
                                    onSelect={(value: string) => {
                                        onListDataChange();
                                    }}
                                    options={jsonUtils
                                        .filterObjectAttribute(scriptPropertyPaths, selectedArray)
                                        .map(path => {
                                            return { value: path };
                                        })}
                                    value={field.value}
                                >
                                    <Input
                                        placeholder={field.label}
                                        prefix={renderInputPrefix(field)}
                                        autoComplete="off"
                                    />
                                </AutoComplete>
                            </Form.Item>
                        ))}

                        <h5 style={{ fontSize: 12, paddingTop: 10 }}>Action:</h5>
                        <Form.Item>
                            <Form.Item
                                name={['selector', 'display']}
                                rules={[{ required: true, message: 'Display text is required' }]}
                            >
                                <Input
                                    placeholder="Display text"
                                    className="sm-input-text"
                                    prefix={renderInputPrefix(actionDisplayField)}
                                    autoComplete="off"
                                />
                            </Form.Item>
                            <Form.Item
                                name={['selector', 'value']}
                                rules={[{ required: true, message: 'Post back value is required' }]}
                            >
                                <AutoComplete
                                    className="sm-input-text"
                                    style={{ display: 'block' }}
                                    onSelect={(value: string) => {
                                        onListDataChange();
                                    }}
                                    options={jsonUtils
                                        .filterObjectAttribute(scriptPropertyPaths, selectedArray)
                                        .map(path => {
                                            return { value: path };
                                        })}
                                >
                                    <Input
                                        placeholder="Postback value"
                                        prefix={renderInputPrefix(actionPostBackField)}
                                        autoComplete="off"
                                    />
                                </AutoComplete>
                            </Form.Item>
                        </Form.Item>
                    </div>
                </Form>
            )}
        </Fragment>
    );

    return editForm;
};

export default FieldsEditor;
