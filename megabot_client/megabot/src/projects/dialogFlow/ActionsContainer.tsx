import React, { FC, Fragment, useCallback, useEffect, useState } from 'react';
import { Avatar, Button, List, Popover, Typography } from 'antd';
import { FallOutlined, FunctionOutlined, InteractionOutlined } from '@ant-design/icons';
import { RESPONSE_TYPE_ACTION_TASK, RESPONSE_TYPE_FUNCTION, RESPONSE_TYPE_JUMPTO } from '../common/Constants';

const { Paragraph } = Typography;

interface Props {
    addNewItem: any;
}
const ActionsContainer: FC<Props> = props => {
    const data = [
        {
            id: '1',
            type: RESPONSE_TYPE_JUMPTO,
            name: 'Jump To',
            src: <FallOutlined style={{ fontSize: 25 }} />,
            description: 'Jump to another step ',
        },
        {
            id: '3',
            type: RESPONSE_TYPE_ACTION_TASK,
            name: 'Action Task',
            src: <InteractionOutlined style={{ fontSize: 25 }} />,
            description: 'Action Task',
        },
        {
            id: '2',
            type: RESPONSE_TYPE_FUNCTION,
            name: 'Bot Function',
            src: <FunctionOutlined style={{ fontSize: 25 }} />,
            description: "Allow to call the bot's function",
        },
    ];
    const [selectedPreviewCode, setSelectedPreviewCode] = useState();
    const addNewAction = (item: any) => {
        setSelectedPreviewCode('');
        props.addNewItem(item);
    };
    return (
        <Fragment>
            <Paragraph style={{ color: '#333', fontWeight: 'bold' }}>Actions</Paragraph>
            <List
                grid={{ gutter: 10, column: 2 }}
                dataSource={data}
                renderItem={(item: any) => (
                    <List.Item>
                        <Popover
                            title={item.description}
                            content={
                                <a
                                    title={item.description}
                                    className="smart-card-preview-choose-btn"
                                    style={{ width: '100%', fontSize: 11, margin: 0 }}
                                    onClick={e => addNewAction(item)}
                                >
                                    SELECT
                                </a>
                            }
                            visible={selectedPreviewCode === item.type ? true : false}
                            onVisibleChange={(visible: boolean) => {
                                if (!visible) setSelectedPreviewCode('');
                            }}
                            trigger="click"
                            placement="right"
                            className="smart-card-preview-popover"
                        >
                            <Button
                                className="replies-item"
                                icon={item.src}
                                style={{
                                    width: '100%',
                                    height: 60,
                                    borderRadius: 5,
                                    marginBottom: 4,
                                }}
                                onClick={e => setSelectedPreviewCode(item.type)}
                            />
                        </Popover>
                        <Paragraph style={{ textAlign: 'center', fontSize: 11 }}>{item.name}</Paragraph>
                    </List.Item>
                )}
            />
        </Fragment>
    );
};

export default ActionsContainer;
