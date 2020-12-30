import React, { FC, useEffect, useRef, useState } from 'react';
import { Button, Col, Form, Input, Row, Select } from 'antd';
import { Condition } from '../../types';
import { uuid } from '../../utils/uuid';

const { Option, OptGroup } = Select;

interface Props {
    resources: any;
    operators: any;
    onFinish: any;
    onFinishFailed?: any;
    condEditing?: any;
}
const AddConditionForm: FC<Props> = props => {
    const [hasValue, setHasValue] = useState(false);
    const [resource, setResource] = useState('');
    const [operator, setOperator] = useState('');
    const [value, setValue] = useState('');
    const [text, setText] = useState('');

    const resourceRef = useRef<Input>(null);
    const operatorRef = useRef<Input>(null);
    const valueRef = useRef<Input>(null);

    const onSelectResource = (obj: any) => {
        setResource(obj);
        setHasValue(obj.includes('@'));
        setOperator('');
    };
    const onSelectOperator = (op: any) => {
        setOperator(op);
        const ops = props.operators.filter((o: any) => o.value === op);
        if (ops.length > 0) {
            setHasValue(ops[0].needValue);
        }
        if (valueRef.current !== null) {
            valueRef.current.focus();
        }
    };
    const onFinish = () => {
        // let condition = {
        //     uuid: uuid(),
        //     fullScript: false,
        //     variable: resource,
        //     expression: operator,
        //     value: value,
        // };
        let condition: Condition = {
            expression: operator,
            fullScript: false,
            uuid: uuid(),
            state: 'ACTIVE',
            value: value,
            variable: resource,
        };
        if (props.condEditing && props.condEditing.id) {
            condition.id = props.condEditing.id;
            condition.uuid = props.condEditing.uuid;
        }
        props.onFinish(condition);
        setResource('');
        setOperator('');
        setValue('');
    };

    useEffect(() => {
        if (props.condEditing) {
            setOperator(props.condEditing.expression);
            setResource(props.condEditing.variable);
            setValue(props.condEditing.value);
            setHasValue(props.condEditing.value !== '');
        }
    }, [props.condEditing]);

    return (
        <Form layout="vertical" style={{ width: '500px' }} onFinishFailed={props.onFinishFailed}>
            <Row>
                <Col span={7}>
                    <Form.Item label={`Resource`}>
                        <Select
                            autoFocus={true}
                            showArrow={false}
                            placeholder="Enter the condition"
                            onChange={(obj: any) => onSelectResource(obj)}
                            onSearch={e => setText(e)}
                            showSearch={true}
                            defaultOpen={true}
                            value={resource}
                        >
                            {text === '' && (
                                <>
                                    <OptGroup label="# intents" key="#" />
                                    <OptGroup label="@ entities" key="@" />
                                    <OptGroup label="$ system variable" key="$" />
                                </>
                            )}

                            {props.resources && props.resources.length > 0 && (
                                <OptGroup label="Filter By">
                                    {props.resources.map((resource: any, index: number) => (
                                        <Option key={uuid()} value={resource}>
                                            {resource}
                                        </Option>
                                    ))}
                                </OptGroup>
                            )}
                        </Select>
                    </Form.Item>
                </Col>
                {resource !== '' && (
                    <Col span={7}>
                        <Form.Item label="Operator">
                            <Select
                                onChange={(op: any) => onSelectOperator(op)}
                                autoFocus={true}
                                defaultOpen={true}
                                value={operator}
                            >
                                <OptGroup label="Filter By">
                                    {props.operators &&
                                        props.operators.length > 0 &&
                                        props.operators.map((op: any, index: number) => (
                                            <Option key={uuid()} value={op.value}>
                                                {op.label}
                                            </Option>
                                        ))}
                                </OptGroup>
                            </Select>
                        </Form.Item>
                    </Col>
                )}
                {resource !== '' && operator !== '' && hasValue && (
                    <Col span={7}>
                        <Form.Item label="Value">
                            <Input
                                name="value"
                                autoComplete="off"
                                ref={valueRef}
                                value={value}
                                onChange={e => setValue(e.target.value)}
                            />
                        </Form.Item>
                    </Col>
                )}

                {resource !== '' && operator !== '' && (
                    <Col span={3}>
                        <Form.Item label="    " style={{}}>
                            <Button type="primary" htmlType="submit" onClick={onFinish}>
                                Save
                            </Button>
                        </Form.Item>
                    </Col>
                )}
            </Row>
        </Form>
    );
};

export default AddConditionForm;
