import React, { FC, useEffect, useRef, useState, Fragment } from 'react';
import { Col, Collapse, Form, Input, Row, Select, Tooltip } from 'antd';
import { uuid } from '../../utils/uuid';
import { BlockScript } from '../../types';
import { Script } from '../service/actionTaskService';
import { translate, useDataProvider } from 'ra-core';
import RuntimeService from '../service/runtimeService';
import { useParams } from 'react-router';
import { InfoCircleOutlined } from '@ant-design/icons';
import { useTranslate } from 'react-admin';
import { STATE_DELETED } from '../common/Constants';

const { Panel } = Collapse;
const { Option } = Select;
interface Props {
    stepScripts: BlockScript[];
    blockActions: any[];
    actionEditing: BlockScript;
    actionTasks: Script[];
    onChaneActionContent: any;
    // isEditAlias?: boolean;
}
const ActionTaskCollapse: FC<Props> = props => {
    const { botId } = useParams();
    const translate = useTranslate();
    const dataProvider = useDataProvider();
    const [actScript, setActScript] = useState<BlockScript>(props.actionEditing);
    const [isDuplicateName, setDuplicateName] = useState(false);
    const onSelectAction = (e: any) => {
        let actionUpdate = { ...actScript };
        const selected = props.actionTasks.filter((act: any) => act.id === e)[0];
        actionUpdate.parameters = selected.scriptArguments;
        actionUpdate.scriptId = e;
        actionUpdate.isValid = !isDuplicateName && actionUpdate.name !== '';
        props.onChaneActionContent(actionUpdate);
    };

    const onUpdateParam = (name: string, value: string) => {
        props.onChaneActionContent({ ...actScript, parameters: { ...actScript.parameters, [name]: value } });
    };

    const onChangeActionName = (name: string) => {
        props.onChaneActionContent({ ...actScript, name: name.trim() });
    };
    const checkActionAlias = (text: string) => {
        const value = text.trim();
        if (actScript.id && actScript.id > 0 && value === actScript.oldName) {
            return;
        }
        const existBlock = props.blockActions.filter(ac => ac.name == value && ac.uuid !== actScript.uuid);
        if (existBlock.length > 0) {
            setDuplicateName(existBlock[0].state !== STATE_DELETED);
            return;
        }
        const existStep = props.stepScripts.filter(ac => ac.name == value);
        if (existStep.length > 0) {
            setDuplicateName(existStep[0].state !== STATE_DELETED);
            return;
        }
        RuntimeService.verifyActionName(dataProvider, botId, value)
            .then(({ status, data }: any) => {
                let actionUpdate = { ...actScript };
                if (status == 200) {
                    setDuplicateName(false);
                    actionUpdate.isValid = true;
                } else if (status == 301) {
                    setDuplicateName(true);
                    actionUpdate.isValid = false;
                }
                props.onChaneActionContent(actionUpdate);
            })
            .catch((error: any) => {
                console.log(error);
            });
    };
    useEffect(() => {
        setActScript(props.actionEditing);
    }, [props.actionEditing]);
    return (
        <Fragment>
            <Row>
                <Col span={24}>
                    <Form.Item label="Execute Task">
                        <Select
                            onChange={e => onSelectAction(e)}
                            value={actScript.scriptId}
                            className={actScript.scriptId && actScript.scriptId ? '' : 'error-input'}
                        >
                            {props.actionTasks &&
                                props.actionTasks.map((act: any) => (
                                    <Option key={uuid()} value={act.id}>
                                        {act.name}
                                    </Option>
                                ))}
                        </Select>
                        {!actScript.scriptId && (
                            <div className="error-message">{translate(`resources.action.form.name.required`)}</div>
                        )}
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <label>Set arguments:</label>
                    {actScript &&
                        actScript.parameters &&
                        Object.entries(actScript.parameters).map(([key, value], i) => (
                            <Form.Item style={{ paddingLeft: '10px' }} label={key} key={i}>
                                <Input defaultValue={`${value}`} onChange={e => onUpdateParam(key, e.target.value)} />
                            </Form.Item>
                        ))}
                    <Form.Item
                        label="Action name"
                        name="name"
                        rules={[
                            {
                                required: true,
                                len: 10,
                                message: 'Enter task name',
                                // validator: checkActionAlias,
                            },
                        ]}
                    >
                        <Input
                            maxLength={15}
                            // disabled={!props.isEditAlias && actScript.id && actScript.id > 0 ? true : false}
                            className={actScript.name == '' || isDuplicateName ? 'error-input' : ''}
                            value={actScript.name}
                            onChange={e => onChangeActionName(e.target.value)}
                            prefix="$"
                            suffix={
                                <Tooltip
                                    placement="left"
                                    title={translate(`resources.action.form.name.hint`)}
                                    overlayStyle={{ width: '400px' }}
                                >
                                    <InfoCircleOutlined
                                        style={{
                                            color: 'rgba(0,0,0,.45)',
                                        }}
                                    />
                                </Tooltip>
                            }
                            onBlur={e => checkActionAlias(e.target.value)}
                        />
                        {actScript.name == '' && (
                            <div className="error-message">{translate(`resources.action.form.name.required`)}</div>
                        )}
                        {actScript.name !== '' && isDuplicateName && (
                            <div className="error-message">{translate(`resources.action.form.name.duplicate`)}</div>
                        )}
                    </Form.Item>
                </Col>
            </Row>
        </Fragment>
    );
};

export default ActionTaskCollapse;
