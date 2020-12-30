import React, { FC, useCallback, useState } from 'react';
import { useDataProvider, useTranslate } from 'react-admin';
import { Button, Col, Drawer, notification, Space, Switch, Upload } from 'antd';
import ReactFlow, { MiniMap, Controls, Background, isNode, BackgroundVariant, Node } from 'react-flow-renderer';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';

import CreateDialogFlowForm from './CreateDialogFlowForm';

import '../scss/ReactFlow.scss';
import { DownloadOutlined, FullscreenOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons/lib';
import { API_ERROR_MESSAGES, PrimaryColor, STEP_TYPE_GLOBAL } from '../common/Constants';
import StepNode from './reactFlow/StepNode';
import { Step } from '../../types';
import DialogflowService from '../service/dialogflowService';
import moment from 'moment';
import SaveFile from '../common/SaveFile';
interface Props {
    botId: any;
    steps: any;
    onDeleteStep: (step: Step) => void;
    onChange: () => void;
}

interface StepNode {
    name: string;
    fullName: string;
    color: string;
}

const STEP_TYPES: any = {
    START: {
        name: 'START',
        fullName: 'Start Step',
        color: '#52c41a',
    },
    BUSINESS: {
        name: 'BUSINESS',
        fullName: 'Business Step',
        color: '#1890ff',
    },
    GLOBAL: {
        name: 'GLOBAL',
        fullName: 'Global Step',
        color: '#faad14',
    },
    END: {
        name: 'END',
        fullName: 'End step',
        color: '#ffccc7',
    },
};

const DEFAULT_NODE_COLOR = '#eee';

const nodeTypes = {
    step: StepNode,
};

const DialogFlow: FC<Props> = props => {
    const dataProvider = useDataProvider();
    const translate = useTranslate();

    const flowScreen = useFullScreenHandle();
    const [loading, setLoading] = useState(false);
    const [editStepId, setEditStepId] = useState('');
    const [visible, setVisible] = useState(false);
    const [properties, setProperties] = useState(true);
    const showDrawer = useCallback((stepId: string) => {
        console.log('show drawer for edit stepID: ', stepId);
        setEditStepId(stepId);
        setVisible(true);
    }, []);

    const onClose = () => {
        setVisible(false);
    };

    const onChange = (evt: any) => {
        console.log('DialogFlow.tsx -> onChange -> event', evt);
    };

    const onSaved = () => {
        setVisible(false);
        props.onChange();
    };

    const renderChartNodes = (stepList: Array<any>) => {
        let arr: Array<any> = [];
        let connectors: Array<any> = [];

        try {
            (stepList || []).forEach((step: any) => {
                let item = {
                    id: step.id,
                    type: 'step', //step.stepType,
                    stepType: step.stepType,
                    data: {
                        step: step,
                        onChange: onChange,
                        onEditClick: (step: Step) => showDrawer(step.id),
                        onDeleteClick: (step: Step) => props.onDeleteStep(step),
                    },
                    sourcePosition: 'right',
                    targetPosition: 'left',
                    position: { x: step.x, y: step.y },
                    className: 'react-flow__node-step-' + step.stepType.toLowerCase(),
                };
                (step.blocks || []).forEach((block: any, idx: number) => {
                    if (block.nextStepId) {
                        let conn = {
                            id: 'con-' + step.id + '-' + block.id + '-' + block.nextStepId,
                            source: step.id + '__' + block.id,
                            target: block.nextStepId,
                            // label: 'Block ' + (block.orderNo + 1),
                            arrowHeadType: 'arrowclosed', // 'arrow' or 'arrowclosed'
                            //style: { stroke: 'red' }, // connector color
                            type: 'bezier', // bezier, straight, step, smoothstep
                            labelBgPadding: [8, 0],
                            labelBgBorderRadius: 6,
                            labelBgStyle: { fill: 'rgba(0,0,0,0.15)', color: 'rgba(0,0,0,0.15)' },
                            labelStyle: { fill: 'rgba(0,0,0,0.65)' },
                            animated: false,
                        };
                        connectors.push(conn);
                    }
                });
                arr.push(item);
            });
        } catch (e) {
            console.log(e);
        }
        return [...arr, ...connectors];
    };

    const nodes = renderChartNodes(props.steps);
    console.log('nodes', nodes);

    // control dialog flow
    const onNodeDragStart = (event: MouseEvent, node: Node) => console.log('drag start', node);
    const onNodeDragStop = (event: MouseEvent, node: Node) => {
        console.log('drag stop', node);
        const stepId = node.id;
        const position = node.position;
        dataProvider.update(`step/${props.botId}/updateStepCoordinate`, { id: stepId, data: position });
    };
    const onElementClick = (element: any) => console.log(`${isNode(element) ? 'node' : 'edge'} click:`, element);
    const onSelectionChange = (elements: any) => {
        console.log('selection change', elements);
        setVisible(false);
    };
    const onLoad = (reactFlowInstance: any) => {
        console.log('flow loaded:', reactFlowInstance);
        reactFlowInstance.fitView();
    };

    const onConnectStart = (event: any, { nodeId, handleType }: any) => {
        console.log('on connect start', { nodeId, handleType });
    };
    const onConnectStop = (event: any) => console.log('on connect stop', event);

    const showProperties = (checked: boolean) => {
        setProperties(checked);
    };

    const handleImportStepsJson = (file: any) => {
        const isJpgOrPng = file.type === 'json';
        if (!isJpgOrPng) {
            console.log('You can only upload JSON file!');
            // return isJpgOrPng;
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            console.log('Image must smaller than 2MB!');
            // return isLt2M;
        }
        setLoading(true);
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = (e: any) => {
            DialogflowService.importJson(dataProvider, props.botId, JSON.parse(e.target.result))
                .then((resp: any) => {
                    setLoading(false);
                    if (resp.status === 200) {
                        notification['success']({
                            message: 'Success',
                            description: `Import steps successful!`,
                        });
                    } else {
                        const message = resp.data ? resp.data.message : API_ERROR_MESSAGES[resp.status];
                        notification['error']({
                            message: 'Error',
                            description: message,
                        });
                    }
                })
                .catch((error: any) => {});
        };
        return isJpgOrPng && isLt2M;
    };

    const handleExportStepsJson = () => {
        setLoading(true);
        DialogflowService.exportJson(dataProvider, props.botId)
            .then((resp: any) => {
                setLoading(false);
                if (resp.status === 200) {
                    const fileName = 'scenario_' + moment() + '.json';
                    SaveFile.saveJson(resp.data, fileName);
                }
            })
            .catch((error: any) => {});
    };

    return (
        <div className="dialog-flow-container">
            <FullScreen handle={flowScreen}>
                <ReactFlow
                    elements={nodes}
                    nodeTypes={nodeTypes}
                    nodesConnectable={true}
                    onConnect={params => console.log('handle onConnect', params)}
                    onConnectStart={onConnectStart}
                    onConnectStop={onConnectStop}
                    onNodeDragStart={(event: any, node: any) => onNodeDragStart(event, node)}
                    onNodeDragStop={(event: any, node: any) => onNodeDragStop(event, node)}
                    onSelectionChange={onSelectionChange}
                    onElementClick={onElementClick}
                    onLoad={onLoad}
                    snapToGrid={true}
                    className="mz-react-flow"
                >
                    <MiniMap
                        style={{ position: 'absolute', left: 130, bottom: 10 }}
                        nodeColor={node => {
                            const type = STEP_TYPES[node.data.step.stepType];
                            return type ? type.color : DEFAULT_NODE_COLOR;
                        }}
                    />
                    <Controls />
                    <Background color="rgba(0, 0, 0, 0.25)" gap={16} variant={BackgroundVariant.Dots} />
                    {/*<div style={{ position: 'absolute', right: 16, top: 10, zIndex: 4 }}>*/}
                    <div style={{ position: 'absolute', left: 45, top: 9, zIndex: 4 }}>
                        <Space>
                            {/*<Button icon={<FullscreenOutlined />} onClick={flowScreen.enter} />*/}
                            <Button
                                icon={<PlusOutlined style={{ color: PrimaryColor }} />}
                                onClick={e => showDrawer('')}
                            >
                                {translate(`resources.context_flow.button.create`)}
                            </Button>
                        </Space>

                        <Upload name="mrcFile" showUploadList={false} beforeUpload={handleImportStepsJson}>
                            <Button icon={<UploadOutlined />} className="mz-link-btn">
                                {translate(`common.button.import`)}
                            </Button>
                        </Upload>
                        <Button
                            loading={loading}
                            icon={<DownloadOutlined />}
                            className="mz-link-btn"
                            onClick={handleExportStepsJson}
                        >
                            {translate(`common.button.export`)}
                        </Button>
                    </div>
                    <div className="react-flow__legend">
                        {Object.keys(STEP_TYPES).map((key: any) => (
                            <div className="react-flow__legend-item" key={key}>
                                <span
                                    className="react-flow__legend-item-color"
                                    style={{ backgroundColor: STEP_TYPES[key].color }}
                                />
                                <span className="react-flow__legend-item-name">{STEP_TYPES[key].fullName}</span>
                            </div>
                        ))}
                    </div>
                    <div style={{ position: 'absolute', right: 0, padding: 5, zIndex: 9 }}>
                        <span style={{ color: '#B4B4B4' }}>{translate(`common.switch.disable`)}</span>
                        <Switch defaultChecked style={{ margin: '0 5px' }} onChange={showProperties} />
                        <span>{translate(`common.switch.enable`)}</span>
                    </div>
                    {properties && visible ? (
                        <CreateDialogFlowForm stepId={editStepId} onSaved={onSaved} visible={visible} />
                    ) : (
                        ''
                    )}
                </ReactFlow>
            </FullScreen>

            {/*<Drawer*/}
            {/*    destroyOnClose={true}*/}
            {/*    className="create-dialog-drawer"*/}
            {/*    title="Create Step"*/}
            {/*    placement="right"*/}
            {/*    maskClosable={false}*/}
            {/*    keyboard={false}*/}
            {/*    onClose={onClose}*/}
            {/*    visible={visible}*/}
            {/*    width="680px"*/}
            {/*    height="500px"*/}
            {/*    // footer={*/}
            {/*    //     <div style={{ textAlign: 'right' }}>*/}
            {/*    //         <Button onClick={onClose} style={{ marginRight: 8 }}>*/}
            {/*    //             Cancel*/}
            {/*    //         </Button>*/}
            {/*    //         <Button onClick={onClose} type="primary">*/}
            {/*    //             Done*/}
            {/*    //         </Button>*/}
            {/*    //     </div>*/}
            {/*    // }*/}
            {/*>*/}
            {/*    <CreateDialogFlowForm stepId={editStepId} onSaved={onSaved} />*/}
            {/*</Drawer>*/}
        </div>
    );
};

export default DialogFlow;
