import React, { FC, useCallback, useEffect, useState } from 'react';
import { Avatar, Button, Drawer, List, notification, Popover, Space } from 'antd';
import { useTranslate } from 'ra-core';
import { Scrollbars } from 'react-custom-scrollbars';
import SmartCardPreview from '../../smartcard/SmartCardPreview';
import SmartCardEditor from '../../smartcard/SmartCardEditor';
import smartCardDataHelper, { SmartCardData } from '../../smartcard/types';
import { useDataProvider } from 'react-admin';
import AutomateTaskService, { MessageEntity } from '../../service/automateTaskService';
import SmartCardService from '../../service/smartCardService';

interface Props {
    bot: any;
    type: String;
    messageEntity: MessageEntity;
    visible: boolean;
    saving: boolean;
    onClose(): any;
    onFinish(message: MessageEntity): any;
}

const AddSmartCardForm: FC<Props> = props => {
    const dataProvider = useDataProvider();
    const translate = useTranslate();
    const [smartCardList, setSmartCardList] = useState();
    const [messageEntity, setMessageEntity] = useState();
    const [selectedPreviewCode, setSelectedPreviewCode] = useState();
    const [selectedTemplateCode, setSelectedTemplateCode] = useState();
    const [smartCardData, setSmartCardData] = useState();

    const onCardSelected = (templateCode: any) => {
        setSelectedPreviewCode('');
        setSelectedTemplateCode(templateCode);
        const dummyData = smartCardDataHelper.getDummyData(templateCode);
        console.log('onCardSelected -> dummyData', dummyData);
        setSmartCardData({ ...dummyData });
    };

    const loadSmartCard = useCallback(async () => {
        SmartCardService.all(dataProvider)
            .then(({ data }: any) => {
                // console.log(data);
                setSmartCardList(data);
            })
            .catch((error: any) => {
                setSmartCardList([]);
            });
    }, [dataProvider]);

    const smartCardDataChange = (data: SmartCardData) => {
        let scData = { ...smartCardData, ...data };
        scData.templateCode = selectedTemplateCode;
        setSmartCardData(scData);

        // console.log('AddSmartCardForm -> smartCardDataChange -> scData', scData);
    };

    const onSaveClick = () => {
        let entity = { ...messageEntity };
        entity.jsonMessage = { ...smartCardData, templateCode: selectedTemplateCode };
        // console.log('onSaveClick', entity);

        AutomateTaskService.insertOrUpdate(dataProvider, props.bot.id, entity)
            .then(({ data }: any) => {
                notification['success']({
                    message: translate(`common.message.success`),
                    description: 'Success',
                });
                setSelectedPreviewCode(null);
                props.onClose();
                props.onFinish(entity);
            })
            .catch((error: any) => {
                notification['error']({
                    message: translate(`common.message.error`),
                    description: translate(`common.message.unknown_error_try_again`),
                });
            });

        props.onClose();
    };

    useEffect(() => {
        if (props.visible) {
            loadSmartCard().then();
        }
        if (props.messageEntity) {
            setMessageEntity(props.messageEntity);
            if (props.messageEntity.jsonMessage) {
                setSelectedPreviewCode(null);
                setSelectedTemplateCode(props.messageEntity.jsonMessage.templateCode);
                setSmartCardData(props.messageEntity.jsonMessage);
            } else {
                setSelectedPreviewCode(null);
                setSelectedTemplateCode(null);
                setSmartCardData(null);
            }
        }
    }, [loadSmartCard, props.bot.language, props.messageEntity, props.visible]);

    return (
        <Drawer
            title="Welcome Message"
            placement="right"
            onClose={props.onClose}
            visible={props.visible}
            width="600"
            maskClosable={false}
            keyboard={false}
            // destroyOnClose={true}
            className="automate-task--smart-card-drawer"
            footer={
                <div
                    style={{
                        textAlign: 'right',
                    }}
                >
                    <Space>
                        <Button onClick={props.onClose} className="mz-btn mz-drawer-btn-footer">
                            {translate(`common.button.cancel`)}
                        </Button>
                        <Button
                            loading={props.saving}
                            onClick={onSaveClick}
                            type="primary"
                            className="mz-btn mz-drawer-btn-footer"
                        >
                            {translate(`common.button.save`)}
                        </Button>
                    </Space>
                </div>
            }
        >
            <div className="main-body">
                <div className="smart-card-list-col">
                    <Scrollbars autoHide autoHideTimeout={500} autoHideDuration={100}>
                        <div className="smart-card-list">
                            {/*<h5 className="ant-typography">Smart Cards</h5>*/}
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
                                            placement="rightTop"
                                            className="smart-card-preview-popover"
                                            destroyTooltipOnHide={true}
                                        >
                                            <Button
                                                disabled={messageEntity.id > 0 ? true : false}
                                                className={`smart-card-item${
                                                    item.templateCode === selectedTemplateCode ? '--selected' : ''
                                                }`}
                                                title={item.templateCode}
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
                        </div>
                    </Scrollbars>
                </div>
                <div className="smart-card-edit-col">
                    <div className="smart-card-editor-body">
                        <SmartCardEditor
                            templateCode={selectedTemplateCode}
                            scData={smartCardData}
                            onChange={data => smartCardDataChange(data)}
                            inlineEdit={true}
                        />
                    </div>
                </div>
            </div>
        </Drawer>
    );
};

export default AddSmartCardForm;
