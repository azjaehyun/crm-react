import React, { FC, Fragment, useCallback, useEffect, useState } from 'react';
import { Avatar, Button, Card, List, Popover, Typography } from 'antd';
import { MessageOutlined } from '@ant-design/icons';

import SmartCardPreview from '../smartcard/SmartCardPreview';
import { NO_PHOTO, RESPONSE_TYPE_SMARTCARD, RESPONSE_TYPE_TEXT } from '../common/Constants';
import { useDataProvider } from 'react-admin';
import { useParams } from 'react-router';
import smartCardDataHelper from '../smartcard/types';

const { Meta } = Card;
const { Paragraph } = Typography;

interface Props {
    addNewItemReply: any;
}
const RepliesContainer: FC<Props> = props => {
    const dataProvider = useDataProvider();
    const [visible, setVisible] = useState(false);
    const [smartCardList, setSmartCardList] = useState();
    const [selectedPreviewCode, setSelectedPreviewCode] = useState();
    let { botId } = useParams();

    const handleVisibleChange = (visible: boolean) => {
        setVisible(visible);
    };
    const onClick = () => {
        setVisible(false);
    };
    const onCardSelected = (templateCode: any) => {
        setSelectedPreviewCode('');
        // setSelectedTemplateCode(templateCode);
        // setSmartCardData(getDummyData(templateCode));
        props.addNewItemReply({ type: RESPONSE_TYPE_SMARTCARD, templateCode: templateCode });
    };

    const addTextReply = () => {
        setSelectedPreviewCode('');
        props.addNewItemReply({ type: RESPONSE_TYPE_TEXT });
    };

    const loadSmartCard = useCallback(async () => {
        dataProvider
            .getList('smartCard/all', {
                botId: botId,
            })
            .then(({ data }: any) => {
                console.log(data);
                setSmartCardList(data);
            })
            .catch((error: any) => {
                setSmartCardList([]);
            });
    }, [botId, dataProvider]);

    useEffect(() => {
        loadSmartCard();
    }, [loadSmartCard]);
    return (
        <Fragment>
            <Paragraph style={{ color: '#333', fontWeight: 'bold' }}>Replies</Paragraph>
            <Popover
                title="Text reply"
                content={
                    <a
                        title="Select this smart card"
                        className="smart-card-preview-choose-btn"
                        style={{ width: '100%', fontSize: 11, margin: 0 }}
                        onClick={addTextReply}
                    >
                        SELECT
                    </a>
                }
                visible={selectedPreviewCode === RESPONSE_TYPE_TEXT ? true : false}
                onVisibleChange={(visible: boolean) => {
                    if (!visible) setSelectedPreviewCode('');
                }}
                trigger="click"
                placement="right"
                className="smart-card-preview-popover"
            >
                <Button
                    title="Text reply"
                    className="replies-item"
                    icon={<Avatar shape="square" icon={<MessageOutlined />} size={40} className="replies-thumb" />}
                    style={{
                        width: '46%',
                        height: 60,
                        borderRadius: 5,
                        marginBottom: 8,
                    }}
                    onClick={e => setSelectedPreviewCode(RESPONSE_TYPE_TEXT)}
                />
            </Popover>

            {smartCardList && smartCardList.length > 0 && (
                <List
                    grid={{ gutter: 10, column: 2 }}
                    dataSource={smartCardList}
                    renderItem={(item: any) => (
                        <List.Item>
                            <Popover
                                title={<SmartCardPreview templateCode={selectedPreviewCode} />}
                                content={
                                    <a
                                        title="Select this smart card"
                                        className="smart-card-preview-choose-btn"
                                        style={{ width: '100%', fontSize: 11, margin: 0 }}
                                        onClick={() => onCardSelected(item.templateCode)}
                                    >
                                        SELECT
                                    </a>
                                }
                                visible={selectedPreviewCode === item.templateCode ? true : false}
                                onVisibleChange={(visible: boolean) => {
                                    if (!visible) setSelectedPreviewCode('');
                                }}
                                trigger="click"
                                placement="right"
                                className="smart-card-preview-popover"
                            >
                                <Button
                                    // disabled={messageEntity.id > 0 ? true : false}
                                    className={`replies-item`}
                                    title={item.description}
                                    icon={
                                        <Avatar
                                            style={{ height: '40px' }}
                                            shape="square"
                                            src={smartCardDataHelper.getSmartCardIcon(item.templateCode)}
                                            className="smart-card-thumb"
                                            icon={
                                                <Avatar
                                                    style={{ height: '40px' }}
                                                    shape="square"
                                                    src={smartCardDataHelper.defaultSmartCardIcon()}
                                                />
                                            }
                                        />
                                    }
                                    style={{
                                        width: '100%',
                                        height: 60,
                                        borderRadius: 5,
                                        marginBottom: 4,
                                    }}
                                    onClick={() => setSelectedPreviewCode(item.templateCode)}
                                />
                            </Popover>
                        </List.Item>
                    )}
                />
            )}
        </Fragment>
    );
};

export default RepliesContainer;
