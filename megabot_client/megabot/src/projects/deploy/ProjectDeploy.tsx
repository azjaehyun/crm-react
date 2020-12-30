import React, { FC, useCallback, useEffect, useState } from 'react';
import { Button, Col, Empty, notification, Popover, Row, Space } from 'antd';
import { PlusOutlined, ReloadOutlined } from '@ant-design/icons/lib';
import { useDataProvider, useTranslate } from 'ra-core';
import DeployServerList from './DeployServerList';
import BotDeployService, { DeployServer, DeployStatus } from './service/BotDeployService';
import DeployForm from './DeployForm';

interface Props {
    botId: any;
}

const ProjectDeploy: FC<Props> = (props: Props) => {
    const translate = useTranslate();
    const dataProvider = useDataProvider();

    const [loading, setLoading] = useState(false);
    const [deployedServerList, setDeployedServerList] = useState<Array<DeployServer>>([]);
    const [visibleForm, setVisibleForm] = useState<boolean>(false);

    /**
     * Check deployment status of a bot
     */
    const loadDeployedServerList = useCallback(async () => {
        setLoading(true);
        BotDeployService.status(dataProvider, props.botId)
            .then(({ data, status }: any) => {
                setLoading(false);
                if (status === 200) {
                    let arr = data as Array<DeployServer>;
                    setDeployedServerList(arr.sort((a, b) => a.status.localeCompare(b.status)));
                }
            })
            .catch((error: any) => {
                setLoading(false);
                notification['error']({
                    message: translate(`common.message.error`),
                    description: translate(`common.message.unknown_error_try_again`),
                });
            });
    }, [dataProvider, props.botId, translate]);

    /**
     * Deploy a bot on a list of distribution DbServer/ChatServer
     */
    const doDeploy = (serverIds: Array<number>, date: string) => {
        setLoading(true);
        BotDeployService.deploy(dataProvider, props.botId, serverIds, date)
            .then(({ data, status }: any) => {
                setLoading(false);
                if (status === 200) {
                    closeDrawer(true);
                    loadDeployedServerList().then();
                }
            })
            .catch((error: any) => {
                setLoading(false);
                notification['error']({
                    message: translate(`common.message.error`),
                    description: translate(`common.message.unknown_error_try_again`),
                });
            });
    };

    /**
     * Redeploy a bot on a distribution DbServer/ChatServer
     */
    const doReDeploy = useCallback(
        (distServerId: number) => {
            setLoading(true);
            BotDeployService.redeploy(dataProvider, props.botId, distServerId)
                .then(({ data, status }: any) => {
                    setLoading(false);
                    if (status === 200) {
                        loadDeployedServerList().then();
                    }
                })
                .catch((error: any) => {
                    setLoading(false);
                    notification['error']({
                        message: translate(`common.message.error`),
                        description: translate(`common.message.unknown_error_try_again`),
                    });
                });
        },
        [dataProvider, loadDeployedServerList, props.botId, translate]
    );

    /**
     * Undeploy a bot on distributed DbServer/ChatServer
     */
    const doUnDeploy = useCallback(
        (distServerId: number) => {
            setLoading(true);
            BotDeployService.unDeploy(dataProvider, props.botId, distServerId)
                .then(({ data, status }: any) => {
                    setLoading(false);
                    if (status === 200) {
                        loadDeployedServerList().then();
                    }
                })
                .catch((error: any) => {
                    setLoading(false);
                    notification['error']({
                        message: translate(`common.message.error`),
                        description: translate(`common.message.unknown_error_try_again`),
                    });
                });
        },
        [dataProvider, loadDeployedServerList, props.botId, translate]
    );

    const showDrawer = (server: any) => {
        setVisibleForm(true);
    };

    const closeDrawer = (reload: boolean) => {
        setVisibleForm(false);
        if (reload) {
            loadDeployedServerList().then();
        }
    };

    useEffect(() => {
        loadDeployedServerList().then();
    }, [loadDeployedServerList]);

    return (
        <div className="content-body">
            <Row className="content-body-header">
                <Col span={8}>
                    <h5
                        className="ant-typography"
                        style={{
                            fontWeight: 'normal',
                            marginBottom: '0px',
                        }}
                    >
                        {translate(`resources.deploy.title`)}
                    </h5>
                </Col>
                <Col span={16} style={{ textAlign: 'right' }}>
                    <Space>
                        <Button icon={<ReloadOutlined />} className="mz-link-btn" onClick={loadDeployedServerList}>
                            {translate(`common.button.reload`)}
                        </Button>
                        <Button
                            disabled={loading}
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={() => showDrawer(null)}
                        >
                            {translate(`common.button.deploy`)}
                        </Button>
                    </Space>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    {(deployedServerList.length > 0 || loading) && (
                        <DeployServerList
                            loading={loading}
                            serverList={deployedServerList}
                            onDeploy={(serverIds: Array<number>, date: string) => doDeploy(serverIds, date)}
                            onRedeploy={distServerId => doReDeploy(distServerId)}
                            onUndeploy={distServerId => doUnDeploy(distServerId)}
                        />
                    )}

                    {deployedServerList.length === 0 && !loading && (
                        <Empty
                            className="mz-empty"
                            description={translate(`resources.deploy.message.no_deploy_servers`)}
                        />
                    )}

                    <DeployForm
                        botId={props.botId}
                        visible={visibleForm}
                        processing={loading}
                        deployedServers={deployedServerList}
                        onClose={(reload: boolean) => closeDrawer(reload)}
                        onDeploy={(serverIds: Array<number>, date: string) => doDeploy(serverIds, date)}
                    />
                </Col>
            </Row>
        </div>
    );
};

export default ProjectDeploy;
