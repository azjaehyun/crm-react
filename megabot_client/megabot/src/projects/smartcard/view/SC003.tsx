import React, { FC, Fragment } from 'react';
import {Button, Col, Row, Typography} from 'antd';
import { uuid } from '../../../utils/uuid';
import { SC003Config, SC003Data, SmartCardAction } from '../types';
import { SMART_CARD_CODE } from '../../common/Constants';

const { Text, Paragraph } = Typography;

interface Props {
    data: SC003Data;
    onSelected?: (value: string) => void;
    className?: string;
}

/**
 * Vertical list text
 * @param props
 * @constructor
 */
const SC003: FC<Props> = (props: Props) => {
    if (!props.data) return <div>{SMART_CARD_CODE.SC003}: NO DATA</div>;
    const config: SC003Config = !props.data.config ? { textAlign: 'left', showIndex: false } : props.data.config;
    return (
        <div className={`sc003 ${props.className ? props.className : ''}`}>
            <div className={`body-area--${config.textAlign}`}>
                <div className="header-area">
                    <Text className="card-title">{props.data.title ? props.data.title : 'The card title'}</Text>
                    {props.data.description && (
                        <Paragraph className="card-description">{props.data.description}</Paragraph>
                    )}
                </div>
                <div className="body-area" style={{marginRight: 5, marginLeft: 5}}>
                    {props.data.options.map((option: SmartCardAction, index: number) => (
                        <div style={{padding: "5px", marginBottom: '5px'}}>
                            <Button
                                style={{width: "100%", textAlign: "center", padding: '0', backgroundColor: '#f2f2f2', border: "inherit", color: "black"}}
                                className="option-btn"
                                key={uuid()}
                                block
                                title={option.display}
                                onClick={() => {
                                    if (props.onSelected) props.onSelected(option.value);
                                }}
                            >
                                {config.showIndex && <Fragment>{index + 1}. </Fragment>}{' '}
                                {option.display ? option.display : 'Button ' + (index + 1)}
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SC003;
