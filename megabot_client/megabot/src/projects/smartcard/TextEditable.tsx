import React, { FC, useEffect, useRef, useState } from 'react';
import { Input, Typography } from 'antd';
import { EnterOutlined } from '@ant-design/icons/lib';
import useOnClickOutside from '../../hooks/useOnClickOutside';

const { Text } = Typography;

interface Props {
    text?: String;
    editing: Boolean;
    onChange(text: string): any;
}

const TextEditable: FC<Props> = (props: any) => {
    const [originalText, setOriginalText] = useState();
    const [text, setText] = useState<string>();
    const [editing, setEditing] = useState();

    const divRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<Input>(null);

    // check to see if the user clicked outside of this component
    useOnClickOutside(divRef, () => {
        if (divRef.current !== null) {
            onChange();
        }
    });

    // focus the cursor in the input field on edit start
    useEffect(() => {
        setText(props.text);
        setOriginalText(props.text);

        if (props.editing && inputRef.current !== null) {
            inputRef.current.focus();
        }
    }, [props.editing, props.text]);

    // on change
    const onChange = () => {
        if (text && text.length > 0 && text !== originalText) {
            console.log('TextEditable onChange', text);
            props.onChange(text);
        } else {
            if (!text || text.length === 0) {
                setText(originalText);
            }
        }
    };

    return props.editing ? (
        <div ref={divRef}>
            <Input
                className="editable-input"
                ref={inputRef}
                value={text}
                onChange={e => setText(e.target.value)}
                suffix={<EnterOutlined />}
                onPressEnter={(e: any) => {
                    e.preventDefault();
                    onChange();
                }}
            />
        </div>
    ) : (
        <Text className="editable-text">{text}</Text>
    );
};

export default TextEditable;
