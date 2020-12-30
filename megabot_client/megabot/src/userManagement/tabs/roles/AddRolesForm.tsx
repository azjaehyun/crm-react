import React, { FC, useState } from 'react';
import { useTranslate } from 'react-admin';
import { Button, Col, Drawer, Form, Input, Row, Space } from 'antd';

interface Props {
    visible: boolean;
    onClose(): any;
}

const AddRolesForm: FC<Props> = props => {
    const translate = useTranslate();
    const [form] = Form.useForm();

    const onSaveClick = () => {
        props.onClose();
    };

    const handleChange = () => {};

    return (
        <Drawer
            className="add-roles-drawer"
            title="Create Role"
            visible={props.visible}
            width="400"
            maskClosable={false}
            closable={false}
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
                        <Button onClick={onSaveClick} type="primary" className="mz-btn mz-drawer-btn-footer">
                            {translate(`common.button.save`)}
                        </Button>
                    </Space>
                </div>
            }
        >
            <Form layout="vertical" form={form}>
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item
                            name="name"
                            label="Role Name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Enter role name',
                                },
                            ]}
                        >
                            <Input placeholder="Enter role name" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item
                            name="description"
                            label="Description"
                            rules={[
                                {
                                    required: true,
                                    message: 'Enter role description',
                                },
                            ]}
                        >
                            <Input.TextArea placeholder="Enter Role Description" rows={3} style={{ resize: 'none' }} />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Drawer>
    );
};

export default AddRolesForm;
