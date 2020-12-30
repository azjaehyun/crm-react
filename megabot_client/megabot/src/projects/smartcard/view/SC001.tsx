import React, { FC, useEffect, useState } from 'react';
import { Avatar, Button, Row, Typography } from 'antd';
import smartCardDataHelper, { SC001Data } from '../types';
import { COMP_IMAGE_NOT_AVAILABLE } from '../../common/Constants';
const { Paragraph } = Typography;

interface Props {
    data: SC001Data;
    className?: string;
    selection?: Boolean;
    onSelected?: (postBackValue: string) => void;
}

/**
 * Basic card with image on top
 * @param props
 * @constructor
 */
const SC001: FC<Props> = (props: Props) => {
    const [record, setRecord] = useState();

    useEffect(() => {
        const record = smartCardDataHelper.getTextItemValues(props.data);
        setRecord(record);
        // console.log('SC001.tsx -> props', props);
        // console.log('SC001.tsx -> record', record);
    }, [props, props.data]);

    if (!record) return null;
    console.log(record);
    return (
        <div className={`sc001 ${props.className ? props.className : ''}`}>
            <div className="img-area">
                {/**
                 * TODO: replace this line when fix API server
                 * <Avatar src={record.imageUrl} shape="square" icon={COMP_IMAGE_NOT_AVAILABLE} />
                 */}
                <Avatar src={record.imageUrl} shape="square" icon={COMP_IMAGE_NOT_AVAILABLE} />
            </div>
            <div className="body-area">
                <Paragraph className="title" ellipsis={{ rows: 2 }} title={record.title}>
                    {record.title ? record.title : 'The card title...'}
                </Paragraph>
                <Paragraph className="description" ellipsis={{ rows: 3 }} title={record.description}>
                    {record.description ? record.description : 'The card description...'}
                </Paragraph>
            </div>
            {props.selection && (
                <div
                    className="action-area"
                    style={{ marginRight: 5, marginLeft: 5, padding: '5px', marginBottom: '5px' }}
                >
                    <Button
                        style={{
                            width: '100%',
                            textAlign: 'center',
                            padding: '0',
                            backgroundColor: '#f2f2f2',
                            border: 'inherit',
                            color: 'black',
                        }}
                        // block
                        onClick={(e: any) => {
                            if (props.onSelected) {
                                props.onSelected(record.selector ? record.selector.value : '');
                            }
                        }}
                    >
                        {record.selector && record.selector.display ? record.selector.display : 'Button'}
                    </Button>
                </div>
            )}
        </div>
    );
};

export default SC001;
