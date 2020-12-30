import React, { FC, useEffect, useState, Fragment } from 'react';
import { Button, Col, Input, Popconfirm, Popover, Row, Space, Tag, Tooltip } from 'antd';
import AddConditionForm from './AddConditionForm';
import AddScriptForm from './AddScriptForm';
import {
    ArrowsAltOutlined,
    PlusOutlined,
    DeleteOutlined,
    DownOutlined,
    RightOutlined,
    VerticalAlignBottomOutlined,
    VerticalAlignTopOutlined,
} from '@ant-design/icons';
import { BlockCondReply, Condition } from '../../types';
import { useTranslate } from 'ra-core';
import { uuid } from '../../utils/uuid';
import { STATE_DELETED } from '../common/Constants';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons/lib';

interface Props {
    activePanel: any;
    isActive: Boolean;
    block: BlockCondReply;
    onDeleteBlock: any;
    onDeleteCondition: any;
    operators: any;
    resources: any;
    onAddConditionCallBack: any;
    onAddConditionFaileCallBack: any;
    onMoveBlock: any;
    numberOfBlocks: number;
}
const BlockHeaderCondition: FC<Props> = props => {
    const translate = useTranslate();
    const block = props.block;
    const [orderNo, setOrderNo] = useState();
    const [popoverVisible, setPopoverVisible] = useState(false);
    const [scriptPopoverVisible, setScriptPopoverVisible] = useState(false);

    const [scriptEditing, setScriptEditting] = useState();
    const [editScriptPopoverVisible, setEditScriptPopoverVisible] = useState(false);

    const getPopupForm = (fullScript: boolean) => {
        if (fullScript) {
            return <AddScriptForm scriptEditing={scriptEditing} onFinish={onAddConditionCallBack} />;
        } else {
            return (
                <AddConditionForm
                    condEditing={scriptEditing}
                    operators={props.operators}
                    resources={props.resources}
                    onFinish={onAddConditionCallBack}
                    onFinishFailed={props.onAddConditionFaileCallBack}
                />
            );
        }
    };
    const openEditScript = (cond: Condition, e: any, orderNo: any) => {
        setEditScriptPopoverVisible(true);
        console.log(cond);
        setScriptEditting(cond);
        setOrderNo(orderNo);
        e.stopPropagation();
    };
    const openAddScript = (e: any, orderNo: any) => {
        console.log('--Open popup to add script condition at block: ', orderNo);
        setScriptPopoverVisible(true);
        setOrderNo(orderNo);
        e.stopPropagation();
    };
    const onAddCondition = (e: any, orderNo: any) => {
        console.log('--Open popup to add condition at block', orderNo);
        setPopoverVisible(true);
        setOrderNo(orderNo);
        e.stopPropagation();
    };

    const handleEditVisibleChange = (popoverVisible: boolean) => {
        console.log('------handle edit visible change: ', popoverVisible);
        setEditScriptPopoverVisible(popoverVisible);
    };
    const handleVisibleChange = (popoverVisible: boolean) => {
        console.log('------handle visible change: ', popoverVisible);
        setPopoverVisible(popoverVisible);
    };
    const scriptHandleVisibleChange = (scriptPopoverVisible: boolean) => {
        setScriptPopoverVisible(scriptPopoverVisible);
    };
    const onAddConditionCallBack = (condition: any) => {
        console.log('call back forL ', orderNo);
        props.onAddConditionCallBack(condition, orderNo);
        setPopoverVisible(false);
        setScriptPopoverVisible(false);
    };

    const onMoveUp = () => {
        props.onMoveBlock(props.block.orderNo, -1);
    };

    const onMoveDown = () => {
        props.onMoveBlock(props.block.orderNo, 1);
    };
    return (
        <div>
            <div style={{ float: 'left', paddingTop: 4 }}>
                {props.isActive ? (
                    <DownOutlined
                        title="Expand"
                        style={{ padding: '0px 10px 0px 0px' }}
                        onClick={() => props.activePanel(props.block.orderNo)}
                    />
                ) : (
                    <RightOutlined
                        title="Collapse"
                        style={{ padding: '0px 10px 0px 0px' }}
                        onClick={() => {
                            props.activePanel(props.block.orderNo);
                        }}
                    />
                )}
                <span style={{ fontWeight: 500, color: '#222' }}>IF</span>
            </div>
            <div style={{ marginLeft: 50, position: 'relative' }}>
                {block.conditions &&
                    block.conditions.length > 0 &&
                    block.conditions
                        .filter(cond => cond.state !== STATE_DELETED)
                        .map((cond: any, ci: number) => (
                            <Fragment key={uuid()}>
                                {ci > 0 && (
                                    <span className="and_label" style={{}}>
                                        AND
                                    </span>
                                )}
                                <Popover
                                    placement="bottom"
                                    content={getPopupForm(cond.fullScript)}
                                    trigger="click"
                                    visible={
                                        editScriptPopoverVisible &&
                                        ((scriptEditing.id > 0 && scriptEditing.id === cond.id) ||
                                            (scriptEditing.uuid !== undefined && scriptEditing.uuid === cond.uuid))
                                    }
                                    onVisibleChange={handleEditVisibleChange}
                                >
                                    <Tag
                                        key={uuid()}
                                        icon={
                                            <DeleteOutlined
                                                title="Delete this condition"
                                                onClick={e => {
                                                    props.onDeleteCondition(cond, block.orderNo);
                                                    e.stopPropagation();
                                                }}
                                                className="trash-btn"
                                            />
                                        }
                                        className="step_if_tag"
                                        onClick={e => openEditScript(cond, e, block.orderNo)}
                                    >
                                        {/*{cond.uuid}----{scriptEditing ? scriptEditing.uuid : 'ko'}*/}
                                        {cond.fullScript
                                            ? cond.value
                                            : cond.variable
                                                  .concat(' ')
                                                  .concat(cond.expression)
                                                  .concat(' ')
                                                  .concat(cond.value)}
                                    </Tag>
                                </Popover>
                            </Fragment>
                        ))}
                <Popover
                    placement="bottom"
                    content={
                        <AddConditionForm
                            operators={props.operators}
                            resources={props.resources}
                            onFinish={onAddConditionCallBack}
                            onFinishFailed={props.onAddConditionFaileCallBack}
                        />
                    }
                    trigger="click"
                    visible={popoverVisible && block.orderNo == orderNo}
                    onVisibleChange={handleVisibleChange}
                >
                    <Button
                        title="Add new a condition"
                        className="step_add_cond_btn"
                        icon={<PlusOutlined onClick={e => onAddCondition(e, block.orderNo)} />}
                    />
                </Popover>
                {block.conditions && block.conditions.filter(cond => cond.state !== STATE_DELETED).length <= 0 && (
                    <Popover
                        placement="bottom"
                        content={<AddScriptForm onFinish={onAddConditionCallBack} />}
                        trigger="click"
                        visible={scriptPopoverVisible && block.orderNo == orderNo}
                        onVisibleChange={scriptHandleVisibleChange}
                    >
                        <Button
                            title="Add script condition"
                            className="step_add_cond_btn"
                            icon={<ArrowsAltOutlined />}
                            onClick={e => openAddScript(e, block.orderNo)}
                        />
                    </Popover>
                )}

                <div style={{ position: 'absolute', top: 4, right: -25 }}>
                    <Space size={'small'}>
                        {props.block.orderNo > 0 && (
                            <Tooltip title="Move Up">
                                <ArrowUpOutlined className="edit-btn" onClick={onMoveUp} />
                            </Tooltip>
                        )}
                        {props.block.orderNo < props.numberOfBlocks - 1 && (
                            <Tooltip title="Move Down">
                                <ArrowDownOutlined className="edit-btn" onClick={onMoveDown} />
                            </Tooltip>
                        )}

                        <Popconfirm
                            placement="left"
                            // title={translate(`resources.dialogflow.message.delete_block_confirm`)}
                            title={'Do you want to delete this block'}
                            onConfirm={e => props.onDeleteBlock(e, block)}
                            okText={translate(`common.button.yes`)}
                            onCancel={(event: any) => event.stopPropagation()}
                            cancelText={translate(`common.button.no`)}
                        >
                            <DeleteOutlined
                                className="trash-btn"
                                title="Delete this block"
                                onClick={event => {
                                    // If you don't want click extra trigger collapse, you can prevent this:
                                    event.stopPropagation();
                                }}
                            />
                        </Popconfirm>
                    </Space>
                </div>
            </div>
        </div>
    );
};
export default BlockHeaderCondition;
