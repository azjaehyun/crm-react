import React, { FC, useEffect, useRef, useState } from 'react';
import { Button, Col, Form, Input, notification, Row } from 'antd';
import { uuid } from '../../utils/uuid';
import RuntimeService from '../service/runtimeService';
import { useParams } from 'react-router';
import { useTranslate } from 'react-admin';
import TextArea from 'antd/es/input/TextArea';
import { Condition } from '../../types';

// const { TextArea } = Input;

interface Props {
    onFinish: any;
    scriptEditing?: any;
}
const AddScriptForm: FC<Props> = props => {
    const [script, setScript] = useState('');
    const translate = useTranslate();
    const inputRef = useRef<TextArea>(null);
    let { botId } = useParams();
    const onFinish = () => {
        if (script === '') {
            return;
        }
        RuntimeService.validateCondition(botId, { value: script })
            .then(({ data }: any) => {
                if (data && data.status === 'VALID') {
                    const scriptCond: Condition = {
                        expression: '',
                        state: '',
                        variable: '',
                        uuid: uuid(),
                        fullScript: true,
                        value: script,
                    };
                    if (props.scriptEditing && props.scriptEditing.id) {
                        scriptCond.id = props.scriptEditing.id;
                        scriptCond.uuid = props.scriptEditing.uuid;
                    }
                    props.onFinish(scriptCond);
                    setScript('');
                } else {
                    if (inputRef.current != null) {
                        inputRef.current.focus();
                    }

                    notification['error']({
                        message: translate(`common.message.error`),
                        description: 'Condition invalid',
                    });
                }
            })
            .catch((error: any) => {});
    };
    useEffect(() => {
        if (props.scriptEditing && script === '') {
            setScript(props.scriptEditing.value);
        }
    }, [props.scriptEditing, script]);

    return (
        <Form layout="vertical" style={{ width: '350px' }}>
            <Row>
                <Col span={24}>
                    <Form.Item label="Enter Your Condition">
                        <TextArea
                            ref={inputRef}
                            rows={4}
                            style={{ resize: 'none' }}
                            value={script}
                            onChange={e => setScript(e.target.value)}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Button style={{ float: 'right' }} onClick={onFinish}>
                        Save
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};

export default AddScriptForm;
