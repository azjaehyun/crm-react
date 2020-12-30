import React, { FC, useEffect, Fragment } from 'react';
import { Button, Col, Form, Input, Popover, Row, Space, Tooltip, Typography } from 'antd';
import { uuid } from '../../../utils/uuid';
import { EditOutlined, QuestionCircleOutlined } from '@ant-design/icons/lib';
import { SC004Config, SC004Data, SmartCardAction, SmartCardEditorProps } from '../types';
import SC004 from '../view/SC004';
const { TextArea } = Input;
const { Text } = Typography;

/**
 * Horizontal list text
 * @param prods
 * @constructor
 */
const SC004Editor: FC<SmartCardEditorProps> = (prods: SmartCardEditorProps) => {
    const scData = prods.scData as SC004Data;
    const config: SC004Config = scData.config ? scData.config : { cols: 3 };
    const [form] = Form.useForm();

    const onFormChange = () => {
        const formValues = form.getFieldsValue();
        prods.onChange(formValues as SC004Data);
    };

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

    const editForm = (
        <Form form={form} layout="horizontal" className="smart-card-property-form" onChange={onFormChange}>
            <div className="smart-card-property-form--group">
                <h5 style={{ fontSize: 12 }}>Headers:</h5>
                <Form.Item name="title" rules={[{ required: true, message: 'Title is required' }]}>
                    <Input
                        prefix={renderInputPrefix('Title', true, '')}
                        autoComplete="off"
                        className="sm-input-text"
                        placeholder="The card title"
                    />
                </Form.Item>
                <Form.Item name="description" rules={[{ required: true, message: '' }]}>
                    <Input
                        prefix={renderInputPrefix('Description', false, '')}
                        autoComplete="off"
                        className="sm-input-text"
                        placeholder="The card description"
                    />
                </Form.Item>
            </div>

            <div className="smart-card-property-form--group">
                <h5 style={{ fontSize: 12 }}>Option List:</h5>
                <Form.Item>
                    {scData.options.map((option: SmartCardAction, index: number) => (
                        <Form.Item name={['options', index, 'display']} key={index}>
                            <Input
                                id={uuid()}
                                prefix={renderInputPrefix(`Option ${index + 1}`, true, '')}
                                autoComplete="off"
                                className="sm-input-text"
                                placeholder={`Option ${index + 1}`}
                            />
                        </Form.Item>
                    ))}
                </Form.Item>
            </div>
        </Form>
    );

    useEffect(() => {
        form.setFieldsValue(scData);
    }, [form, scData]);

    return (
        <div className="smart-card-editor-wrapper">
            <div style={{ marginBottom: 20 }}>
                <SC004 data={scData} />
            </div>
            {!prods.inlineEdit && (
                <div className="smart-card-editor--action-area">
                    <Popover
                        content={editForm}
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
            {prods.inlineEdit && editForm}
        </div>
    );
};

export default SC004Editor;
