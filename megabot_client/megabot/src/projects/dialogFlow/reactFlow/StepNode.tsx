import React, { memo } from 'react';

import { Handle, Position } from 'react-flow-renderer';
import { Step } from '../../../types';
import { DeleteOutlined, EditOutlined, FrownOutlined } from '@ant-design/icons/lib';
import { IconText } from '../../common/IconText';
import { Popconfirm, Space } from 'antd';
import { useTranslate } from 'ra-core';

interface StepNodeData {
    step: Step;
    onChange: () => void;
    onEditClick: (step: Step) => void;
    onDeleteClick: (step: Step) => void;
}

interface Props {
    data: StepNodeData;
}

const isValidConnection = (connection: any) => connection.target.indexOf('__') === -1;

export default memo(({ data }: Props) => {
    const translate = useTranslate();
    return (
        <>
            <div className="react-flow__node-step-header">
                <span className="react-flow__node-step-header-title">{data.step.name}</span>
                <Handle type="target" position={Position.Left} isValidConnection={isValidConnection} />
            </div>
            <div className="react-flow__node-step-body">
                {(data.step.blocks || []).map((block: any, index) => (
                    <div className="react-flow__node-step-block" key={block.id}>
                        <span>Block {block.orderNo + 1}</span>
                        <Handle
                            key={block.id}
                            type="source"
                            position={Position.Right}
                            id={block.id}
                            isValidConnection={isValidConnection}
                        />
                    </div>
                ))}

                {(data.step.blocks || []).length == 0 && (
                    <div className="react-flow__node-step-block">
                        <IconText text="Empty" icon={<FrownOutlined />} />
                    </div>
                )}
            </div>
            <div className="react-flow__node-step-action">
                <Space>
                    <EditOutlined
                        className="edit-btn"
                        title="Edit this step"
                        onClick={e => data.onEditClick(data.step)}
                    />
                    <Popconfirm
                        placement="top"
                        title={`Do you want to delete step ${data.step.name} ?`}
                        onConfirm={e => data.onDeleteClick(data.step)}
                        okText={translate(`common.button.yes`)}
                        onCancel={(event: any) => event.stopPropagation()}
                        cancelText={translate(`common.button.no`)}
                    >
                        <DeleteOutlined
                            className="trash-btn"
                            title="Delete this step"
                            onClick={event => {
                                event.stopPropagation();
                            }}
                        />
                    </Popconfirm>
                </Space>
            </div>
        </>
    );
});
