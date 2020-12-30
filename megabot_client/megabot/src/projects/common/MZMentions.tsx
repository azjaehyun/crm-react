import React, { FC, useState } from 'react';
import { Mentions, Typography } from 'antd';

const { Option } = Mentions;
const { Text } = Typography;

interface Props {
    label: string;
    required?: boolean;
    value?: string;
    entities: Array<string>;
    itents: Array<string>;
    scripts: Array<string>;
    onChange?: (value: string) => void;
}

const MZBotMentions: FC<Props> = (props: Props) => {
    const [text, setText] = useState(props.value);
    const [prefix, setPrefix] = useState();

    const data: any = {
        '@': props.entities,
        '#': props.itents,
        $: props.scripts,
    };
    // console.log('MZBotMentions -> data', data);

    return (
        <div className="mz-form-control-input">
            <Text className={`mz-form-item-label ${require ? 'mz-form-item-required' : ''}`}>{props.label}</Text>
            <Mentions
                autoSize
                placeholder=""
                prefix={['@', '#', '$']}
                onSearch={(text, prefix) => setPrefix(prefix)}
                value={text}
                onChange={(text: string) => {
                    setText(text);
                    if (props.onChange) props.onChange(text);
                }}
            >
                {(data[prefix] || []).map((text: any) => (
                    <Option key={text} value={text.substring(1)}>
                        {text}
                    </Option>
                ))}
            </Mentions>
        </div>
    );
};

export default MZBotMentions;
