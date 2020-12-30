import React, {FC, useState} from 'react';
import { Col, Form, Input, Modal, Row, Select } from 'antd';
import {CompanyData, CompanyEntity} from "../../service/companyService";
import departmentService, {DepartmentDto} from "../../service/departmentService";
import {useDataProvider} from "ra-core";

interface Props {
    visible: boolean;
    onClose(): any;
    companyData: CompanyData;
    companyList: Array<CompanyEntity>;
}

const { Option } = Select;

const AddDepartmentForm: FC<Props> = props => {
    const [form] = Form.useForm();

    const dataProvider = useDataProvider();

    const [selectedCompany, setSelectedCompany] = useState<number>(-1)

    return (
        <Modal
            className="add-department-modal"
            title="Department registration"
            visible={props.visible}
            onOk={()=>{
                const req: DepartmentDto = {
                    companyId: selectedCompany,
                    deptCode: form.getFieldValue("departmentCode"),
                    deptName: form.getFieldValue("departmentName"),
                }
                departmentService.createDepartment(dataProvider, req)
                    .then(props.onClose);
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
                            name="companyName"
                            label="Company Name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Enter Company Name',
                                },
                            ]}
                        >
                            <Select
                                placeholder="Company Name"
                                value={selectedCompany}
                                onChange={setSelectedCompany}
                            >
                                {props.companyList.map((company: CompanyEntity, index: number) =>
                                    <Option
                                        key={index}
                                        value={company.companyId}
                                    >{company.companyName}</Option>
                                )}
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item
                            name="departmentCode"
                            label="Department Code"
                            rules={[
                                {
                                    required: true,
                                    type: "string",
                                    message: 'Enter Department Code',
                                }
                            ]}
                        >
                            <Input placeholder="Enter Department Code" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item
                            name="departmentName"
                            label="Department Name"
                            rules={[
                                {
                                    required: true,
                                    type: "string",
                                    message: 'Enter Department Name',
                                },
                            ]}
                        >
                            <Input placeholder="Enter Department Name" />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
};

export default AddDepartmentForm;
