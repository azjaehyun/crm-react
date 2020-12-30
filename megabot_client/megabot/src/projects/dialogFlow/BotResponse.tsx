import React, { FC, useCallback, useEffect, useState, Fragment } from 'react';
import { Button, Collapse, Form, Modal, notification, Popconfirm, Space } from 'antd';
import TextMessageCollapse from './TextMessageCollapse';
import ActionTaskCollapse from './ActionTaskCollapse';
import JumpToCollapse from './JumpToCollapse';
import BotFunctionCollapse from './BotFunctionCollapse';
import RepliesContainer from './RepliesContainer';
import ActionsContainer from './ActionsContainer';
import { uuid } from '../../utils/uuid';
import { BlockReply, BlockScript, Step } from '../../types';
import { useParams } from 'react-router';
import DialogflowService from '../service/dialogflowService';
import {
    RESPONSE_TYPE_JUMPTO,
    STATE_DELETED,
    STEP_TYPE_BUSINESS,
    RESPONSE_TYPE_SMARTCARD,
    RESPONSE_TYPE_TEXT,
    RESPONSE_TYPE_FUNCTION,
    RESPONSE_TYPE_ACTION_TASK,
} from '../common/Constants';
import SmartCardEditor from '../smartcard/SmartCardEditor';
import smartCardDataHelper, { SmartCardData } from '../smartcard/types';
import { useTranslate } from 'ra-core';
import { DeleteOutlined } from '@ant-design/icons';
import { useDataProvider } from 'ra-core';
import ActionTaskService from '../service/actionTaskService';
import RuntimeService, { Script } from '../service/runtimeService';
import {
    ArrowDownOutlined,
    ArrowUpOutlined,
    CreditCardOutlined,
    FunctionOutlined,
    InteractionOutlined,
    MessageOutlined,
} from '@ant-design/icons/lib';
import jsonUtils from '../../utils/jsonUtils';

