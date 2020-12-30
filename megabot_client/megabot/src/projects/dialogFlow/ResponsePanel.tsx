import React, { FC, Fragment, useEffect, useState } from 'react';
import { Button, Col, Drawer, Modal, Row, Tooltip } from 'antd';
import {
    MessageOutlined,
    ArrowRightOutlined,
    IdcardOutlined,
    PlusOutlined,
    FallOutlined,
    InteractionOutlined,
    FunctionOutlined,
} from '@ant-design/icons';
import BotResponse from './BotResponse';
import { BlockReply, BlockScript, Step } from '../../types';
import { uuid } from '../../utils/uuid';
import {
    RESPONSE_TYPE_ACTION_TASK,
    RESPONSE_TYPE_FUNCTION,
    RESPONSE_TYPE_SMARTCARD,
    RESPONSE_TYPE_TEXT,
    STATE_DELETED,
} from '../common/Constants';
import ActionTaskCollapse from './ActionTaskCollapse';
import ActionTaskService from '../service/actionTaskService';
import { useParams } from 'react-router';
import { useDataProvider } from 'ra-core';
interface Props {
    stepScripts: BlockScript[];
    replies: BlockReply[];
    scripts: BlockScript[];
    nextStepId: string;
    listSteps: Step[];
    onAddNewStep: any;
    orderNo: any;
    onUpdateBlock: any;
}
const ResponsePanel: FC<Props> = props => {
    const dataProvider = useDataProvider();
    let { botId } = useParams();
    const [responseVisible, setResponseVisible] = useState(false);
    const [nextStepName, setNextStepName] = useState('');
    const [editAliasVisible, setEditAliasVisible] = useState(false);
    const [editActionAlias, setEditActionAlias] = useState();
    const [actionTasks, setActionTasks] = useState();
    const [blockResponses, setBlockResponse] = useState(
        [...props.scripts, ...props.replies].sort(({ orderNo: pNo }, { orderNo: cNo }) => pNo - cNo)
    );
    const showModal = () => {
        setResponseVisible(true);
    };

    const onCloseResponse = () => {
        setResponseVisible(false);
    };

    const handleUpdateBlock = (replies: any, jumpTo: any, action: any, newCreatedSteps: Step[]) => {
        setResponseVisible(false);
        console.log(replies, action);
        props.onUpdateBlock(props.orderNo, replies, jumpTo, action, newCreatedSteps);
    };

    const handleCancel = (e: any) => {
        setResponseVisible(false);
    };

    // these functions for open edit action's alias
    const openEditAlias = (action: BlockScript) => {
        setEditAliasVisible(true);
        setEditActionAlias(action);
        ActionTaskService.getList(dataProvider, botId, { offset: 0, limit: 1000 })
            .then(({ data }: any) => {
                console.log(data);
                setActionTasks(data.list);
            })
            .catch((error: any) => {
                setActionTasks([]);
            });
    };
    const onChaneActionName = (action: any) => {
        setEditActionAlias({ ...editActionAlias, ...action });
    };
    const modifyOk = () => {
        setEditAliasVisible(false);
    };
    const modifyCancel = () => {
        setEditAliasVisible(false);
    };
    ///
    useEffect(() => {
        if (props.nextStepId && props.nextStepId !== '') {
            props.listSteps.map((step: any) => {
                if (step.id === props.nextStepId) {
                    setNextStepName(step.name);
                }
            });
        }
    }, [props.listSteps, props.nextStepId]);
    // useEffect(() => {
    //     console.log('use effect update response panel');
    //     let temp = [...props.scripts, ...props.replies];
    //     temp.sort((a: any, b: any) => (a.orderNo > b.orderNo ? 1 : b.orderNo > a.orderNo ? -1 : 0));
    //     setBlockResponse(temp);
    // }, [props.replies, props.scripts]);
    return (
        <Fragment>
            <Row
                gutter={16}
                style={{
                    marginLeft: '-1px',
                    marginRight: '-8px',
                    overflowX: 'auto',
                    // width: '400px',
                    display: 'flex',
                    flexWrap: 'nowrap',
                }}
            >
                {blockResponses &&
                    blockResponses.length > 0 &&
                    blockResponses
                        .filter((res: any) => res.state !== STATE_DELETED)
                        .map((resp: any) =>
                            resp.actionType && resp.actionType === RESPONSE_TYPE_ACTION_TASK ? (
                                <Col key={uuid()} flex="115px" style={{ padding: 0 }}>
                                    <Button
                                        key={resp.id}
                                        style={{ height: 95, width: 95, flex: '0 0 auto' }}
                                        onClick={showModal}
                                    >
                                        <InteractionOutlined style={{ fontSize: 24 }} />
                                        <div style={{ marginTop: 5, fontSize: 11 }}>{resp.name}</div>
                                    </Button>
                                    <ArrowRightOutlined style={{ marginLeft: 4 }} />
                                </Col>
                            ) : resp.actionType && resp.actionType === RESPONSE_TYPE_FUNCTION ? (
                                <Col key={uuid()} flex="115px" style={{ padding: 0 }}>
                                    <Button
                                        key={resp.id}
                                        style={{ height: 95, width: 95, flex: '0 0 auto' }}
                                        onClick={showModal}
                                    >
                                        <FunctionOutlined style={{ fontSize: 24 }} />
                                        <div style={{ marginTop: 5, overflowX: 'hidden', fontSize: 11 }}>
                                            {resp.name}
                                        </div>
                                    </Button>
                                    <ArrowRightOutlined style={{ marginLeft: 4 }} />
                                </Col>
                            ) : resp.responseType && resp.responseType === RESPONSE_TYPE_TEXT ? (
                                <Col key={uuid()} flex="115px" style={{ padding: 0 }}>
                                    <Tooltip title={resp.value}>
                                        <Button
                                            key={resp.id}
                                            style={{ height: 95, width: 95, flex: '0 0 auto' }}
                                            onClick={showModal}
                                        >
                                            <MessageOutlined style={{ fontSize: 24 }} />
                                            <div style={{ marginTop: 5, fontSize: 11 }}>Text</div>
                                        </Button>
                                    </Tooltip>
                                    <ArrowRightOutlined style={{ marginLeft: 4 }} />
                                </Col>
                            ) : resp.responseType && resp.responseType === RESPONSE_TYPE_SMARTCARD ? (
                                <Col key={uuid()} flex="115px" style={{ padding: 0 }}>
                                    <Button
                                        key={resp.id}
                                        style={{ height: 95, width: 95, flex: '0 0 auto' }}
                                        onClick={showModal}
                                        title={resp.value}
                                    >
                                        <IdcardOutlined style={{ fontSize: 24 }} title={resp.value} />
                                        <div style={{ marginTop: 5, fontSize: 11 }}>Smart Card</div>
                                    </Button>
                                    <ArrowRightOutlined style={{ marginLeft: 4 }} />
                                </Col>
                            ) : (
                                ''
                            )
                        )}
                <Col flex="93px" style={{ padding: 0 }}>
                    <Button
                        type="dashed"
                        style={{ height: 95, width: 93, flex: '0 0 auto' }}
                        onClick={showModal}
                        title="Add more response"
                    >
                        <PlusOutlined style={{ fontSize: 24, color: '#0078FF' }} />
                    </Button>
                </Col>
                {props.nextStepId && props.nextStepId !== '' && (
                    <Col key={uuid()} flex="115px" style={{ padding: 0 }}>
                        <ArrowRightOutlined style={{ marginLeft: 4 }} />
                        <Button
                            key={uuid()}
                            style={{ height: 95, width: 95, padding: 0, flex: '0 0 auto' }}
                            onClick={showModal}
                            title={nextStepName}
                        >
                            <FallOutlined style={{ fontSize: 24 }} />
                            <div style={{ marginTop: 5, fontSize: 11 }}>
                                Jump to:
                                <p style={{ textAlign: 'center', overflowX: 'hidden' }}>{nextStepName}</p>
                            </div>
                        </Button>
                    </Col>
                )}
            </Row>

            <BotResponse
                stepScripts={props.stepScripts}
                responseVisible={responseVisible}
                blockResponses={blockResponses}
                nextStepId={props.nextStepId}
                onUpdateBlock={handleUpdateBlock}
                handleCancel={handleCancel}
                listSteps={props.listSteps}
            />
            <Modal
                title="Modify Action's Alias"
                visible={editAliasVisible}
                width="550px"
                onOk={modifyOk}
                onCancel={modifyCancel}
            >
                <ActionTaskCollapse
                    stepScripts={props.stepScripts}
                    blockActions={props.scripts}
                    actionEditing={editActionAlias}
                    actionTasks={actionTasks}
                    onChaneActionContent={onChaneActionName}
                />
            </Modal>
        </Fragment>
    );
};

export default ResponsePanel;
