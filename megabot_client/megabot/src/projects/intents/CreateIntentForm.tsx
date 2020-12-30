import React, { FC, useState, useEffect, useRef } from 'react';
import {
    Form,
    Input,
    Button,
    Collapse,
    Empty,
    Space,
    Table,
    Tooltip,
    Spin,
    Drawer,
    notification,
    Popconfirm,
} from 'antd';
import { DeleteOutlined, EnterOutlined, NumberOutlined, InfoCircleOutlined } from '@ant-design/icons';
import FormatQuoteIcon from '@material-ui/icons/FormatQuote';
import { IndicatorIcon, UNKNOWN_INTENT_ID } from '../common/Constants';

import IntentService from '../service/intentService';
import { uuid } from '../../utils/uuid';
import { randomColor } from './index';
import { EditOutlined } from '@ant-design/icons/lib';
import IntentSample from './IntentSample';
import { useDataProvider, useTranslate } from 'ra-core';

const { Panel } = Collapse;

interface Prods {
    visible: Boolean;
    intent: any;
    mapColor: Map<any, any>;
    saving: Boolean;
    onSave: any;
    onClose: any;
}

const CreateIntentForm: FC<Prods> = (prods: any) => {
    const dataProvider = useDataProvider();
    const [editIntentForm] = Form.useForm();
    const [mapColor, setMapColor] = useState<Map<string, string>>();
    const [processing, setProcessing] = useState(false);
    const [deletedSentences, setDeletedSentences] = useState<any[]>([]);
    const [activeSentenceId, setActiveSentenceId] = useState();

    const intentNameRef = useRef<Input>(null);
    const translate = useTranslate();

    useEffect(() => {
        if (prods.intent) {
            editIntentForm.setFieldsValue(prods.intent);
            setDeletedSentences([]);
            setMapColor(prods.mapColor);
        }
        if (intentNameRef.current !== null) {
            intentNameRef.current.focus();
        }
    }, [editIntentForm, prods.intent, prods.mapColor]);

    /**
     * form valid
     * @param intent
     */
    const onFinish = (intent: any) => {
        const data = {
            name: intent.name,
            sentences: editIntentForm.getFieldValue('sentences'),
            deletedSentences: deletedSentences,
        };

        // remove id of new example
        data.sentences.forEach((sentence: any) => {
            delete sentence.editing;
            if (typeof sentence.id === 'string') {
                delete sentence.id;
            }
        });

        prods.onSave(data);
    };

    /**
     * form invalid
     * @param errorFields
     */
    const onFinishFailed = (errorFields: any) => {
        console.log(errorFields);
    };

    /**
     * on click add sample button
     * @param e
     */
    const onAddSentence = (e: any) => {
        e.preventDefault();
        convertSentence({ id: undefined, text: e.target.value });
    };

    /**
     * on click to save button
     * @param e
     */
    const onSaveClick = (e: any) => {
        e.preventDefault();
        editIntentForm.submit();
    };

    /**
     * Add tokenized sample to sample list
     * @param tokenizedSentence
     */
    const addSentenceToList = (tokenizedSentence: any) => {
        console.log('addSentenceToList', tokenizedSentence);
        tokenizedSentence.editing = false;

        // set color
        let map = new Map<string, string>();
        if (mapColor) {
            map = new Map<string, string>(mapColor);
        }
        tokenizedSentence.annotations.forEach((anno: any) => {
            let color = map.get(anno.type);
            if (!color) {
                color = randomColor(map);
            }
            map.set(anno.type, color);
            anno.color = color;
        });
        setMapColor(map);

        // get sentence list from form
        let sentenceList = editIntentForm.getFieldValue('sentences') || [];
        const sentenceIndex = sentenceList.map((s: any) => s.id).indexOf(tokenizedSentence.id);
        const items = [...sentenceList];

        if (sentenceIndex >= 0) {
            // update sample
            const sample = {
                ...items[sentenceIndex],
                text: tokenizedSentence.text,
                annotations: tokenizedSentence.annotations,
                editing: false,
            };
            items[sentenceIndex] = sample;
        } else {
            // create new sample
            tokenizedSentence.id = uuid();
            items.unshift(tokenizedSentence);
            editIntentForm.setFieldsValue({ userExample: '' });
        }

        console.log('intents binding', items);
        editIntentForm.setFieldsValue({ sentences: items });
        setActiveSentenceId(tokenizedSentence.id);
    };

    /**
     * temporary remove sentence
     * @param sentence
     */
    const onRemoveExampleClick = (sentence: any) => {
        try {
            // get sentence list from form
            let sentenceList = editIntentForm.getFieldValue('sentences') || [];
            const removeIndex = sentenceList.map((s: any) => s.id).indexOf(sentence.id);

            if (removeIndex >= 0) {
                const items = [...sentenceList];
                const removedSentence = items.splice(removeIndex, 1)[0];
                editIntentForm.setFieldsValue({ sentences: items });

                // add sentence to deleted sentence list
                if (removedSentence.id > 0) {
                    setDeletedSentences([...deletedSentences, removedSentence]);
                }
            }
        } catch (e) {
            console.log(e);
        }
    };

    /**
     * on edit example click -> update status to editing
     * @param sentence
     */
    const onEditExampleClick = (sentence: any) => {
        try {
            // get sentence list from form
            let sentenceList = editIntentForm.getFieldValue('sentences') || [];
            let items = [...sentenceList];

            const sentenceIndex = items.map((s: any) => s.id).indexOf(sentence.id);

            items[sentenceIndex].editing = true;
            editIntentForm.setFieldsValue({ sentences: items });
        } catch (e) {
            console.log(e);
        } finally {
            setActiveSentenceId(sentence.id);
        }
    };

    const onCancelEditExample = (sentenceId: any) => {
        try {
            // get sentence list from form
            let sentenceList = editIntentForm.getFieldValue('sentences') || [];
            let items = [...sentenceList];

            const sentenceIndex = items.map((s: any) => s.id).indexOf(sentenceId);

            items[sentenceIndex].editing = false;
            editIntentForm.setFieldsValue({ sentences: items });
        } catch (e) {
            console.log(e);
        }
    };

    /**
     * Tokenizer
     * @param sentence
     */
    const convertSentence = (sentence: any) => {
        const intent = { ...prods.intent };
        intent.name = editIntentForm.getFieldValue('name');

        setProcessing(true);
        IntentService.convertSentence(dataProvider, prods.intent.botId, intent, sentence.text)
            .then(({ data }: any) => {
                // console.log('convertSentence', data);
                if (data.annotations) {
                    data.id = sentence.id;
                    addSentenceToList(data);
                } else {
                    const message = data.message
                        ? data.message
                        : translate(`resources.intents.message.can_not_analysis`);
                    notification['error']({
                        message: translate(`common.message.error`),
                        description: message,
                    });
                }
                setProcessing(false);
            })
            .catch((error: any) => {
                notification['error']({
                    message: translate(`common.message.error`),
                    description: translate(`common.message.unknown_error_try_again`),
                });
                setProcessing(false);
            });
    };

    const genExtra = (sentence: any) => (
        <Space>
            <EditOutlined
                className="mz-icon-btn"
                title="Edit this example"
                onClick={e => {
                    e.stopPropagation();
                    onEditExampleClick(sentence);
                }}
            />
            <Popconfirm
                placement="left"
                title={translate(`resources.intents.message.delete_sample_confirm`)}
                onConfirm={() => onRemoveExampleClick(sentence)}
                okText={translate(`common.button.yes`)}
                cancelText={translate(`common.button.no`)}
            >
                <DeleteOutlined
                    className="trash-btn"
                    title="Delete this example"
                    onClick={event => {
                        // If you don't want click extra trigger collapse, you can prevent this:
                        event.stopPropagation();
                    }}
                />
            </Popconfirm>
        </Space>
    );

    const sentenceAnnotations = (sentence: any) => {
        return (
            <Table
                className="annotation-table"
                rowClassName="annotation-row"
                key="type"
                pagination={false}
                size="small"
                showHeader={false}
                dataSource={sentence.annotations}
                columns={[
                    {
                        width: 200,
                        render: (anno: any) => (
                            <span style={{ color: anno.color, paddingLeft: '12px' }}>@{anno.type}</span>
                        ),
                    },
                    {
                        render: (anno: any) => <span>{anno.value}</span>,
                    },
                ]}
            />
        );
    };

    const checkIntentName = (rule: any, value: any) => {
        if (value.length === 0) {
            return Promise.reject(translate(`resources.intents.form.intent_name.error.required`));
        }

        const regex = /^[a-zA-z0-9-_]+$/gm;
        if (regex.exec(value) === null) {
            return Promise.reject(translate(`resources.intents.form.intent_name.error.invalid`));
        }

        return Promise.resolve();
    };

    return (
        <Drawer
            title={
                prods.intent.id === UNKNOWN_INTENT_ID
                    ? translate(`resources.intents.form.create_intent`)
                    : translate(`resources.intents.form.update_intent`)
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
                            loading={prods.saving || processing}
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
                    key={uuid()}
                    layout="vertical"
                    form={editIntentForm}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    scrollToFirstError={true}
                >
                    <Form.Item
                        name="name"
                        label={translate(`resources.intents.form.intent_name.label`)}
                        rules={[
                            {
                                required: true,
                                validator: checkIntentName,
                            },
                        ]}
                    >
                        <Input
                            ref={intentNameRef}
                            placeholder={translate(`resources.intents.form.intent_name.placeholder`)}
                            style={{ height: 35 }}
                            autoComplete="off"
                            prefix={<NumberOutlined style={{ color: '#1890FF' }} />}
                            suffix={
                                <Tooltip
                                    placement="left"
                                    title={translate(`resources.intents.form.intent_name.hint`)}
                                    overlayStyle={{ width: '400px' }}
                                >
                                    <InfoCircleOutlined
                                        style={{
                                            color: 'rgba(0,0,0,.45)',
                                        }}
                                    />
                                </Tooltip>
                            }
                        />
                    </Form.Item>
                    <Form.Item name="userExample" label={translate(`resources.intents.form.user_sample.label`)}>
                        <Input
                            placeholder={translate(`resources.intents.form.user_sample.placeholder`)}
                            autoComplete="off"
                            prefix={<FormatQuoteIcon style={{ color: '#d9d9d9' }} />}
                            suffix={
                                <Tooltip
                                    placement="left"
                                    title={translate(`resources.intents.form.user_sample.enter_hint`)}
                                >
                                    <EnterOutlined />
                                </Tooltip>
                            }
                            style={{ height: 35 }}
                            onPressEnter={(e: any) => onAddSentence(e)}
                        />
                    </Form.Item>
                    <Form.Item shouldUpdate={(prevValues, curValues) => prevValues.sentences !== curValues.sentences}>
                        {({ getFieldValue }) => {
                            const sentenceList = getFieldValue('sentences') || [];
                            return sentenceList.length ? (
                                <Collapse accordion className="mz-intent-sentences" activeKey={activeSentenceId}>
                                    {sentenceList.map((sentence: any) => (
                                        <Panel
                                            key={sentence.id}
                                            showArrow={false}
                                            className={`sentence-item ${
                                                sentence.annotations.length === 0 ? 'sentence-item_anno-empty' : ''
                                            }`}
                                            header={
                                                <IntentSample
                                                    sentence={sentence}
                                                    onChange={(sentence: string) => {
                                                        convertSentence(sentence);
                                                    }}
                                                    onCancel={(sentenceId: any) => onCancelEditExample(sentenceId)}
                                                    onClick={() => {
                                                        setActiveSentenceId(sentence.id);
                                                    }}
                                                />
                                            }
                                            extra={genExtra(sentence)}
                                        >
                                            {sentence.annotations.length > 0 && sentenceAnnotations(sentence)}
                                        </Panel>
                                    ))}
                                </Collapse>
                            ) : (
                                <Empty
                                    className="mz-empty-small"
                                    description={translate(`resources.intents.message.no_sample_yet`)}
                                />
                            );
                        }}
                    </Form.Item>
                </Form>
            </Spin>
        </Drawer>
    );
};

export default CreateIntentForm;
