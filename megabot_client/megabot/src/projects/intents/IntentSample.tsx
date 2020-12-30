import React, { FC, useEffect, useRef, useState } from 'react';
import { Input } from 'antd';
import { TextAnnotator } from 'react-text-annotate';
import { EnterOutlined } from '@ant-design/icons/lib';

import useOnClickOutside from '../../hooks/useOnClickOutside';

interface Prods {
    sentence: any;
    onClick: any;
    onChange: any;
    onCancel: any;
}

const IntentSample: FC<Prods> = (prods: any) => {
    const [originalText, setOriginalText] = useState();
    const [text, setText] = useState<string>();

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
        setText(prods.sentence.text);
        setOriginalText(prods.sentence.text);

        if (prods.sentence.editing && inputRef.current !== null) {
            inputRef.current.focus();
        }
    }, [prods.sentence.editing, prods.sentence.text]);

    // on change
    const onChange = () => {
        if (text && text.length > 0 && text !== originalText) {
            prods.onChange({ ...prods.sentence, text: text });
        } else {
            if (!text || text.length === 0) {
                setText(originalText);
            }
            prods.onCancel(prods.sentence.id);
        }
    };

    const removeDuplicatePosition = (annotations: Array<any>) => {
        // console.log('removeDuplicatePosition', annotations);
        const result = [...annotations];
        let arr: number[] = [];
        if (annotations) {
            annotations.forEach((anno: any, index: number) => {
                annotations.forEach((a: any, foundIndex: number) => {
                    if (a.start === anno.start && a.end === anno.end && a.type !== anno.type && foundIndex > index) {
                        if (arr.indexOf(foundIndex) < 0) {
                            arr.push(foundIndex);
                        }
                    }
                });
            });

            if (arr.length > 0) {
                console.log('removeDuplicatePosition', annotations);
                console.log('removeDuplicatePosition -->', arr);

                const sorted: number[] = arr.sort((n1, n2) => n2 - n1);
                console.log('removeDuplicatePosition --> sorted', sorted);

                sorted.forEach(idx => result.splice(idx, 1));
                console.log('-->', result);
            }

            return result;
        }
        return [];
    };

    return prods.sentence.editing ? (
        <div ref={divRef} onClick={prods.onClick}>
            <Input
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
        <div onClick={prods.onClick}>
            <TextAnnotator
                content={prods.sentence.text}
                value={removeDuplicatePosition(prods.sentence.annotations)}
                onChange={() => {}}
            />
        </div>
    );
};

export default IntentSample;
