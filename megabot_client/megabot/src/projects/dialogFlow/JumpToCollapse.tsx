import React, { FC, useEffect, useState } from 'react';
import { Button, Col, Collapse, Divider, Form, Input, Popconfirm, Row, Select, Space } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { uuid } from '../../utils/uuid';
import { Step } from '../../types';
import { useTranslate } from 'react-admin';
import { FallOutlined } from '@ant-design/icons/lib';

const { Panel } = Collapse;
const { Option } = Select;
interface Props {
    steps: Step[];
    jumpTo: string;
    onMoveToStep: any;
    onDeleteJumpTo: any;
}
const JumpToCollapse: FC<Props> = props => {
    const translate = useTranslate();
    const [newStepName, setNewStepName] = useState();
    const onCreateNewStep = (e: any) => {
        props.onMoveToStep({ name: newStepName });
        setNewStepName('');
        e.stopPropagation();
    };
    const onSelectStep = (stepId: any) => {
        console.log('move to step: ', stepId);
        props.onMoveToStep({ id: stepId });
    };

    useEffect(() => {
        console.log(props.steps);
    }, [props.steps]);
    const deleteButton = () => (
        <Popconfirm
            placement="left"
            title={'Do you want to delete'}
            onConfirm={e => props.onDeleteJumpTo()}
            okText={translate(`common.button.yes`)}
            onCancel={(event: any) => event.stopPropagation()}
            cancelText={translate(`common.button.no`)}
        >
            <DeleteOutlined
                className="trash-btn"
                title="Delete this action"
                onClick={event => {
                    event.stopPropagation();
                }}
            />
        </Popconfirm>
    );
    return (
        <Collapse defaultActiveKey={['1']} expandIconPosition="left" className="step-bot-response-collapse">
            <Panel
                header={
                    <Space>
                        <FallOutlined /> JUMP TO
                    </Space>
                }
                key="1"
                extra={deleteButton()}
            >
                <Form layout="vertical">
                    <Row>
                        <Col span={24}>
                            <Form.Item label="Jump to Step">
                                <Select
                                    onSelect={stepId => onSelectStep(stepId)}
                                    value={props.jumpTo}
                                    dropdownRender={menu => (
                                        <div>
                                            {menu}
                                            <Divider style={{ margin: '4px 0' }} />
                                            <div style={{ display: 'flex', flexWrap: 'nowrap', padding: 8 }}>
                                                <Input
                                                    style={{ width: 300, marginRight: 10 }}
                                                    onChange={e => setNewStepName(e.target.value)}
                                                />
                                                <Button type="primary" ghost onClick={e => onCreateNewStep(e)}>
                                                    <PlusOutlined />
                                                </Button>
                                            </div>
                                        </div>
                                    )}
                                >
                                    {props.steps &&
                                        props.steps.length > 0 &&
                                        props.steps.map((st: any) => (
                                            <Option key={uuid()} value={st.id}>
                                                {st.name}
                                            </Option>
                                        ))}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Panel>
        </Collapse>
    );
};

export default JumpToCollapse;
