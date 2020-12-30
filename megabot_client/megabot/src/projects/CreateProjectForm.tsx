import React, { FC, useEffect, useState } from 'react';
import { Button, Card, Col, Drawer, Form, Input, Row, Select, Space, Tooltip } from 'antd';
import { Template } from '../types';
import {
    Icon_GroupBot,
    Icon_ServiceBot,
    Icon_SingleBot,
    NORMAL_BOT,
    SERVICE_BOT,
    BOT_GROUP,
    BOT_LANGUAGES,
} from './common/Constants';
import { useTranslate } from 'ra-core';
import { InfoCircleOutlined } from '@ant-design/icons';
const { Option } = Select;
const { Meta } = Card;
interface Props {
    templates: any;
    onClose: any;
    onSave: any;
    visible: any;
    onFinishFailed: any;
    loading: any;
}
const CreateProjectForm: FC<Props> = props => {
    const translate = useTranslate();
    const templates = props.templates;
    const [botType, setBotType] = useState('NORMAL');
    const [botTemplate, setBotTemplate] = useState({ id: '', name: '' });
    const [form] = Form.useForm();
    const onFinish = (bot: any) => {
        bot['categoryId'] = 2;
        bot['botType'] = botType;
        if (botTemplate.id !== '') {
            bot['templateId'] = botTemplate.id;
        }
        console.log(bot);
        props.onSave(bot);
    };
    const settingTemplate = (tem: any) => {
        if (botTemplate.id === '' || botTemplate.id !== tem.id) {
            setBotTemplate({ id: tem.id, name: tem.name });
        } else {
            setBotTemplate({ id: '', name: '' });
        }
    };
    useEffect(() => {
        if (props.visible) {
            form.resetFields();
            setBotTemplate({ id: '', name: '' });
        }
    }, [form, props.visible]);
    return (
        <Drawer
            title="Create Project"
            placement="right"
            onClose={props.onClose}
            visible={props.visible}
            width="600"
            className="create-my-project"
        >
            <Form
                layout="vertical"
                form={form}
                onFinish={onFinish}
                onFinishFailed={props.onFinishFailed}
                initialValues={{ botLanguage: 'en', botType: 'empty' }}
            >
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item
                            name="name"
                            label="Bot Name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Enter bot name',
                                },
                            ]}
                        >
                            <Input
                                autoComplete="off"
                                placeholder="Enter bot name"
                                suffix={
                                    <Tooltip
                                        placement="left"
                                        title={translate(`resources.projects.create_project.form.name.hint`)}
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
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item
                            name="description"
                            label="Description"
                            rules={[
                                {
                                    required: false,
                                    message: 'Enter the description',
                                },
                            ]}
                        >
                            <Input.TextArea rows={4} placeholder="Enter the description" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item
                            name="language"
                            label="Default Language"
                            initialValue="KO"
                            rules={[
                                {
                                    required: false,
                                    message: 'Select language',
                                },
                            ]}
                        >
                            <Select placeholder="Select language" optionLabelProp="label">
                                {Object.keys(BOT_LANGUAGES).map(code => (
                                    <Option
                                        value={code}
                                        label={
                                            <span>
                                                {BOT_LANGUAGES[code].icon}
                                                {'  '}
                                                {BOT_LANGUAGES[code].name}
                                            </span>
                                        }
                                    >
                                        <Space>
                                            <span role="img" aria-label={BOT_LANGUAGES[code].name}>
                                                {BOT_LANGUAGES[code].icon}
                                            </span>
                                            <span>
                                                {BOT_LANGUAGES[code].name} ({code})
                                            </span>
                                        </Space>
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item name="botType" label="Bot type:">
                            <Space
                                align="center"
                                style={{
                                    textAlign: 'center',
                                    padding: '0px auto',
                                }}
                            >
                                <Card
                                    className={botType === 'NORMAL' ? 'bot-type-card selected' : 'bot-type-card'}
                                    hoverable
                                    cover={<img alt="single bot" src={Icon_SingleBot} />}
                                    onClick={() => setBotType(NORMAL_BOT)}
                                >
                                    <Meta title="Single Bot" description="This is a single bot" />
                                </Card>
                                <Card
                                    className={botType === 'SERVICE_BOT' ? 'bot-type-card selected' : 'bot-type-card'}
                                    hoverable
                                    cover={<img alt="bot Service" src={Icon_ServiceBot} />}
                                    onClick={() => setBotType(SERVICE_BOT)}
                                >
                                    <Meta title="Service Bot" description="Able to use inside another bot" />
                                </Card>
                                <Card
                                    className={botType === 'BOT_GROUP' ? 'bot-type-card selected' : 'bot-type-card'}
                                    hoverable
                                    cover={<img alt="bot group" src={Icon_GroupBot} />}
                                    onClick={() => setBotType(BOT_GROUP)}
                                >
                                    <Meta title="Bot Group" description="It include multiple bots inside" />
                                </Card>
                            </Space>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16} hidden={botType === BOT_GROUP}>
                    <Col
                        span={24}
                        style={{
                            width: 780,
                            overflowX: 'auto',
                        }}
                    >
                        <Form.Item name="botType" label={`Choose template: ${botTemplate.name}`}>
                            <Space align="center">
                                {templates
                                    ? templates.map((tem: Template) => (
                                          <Card
                                              className={
                                                  botTemplate.id === tem.id ? 'bot-type-card selected' : 'bot-type-card'
                                              }
                                              hoverable
                                              cover={<img alt="bot group" src={Icon_SingleBot} />}
                                              onClick={() => settingTemplate(tem)}
                                              key={tem.id}
                                          >
                                              <Meta
                                                  title={tem.name}
                                                  description={
                                                      tem.description
                                                          ? tem.description
                                                          : translate(`common.label.no_description`)
                                                  }
                                              />
                                          </Card>
                                      ))
                                    : null}
                            </Space>
                        </Form.Item>
                    </Col>
                </Row>

                <Row
                    gutter={16}
                    style={{
                        position: 'absolute',
                        right: 20,
                        bottom: 5,
                    }}
                >
                    <Col span={24}>
                        <Form.Item>
                            <Button onClick={props.onClose} style={{ marginRight: 8 }}>
                                {translate(`common.button.cancel`)}
                            </Button>
                            <Button type="primary" htmlType="submit" loading={props.loading}>
                                {translate(`common.button.save`)}
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Drawer>
    );
};

export default CreateProjectForm;
