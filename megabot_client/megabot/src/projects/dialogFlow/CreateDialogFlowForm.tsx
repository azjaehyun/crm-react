import React, { FC, useCallback, useEffect, useRef, useState, Fragment } from 'react';
import { Button, Col, Collapse, Input, notification, Row, Select, Spin, Switch, Typography } from 'antd';
import { PlusOutlined, DownOutlined, RightOutlined } from '@ant-design/icons';
import AddSlotForm from './AddSlotForm';
import SlotConditionList from './SlotConditionList';
import ResponsePanel from './ResponsePanel';
import { BlockCondReply, BlockReply, BlockScript, Condition, SlotTable, Step } from '../../types';
import RuntimeService from '../service/runtimeService';
import { Error, useTranslate } from 'react-admin';
import { useParams } from 'react-router';
import BlockHeaderCondition from './BlockHeaderCondition';
import DialogflowService from '../service/dialogflowService';

import {
    FILL_ALL_SLOT,
    FILL_SLOT_PANEL,
    RESPONSE_PANEL,
    SERVICE_BOT,
    SLOT_TABLE_PANEL,
    STATE_DELETED,
    STEP_TYPE_BOT_INNER,
    STEP_TYPE_BUSINESS,
    STEP_TYPE_END,
    STEP_TYPE_GLOBAL,
    STEP_TYPE_START,
} from '../common/Constants';
import BotService from '../service/botService';
import { uuid } from '../../utils/uuid';
import { useDataProvider } from 'ra-core';
import { Scrollbars } from 'react-custom-scrollbars';

const { Paragraph } = Typography;
const { Panel } = Collapse;
const { Option, OptGroup } = Select;

interface Props {
    stepId: any;
    elementProperties?: any;
    modeler?: any;
    onSaved: () => void;
    visible: boolean;
}

