import React, { FC, useEffect, useRef, useState } from 'react';
import { Button, Collapse, Drawer, Empty, Form, Input, Space, Spin, Tooltip } from 'antd';
import { IndicatorIcon, UNKNOWN_INTENT_ID } from '../../common/Constants';
import { useTranslate } from 'react-admin';
import { RedditOutlined, UserOutlined } from '@ant-design/icons/lib';
const { TextArea } = Input;

interface Prods {
    botId: any;
    irqa: any;
    visible: Boolean;
    saving: Boolean;
    onSave: any;
    onClose: any;
}

const EditQAForm: FC<Prods> = (prods: any) => {
    const translate = useTranslate();
    const [processing, setProcessing] = useState(false);
    const [form] = Form.useForm();
    const questionRef = useRef<Input>(null);

    const onSaveClick = (e: any) => {
        e.preventDefault();
        form.submit();
    };
    const onFinish = (irqa: any) => {
        const data = { ...prods.irqa, ...irqa };
        prods.onSave(data);
    };
    const onFinishFailed = () => {};

    useEffect(() => {
        if (prods.irqa) {
            form.setFieldsValue(prods.irqa);
            console.log('irqa', prods.irqa);
        }

        if (questionRef.current !== null) {
            questionRef.current.focus();
        }
    }, [form, prods.irqa]);

    return (
        <Drawer
            title={
                prods.irqa && prods.irqa.id > 0
                    ? translate(`resources.smalltalk.form.update_smalltalk`)
                    : translate(`resources.smalltalk.form.create_smalltalk`)
            }
            placement="right"
            onClose={prods.onClose}
            visible={prods.visible}
            width="700"
            maskClosable={false}
            keyboard={false}
            destroyOnClose={true}
            footer={
                <div
                    style={{
                        textAlign: 'right',
                    }}
                >
                    <Space>
                        <Button onClick={prods.onClose} className="mz-btn mz-drawer-btn-footer">
                            {translate(`common.button.cancel`)}
                        </Button>
                        <Button
                            loading={processing || prods.saving}
                            onClick={onSaveClick}
                            type="primary"
                            className="mz-btn mz-drawer-btn-footer"
                        >
                            {translate(`common.button.save`)}
                        </Button>
                    </Space>
                </div>
            }
        >
            <Spin
                indicator={IndicatorIcon}
                spinning={processing || prods.saving}
                tip={translate(`common.message.processing`)}
            >
                <Form
                    layout="vertical"
                    form={form}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    scrollToFirstError={true}
                >
                    <Form.Item
                        name="question"
                        label={translate(`resources.smalltalk.form.question.label`)}
                        rules={[
                            {
                                required: true,
                                message: translate(`resources.smalltalk.form.question.error.required`),
                            },
                        ]}
                    >
                        <Input
                            ref={questionRef}
                            placeholder={translate(`resources.smalltalk.form.question.placeholder`)}
                            prefix={<UserOutlined />}
                            autoComplete="off"
                        />
                    </Form.Item>
                    <Form.Item
                        name="answer"
                        label={translate(`resources.smalltalk.form.answer.label`)}
                        rules={[
                            {
                                required: true,
                                message: translate(`resources.smalltalk.form.answer.error.required`),
                            },
                        ]}
                    >
                        <TextArea
                            placeholder={translate(`resources.smalltalk.form.answer.placeholder`)}
                            autoSize={{ minRows: 10, maxRows: 20 }}
                            autoComplete="off"
                        />
                    </Form.Item>
                </Form>
            </Spin>
        </Drawer>
    );
};

export default EditQAForm;
