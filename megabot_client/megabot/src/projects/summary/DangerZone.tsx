import React, { FC, useState } from 'react';
import { Button, Card, notification, Popconfirm, Spin } from 'antd';
import { DeleteOutlined, UnlockOutlined } from '@ant-design/icons';
import { useDataProvider } from 'ra-core';
import BotService from '../service/botService';
import { useTranslate } from 'react-admin';
import { useHistory } from 'react-router-dom';

interface Props {
    botId: string;
    private: boolean;
    reloadBot: any;
}
const DangerZone: FC<Props> = props => {
    const dataProvider = useDataProvider();
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const { botId } = props;
    const translate = useTranslate();
    const makeBotPublish = () => {
        setLoading(true);
        BotService.publicBot(dataProvider, props.botId)
            .then((resp: any) => {
                setLoading(false);
                if (resp.status === 200) {
                    props.reloadBot();
                    notification['success']({
                        message: 'Success',
                        description: `Make bot public successful!`,
                    });
                } else {
                    const msg = resp.data ? resp.data.message : 'Failure to make Bot as public ';
                    notification['error']({
                        message: 'Error',
                        description: msg,
                    });
                }
            })
            .catch((error: any) => {
                setLoading(false);
                console.log(error);
            });
    };
    const onDeleteBot = () => {
        setLoading(true);
        BotService.deleteBot(dataProvider, botId)
            .then((resp: any) => {
                setLoading(false);
                if (resp.status === 200) {
                    history.push('/project-list');
                    notification['success']({
                        message: 'Success',
                        description: `Delete Bot successful!`,
                    });
                } else {
                    const msg = resp.data ? resp.data.message : 'Error during delete Bot';
                    notification['error']({
                        message: 'Error',
                        description: msg,
                    });
                }
            })
            .catch((error: any) => {
                setLoading(false);
            });
    };

    return (
        <div className="danger-zone-container">
            <Spin spinning={loading}>
                <Card className="danger-zone-content">
                    <p className="danger-zone-title">
                        {translate(`resources.projects.bot_summary.danger_zone.delete_description`)}
                    </p>
                    <Popconfirm
                        placement="left"
                        title={'Do you want to delete this bot'}
                        onConfirm={onDeleteBot}
                        okText={translate(`common.button.yes`)}
                        onCancel={(event: any) => event.stopPropagation()}
                        cancelText={translate(`common.button.no`)}
                    >
                        <Button
                            className="delete-bot-btn"
                            danger
                            onClick={event => {
                                // If you don't want click extra trigger collapse, you can prevent this:
                                event.stopPropagation();
                            }}
                        >
                            <DeleteOutlined />
                            {translate(`resources.projects.bot_summary.danger_zone.delete`)}
                        </Button>
                    </Popconfirm>
                </Card>
                {props.private && (
                    <Card className="danger-zone-content">
                        <p className="danger-zone-title">
                            {translate(`resources.projects.bot_summary.danger_zone.public_description`)}
                        </p>
                        <Popconfirm
                            placement="left"
                            title={'Do you want to share this bot with other people'}
                            onConfirm={makeBotPublish}
                            okText={translate(`common.button.yes`)}
                            onCancel={(event: any) => event.stopPropagation()}
                            cancelText={translate(`common.button.no`)}
                        >
                            <Button
                                className="make-public-btn"
                                type="primary"
                                ghost
                                // onClick={event => event.stopPropagation()}
                            >
                                <UnlockOutlined />
                                {translate(`resources.projects.bot_summary.danger_zone.make_public`)}
                            </Button>
                        </Popconfirm>
                    </Card>
                )}
            </Spin>
        </div>
    );
};

export default DangerZone;
