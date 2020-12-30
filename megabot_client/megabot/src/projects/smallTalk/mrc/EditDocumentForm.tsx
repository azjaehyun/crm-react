import React, { FC, useEffect, useRef, useState, Fragment } from 'react';
import { useTranslate } from 'react-admin';
import { Button, Collapse, Drawer, Empty, Form, Input, List, Space, Spin, Tooltip, Typography } from 'antd';
import { IndicatorIcon } from '../../common/Constants';
import { EnterOutlined, QuestionCircleOutlined, QuestionOutlined, UserOutlined } from '@ant-design/icons/lib';
import { MrcDocument, Question } from '../../service/MRCService';
import ListItemTextEditable from '../../common/ListItemTextEditable';
import { uuid } from '../../../utils/uuid';

const { TextArea } = Input;
const { Text } = Typography;

interface Props {
    botId: any;
    doc: MrcDocument;
    visible: boolean;
    saving: boolean;
    onSave: (doc: MrcDocument) => void;
    onClose: (reload: boolean) => void;
}

const EditDocumentForm: FC<Props> = (props: Props) => {
    const translate = useTranslate();
    const [form] = Form.useForm();

    const [questionText, setQuestionText] = useState<string>('');
    const [doc, setDoc] = useState<MrcDocument>();

    const onAddQuestion = (e: any) => {
        e.preventDefault();
        if (questionText.length > 0) {
            let temp = { ...doc } as MrcDocument;
            temp.questions.push({ uuid: uuid(), question: questionText });
            setDoc(temp);
            setQuestionText('');
        }
    };

    /**
     * on click to save button
     * @param e
     */
    const onSaveClick = (e: any) => {
        e.preventDefault();
        form.submit();
    };

    /**
     * edit question text
     * @param id
     * @param text
     */
    const onQuestionChange = (id: any, text: string) => {
        const temp = { ...doc } as MrcDocument;
        let q = temp.questions.find((q: any) => q.id === id || q.uuid === id);
        if (q) {
            q.question = text;
        }
        setDoc(temp);
    };

    /**
     * delete a question
     * @param id
     */
    const onDeleteQuestion = (id: any) => {
        const temp = { ...doc } as MrcDocument;
        const index = temp.questions.findIndex((q: any) => q.id === id || q.uuid === id);
        const q = temp.questions[index];

        if (q) {
            if (q.id && q.id > 0) {
                if (!temp.deletedQuestions) temp.deletedQuestions = [];
                temp.deletedQuestions.push(q);
            }
            temp.questions.splice(index, 1);
            setDoc(temp);
        }
    };

    const onFormValuesChange = (changedValues: any, allValues: any) => {
        const temp = { ...doc, ...allValues };
        setDoc(temp);
        // console.log('onFormValuesChange -> allValues', allValues);
        // console.log('onFormValuesChange -> changedValues', changedValues);
    };

    const getDocToSave = () => {
        let temp = { ...doc } as MrcDocument;
        temp.questions.forEach((q: Question) => {
            delete q.uuid;
        });
        return temp;
    };

    const onFormFinish = () => {
        console.log('EditDocumentForm.tsx -> submit -> doc', doc);
        if (doc) {
            props.onSave(getDocToSave());
        }
    };

    const onFormFinishFailed = () => {};

    useEffect(() => {
        if (props.doc) {
            setQuestionText('');
            setDoc(props.doc);
            form.setFieldsValue(props.doc);
        }
    }, [form, props.doc]);

    if (!doc) return null;
    return (
        <Drawer
            title="Add Document"
            placement="right"
            onClose={() => props.onClose(false)}
            visible={props.visible}
            width="600"
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
                        <Button onClick={() => props.onClose(false)} className="mz-btn mz-drawer-btn-footer">
                            {translate(`common.button.cancel`)}
                        </Button>
                        <Button
                            loading={props.saving}
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
            <Spin indicator={IndicatorIcon} spinning={props.saving} tip={translate(`common.message.processing`)}>
                <Form
                    layout="vertical"
                    form={form}
                    onFinish={onFormFinish}
                    onFinishFailed={onFormFinishFailed}
                    onValuesChange={onFormValuesChange}
                    scrollToFirstError={true}
                >
                    <Form.Item name="paragraph" label="Paragraph" rules={[{ required: true }]}>
                        <Input.TextArea
                            placeholder="Enter paragraph"
                            autoComplete="off"
                            autoSize={{ minRows: 10, maxRows: 10 }}
                        />
                    </Form.Item>
                    <div style={{ marginBottom: 8 }}>
                        <Text style={{ display: 'block', fontWeight: 600, marginBottom: 8 }}>
                            Questions ({doc.questions.length})
                        </Text>
                        <Input
                            placeholder="Question"
                            autoComplete="off"
                            prefix={<QuestionCircleOutlined />}
                            suffix={<EnterOutlined />}
                            value={questionText}
                            onChange={(e: any) => setQuestionText(e.target.value)}
                            onPressEnter={(e: any) => onAddQuestion(e)}
                            style={{ height: 32 }}
                        />
                    </div>
                    {doc.questions.length > 0 ? (
                        <List
                            size="small"
                            bordered
                            className="mz-list-text"
                            dataSource={doc.questions}
                            renderItem={(q: Question) => (
                                <List.Item>
                                    <ListItemTextEditable
                                        text={q.question}
                                        onChange={(text: string) => onQuestionChange(q.id ? q.id : q.uuid, text)}
                                        onDeleteClick={() => onDeleteQuestion(q.id ? q.id : q.uuid)}
                                    />
                                </List.Item>
                            )}
                        />
                    ) : (
                        <Empty className="mz-empty-small" description="No question yet!" />
                    )}
                </Form>
            </Spin>
        </Drawer>
    );
};

export default EditDocumentForm;
