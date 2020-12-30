import React, { FC, useEffect, useRef, useState } from 'react';
import { Checkbox, Col, Form, Input, List, Modal, Row, Select } from 'antd';
import { DeleteOutlined, PlusOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { uuid } from '../../utils/uuid';
import { useTranslate } from 'ra-core';
const { Option } = Select;
interface Props {
    orderNo: number;
    entities: any;
    slotVisible: any;
    slotEditing: any;
    onClose: any;
    onFinish: any;
    onFinishFailure: any;
}
const AddSlotForm: FC<Props> = props => {
    const translate = useTranslate();
    const [form] = Form.useForm();
    const [slot, setSlot] = useState(
        props.slotEditing || {
            name: '',
            promptToUser: [] as any,
            require: true,
            defaultValue: '',
        }
    );
    const [inputPrompt, setInputPrompt] = useState('');
    const defaultValRef = useRef<Input>(null);
    const promptRef = useRef<Input>(null);
    const onDeletePrompt = (text: any) => {
        setSlot({ ...slot, promptToUser: slot.promptToUser.filter((p: any) => p != text) });
    };

    const onDoneClick = (e: any) => {
        if (slot.require && slot.promptToUser.length <= 0) {
            props.onFinishFailure('You must defined prompt to use or default value');
            if (promptRef.current != null) {
                promptRef.current.focus();
            }
            return;
        }
        if (!slot.require && slot.defaultValue === '') {
            props.onFinishFailure('You must define the default value');
            if (defaultValRef.current != null) {
                defaultValRef.current.focus();
            }
            return;
        }
        e.preventDefault();
        form.submit();
    };
    const onFinish = () => {
        props.onFinish(slot, props.orderNo);
    };
    useEffect(() => {
        if (props.slotEditing && props.slotVisible) {
            setSlot(props.slotEditing);
        } else {
            setSlot({
                name: '',
                promptToUser: [] as any,
                require: true,
                defaultValue: '',
            });
            form.resetFields();
        }
        setInputPrompt('');
    }, [form, props.slotEditing, props.slotVisible]);
    const onAddPrompt = () => {
        if (inputPrompt !== '' && !slot.promptToUser.includes(inputPrompt)) {
            setSlot({ ...slot, promptToUser: [...slot.promptToUser, inputPrompt] });
        }
        setInputPrompt('');
    };
    return (
        <Modal
            className="add-slot-modal"
            title={translate(`resources.context_flow.slot.modal_title`)}
            visible={props.slotVisible}
            onOk={onDoneClick}
            onCancel={props.onClose}
            style={{ position: 'absolute', right: 25, top: 350 }}
            width={400}
        >
            <Form layout="vertical" form={form} onFinish={onFinish}>
                <Row gutter={16}>
                    <Col span={15}>
                        <Form.Item
                            label={translate(`resources.context_flow.slot.label.slot`)}
                            initialValue={slot.name}
                            rules={[
                                {
                                    required: true,
                                    message: 'Enter slot name',
                                },
                            ]}
                        >
                            <Select
                                // autoFocus={true}
                                value={slot.name}
                                // showArrow={false}
                                placeholder="Enter the condition"
                                onChange={(obj: any) => setSlot({ ...slot, name: obj })}
                                // // onSearch={e => setSlot({ ...slot, name: e })}
                                // showSearch={true}
                                // defaultOpen={true}
                            >
                                {props.entities &&
                                    props.entities.length > 0 &&
                                    props.entities.map((resource: any, index: number) => (
                                        <Option key={uuid()} value={resource}>
                                            {resource}
                                        </Option>
                                    ))}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={7}>
                        <Form.Item name="required" style={{ marginTop: 24 }}>
                            <Checkbox
                                onChange={e => setSlot({ ...slot, require: e.target.checked })}
                                checked={slot.require ? true : false}
                            >
                                {translate(`resources.context_flow.slot.label.required`)}
                            </Checkbox>
                        </Form.Item>
                    </Col>
                    <Col span={2}>
                        <QuestionCircleOutlined style={{ marginTop: 30, fontSize: 14 }} />
                    </Col>
                </Row>

                {slot.require ? (
                    <>
                        <Row className="slot-contents required selected" style={{ margin: '10px 0' }}>
                            <Col span={24}>
                                <Input
                                    placeholder={translate(`resources.context_flow.slot.placeholder.prompt`)}
                                    ref={promptRef}
                                    value={inputPrompt}
                                    autoComplete="off"
                                    suffix={<PlusOutlined style={{ color: '#1890FF' }} onClick={onAddPrompt} />}
                                    onChange={(e: any) => setInputPrompt(e.target.value)}
                                    onPressEnter={onAddPrompt}
                                />
                            </Col>
                        </Row>
                        <Row className="slot-contents required selected">
                            <Col span={24}>
                                <List
                                    style={{ overflowX: 'auto', height: '200px' }}
                                    bordered
                                    dataSource={slot.promptToUser}
                                    renderItem={(item: any) => (
                                        <List.Item key={uuid()}>
                                            <div>{item}</div>
                                            <DeleteOutlined
                                                className="trash-btn"
                                                onClick={() => onDeletePrompt(item)}
                                            />
                                        </List.Item>
                                    )}
                                />
                            </Col>
                        </Row>
                    </>
                ) : (
                    <>
                        <Row className="slot-contents default-value selected">
                            <Col span={24}>
                                <Form.Item
                                    name="value"
                                    label={translate(`resources.context_flow.slot.label.default_value`)}
                                >
                                    <Input
                                        ref={defaultValRef}
                                        autoComplete="off"
                                        value={slot.defaultValue}
                                        onChange={e => setSlot({ ...slot, defaultValue: e.target.value })}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                    </>
                )}
            </Form>
        </Modal>
    );
};

export default AddSlotForm;