const { Panel } = Collapse;
interface Props {
    stepScripts: BlockScript[];
    blockResponses: any[];
    nextStepId: string;
    responseVisible: any;
    onUpdateBlock: any;
    handleCancel: any;
    listSteps: Step[];
}
const BotResponse: FC<Props> = props => {
    let { botId } = useParams();
    const dataProvider = useDataProvider();
    const translate = useTranslate();
    const [jumpTo, setJumpTo] = useState();
    const [loading, setLoading] = useState(false);
    const [hasJumpTo, setHasJumpto] = useState(false);
    const [steps, setSteps] = useState([] as any);
    const [newCreatedSteps, setNewScreatedStep] = useState<Step[]>([]);
    const [actionTasks, setActionTasks] = useState([]);
    const [response, setResponse] = useState([...props.blockResponses]);
    const [deletedResponses, setDeletedResponses] = useState([] as any);
    // using for mentions
    const [runtimeVariables, setRuntimeVariables] = useState<Array<string>>([]);
    const [scriptPropertyPaths, setScriptPropertyPaths] = useState<Array<string>>([]);
    const [scriptPropertyArrayPaths, setScriptPropertyArrayPaths] = useState<Array<string>>([]);

    /**
     * Load actions tasks to adding to block
     */
    const loadActionTasks = useCallback(() => {
        ActionTaskService.getList(dataProvider, botId, { offset: 0, limit: 1000 })
            .then(({ data }: any) => {
                console.log(data);
                setActionTasks(data.list);
            })
            .catch((error: any) => {
                setActionTasks([]);
            });
    }, [botId, dataProvider]);

    /**
     * Load entities & intents to binding to Mentions
     */
    const loadRuntimeVariable = useCallback(async () => {
        RuntimeService.getBotResource(dataProvider, botId)
            .then(({ data }: any) => {
                setRuntimeVariables(data);
            })
            .catch((error: any) => {
                console.log(error);
                setRuntimeVariables([]);
            });
    }, [botId, dataProvider]);

    /**
     * Load action tasks to binding to Mentions
     * This is combine of runtime scripts and new script (not saved)
     */
    const loadRuntimeActionScripts = useCallback(async () => {
        RuntimeService.getScripts(dataProvider, botId as string)
            .then(({ data }: any) => {
                try {
                    let pathList = RuntimeService.getPropertyFromScripList(data);
                    setScriptPropertyPaths(pathList);
                    setScriptPropertyArrayPaths(jsonUtils.filterArrayPath(pathList));
                } catch (e) {
                    console.log(e);
                }
            })
            .catch((error: any) => {
                console.log(error);
                setScriptPropertyPaths([]);
                setScriptPropertyArrayPaths([]);
            });
    }, [botId, dataProvider]);

    const addNewItemReply = (item: any) => {
        switch (item.type) {
            case RESPONSE_TYPE_TEXT:
                let text: BlockReply = {
                    value: '',
                    jsonValue: {},
                    orderNo: response.length,
                    uuid: uuid(),
                    responseType: item.type,
                    state: 'ACTIVE',
                };
                setResponse([...response, text]);
                break;
            case RESPONSE_TYPE_SMARTCARD:
                let smc: BlockReply = {
                    value: '',
                    jsonValue: { ...smartCardDataHelper.getDummyData(item.templateCode) },
                    orderNo: response.length,
                    uuid: uuid(),
                    responseType: item.type,
                    state: 'ACTIVE',
                };
                setResponse([...response, smc]);
                break;
            case RESPONSE_TYPE_JUMPTO:
                setHasJumpto(true);
                break;
            case RESPONSE_TYPE_FUNCTION:
                let script: BlockScript = {
                    uuid: uuid(),
                    actionType: RESPONSE_TYPE_FUNCTION,
                    name: '',
                    parameters: {},
                    scriptCodes: '',
                    state: '',
                    orderNo: response.length,
                };
                setResponse([...response, script]);
                break;
            case RESPONSE_TYPE_ACTION_TASK:
                let action: BlockScript = {
                    uuid: uuid(),
                    actionType: RESPONSE_TYPE_ACTION_TASK,
                    name: '',
                    parameters: {},
                    scriptCodes: '',
                    state: '',
                    isValid: false,
                    orderNo: response.length,
                };
                setResponse([...response, action]);
                break;
            default:
                console.log('Response type is invalid');
        }
    };

    const onChaneActionContent = (current: BlockScript, actionScript: BlockScript) => {
        console.log(current, actionScript);
        // if (current.id !== actionScript.id && current.uuid !== actionScript.uuid) {
        //     return;
        // }
        if (current.id && current.id > 0) {
            setResponse(
                response.map((res: any) =>
                    res.id === current.id && res.actionType === current.actionType ? actionScript : res
                )
            );
        } else {
            setResponse(response.map(sc => (sc.uuid === current.uuid ? actionScript : sc)));
        }
    };
    const smartCardDataChange = (reply: any, data: SmartCardData) => {
        const scData = { ...data };
        scData.templateCode = reply.jsonValue.templateCode;
        if (reply.id > 0) {
            setResponse(
                response.map((re: any) =>
                    re.id === reply.id && re.responseType === reply.responseType ? { ...re, jsonValue: scData } : re
                )
            );
        } else {
            setResponse(response.map((re: any) => (re.uuid === reply.uuid ? { ...re, jsonValue: scData } : re)));
        }
    };

    const setTextValue = (repEditing: BlockReply, textValue: any) => {
        // console.log('setTextValue', textValue);
        if (repEditing.id && repEditing.id > 0) {
            setResponse(
                response.map((res: any) =>
                    res.id == repEditing.id && res.responseType === repEditing.responseType
                        ? { ...res, value: textValue }
                        : res
                )
            );
        } else {
            setResponse(response.map((res: any) => (res.uuid == repEditing.uuid ? { ...res, value: textValue } : res)));
        }
    };

    const onMoveToStep = (step: any) => {
        if (step.id && step.id !== '') {
            setJumpTo(step.id);
        } else {
            let newStep: Step = {
                allowTriggerGlobalStep: true,
                blocks: [],
                connectors: [],
                description: '',
                id: '',
                servicebot: { alias: '', botId: '', showWelcomeMessage: false, turnOnDefaultReply: false },
                state: '',
                name: step.name,
                stepType: STEP_TYPE_BUSINESS,
            };
            DialogflowService.createNew(dataProvider, botId, newStep)
                .then((response: any) => {
                    if (response.status === 200) {
                        const data = response.data;
                        setSteps([...steps, data]);
                        setJumpTo(data.id);
                        setHasJumpto(true);
                        setNewScreatedStep([...newCreatedSteps, data]);
                    }
                })
                .catch((error: any) => {});
        }
    };
    const onDeleteJumpTo = () => {
        setHasJumpto(false);
        setJumpTo('');
    };

    const onDeleteResponse = (actDel: any) => {
        if (actDel.id && actDel.id != 0) {
            // if (isAction(actDel)) {
            //     setResponse(
            //         response.filter((res: any) => !(res.id === actDel.id && res.actionType === actDel.actionType))
            //     );
            // } else {
            //     setResponse(
            //         response.filter((res: any) => !(res.id === actDel.id && res.responseType === actDel.responseType))
            //     );
            // }
            let temp = response.map((res: any) => (res.id === actDel.id ? { ...res, state: STATE_DELETED } : res));
            setResponse(temp.filter((res: any) => res.state !== STATE_DELETED));
            let objDeleted = { ...actDel, state: STATE_DELETED };
            setDeletedResponses([...deletedResponses, objDeleted]);
        } else {
            setResponse(response.filter((scr: any) => scr.uuid !== actDel.uuid));
        }
    };
    const onOK = () => {
        const filterInvalid = response.filter(
            (act: any) => act.actionType === RESPONSE_TYPE_ACTION_TASK && (act.name === '' || !act.isValid)
        );
        if (filterInvalid.length > 0) {
            notification['error']({
                message: 'Error',
                description: 'Please resolve invalid action',
            });
            return;
        }
        let tempResponses = [...response];
        tempResponses.map((resp: any, ind: number) => {
            resp.orderNo = ind;
        });

        let scripts = tempResponses.filter((resp: any) => isAction(resp));
        let replies = tempResponses.filter((rep: any) => isReply(rep));
        if (deletedResponses.length > 0) {
            deletedResponses.map((res: any) => {
                if (isAction(res)) {
                    scripts.push(res);
                } else if (isReply(res)) {
                    replies.push(res);
                }
            });
        }
        console.log(tempResponses, replies, scripts);
        props.onUpdateBlock(replies, jumpTo, scripts, newCreatedSteps);
    };

    const isAction = (resp: any) => {
        return (
            resp.actionType &&
            (resp.actionType === RESPONSE_TYPE_ACTION_TASK || resp.actionType === RESPONSE_TYPE_FUNCTION)
        );
    };

    const isReply = (rep: any) => {
        return (
            rep.responseType &&
            (rep.responseType === RESPONSE_TYPE_TEXT || rep.responseType === RESPONSE_TYPE_SMARTCARD)
        );
    };
    const onMoveAction = (respOrder: number, delta: number, e: any) => {
        // e.stopPropagation();
        console.log('Move block order: ', respOrder, '  to ', delta, '-1: up, 1: down');
        // delta = -1 -> go up; delta = 1 -> go down
        let tempBlock = response;
        const newIndex = respOrder + delta;
        if (newIndex < 0 || newIndex == response.length) return; //Already at the top or bottom.
        const indexes = [respOrder, newIndex].sort((a, b) => a - b); //Sort the indixes (fixed)
        tempBlock.splice(indexes[0], 2, tempBlock[indexes[1]], tempBlock[indexes[0]]); //Replace from lowest index, two elements, reverting the order
        tempBlock.map((block, idx) => (block.orderNo = idx));
        console.log(tempBlock);
        setResponse([...tempBlock]);
    };

    useEffect(() => {
        if (props.responseVisible) {
            setDeletedResponses(props.blockResponses.filter((res: any) => res.state === STATE_DELETED));
            let tmpResponse = props.blockResponses.filter((res: any) => res.state !== STATE_DELETED);
            // add isValid field for checking action's state before save
            // oldName for checking duplicate action's Alias
            tmpResponse.map(
                (br: any) =>
                    br.actionType &&
                    br.actionType === RESPONSE_TYPE_ACTION_TASK &&
                    ((br.isValid = true), (br.oldName = br.name))
            );
            setResponse(tmpResponse);
        }
    }, [props.blockResponses, props.responseVisible]);
    useEffect(() => {
        if (props.responseVisible) {
            loadRuntimeVariable().then();
            loadRuntimeActionScripts().then();
            setSteps(props.listSteps);
            if (actionTasks.length == 0) {
                loadActionTasks();
            }
            if (props.nextStepId && props.nextStepId !== '') {
                setHasJumpto(true);
                setJumpTo(props.nextStepId);
            }
        }
    }, [
        actionTasks.length,
        loadActionTasks,
        loadRuntimeActionScripts,
        loadRuntimeVariable,
        props.listSteps,
        props.nextStepId,
        props.responseVisible,
    ]);

    const respHeader = (res: any, ind: number) => (
        <div>
            <Space size={'small'}>
                {res.actionType && res.actionType === RESPONSE_TYPE_FUNCTION ? (
                    <>
                        <FunctionOutlined /> BOT FUNCTION
                    </>
                ) : res.actionType && res.actionType === RESPONSE_TYPE_ACTION_TASK ? (
                    <>
                        <InteractionOutlined /> ACTION TASK
                    </>
                ) : res.responseType && res.responseType === RESPONSE_TYPE_TEXT ? (
                    <>
                        <MessageOutlined /> MESSAGE TEXT
                    </>
                ) : res.responseType && res.responseType === RESPONSE_TYPE_SMARTCARD ? (
                    <>
                        <CreditCardOutlined /> SMART CARD
                    </>
                ) : (
                    ''
                )}
            </Space>
            <div style={{ position: 'absolute', top: 4, right: 8 }}>
                {ind}
                {ind > 0 && (
                    <ArrowUpOutlined
                        className="edit-btn"
                        title="Move Up"
                        style={{ padding: '0px 8px 0px 0px' }}
                        onClick={e => onMoveAction(ind, -1, e)}
                    />
                )}
                {ind < response.length - 1 && (
                    <ArrowDownOutlined
                        className="edit-btn"
                        title="Move Down"
                        style={{ padding: '0px 8px 0px 0px' }}
                        onClick={e => onMoveAction(ind, +1, e)}
                    />
                )}
                <Popconfirm
                    placement="left"
                    title={'Do you want to delete this item'}
                    onConfirm={e => onDeleteResponse(res)}
                    okText={translate(`common.button.yes`)}
                    onCancel={(event: any) => event.stopPropagation()}
                    cancelText={translate(`common.button.no`)}
                >
                    <DeleteOutlined
                        className="trash-btn"
                        title="Delete this reply"
                        onClick={event => {
                            // If you don't want click extra trigger collapse, you can prevent this:
                            event.stopPropagation();
                        }}
                    />
                </Popconfirm>
            </div>
        </div>
    );
    return (
        <Modal
            className="bot-responses-modal"
            title="Bot Responses"
            visible={props.responseVisible}
            onOk={onOK}
            onCancel={props.handleCancel}
            style={{ position: 'absolute', right: 25 }}
            width={700}
            bodyStyle={{ height: window.innerHeight - 230 + 'px' }}
        >
            <div className="main-body">
                <div className="response-list-col" style={{ width: '200px' }}>
                    <div className="response-list">
                        <RepliesContainer addNewItemReply={addNewItemReply} />
                        <ActionsContainer addNewItem={addNewItemReply} />
                    </div>
                </div>
                <div className="response-edit-col">
                    <div className="response-edit-body">
                        {response.length > 0 &&
                            response
                                .sort(({ orderNo: pNo }, { orderNo: cNo }) => pNo - cNo)
                                .map((resp: any, ind: number) => (
                                    <Collapse
                                        key={`res${ind}`}
                                        activeKey={[ind]}
                                        expandIconPosition="left"
                                        className="step-bot-response-collapse"
                                    >
                                        <Panel
                                            className={
                                                resp.responseType && resp.responseType === RESPONSE_TYPE_TEXT
                                                    ? 'message_text_panel'
                                                    : resp.responseType === RESPONSE_TYPE_FUNCTION
                                                    ? 'bot_function_panel'
                                                    : ''
                                            }
                                            key={ind}
                                            header={respHeader(resp, ind)}
                                        >
                                            {resp.actionType && resp.actionType === RESPONSE_TYPE_FUNCTION ? (
                                                <BotFunctionCollapse
                                                    functionEditing={resp}
                                                    onChaneActionContent={(botFunction: any) =>
                                                        onChaneActionContent(resp, botFunction)
                                                    }
                                                />
                                            ) : resp.actionType && resp.actionType === RESPONSE_TYPE_ACTION_TASK ? (
                                                <ActionTaskCollapse
                                                    stepScripts={props.stepScripts}
                                                    blockActions={response.filter(
                                                        (resp: any) =>
                                                            resp.actionType &&
                                                            resp.actionType === RESPONSE_TYPE_ACTION_TASK
                                                    )}
                                                    actionEditing={resp}
                                                    actionTasks={actionTasks}
                                                    onChaneActionContent={(actionScript: BlockScript) =>
                                                        onChaneActionContent(resp, actionScript)
                                                    }
                                                />
                                            ) : resp.responseType && resp.responseType === RESPONSE_TYPE_TEXT ? (
                                                <TextMessageCollapse
                                                    key={uuid()}
                                                    // onDeleteReply={onDeleteTextReply}
                                                    res={resp}
                                                    setValue={setTextValue}
                                                    entities={runtimeVariables.filter(v => v.startsWith('@'))}
                                                    itents={runtimeVariables.filter(v => v.startsWith('#'))}
                                                    scripts={scriptPropertyPaths}
                                                />
                                            ) : resp.responseType && resp.responseType === RESPONSE_TYPE_SMARTCARD ? (
                                                <SmartCardEditor
                                                    templateCode={resp.jsonValue ? resp.jsonValue.templateCode : ''}
                                                    scData={resp.jsonValue}
                                                    onChange={data => smartCardDataChange(resp, data)}
                                                    inlineEdit={false}
                                                />
                                            ) : (
                                                ''
                                            )}
                                        </Panel>
                                    </Collapse>
                                ))}
                        {hasJumpTo && (
                            <JumpToCollapse
                                steps={steps}
                                jumpTo={jumpTo}
                                onMoveToStep={onMoveToStep}
                                onDeleteJumpTo={onDeleteJumpTo}
                            />
                        )}
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default BotResponse;
