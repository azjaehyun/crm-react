import React, { FC, useEffect, useRef, useState } from 'react';
import { Input, Popconfirm, Space, Typography } from 'antd';
import useOnClickOutside from '../../hooks/useOnClickOutside';
import { DeleteOutlined, EditOutlined, EnterOutlined } from '@ant-design/icons/lib';
import { useTranslate } from 'ra-core';

const { Text } = Typography;

interface Props {
    text: string;
    onChange: (text: string) => void;
    onDeleteClick: () => void;
}

const ListItemTextEditable: FC<Props> = (props: Props) => {
    const translate = useTranslate();

    const [originalText, setOriginalText] = useState<string>('');
    const [text, setText] = useState<string>();
    const [editing, setEditing] = useState<boolean>(false);

    const divRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<Input>(null);

    const focus = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    // check to see if the user clicked outside of this component
    useOnClickOutside(divRef, () => {
        if (divRef.current !== null) {
            onChange();
        }
    });

    // on change
    const onChange = () => {
        setEditing(false);
        if (text && text.length > 0 && text !== originalText) {
            props.onChange(text);
        } else {
            if (!text || text.length === 0) {
                setText(originalText);
            }
        }
    };

    // focus the cursor in the input field on edit start
    useEffect(() => {
        setText(props.text);
        setOriginalText(props.text);

        // if (props.sentence.editing && inputRef.current !== null) {
        //     inputRef.current.focus();
        // }
    }, [props.text]);

    return editing ? (
        <div className="mz-list-text-item editable" ref={divRef}>
            <Input
                ref={inputRef}
                value={text}
                onChange={e => setText(e.target.value)}
                suffix={<EnterOutlined />}
                onPressEnter={(e: any) => {
                    e.preventDefault();
                    onChange();
                }}
                className="mz-list-text-item--input"
            />
        </div>
    ) : (
        <div className="mz-list-text-item">
            <div className="mz-list-text-item--text" onClick={() => setEditing(true)}>
                <Text>{text}</Text>
            </div>

            <div className="mz-list-text-item--controls">
                <Space size="small">
                    <EditOutlined
                        className="mz-icon-btn"
                        title="Edit this item"
                        onClick={e => {
                            e.stopPropagation();
                            setEditing(true);
                            focus();
                        }}
                    />
                    <Popconfirm
                        placement="left"
                        title="Are you sure to delete this item?"
                        onConfirm={() => props.onDeleteClick()}
                        okText={translate(`common.button.yes`)}
                        cancelText={translate(`common.button.no`)}
                    >
                        <DeleteOutlined
                            className="trash-btn"
                            title="Delete this item"
                            onClick={event => {
                                // If you don't want click extra trigger collapse, you can prevent this:
                                event.stopPropagation();
                            }}
                        />
                    </Popconfirm>
                </Space>
            </div>
        </div>
    );
};

export default ListItemTextEditable;
