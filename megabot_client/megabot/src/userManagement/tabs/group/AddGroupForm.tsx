import React, { FC } from 'react';
import { Col, Form, Input, Modal, Row } from 'antd';
import {useDataProvider} from "ra-core";
import groupService from "../../service/groupService";

interface Props {
    visible: boolean;
    getGroupList: () => void;
    // getGroupList: () => Promise<void>;
    onClose(): any;
}

const AddGroupForm: FC<Props> = props => {
    const dataProvider = useDataProvider();

    const [form] = Form.useForm();

    return (
        <Modal
            className="add-group-modal"
            title="Create Group"
            visible={props.visible}
            // onOk={props.onClose}
            onOk={()=>{
                groupService.createGroup(dataProvider, {
                    name: form.getFieldValue("groupName"),
                    description: form.getFieldValue("groupDescription"),
                    status: "ACTIVE",
                }).then(()=> {
                    props.getGroupList();
                    props.onClose();
                    form.resetFields(["groupName", "groupDescription"])
                })
            }}
            onCancel={props.onClose}
            maskClosable={false}
            okText="Save"
            width={400}
        >
            <Form layout="vertical" form={form}>
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item
                            name="groupName"
                            label="Group Name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Enter Group Name',
                                },
                            ]}
                        >
                            <Input placeholder="Enter Group Name" />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item name="groupDescription" label="Description">
                            <Input.TextArea placeholder="Enter Group Description" rows={4} style={{ resize: 'none' }} />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
};

export default AddGroupForm;
