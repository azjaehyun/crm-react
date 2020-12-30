import React, { FC, useEffect, useState, Fragment, useCallback } from 'react';
import {
    AutoComplete,
    Button,
    Col,
    Divider,
    Form,
    Input,
    Popconfirm,
    Popover,
    Row,
    Select,
    Space,
    Tooltip,
    Typography,
    Switch,
    Checkbox,
} from 'antd';
import { uuid } from '../../../utils/uuid';
import { defaultSC003Config, SC003Data, SmartCardAction, SmartCardEditorProps, SmartCardField } from '../types';
import {
    DeleteOutlined,
    EditOutlined,
    PlusOutlined,
    QuestionCircleOutlined,
    UploadOutlined,
} from '@ant-design/icons/lib';
import { PrimaryColor, SMART_CARD_CODE } from '../../common/Constants';
import { useDataProvider, useTranslate } from 'ra-core';
import SC001 from '../view/SC001';
import PopoverFieldsEditor from '../PopoverFieldsEditor';
import SC003 from '../view/SC003';
import RuntimeService, { Script } from '../../service/runtimeService';
import jsonUtils from '../../../utils/jsonUtils';
import { useParams } from 'react-router';
import { values } from 'min-dash';

const { Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

/**
 * Vertical list text
 * @param prods
 * @constructor
 */
const SC003Editor: FC<SmartCardEditorProps> = (prods: SmartCardEditorProps) => {
    // const translate = useTranslate();
    // const [data, setData] = useState(prods.data);
    // const [selectedOption, setSelectedOption] = useState();
    // const [visibleOptionConfig, setVisibleOptionConfig] = useState(false);
    // const [form] = Form.useForm();
    //
    // const buttonContent = (
    //     <div style={{ width: 320, padding: '5px 5px 0px 5px' }}>
    //         <Form form={form} layout="vertical" onFinish={values => onOptionChange(values)}>
    //             <Form.Item name="id" style={{ display: 'none' }}>
    //                 <Input />
    //             </Form.Item>
    //             <Form.Item
    //                 label="Title"
    //                 name="label"
    //                 rules={[{ required: true, message: 'Please enter button title!' }]}
    //             >
    //                 <Input />
    //             </Form.Item>
    //             <Form.Item
    //                 label="Postback Value"
    //                 name="value"
    //                 rules={[{ required: true, message: 'Please enter postback value!' }]}
    //             >
    //                 <Input />
    //             </Form.Item>
    //             <Form.Item>
    //                 <Row gutter={16}>
    //                     <Col span={12}>
    //                         <Button block onClick={() => setSelectedOption(null)}>
    //                             Cancel
    //                         </Button>
    //                     </Col>
    //                     <Col span={12}>
    //                         <Button block type="primary" htmlType="submit">
    //                             Save Change
    //                         </Button>
    //                     </Col>
    //                 </Row>
    //             </Form.Item>
    //         </Form>
    //     </div>
    // );
    //
    // const onEditOptionClick = (option: Option) => {
    //     setSelectedOption(option);
    //     form.setFieldsValue(option);
    // };
    //
    // const onOptionChange = (values: any) => {
    //     let option = values as Option;
    //     console.log('onOptionChange', option);
    //     let cloneData: SC003Data = { ...data };
    //     const index = cloneData.listItem.findIndex(opt => opt.id === option.id);
    //     if (index >= 0) {
    //         cloneData.listItem[index] = { ...option };
    //     }
    //     setData(cloneData);
    //     prods.onChange(cloneData);
    // };
    //
    // const onTitleChange = (text: string) => {
    //     let cloneData: SC003Data = { ...data, title: text };
    //     setData(cloneData);
    //     prods.onChange(cloneData);
    // };
    //
    // const onAddOptionClick = () => {
    //     const newOption: Option = {
    //         id: uuid(),
    //         label: 'New Button',
    //         value: '',
    //     };
    //     let cloneData: SC003Data = { ...data };
    //     cloneData.listItem.push(newOption);
    //     setData(cloneData);
    //     onEditOptionClick(newOption);
    //     prods.onChange(cloneData);
    // };
    //
    // const onDeleteOptionClick = (option: Option) => {
    //     let cloneData: SC003Data = { ...data };
    //     const index = cloneData.listItem.findIndex(opt => opt.id === option.id);
    //     if (index >= 0) {
    //         cloneData.listItem.splice(index, 1);
    //     }
    //     setData(cloneData);
    // };
    //
    // useEffect(() => {
    //     let scData: SC003Data = { ...prods.data };
    //     if (!scData.config) {
    //         scData.config = defaultSC003Config;
    //     }
    //     if (scData.listItem) {
    //         scData.listItem.forEach((opt: Option) => {
    //             opt.id = uuid();
    //         });
    //     }
    //     setData(scData);
    // }, [prods.data]);
    //
    // return (
    //     <Fragment>
    //         <h5>{SMART_CARD_CODE.SC003}</h5>
    //         <div className="sc003 editor">
    //             <div className="body-area">
    //                 <div className="title">
    //                     <TextArea
    //                         className="title-textarea"
    //                         autoSize={{ minRows: 3, maxRows: 6 }}
    //                         value={data.title}
    //                         placeholder="Edit your message here..."
    //                         onChange={e => onTitleChange(e.target.value)}
    //                     />
    //                 </div>
    //                 <div className="options">
    //                     {data.listItem &&
    //                         data.listItem.map((option: Option, index: number) => (
    //                             <Popover
    //                                 key={option.id}
    //                                 placement="left"
    //                                 title="Option Setting"
    //                                 content={buttonContent}
    //                                 trigger="click"
    //                                 visible={(selectedOption && selectedOption.id) === option.id ? true : false}
    //                                 onVisibleChange={visible => {
    //                                     if (!visible) setSelectedOption(null);
    //                                 }}
    //                             >
    //                                 <Button
    //                                     className="option-btn"
    //                                     block
    //                                     title={option.label}
    //                                     onClick={() => onEditOptionClick(option)}
    //                                 >
    //                                     {index + 1}. {option.label}
    //                                     <div className="option-action">
    //                                         <Popconfirm
    //                                             placement="left"
    //                                             title="Delete this button"
    //                                             onConfirm={() => {
    //                                                 onDeleteOptionClick(option);
    //                                             }}
    //                                             okText={translate(`common.button.yes`)}
    //                                             cancelText={translate(`common.button.no`)}
    //                                         >
    //                                             <DeleteOutlined
    //                                                 className="trash-btn"
    //                                                 onClick={e => e.preventDefault()}
    //                                             />
    //                                         </Popconfirm>
    //                                     </div>
    //                                 </Button>
    //                             </Popover>
    //                         ))}
    //                 </div>
    //             </div>
    //         </div>
    //         <Button
    //             icon={<PlusOutlined style={{ color: PrimaryColor }} />}
    //             className="mz-link-btn"
    //             block
    //             onClick={onAddOptionClick}
    //         >
    //             Add Option
    //         </Button>
    //     </Fragment>
    // );

    const dataProvider = useDataProvider();

    // const [scData, setScData] = useState<SC003Data>();
    const [scriptPropertyPaths, setScriptPropertyPaths] = useState<Array<string>>([]);
    const [selectedArray, setSelectedArray] = useState<string>('');
    const [scriptPropertyArrayPaths, setScriptPropertyArrayPaths] = useState<Array<string>>([]);

    const { botId } = useParams();
    const [form] = Form.useForm();

    /**
     * load runtime action scripts
     */
    const loadRuntimeScripts = useCallback(() => {
        RuntimeService.getScripts(dataProvider, botId as string)
            .then(({ data }: any) => {
                let pathList = RuntimeService.getPropertyFromScripList(data);
                setScriptPropertyPaths(pathList);
                setScriptPropertyArrayPaths(jsonUtils.filterArrayPath(pathList));
            })
            .catch((error: any) => {
                console.log(error);
                setScriptPropertyPaths([]);
                setScriptPropertyArrayPaths([]);
            });
    }, [botId, dataProvider]);

    const renderInputPrefix = (label: string, required: boolean, hint: string) => {
        return (
            <Space className="ant-form-item-label">
                <Text className={required ? 'ant-form-item-required' : ''}>{label}</Text>
                {hint && hint.length > 0 && (
                    <Tooltip title={hint} placement={'top'}>
                        <QuestionCircleOutlined />
                    </Tooltip>
                )}
            </Space>
        );
    };

    const convertScDataToFormData = (scData: SC003Data) => {
        if (!scData.config) {
            scData.config = {
                textAlign: 'left',
                showIndex: false,
            };
        }

        let formData: any = { ...scData };
        if (scData.options && scData.options.length === 1) {
            formData.objectListPath = jsonUtils.getArrayObjectFromPath(scData.options[0].value);
            if (formData.objectListPath.length === 0) {
                formData.objectListPath = jsonUtils.getArrayObjectFromPath(scData.options[0].display);
            }

            if (formData.objectListPath.length === 0) {
                formData.objectListPath = selectedArray;
            }

            formData['options'] = {
                display: scData.options[0].display.replace(formData.objectListPath + '.', ''),
                value: scData.options[0].value.replace(formData.objectListPath + '.', ''),
            };
        }

        return formData;
    };

    const convertFormDataToScData = (formValues: any) => {
        let objectListPath = formValues.objectListPath;
        let option: SmartCardAction = { ...formValues.options };

        if (objectListPath) {
            if (option.value && !option.value.startsWith(objectListPath)) {
                option.value = objectListPath + '.' + option.value;
            }

            if (option.display && !option.display.startsWith(objectListPath)) {
                option.display = objectListPath + '.' + option.display;
            }
        }

        let scData: SC003Data = {
            templateCode: SMART_CARD_CODE.SC003,
            title: formValues.title,
            description: formValues.description,
            options: [option],
            config: { ...formValues.config },
        };
        return scData;
    };

    const onFormChange = () => {
        const formValues = form.getFieldsValue();
        // console.log('SC003Editor.tsx -> onFormChange -> form', formValues);

        const newScData = convertFormDataToScData(formValues);
        // console.log('SC003Editor.tsx -> onFormChange -> newScData', newScData);

        prods.onChange(newScData);
    };

    const renderEditForm = (
        <Form form={form} layout="horizontal" className="smart-card-property-form" onChange={onFormChange}>
            <div className="smart-card-property-form--group">
                <h5 style={{ fontSize: 12 }}>Settings:</h5>
                <Form.Item>
                    <Form.Item name={['config', 'textAlign']} label="Text Align" labelCol={{ span: 6 }}>
                        <Select style={{ display: 'block' }} onSelect={() => onFormChange()}>
                            <Option value="left">Left</Option>
                            <Option value="center">Center</Option>
                            <Option value="right">Right</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name={['config', 'showIndex']} valuePropName="checked" wrapperCol={{ offset: 6 }}>
                        <Checkbox>Show Index</Checkbox>
                    </Form.Item>
                </Form.Item>
            </div>
            <div className="smart-card-property-form--group">
                <h5 style={{ fontSize: 12 }}>Headers:</h5>
                <Form.Item name="title" rules={[{ required: true, message: 'Title is required' }]}>
                    <Input
                        prefix={renderInputPrefix('Title', true, '')}
                        autoComplete="off"
                        className="sm-input-text"
                        placeholder="Title"
                    />
                </Form.Item>
                <Form.Item name="description" rules={[{ required: true, message: '' }]}>
                    <Input
                        prefix={renderInputPrefix('Description', false, '')}
                        autoComplete="off"
                        className="sm-input-text"
                        placeholder="Description"
                    />
                </Form.Item>
            </div>
            <div className="smart-card-property-form--group">
                <h5 style={{ fontSize: 12 }}>Option List:</h5>
                <Form.Item name="objectListPath" rules={[{ required: true, message: '' }]}>
                    <AutoComplete
                        options={scriptPropertyArrayPaths.map(path => {
                            return { value: path };
                        })}
                        style={{ display: 'block', marginBottom: 10 }}
                        onSearch={(value: string) => {
                            return scriptPropertyArrayPaths.filter((path: string) => path.indexOf(value) >= 0);
                        }}
                        onSelect={(value: string) => {
                            setSelectedArray(value);
                            onFormChange();
                        }}
                    >
                        <Input placeholder="Select object list" />
                    </AutoComplete>
                </Form.Item>
                <Form.Item>
                    <Form.Item
                        name={['options', 'display']}
                        rules={[{ required: true, message: 'Display is required' }]}
                    >
                        <AutoComplete
                            className="sm-input-text"
                            style={{ display: 'block' }}
                            onSelect={(value: string) => onFormChange()}
                            options={jsonUtils.filterObjectAttribute(scriptPropertyPaths, selectedArray).map(path => {
                                return { value: path };
                            })}
                        >
                            <Input
                                placeholder="Display Text"
                                prefix={renderInputPrefix('Display', true, '')}
                                autoComplete="off"
                            />
                        </AutoComplete>
                    </Form.Item>
                    <Form.Item name={['options', 'value']} rules={[{ required: true, message: 'Value is required' }]}>
                        <AutoComplete
                            className="sm-input-text"
                            style={{ display: 'block' }}
                            onSelect={(value: string) => onFormChange()}
                            options={jsonUtils.filterObjectAttribute(scriptPropertyPaths, selectedArray).map(path => {
                                return { value: path };
                            })}
                        >
                            <Input
                                placeholder="Postback Value"
                                prefix={renderInputPrefix('Postback Value', true, '')}
                                autoComplete="off"
                            />
                        </AutoComplete>
                    </Form.Item>
                </Form.Item>
            </div>
        </Form>
    );

    useEffect(() => {
        loadRuntimeScripts();
    }, [loadRuntimeScripts]);

    useEffect(() => {
        // console.log('SC003Editor.tsx -> prods', prods);
        const formValues = convertScDataToFormData(prods.scData as SC003Data);
        setSelectedArray(formValues.objectListPath);

        // console.log('SC003Editor.tsx -> (prods -> form values)', formValues);
        form.setFieldsValue(formValues);
    }, [convertScDataToFormData, form, prods]);

    if (!prods.scData) return null;
    return (
        <div className="smart-card-editor-wrapper">
            <div style={{ marginBottom: 20 }}>
                <SC003 data={prods.scData as SC003Data} />
            </div>
            {!prods.inlineEdit && (
                <div className="smart-card-editor--action-area">
                    <Popover
                        content={renderEditForm}
                        title="Edit Card"
                        trigger="click"
                        placement="leftTop"
                        overlayClassName="mz-popover-smartcard-edit"
                        destroyTooltipOnHide={true}
                    >
                        <EditOutlined className="mz-icon-btn" />
                    </Popover>
                </div>
            )}
            {prods.inlineEdit && renderEditForm}
        </div>
    );
};

export default SC003Editor;
