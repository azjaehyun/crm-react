import React, { FC, useState } from 'react';
import { Typography, Space, Select, notification, Modal, Badge, Steps, Tooltip, Collapse } from 'antd';
import { Turn } from './data/Conversation';
import { BOT_CONVERSATION_TYPE, BOT_RESPONSE_TYPE, UNKNOWN_INTENT_ID } from '../common/Constants';
import { ExclamationCircleOutlined } from '@ant-design/icons/lib';
import { useTranslate } from 'react-admin';
import { AssignSentenceToIntentParam } from '../service/chatService';
import { useDataProvider } from 'ra-core';
import ChatService from '../service/chatService';
const { Step } = Steps;
const { Text } = Typography;
const { Option } = Select;
const { confirm } = Modal;
const { Panel } = Collapse;

interface Prods {
    turn: Turn;
}

const DebugBlock: FC<Prods> = (prods: Prods) => {
    const translate = useTranslate();
    const dataProvider = useDataProvider();
    const unknownIntent = { id: UNKNOWN_INTENT_ID, name: '(Not detected)', display: '(Not detected)', disabled: true };

    const getIntentList = () => {
        if (prods.turn.answer && prods.turn.answer.context) {
            const detectedIntent = prods.turn.answer.context.detectedIntent;
            let intents = [...prods.turn.answer.context.intents];
            intents.forEach((intent: any) => {
                intent.disabled = false;
                intent.display =
                    intent.name +
                    (detectedIntent && detectedIntent.id === intent.id
                        ? ' (' + detectedIntent.score.toFixed(3) + ')'
                        : '');
            });
            if (prods.turn.answer.context.detectedIntent) {
                return intents;
            } else {
                return [unknownIntent, ...intents];
            }
        }
        return [];
    };

    const intentList = getIntentList();
    const [selectedIntent, setSelectedIntent] = useState(
        prods.turn.answer && prods.turn.answer.context.detectedIntent
            ? intentList.find(i => (prods.turn.answer ? i.id === prods.turn.answer.context.detectedIntent.id : false))
            : unknownIntent
    );

    const assignToIntent = (intentId: any, option: any) => {
        if (selectedIntent.id === option.key) {
            return;
        }
        confirm({
            title: translate(`resources.testzone.message.assign_sample_title`),
            icon: <ExclamationCircleOutlined />,
            content: translate(`resources.testzone.message.assign_sample_confirm`, {
                sentence: prods.turn.question ? prods.turn.question.message : '',
                intent_name: intentId,
            }),
            okText: translate(`common.button.assign`),
            cancelText: translate(`common.button.cancel`),
            onOk() {
                const params: AssignSentenceToIntentParam = {
                    botId: prods.turn.botId,
                    sentence: prods.turn.question ? prods.turn.question.message : '',
                    fromIntentId: selectedIntent.id,
                    toIntentId: option.key,
                };

                /**
                 * add intent while debugging on chatting(try it)
                 */
                ChatService.assignSentenceToIntent(dataProvider, params)
                    .then(({ data }: any) => {
                        notification['success']({
                            message: translate(`common.message.success`),
                            description: translate(`resources.testzone.message.assign_completed`),
                        });
                        setSelectedIntent(intentList.find(i => i.id === option.key));
                    })
                    .catch((error: any) => {
                        notification['error']({
                            message: translate(`common.message.error`),
                            description: translate(`common.message.unknown_error_try_again`),
                        });
                    });
            },
            onCancel() {},
        });
    };

    /**
     * START (1) => ASK_INFO (1)
     * @param flowMap
     */
    const renderFlow = () => {
        if (prods.turn.answer && prods.turn.answer.context && prods.turn.answer.context.flowMap) {
            let steps = prods.turn.answer.context.flowMap.split('=>');
            if (steps.length > 0) {
                return (
                    <Steps size="small" direction="vertical" current={steps.length - 1} className="bot-flow-map">
                        {steps.map((step: string, index: number) => (
                            <Step key={index} title={step.trim()} />
                        ))}
                    </Steps>
                );
            }
        }
        return null;
    };

    const slotCount = () => {
        if (prods.turn.answer && prods.turn.answer.context && prods.turn.answer.context.filledSlots) {
            return prods.turn.answer.context.filledSlots.length;
        }
        return 0;
    };

    return (
        <div className="message-text-wrapper">
            <div className="message-text--debug">
                <Select
                    style={{ width: '100%', marginBottom: 8, marginTop: 4, color: '#000' }}
                    value={selectedIntent.name}
                    onSelect={(intentId: any, option: any) => assignToIntent(intentId, option)}
                >
                    {intentList.map((intent: any) => (
                        <Option key={intent.id} value={intent.name} disabled={intent.disabled}>
                            {intent.display}
                        </Option>
                    ))}
                </Select>

                <Collapse ghost defaultActiveKey={1}>
                    <Panel header="Turn information" key="1">
                        <div>
                            - Bot: <Text className="debug-value">{prods.turn.botName}</Text>
                        </div>
                        <div>
                            - Conversation Type:{' '}
                            <Text className="debug-value">{BOT_CONVERSATION_TYPE[prods.turn.conversationType]}</Text>
                        </div>
                        <div>
                            - Response Type:{' '}
                            <Text className="debug-value">
                                {BOT_RESPONSE_TYPE[prods.turn.answer ? prods.turn.answer.responseType : '']}
                            </Text>
                        </div>

                        <div>- Slots ({slotCount()}):</div>

                        {prods.turn.answer &&
                            prods.turn.answer.context.filledSlots.map((slot: any) => (
                                <div key={slot.name} className="slot-list">
                                    <Space>
                                        <Text>@{slot.name}</Text>
                                        <Tooltip title={slot.actualValue} placement="top">
                                            <Text className="debug-value">{slot.value}</Text>
                                        </Tooltip>
                                    </Space>
                                </div>
                            ))}
                    </Panel>
                </Collapse>
                <Collapse ghost defaultActiveKey={1}>
                    <Panel header="Flows map" key="1">
                        {renderFlow()}
                    </Panel>
                </Collapse>

                <Badge className="turn-no" count={prods.turn.turnId} />
            </div>
        </div>
    );
};

export default DebugBlock;
