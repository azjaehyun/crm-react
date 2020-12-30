import React, {FC, useCallback, useEffect, useState} from 'react';
import { Col, Form, Input, Modal, Row } from 'antd';
import companyService from "../../service/companyService";
import {useDataProvider, useVersion} from "ra-core";

interface Props {
    fetchCompanyList: () => void,
    visible: boolean,
    onClose(): any,
}

const AddCompanyForm: FC<Props> = (props) => {
    const [form] = Form.useForm();
    const dataProvider = useDataProvider();

    const createCompanyHandler = () => {
        const companyDto = {
            companyCode: form.getFieldValue("companyCode"),
            companyName: form.getFieldValue("companyName")
        }
        companyService.createCompany(dataProvider, companyDto)
            .then(()=>{
                props.onClose();
                props.fetchCompanyList();
            })
            .catch((e:any)=> {
                console.log(e)
            })
    }

    return (
        <Modal
            className="add-company-modal"
            title="Company registration"
            visible={props.visible}
            onOk={()=> {createCompanyHandler();}}
            onCancel={props.onClose}
            maskClosable={false}
            okText="Save"
            width={400}
        >
            <Form layout="vertical" form={form}>
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item name="companyCode" label="Company Code"
                            rules={[
                                {
                                    required: true,
                                    message: 'Enter Company Code',
                                },
                            ]}
                        >
                            <Input placeholder="Enter Company Code" />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item name="companyName" label="Company Name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Enter Company Name',
                                },
                            ]}
                        >
                            <Input placeholder="Enter Company Name" />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
};

export default AddCompanyForm;
