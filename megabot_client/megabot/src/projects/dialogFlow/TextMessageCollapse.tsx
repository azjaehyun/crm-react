import React, { FC, useEffect, useRef, useState } from 'react';
import { Collapse, Input, Mentions, Popconfirm, Typography } from 'antd';
import { EnterOutlined } from '@ant-design/icons/lib';
import useOnClickOutside from '../../hooks/useOnClickOutside';
import { useTranslate } from 'react-admin';
import TextArea from 'antd/es/input/TextArea';
import MZBotMentions from '../common/MZMentions';

const { Panel } = Collapse;
const { Text } = Typography;
const { Option } = Mentions;

interface Props {
    res: any;
    setValue: any;
    entities: Array<string>;
    itents: Array<string>;
    scripts: Array<string>;
    // onDeleteReply: any;
}
const TextMessageCollapse: FC<Props> = props => {
    const translate = useTranslate();
    const inputRef = useRef<TextArea>(null);

    const [originalText, setOriginalText] = useState();
    const [text, setText] = useState();
    const [prefix, setPrefix] = useState();

    const data: any = {
        '@': props.entities,
        '#': props.itents,
        $: props.scripts,
    };

    const onChange = () => {
        if (text && text.length > 0 && text !== originalText) {
            // console.log('TextEditable onChange', text);
            props.setValue(props.res, text);
        } else {
            if (!text || text.length === 0) {
                setText(originalText);
            }
        }
    };
    const divRef = useRef<HTMLDivElement>(null);
    useOnClickOutside(divRef, () => {
        // console.log('--click outside');
        onChange();
    });
    useEffect(() => {
        setText(props.res.value);
        setOriginalText(props.res.value);
    }, [props.res]);
    // const deleteButton = () => (
    //     <Popconfirm
    //         placement="left"
    //         // title={translate(`resources.dialogflow.message.delete_block_confirm`)}
    //         title={'Do you want to delete this reply'}
    //         onConfirm={e => props.onDeleteReply(props.res)}
    //         okText={translate(`common.button.yes`)}
    //         onCancel={(event: any) => event.stopPropagation()}
    //         cancelText={translate(`common.button.no`)}
    //     >
    //         <DeleteOutlined
    //             className="trash-btn"
    //             title="Delete this reply"
    //             style={{ float: 'right', padding: '10px 0px 0px 5px' }}
    //             onClick={event => {
    //                 // If you don't want click extra trigger collapse, you can prevent this:
    //                 event.stopPropagation();
    //             }}
    //         />
    //     </Popconfirm>
    // );
    return (
        // <Collapse defaultActiveKey={['1']} style={{ marginBottom: 10 }} expandIconPosition="left">
        //     <Panel header="Text Message" key="1" extra={deleteButton()}>
        <div ref={divRef}>
            {/*<TextArea*/}
            {/*    placeholder="Text response..."*/}
            {/*    className="editable-input"*/}
            {/*    ref={inputRef}*/}
            {/*    value={text}*/}
            {/*    // onChange={e => props.setValue(props.uuid, e.target.value)}*/}
            {/*    onChange={e => setText(e.target.value)}*/}
            {/*    autoSize={{ minRows: 3, maxRows: 5 }}*/}
            {/*    // suffix={<EnterOutlined />}*/}
            {/*    onPressEnter={(e: any) => {*/}
            {/*        e.preventDefault();*/}
            {/*        onChange();*/}
            {/*    }}*/}
            {/*/>*/}
            <Mentions
                autoSize={{ minRows: 3, maxRows: 10 }}
                placeholder="Text message..."
                prefix={['@', '#', '$']}
                onSearch={(text, prefix) => setPrefix(prefix)}
                value={text}
                onChange={(text: string) => {
                    // console.log('1. ', text);
                    // onChange(text);
                    setText(text);
                }}
            >
                {(data[prefix] || []).map((text: any) => (
                    <Option key={text} value={text.substring(1)}>
                        {text}
                    </Option>
                ))}
            </Mentions>
        </div>
        //     </Panel>
        // </Collapse>
    );
};

export default TextMessageCollapse;