let blockInit: BlockCondReply = {
    conditions: [],
    doNothing: false,
    fillToSlots: '*',
    id: 0,
    nextStepId: '',
    orderNo: 0,
    replies: [],
    scripts: [],
    slotTables: [],
    state: '',
    activePanel: [RESPONSE_PANEL],
};
const CreateDialogFlowForm: FC<Props> = (props: Props) => {
    const dataProvider = useDataProvider();
    const [activeKeys, setActiveKeys] = useState([0] as any);
    const [slotVisible, setSlotVisible] = useState(false);
    const [step, setStep] = useState<Step>({
        allowTriggerGlobalStep: true,
        blocks: [blockInit],
        connectors: [],
        description: '',
        id: '',
        name: '',
        servicebot: { alias: '', botId: '', showWelcomeMessage: true, turnOnDefaultReply: true },
        state: '',
        stepType: STEP_TYPE_BUSINESS,
    });
    const loginUser = JSON.parse(sessionStorage.getItem('jhi-talkbotaccount') || '{}');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const [operators, setOperators] = useState([] as any);
    const [resources, setResources] = useState([] as any);
    const [botServices, setBotServices] = useState([] as any);
    const stepNameRef = useRef<Input>(null);
    const [condNo, setCondNo] = useState();
    const translate = useTranslate();
    let { botId } = useParams();
    let stepValue = {};
    const [slotEditing, setSlotEditing] = useState();
    const [listSteps, setListSteps] = useState([] as any);
    const [stepActions, setStepActions] = useState(); // This state use for containing all of action inside step
    const [deletedBlocks, setDeletedBlock] = useState<BlockCondReply[]>([]);
    const [deletedActions, setDeletedActions] = useState<BlockScript[]>([]);
    const [deletedReplies, setDeletedReplies] = useState<BlockReply[]>([]);
    const onAddSlotTable = (e: any, orderNo: any) => {
        setCondNo(orderNo);
        setSlotVisible(true);
        e.stopPropagation();
    };
    const onEditSlot = (slot: any) => {
        console.log('editing slot: ', slot);
        setSlotEditing(slot);
        setSlotVisible(true);
    };
    const onClose = () => {
        setSlotVisible(false);
    };
    //-----------API call
    const loadOperator = useCallback(async () => {
        RuntimeService.getOperator(dataProvider)
            .then((response: any) => {
                if (response.status === 200) {
                    setOperators(response.data);
                }
            })
            .catch((error: any) => {
                console.log(error);
                setError(error);
            });
    }, [dataProvider]);

    const loadListSteps = useCallback(async () => {
        DialogflowService.getList(dataProvider, botId)
            .then((response: any) => {
                if (response.status === 200) {
                    let data = response.data;
                    if (props.stepId !== '') {
                        data = data.filter(
                            (step: Step) => step.id !== props.stepId && step.stepType != STEP_TYPE_START
                        );
                    }
                    setListSteps(data);
                }
            })
            .catch((error: any) => {
                setLoading(false);
                console.log(error);
            });
    }, [botId, dataProvider, props.stepId]);

    const loadStep = useCallback(async () => {
        setLoading(true);
        DialogflowService.getById(dataProvider, botId, props.stepId)
            .then((response: any) => {
                setLoading(false);
                if (response.status === 200) {
                    setStep(response.data);
                }
                console.log(response);
            })
            .catch((error: any) => {
                setLoading(false);
                console.log(error);
            });
    }, [botId, dataProvider, props.stepId]);
    const loadResource = useCallback(async () => {
        RuntimeService.getBotResource(dataProvider, botId)
            .then((response: any) => {
                if (response.status === 200) {
                    setResources(response.data);
                }
            })
            .catch((error: any) => {
                setLoading(false);
                setError(error);
            });
    }, [botId, dataProvider]);

    const loadBotService = useCallback(async () => {
        const params = { botType: SERVICE_BOT, limit: 100, offset: 0, createdBy: 'USER', language: 'UNKNOWN' };
        BotService.getBotService(dataProvider, loginUser.username, botId, params)
            .then((response: any) => {
                if (response.status === 200) {
                    setBotServices(response.data.list);
                }
            })
            .catch((error: any) => {
                console.log(error);
            });
    }, [botId, dataProvider, loginUser.username]);

    useEffect(() => {
        loadResource().then();
        loadOperator().then();
        loadListSteps().then();
    }, [loadOperator, loadResource, loadListSteps]);
    useEffect(() => {
        if (props.stepId && props.stepId !== '') {
            loadStep().then();
        }
    }, [loadStep, props.stepId]);
    const onChangeStepType = (val: string) => {
        setStep({ ...step, stepType: val });
        if (val === STEP_TYPE_BOT_INNER) {
            loadBotService();
        }
    };
    const addMoreBlock = (orderNo: number) => {
        console.log('Add more block with order: ', orderNo);
        let newBlock = { ...blockInit, orderNo: orderNo };
        let temp = step.blocks;
        temp.splice(orderNo, 0, newBlock);
        temp.map((bl, i) => (bl.orderNo = i));
        setStep({ ...step, blocks: temp });
        setActiveKeys([...activeKeys, orderNo]);
    };
    const onAddConditionCallBack = (newCond: any, orderNo: number) => {
        console.log(newCond);
        let blockFilter = step.blocks.filter(bl => bl.orderNo === orderNo);
        if (blockFilter.length < 0 || blockFilter[0] === undefined) {
            return;
        }
        let block = blockFilter[0];
        const condFilter = block.conditions.filter(cond => cond.id === newCond.id || cond.uuid === newCond.uuid);
        if (condFilter.length < 0 || condFilter[0] === undefined) {
            block.conditions.push(newCond);
        } else {
            setStep({
                ...step,
                blocks: step.blocks.map((block: any) =>
                    block.orderNo == orderNo
                        ? {
                              ...block,
                              conditions: block.conditions.map((cond: any) =>
                                  cond.id == newCond.id || cond.uuid == newCond.uuid ? newCond : cond
                              ),
                          }
                        : block
                ),
            });
        }
        // setStep({ ...step, blocks: step.blocks.map((bl: any) => (bl.orderNo === orderNo ? block : bl)) });

        // setStep({
        //     ...step,
        //     blocks: step.blocks.map((block: any) =>
        //         block.orderNo == orderNo ? { ...block, conditions: [...block.conditions, newCond] } : block
        //     ),
        // });
    };
    const onAddConditionFaileCallBack = (error: any) => {
        console.log('Failure add condition: ', error);
    };
    const onDeleteBlock = (e: any, block: BlockCondReply) => {
        e.stopPropagation();
        console.log(step);
        setActiveKeys(activeKeys.filter((k: any) => k != block.orderNo));
        if (block.id > 0) {
            block.state = STATE_DELETED;
            setDeletedBlock([...deletedBlocks, block]);
            setStep({ ...step, blocks: step.blocks.filter(bl => bl.id !== block.id) });
        } else {
            setStep({ ...step, blocks: step.blocks.filter(bl => bl.orderNo !== block.orderNo) });
        }
    };

    const onDeleteCondition = (condDel: any, orderNo: any) => {
        console.log('Request to delete condition: ', condDel, '---at  no: ', orderNo);

        let filter = step.blocks.filter(bl => bl.orderNo === orderNo);
        let blockConditions = filter.length > 0 ? filter[0].conditions : [];

        if (condDel.id && condDel.id > 0) {
            blockConditions.map((cond: any) => (cond.id == condDel.id ? (cond.state = STATE_DELETED) : cond));
        } else {
            blockConditions = blockConditions.filter((cond: any) => cond.uuid !== condDel.uuid);
        }
        setStep({
            ...step,
            blocks: step.blocks.map(bl =>
                bl.orderNo === orderNo
                    ? {
                          ...bl,
                          conditions: blockConditions,
                      }
                    : bl
            ),
        });
    };
    const activePanel = (orderNo: any) => {
        if (activeKeys.includes(orderNo)) {
            setActiveKeys(activeKeys.filter((a: any) => a != orderNo));
        } else {
            setActiveKeys([...activeKeys, orderNo]);
        }
    };

    const onFailureEditSlotTable = (msg: any) => {
        console.log(msg);
        notification['error']({
            message: translate(`common.message.error`),
            description: msg,
        });
    };

    const onFinishEditSlotTable = (slot: any, condNo: any) => {
        console.log(slot, slotEditing, condNo);
        if (slotEditing) {
            console.log('slotEditing');
            setStep({
                ...step,
                blocks: step.blocks.map((bl: any) =>
                    bl.orderNo == condNo
                        ? { ...bl, slotTables: bl.slotTables.map((sl: any) => (sl.name === slot.name ? slot : sl)) }
                        : bl
                ),
            });
            setSlotEditing(undefined);
        } else {
            console.log('not editing');
            setStep({
                ...step,
                blocks: step.blocks.map((bl: any) =>
                    bl.orderNo == condNo ? { ...bl, slotTables: [...bl.slotTables, slot] } : bl
                ),
            });
        }
        setSlotVisible(false);
    };

    const onDeleteSlot = (slot: any, condNo: any) => {
        console.log('request to delete slot: ', slot);
        setStep({
            ...step,
            blocks: step.blocks.map((bl: any) =>
                bl.orderNo == condNo
                    ? { ...bl, slotTables: bl.slotTables.filter((sl: any) => sl.name !== slot.name) }
                    : bl
            ),
        });
    };
    const onChangeStepName = (stepName: any) => {
        setStep({ ...step, name: stepName });
        // props.setElementName(stepName);
    };

    const onChangeBlock = () => {
        // console.log('------on change block', step);
    };
    const onUpdateBlock = (
        orderNo: number,
        replies: BlockReply[],
        jumpToStepId: any,
        action: BlockScript[],
        newCreatedSteps?: Step[]
    ) => {
        if (newCreatedSteps && newCreatedSteps.length > 0) {
            setListSteps([...listSteps, ...newCreatedSteps]);
        }
        const isDoNothing =
            replies.filter(re => re.state !== STATE_DELETED).length <= 0 &&
            action.filter(act => act.state !== STATE_DELETED).length <= 0 &&
            jumpToStepId === '';
        setStep({
            ...step,
            blocks: step.blocks.map(bl =>
                bl.orderNo == orderNo
                    ? {
                          ...bl,
                          replies: replies,
                          scripts: action,
                          nextStepId: jumpToStepId,
                          doNothing: isDoNothing,
                      }
                    : bl
            ),
        });
    };

    const onSetSlotFillTos = (e: any, orderNo: number) => {
        console.log(e);
        // const slotStr = (e === '' || e === FILL_ALL_SLOT) ? e : e.toString();
        const slotStr = e === FILL_ALL_SLOT ? e : e.length <= 0 ? '' : e.toString();
        console.log(slotStr);
        setStep({
            ...step,
            blocks: step.blocks.map(bl => (bl.orderNo == orderNo ? { ...bl, fillToSlots: slotStr } : bl)),
        });
    };
    const activeBlockPanel = (block: any, panel: any) => {
        console.log('-----active/inactive panel inside block', block, panel);
        let filter = step.blocks.filter(bl => bl.orderNo === block.orderNo);
        let currentBlock = filter[0];
        let activePanel = currentBlock.activePanel || [];
        if (activePanel.includes(panel)) {
            setStep({
                ...step,
                blocks: step.blocks.map(bl =>
                    bl.orderNo == block.orderNo ? { ...bl, activePanel: activePanel.filter(ac => ac !== panel) } : bl
                ),
            });
        } else {
            setStep({
                ...step,
                blocks: step.blocks.map(bl =>
                    bl.orderNo == block.orderNo ? { ...bl, activePanel: [...activePanel, panel] } : bl
                ),
            });
        }
    };

    const onMoveBlock = (blockOrder: number, delta: number) => {
        console.log('Move block order: ', blockOrder, '  to ', delta, '-1: up, 1: down');
        // delta = -1 -> go up; delta = 1 -> go down
        let tempBlock = step.blocks;
        const newIndex = blockOrder + delta;
        if (newIndex < 0 || newIndex == step.blocks.length) return; //Already at the top or bottom.
        const indexes = [blockOrder, newIndex].sort((a, b) => a - b); //Sort the indixes (fixed)
        tempBlock.splice(indexes[0], 2, tempBlock[indexes[1]], tempBlock[indexes[0]]); //Replace from lowest index, two elements, reverting the order
        tempBlock.map((block, idx) => (block.orderNo = idx));
        setStep({ ...step, blocks: tempBlock });

        setActiveKeys([activeKeys.filter((k: any) => k !== blockOrder), newIndex]);
    };
    const getStepScripts = (exceptBlockOrderNo: number) => {
        let stepScripts: BlockScript[] = [];
        step.blocks.filter(bl => bl.orderNo !== exceptBlockOrderNo).map(block => stepScripts.push(...block.scripts));
        return stepScripts;
    };

    const headerBlockContent = (block: any, panel: string) =>
        block.activePanel && block.activePanel.includes(panel) ? (
            <DownOutlined className="collapse-arrow" title="Collapse" onClick={() => activeBlockPanel(block, panel)} />
        ) : (
            <RightOutlined className="collapse-arrow" title="Expand" onClick={() => activeBlockPanel(block, panel)} />
        );

    const onCreateStep = useCallback(async () => {
        if ((!step.name || step.name == '') && stepNameRef.current !== null) {
            stepNameRef.current.focus();
            notification['error']({
                message: translate(`common.message.error`),
                description: translate(`resources.context_flow.errors.step_name`),
            });
            return;
        } else {
            let stepDTO: Step = { ...step };
            if (stepDTO.stepType !== STEP_TYPE_BOT_INNER) {
                delete stepDTO.servicebot;
            }
            stepDTO.blocks.map((bl: BlockCondReply) => {
                delete bl.activePanel;
                bl.conditions.map((cond: Condition) => {
                    delete cond.uuid;
                    return cond;
                });
                bl.replies.map((rep: BlockReply) => {
                    delete rep.uuid;
                    return rep;
                });
                bl.scripts.map((ac: BlockScript) => {
                    delete ac.uuid;
                    delete ac.isValid;
                    delete ac.oldName;
                    return ac;
                });
                return bl;
            });
            if (deletedBlocks.length > 0) {
                stepDTO.blocks.push(...deletedBlocks);
            }

            setLoading(true);
            if (stepDTO.id !== '') {
                DialogflowService.update(dataProvider, botId, stepDTO.id, stepDTO)
                    .then((response: any) => {
                        setLoading(false);
                        if (response.status === 200) {
                            props.onSaved();
                            notification['success']({
                                message: 'Success',
                                description: `Update step named ${stepDTO.name} successful!`,
                            });
                            stepValue = response.data;
                            return stepValue;
                        } else {
                            notification['error']({
                                message: 'Error',
                                description: response.data.message,
                            });
                        }
                    })
                    .catch((error: any) => {
                        setLoading(false);
                        console.log(error);
                    });
            } else {
                DialogflowService.createNew(dataProvider, botId, stepDTO)
                    .then((response: any) => {
                        setLoading(false);
                        if (response.status === 200) {
                            props.onSaved();
                            notification['success']({
                                message: 'Success',
                                description: `Create a new step named ${stepDTO.name} successful!`,
                            });
                            stepValue = response.data;
                            return stepValue;
                        } else {
                            notification['error']({
                                message: 'Error',
                                description: response.data.message,
                            });
                        }
                    })
                    .catch((error: any) => {
                        setLoading(false);
                        console.log(error);
                    });
            }
        }
    }, [botId, dataProvider, step, translate]);

    const stepContainer = props.visible ? 'step-container selected' : 'step-container';

    if (error) return <Error />;

    return (
        <div className={stepContainer}>
            <div className="step-header">
                <Row>
                    <Col span={9} style={{ paddingRight: 5, width: 230 }}>
                        <Input
                            style={{ width: '100%' }}
                            ref={stepNameRef}
                            placeholder={translate(`resources.context_flow.placeholder.step_name`)}
                            autoComplete="off"
                            // value={element}
                            value={step.name}
                            onChange={e => onChangeStepName(e.target.value)}
                        />
                    </Col>
                    <Col span={8} style={{ paddingRight: 5 }}>
                        <Select value={step.stepType} style={{ width: '100%' }} onChange={val => onChangeStepType(val)}>
                            <Option disabled={step.id != ''} value={STEP_TYPE_START}>
                                Start
                            </Option>
                            <Option disabled={step.id != ''} value={STEP_TYPE_GLOBAL}>
                                Global
                            </Option>
                            <Option disabled={step.id != ''} value={STEP_TYPE_BUSINESS}>
                                Business
                            </Option>
                            <Option disabled={step.id != ''} value={STEP_TYPE_BOT_INNER}>
                                BotInner
                            </Option>
                            <Option disabled={step.id != ''} value={STEP_TYPE_END}>
                                End
                            </Option>
                        </Select>
                    </Col>
                    <Col span={7}>
                        <Switch
                            disabled={step.stepType === STEP_TYPE_GLOBAL}
                            checked={step.allowTriggerGlobalStep}
                            size={'small'}
                            onChange={(e: boolean) => setStep({ ...step, allowTriggerGlobalStep: e })}
                        />
                        {/*Trigger global step*/}
                        {translate(`resources.context_flow.trigger_global`)}
                    </Col>
                </Row>
                {step.stepType === STEP_TYPE_BOT_INNER && (
                    <Row style={{ paddingTop: 4 }}>
                        <Col span={9} style={{ paddingRight: 5, width: 230 }}>
                            <Input
                                placeholder="Type bot inner alias"
                                value={step.servicebot ? step.servicebot.alias : ''}
                                onChange={e =>
                                    setStep({
                                        ...step,
                                        servicebot: { ...step.servicebot, alias: e.target.value },
                                    })
                                }
                            />
                        </Col>
                        <Col span={8} style={{ paddingRight: 5 }}>
                            <Select
                                placeholder="Select Bot Service"
                                style={{ width: '100%' }}
                                onChange={(val: string) =>
                                    setStep({ ...step, servicebot: { ...step.servicebot, botId: val } })
                                }
                            >
                                {botServices.length > 0 &&
                                    botServices.map((bot: any) => (
                                        <Option key={bot.id} value={bot.id}>
                                            {bot.name}
                                        </Option>
                                    ))}
                            </Select>
                        </Col>
                        <Col span={7}>
                            <Switch
                                checked={step.servicebot && step.servicebot.turnOnDefaultReply}
                                title="Default Reply"
                                size={'small'}
                                onChange={(e: boolean) =>
                                    setStep({
                                        ...step,
                                        servicebot: { ...step.servicebot, turnOnDefaultReply: e },
                                    })
                                }
                            />
                            Default Reply
                            <br />
                            <Switch
                                checked={step.servicebot.showWelcomeMessage}
                                title="Welcome message"
                                onChange={(e: boolean) =>
                                    setStep({
                                        ...step,
                                        servicebot: { ...step.servicebot, showWelcomeMessage: e },
                                    })
                                }
                                size={'small'}
                            />
                            Welcome message
                        </Col>
                    </Row>
                )}
            </div>
            <div className="step-body">
                <Scrollbars autoHide autoHideTimeout={500} autoHideDuration={100}>
                    <div className="step-body-container">
                        <Spin spinning={loading}>
                            {/*<GlobalStepForm eleName={eleName} setElementName={props.setElementName} />*/}
                            <Row>
                                <Col span={24}>
                                    {step.blocks
                                        .sort(({ orderNo: pNo }, { orderNo: cNo }) => pNo - cNo)
                                        .map((block: BlockCondReply, index: number) => (
                                            <Fragment key={uuid()}>
                                                <Collapse
                                                    onChange={onChangeBlock}
                                                    activeKey={activeKeys}
                                                    expandIconPosition="right"
                                                    className="step-block-collapse"
                                                >
                                                    <Panel
                                                        header={
                                                            <BlockHeaderCondition
                                                                activePanel={activePanel}
                                                                isActive={activeKeys.includes(block.orderNo)}
                                                                resources={resources}
                                                                operators={operators}
                                                                block={block}
                                                                onMoveBlock={onMoveBlock}
                                                                numberOfBlocks={step.blocks.length}
                                                                onDeleteBlock={onDeleteBlock}
                                                                onDeleteCondition={onDeleteCondition}
                                                                onAddConditionCallBack={onAddConditionCallBack}
                                                                onAddConditionFaileCallBack={
                                                                    onAddConditionFaileCallBack
                                                                }
                                                            />
                                                        }
                                                        showArrow={false}
                                                        key={block.orderNo}
                                                    >
                                                        <div>
                                                            <div style={{ float: 'left' }}>
                                                                <span style={{ fontWeight: 500, color: '#222' }}>
                                                                    THEN
                                                                </span>
                                                            </div>
                                                            <div style={{ paddingLeft: 50 }}>
                                                                <Collapse
                                                                    className="step-then-collapse"
                                                                    activeKey={block.activePanel}
                                                                    bordered={false}
                                                                    style={{ borderRadius: 5, backgroundColor: '#FFF' }}
                                                                >
                                                                    <Panel
                                                                        header={
                                                                            <>
                                                                                {headerBlockContent(
                                                                                    block,
                                                                                    SLOT_TABLE_PANEL
                                                                                )}
                                                                                {translate(
                                                                                    `resources.context_flow.label.slot_condition`
                                                                                )}{' '}
                                                                                ({(block.slotTables || []).length})
                                                                            </>
                                                                        }
                                                                        key={SLOT_TABLE_PANEL}
                                                                        extra={
                                                                            <Button
                                                                                icon={<PlusOutlined />}
                                                                                className="mz-link-btn"
                                                                                onClick={(e: any) =>
                                                                                    onAddSlotTable(e, block.orderNo)
                                                                                }
                                                                            >
                                                                                {translate(`common.button.add`)}
                                                                            </Button>
                                                                        }
                                                                        showArrow={false}
                                                                    >
                                                                        <SlotConditionList
                                                                            slotTables={block.slotTables}
                                                                            onDeleteSlot={onDeleteSlot}
                                                                            onEditSlot={onEditSlot}
                                                                            orderNo={block.orderNo}
                                                                        />
                                                                    </Panel>
                                                                    <Panel
                                                                        header={
                                                                            <>
                                                                                {headerBlockContent(
                                                                                    block,
                                                                                    RESPONSE_PANEL
                                                                                )}
                                                                                {translate(
                                                                                    `resources.context_flow.label.responses`
                                                                                )}{' '}
                                                                                (
                                                                                {(block.replies || []).length +
                                                                                    (block.scripts || []).length}
                                                                                )
                                                                            </>
                                                                        }
                                                                        key={RESPONSE_PANEL}
                                                                        showArrow={false}
                                                                    >
                                                                        <ResponsePanel
                                                                            stepScripts={getStepScripts(block.orderNo)}
                                                                            scripts={block.scripts}
                                                                            replies={block.replies}
                                                                            nextStepId={block.nextStepId}
                                                                            orderNo={block.orderNo}
                                                                            onUpdateBlock={onUpdateBlock}
                                                                            listSteps={listSteps}
                                                                            onAddNewStep={(newStep: Step) =>
                                                                                setListSteps([...listSteps, newStep])
                                                                            }
                                                                        />
                                                                    </Panel>
                                                                    <Panel
                                                                        header={
                                                                            <>
                                                                                {headerBlockContent(
                                                                                    block,
                                                                                    FILL_SLOT_PANEL
                                                                                )}
                                                                                {translate(
                                                                                    `resources.context_flow.label.setting_advanced`
                                                                                )}
                                                                            </>
                                                                        }
                                                                        key={FILL_SLOT_PANEL}
                                                                        showArrow={false}
                                                                    >
                                                                        <Paragraph>
                                                                            {translate(
                                                                                `resources.context_flow.message.setting_advanced`
                                                                            )}
                                                                        </Paragraph>
                                                                        <Select
                                                                            onClick={e => e.stopPropagation()}
                                                                            disabled={block.doNothing}
                                                                            style={{
                                                                                width: '100%',
                                                                            }}
                                                                            mode="tags"
                                                                            placeholder="Choose slot for specify "
                                                                            onChange={e =>
                                                                                onSetSlotFillTos(
                                                                                    e.includes(FILL_ALL_SLOT)
                                                                                        ? FILL_ALL_SLOT
                                                                                        : e,
                                                                                    block.orderNo
                                                                                )
                                                                            }
                                                                            value={
                                                                                !block ||
                                                                                !block.fillToSlots ||
                                                                                block.fillToSlots === ''
                                                                                    ? []
                                                                                    : block.fillToSlots.split(',')
                                                                            }
                                                                        >
                                                                            <Option value={FILL_ALL_SLOT}>All</Option>
                                                                            {resources &&
                                                                                resources.length > 0 &&
                                                                                resources
                                                                                    .filter((re: any) =>
                                                                                        re.startsWith('@')
                                                                                    )
                                                                                    .map((rec: any, index: number) => (
                                                                                        <Option key={index} value={rec}>
                                                                                            {rec}
                                                                                        </Option>
                                                                                    ))}
                                                                        </Select>
                                                                    </Panel>
                                                                </Collapse>
                                                            </div>
                                                        </div>
                                                    </Panel>
                                                </Collapse>
                                                <div style={{ padding: '15px 0px' }}>
                                                    <div style={{ textAlign: 'left', width: 'auto', float: 'left' }}>
                                                        <span className="step-block-or-label">
                                                            {translate(`resources.context_flow.label.or`)}
                                                        </span>
                                                    </div>
                                                    <div style={{ textAlign: 'center', padding: '0px 4px' }}>
                                                        <Button
                                                            onClick={() => addMoreBlock(index + 1)}
                                                            type="dashed"
                                                            size="small"
                                                            icon={<PlusOutlined />}
                                                            style={{
                                                                borderRadius: 2,
                                                                fontSize: 11,
                                                                color: 'rgba(0,0,0,0.35)',
                                                            }}
                                                        >
                                                            {translate(`resources.context_flow.button.add_block`)}
                                                        </Button>
                                                    </div>
                                                </div>
                                            </Fragment>
                                        ))}
                                    {step.blocks.length == 0 && (
                                        <div style={{ textAlign: 'center' }}>
                                            <Button
                                                onClick={() => addMoreBlock(0)}
                                                type="dashed"
                                                size="small"
                                                icon={<PlusOutlined />}
                                                style={{ borderRadius: 2, fontSize: 11, color: 'rgba(0,0,0,0.35)' }}
                                            >
                                                Add Block here...
                                            </Button>
                                        </div>
                                    )}
                                </Col>
                            </Row>

                            <AddSlotForm
                                orderNo={condNo}
                                slotVisible={slotVisible}
                                slotEditing={slotEditing}
                                entities={resources.filter((re: any) => re.startsWith('@'))}
                                onClose={onClose}
                                onFinish={onFinishEditSlotTable}
                                onFinishFailure={onFailureEditSlotTable}
                            />
                        </Spin>
                    </div>
                </Scrollbars>
            </div>
            <div className="step-footer">
                <Button type="primary" onClick={onCreateStep}>
                    {translate(`common.button.save`)}
                </Button>
            </div>
        </div>
    );
};

export default CreateDialogFlowForm;
