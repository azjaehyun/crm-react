import React, { FC } from 'react';
import { Button, Col, Row, Typography } from 'antd';
import { SC004Config, SC004Data, SmartCardAction } from '../types';

const { Text, Paragraph } = Typography;

interface Prods {
    data: SC004Data;
    onSelected?: (value: string) => void;
    className?: string;
}

/**
 * Horizontal list text
 * @param prods
 * @constructor
 */
const SC004: FC<Prods> = (prods: Prods) => {
    const config: SC004Config = prods.data.config ? prods.data.config : { cols: 3 };
    const getDisplay = (option: SmartCardAction, index: number) => {
        if (option.display && option.display.length > 0) {
            return option.display;
        }
        return 'Option ' + (index + 1);
    };
    return (
        <div className={`sc004 ${prods.className ? prods.className : ''}`}>
            <div className="body-area">
                <div className="header-area">
                    <Text className="card-title">{prods.data.title ? prods.data.title : 'The cart title'}</Text>
                    {prods.data.description && (
                        <Paragraph className="card-description">{prods.data.description}</Paragraph>
                    )}
                </div>
                {/*<div className="options-area">*/}
                <Row style={{ marginRight: 5, marginLeft: 5 }}>
                    {prods.data.options.map((option: SmartCardAction, index: number) => (
                        <Col
                            style={{ padding: '5px', marginBottom: '5px' }}
                            key={index}
                            span={config.cols === 2 ? 12 : 8}
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
                                block
                                title={getDisplay(option, index)}
                                onClick={() => {
                                    if (prods.onSelected && typeof prods.onSelected === 'function')
                                        prods.onSelected(getDisplay(option, index));
                                }}
                            >
                                {getDisplay(option, index)}
                            </Button>
                        </Col>
                    ))}
                </Row>
                {/*</div>*/}
            </div>
        </div>
    );
};

export default SC004;
