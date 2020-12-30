import React, { FC, useEffect, useState } from 'react';
import {
    Button,
    Checkbox,
    Col,
    Drawer,
    Empty,
    Form,
    Input,
    List,
    Popconfirm,
    Row,
    Space,
    Spin,
    Typography,
} from 'antd';
import { AUTOMATE_MESSAGE_TYPE, IndicatorIcon, MESSAGE_CONTENT_TYPE, PrimaryColor } from '../common/Constants';
import { useTranslate } from 'ra-core';
import { BotMemberEvent } from '../service/botGroupService';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons/lib';

const { Text, Paragraph } = Typography;

interface Prods {
    botGroup: any;
    visible: boolean;
    botMember: BotMemberEvent;
    onSave: (botMember: BotMemberEvent) => void;
    saving: boolean;
    onClose: (reload: boolean) => void;
}

const BotMemberSettingForm: FC<Prods> = (prods: Prods) => {
    const translate = useTranslate();
    const [botMember, setBotMember] = useState<BotMemberEvent>();
    const [messageText, setMessageText] = useState<string>('');
    const [form] = Form.useForm();

    const formOnFinish = (values: any) => {
        console.log('formOnFinish -> values', values);
        const botMember = { ...prods.botMember, ...values };
        prods.onSave(botMember);
    };

    const onAddMessageText = () => {
        if (messageText && messageText.length > 0) {
            let bot: BotMemberEvent = { ...botMember } as BotMemberEvent;
            if (!bot.focusOutMessages) bot.focusOutMessages = [];

            bot.focusOutMessages.push({
                contentType: MESSAGE_CONTENT_TYPE.TEXT,
                type: AUTOMATE_MESSAGE_TYPE.WELCOME,
                message: messageText.trim(),
                language: prods.botGroup.language,
            });
            setBotMember(bot);
            setMessageText('');
        }
    };

    useEffect(() => {
        setBotMember(prods.botMember);
        form.setFieldsValue(prods.botMember);
    }, [form, prods.botMember]);

    if (!prods.botMember || !prods.botMember.id || !botMember) return null;
    return (
        <Drawer
            title={translate('resources.botmember.form.bot_setting')}
            placement="right"
            onClose={() => prods.onClose(false)}
            visible={prods.visible}
            width="500"
            maskClosable={false}
            keyboard={false}
            destroyOnClose={true}
            className="mz-bot-member-setting"
            footer={
                <div
                    style={{
                        textAlign: 'right',
                    }}
                >
                    <Space>
                        <Button onClick={() => prods.onClose(false)} className="mz-btn mz-drawer-btn-footer">
                            {translate(`common.button.cancel`)}
                        </Button>
                        <Button
                            loading={prods.saving}
                            onClick={() => form.submit()}
                            type="primary"
                            className="mz-btn mz-drawer-btn-footer"
                        >
                            {translate(`common.button.save`)}
                        </Button>
                    </Space>
                </div>
            }
        >
            <Spin indicator={IndicatorIcon} spinning={prods.saving} tip={translate(`common.message.processing`)}>
                <div className="box-item-header">
                    <div style={{ marginBottom: 4 }}>
                        <Text style={{ fontWeight: 600, color: '#222' }}>{prods.botMember.bot.name}</Text>
                    </div>
                    <Paragraph
                        style={{ marginBottom: 0 }}
                        ellipsis={{ rows: 2, expandable: true, symbol: translate('common.label.more') }}
                    >
                        {prods.botMember.bot.description
                            ? prods.botMember.bot.description
                            : translate(`common.label.no_description`)}
                    </Paragraph>
                </div>

                <Form
                    form={form}
                    onFinish={formOnFinish}
                    layout="vertical"
                    onValuesChange={(changedValues: any, allValues: any) => {
                        console.log('onFieldsChange -> allValues', allValues);
                        setBotMember(allValues);
                    }}
                >
                    <Row className="box-item">
                        <Col span={12}>
                            <Form.Item name="allowSwitchContext" valuePropName="checked">
                                <Checkbox>{translate('resources.botmember.table_header.switch_context')}</Checkbox>
                            </Form.Item>
                            <Form.Item name="allowShowConfirm" valuePropName="checked">
                                <Checkbox>{translate('resources.botmember.table_header.show_confirm')}</Checkbox>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="allowRemoveContext" valuePropName="checked">
                                <Checkbox>{translate('resources.botmember.table_header.remove_context')}</Checkbox>
                            </Form.Item>
                            <Form.Item name="allowTriggerStartStep" valuePropName="checked">
                                <Checkbox>{translate('resources.botmember.table_header.trigger_start_step')}</Checkbox>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row className="box-item">
                        <Col span={24}>
                            <div style={{ marginBottom: 8 }}>
                                <Text style={{ fontWeight: 600, color: '#222' }}>
                                    {translate('resources.botmember.form.focus_out_message')} (
                                    {botMember.focusOutMessages ? botMember.focusOutMessages.length : 0})
                                </Text>
                                <Paragraph>{translate('resources.botmember.form.focus_out_message_desc')}</Paragraph>
                            </div>
                            <Input
                                placeholder="Message"
                                autoComplete="off"
                                style={{ marginBottom: 10, height: 35 }}
                                value={messageText}
                                onChange={(e: any) => setMessageText(e.target.value)}
                                onPressEnter={(e: any) => {
                                    e.preventDefault();
                                    onAddMessageText();
                                }}
                                suffix={<PlusOutlined style={{ color: PrimaryColor }} />}
                            />
                            {botMember.focusOutMessages && botMember.focusOutMessages.length > 0 && (
                                <List
                                    bordered
                                    dataSource={botMember.focusOutMessages}
                                    renderItem={item => (
                                        <List.Item
                                            actions={[
                                                <Popconfirm
                                                    placement="left"
                                                    title={`Do you want remove this message`}
                                                    onConfirm={() => {}}
                                                    okText={translate(`common.button.yes`)}
                                                    cancelText={translate(`common.button.no`)}
                                                >
                                                    <DeleteOutlined className="trash-btn" />
                                                </Popconfirm>,
                                            ]}
                                        >
                                            {item.message}
                                        </List.Item>
                                    )}
                                />
                            )}

                            {(!botMember.focusOutMessages || botMember.focusOutMessages.length == 0) && (
                                <Empty
                                    className="mz-empty"
                                    description="No message yet."
                                    imageStyle={{
                                        height: 40,
                                    }}
                                />
                            )}
                        </Col>
                    </Row>
                </Form>
            </Spin>
        </Drawer>
    );
};

export default BotMemberSettingForm;
