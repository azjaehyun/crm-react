import React, { FC, useEffect, useRef, useState } from 'react';
import { Collapse, Form, Input, Tooltip } from 'antd';
import Editor, { ControlledEditor } from '@monaco-editor/react';
import { BlockScript } from '../../types';
import { useTranslate } from 'react-admin';
import useOnClickOutside from '../../hooks/useOnClickOutside';

const { Panel } = Collapse;
interface Props {
    functionEditing: BlockScript;
    onChaneActionContent: any;
}
const BotFunctionCollapse: FC<Props> = props => {
    const [botFunction, setBotFunction] = useState<BlockScript>(props.functionEditing);
    const [code, setCode] = useState(props.functionEditing.scriptCodes);
    const translate = useTranslate();
    const onChangeScript = (value: any) => {
        console.log('-------onchange', botFunction, value);
        props.onChaneActionContent({ ...botFunction, scriptCodes: value });
    };
    useEffect(() => {
        setCode(props.functionEditing.scriptCodes);
    }, [props.functionEditing]);
    const divRef = useRef<HTMLDivElement>(null);
    // useOnClickOutside(divRef, () => {
    //     // console.log('--click outside');
    //     onChangeScript();
    // });
    return (
        <div ref={divRef}>
            <ControlledEditor
                height="230px"
                language="javascript"
                theme="vs"
                value={code}
                onChange={(e, value) => onChangeScript(value)}
            />
            {/*<textarea onChange={onChangeScript} value={code} />*/}
        </div>
    );
};

export default BotFunctionCollapse;
