import React, { FC, Fragment, useCallback, useEffect, useState } from 'react';
import { useDataProvider, useTranslate } from 'ra-core';
import { Card, Col, Divider, Menu, Row, Typography } from 'antd';
import { SyncOutlined } from '@ant-design/icons/lib';
import SystemMonitorService, {
    ServerInfo,
    ServerStatus,
    ServerType,
    ServerTypes,
} from '../service/SystemMonitorService';

const { Text } = Typography;

const ServersStatus: FC = () => {
    const translate = useTranslate();
    const dataProvider = useDataProvider();

    const [nluServer, setNluServer] = useState<ServerInfo>({
        serverType: ServerType.NLU_SERVER,
        name: 'NLU Server',
        link: '',
        status: '',
        checking: true,
    });

    const [qaServer, setQaServer] = useState<ServerInfo>({
        serverType: ServerType.QA_SERVER,
        name: 'QA Server',
        link: '',
        status: '',
        checking: true,
    });

    const [mrcServer, setMrcServer] = useState<ServerInfo>({
        serverType: ServerType.MRC_SERVER,
        name: 'MRC Server',
        link: '',
        status: ServerStatus.UNKNOWN,
        checking: false,
    });

    const [pluginServer, setPluginServer] = useState<ServerInfo>({
        serverType: ServerType.PLUGIN_SERVER,
        name: 'Plugin Server',
        link: '',
        status: '',
        checking: true,
    });

    const loadServerInfo = useCallback(
        async (serverType: ServerType) => {
            const info = ServerTypes[serverType];
            const respStatus = await SystemMonitorService.checkServerStatus(dataProvider, serverType);
            const respLink = await SystemMonitorService.getConfiguration(dataProvider, info.key);

            return {
                serverType: serverType,
                name: info.display,
                link: respLink.data.value,
                status: respStatus.data.message,
                checking: false,
            };
        },
        [dataProvider]
    );

    const loadAllServer = useCallback(() => {
        loadServerInfo(ServerType.NLU_SERVER).then(resp => setNluServer(resp));
        loadServerInfo(ServerType.QA_SERVER).then(resp => setQaServer(resp));
        loadServerInfo(ServerType.MRC_SERVER).then(resp => setMrcServer(resp));
        loadServerInfo(ServerType.PLUGIN_SERVER).then(resp => setPluginServer(resp));
    }, [loadServerInfo]);

    useEffect(() => {
        loadAllServer();
    }, [loadAllServer]);

    return (
        <Fragment>
            <Row>
                <Col span={16}>
                    <h2 style={{ fontWeight: 500 }}>{translate(`resources.systemmonitor.server_status`)}</h2>
                </Col>
                <Col span={8} />
            </Row>
            <Row gutter={16}>
                <Col span={6}>
                    <Card
                        className={`server-status-card ${nluServer.status.toLowerCase()}`}
                        title={nluServer.name}
                        extra={
                            <Fragment>
                                {nluServer.checking && <SyncOutlined spin />}
                                {!nluServer.checking && <Text>{nluServer.status}</Text>}
                            </Fragment>
                        }
                    >
                        {nluServer.link}
                    </Card>
                </Col>
                <Col span={6}>
                    <Card
                        className={`server-status-card ${qaServer.status.toLowerCase()}`}
                        title={qaServer.name}
                        extra={
                            <Fragment>
                                {qaServer.checking && <SyncOutlined spin />}
                                {!qaServer.checking && <Text>{qaServer.status}</Text>}
                            </Fragment>
                        }
                    >
                        {qaServer.link}
                    </Card>
                </Col>
                <Col span={6}>
                    <Card
                        className={`server-status-card ${mrcServer.status.toLowerCase()}`}
                        title={mrcServer.name}
                        extra={
                            <Fragment>
                                {mrcServer.checking && <SyncOutlined spin />}
                                {!mrcServer.checking && <Text>{mrcServer.status}</Text>}
                            </Fragment>
                        }
                    >
                        {mrcServer.link}
                    </Card>
                </Col>
                <Col span={6}>
                    <Card
                        className={`server-status-card ${pluginServer.status.toLowerCase()}`}
                        title={pluginServer.name}
                        extra={
                            <Fragment>
                                {pluginServer.checking && <SyncOutlined spin />}
                                {!pluginServer.checking && <Text>{pluginServer.status}</Text>}
                            </Fragment>
                        }
                    >
                        {pluginServer.link}
                    </Card>
                </Col>
            </Row>
        </Fragment>
    );
};

export default ServersStatus;
