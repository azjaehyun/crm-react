import React, { FC, Fragment } from 'react';
import { BlueColor, GreenColor, IndicatorIcon } from '../common/Constants';
import { Popconfirm, Space, Table, Tag, Typography } from 'antd';
import { DeployServer, DeployStatus } from './service/BotDeployService';
import {
    CheckCircleTwoTone,
    CloseCircleTwoTone,
    FrownOutlined,
    FrownTwoTone,
    InfoCircleTwoTone,
} from '@ant-design/icons/lib';
import { useTranslate } from 'ra-core';

const { Text } = Typography;

interface Props {
    loading: boolean;
    serverList: any;
    onRedeploy: (distServerId: number) => void;
    onUndeploy: (distServerId: number) => void;
    onDeploy: (serverIds: Array<number>, date: string) => void;
}

const DeployServerList: FC<Props> = (props: Props) => {
    const translate = useTranslate();

    const spin = {
        indicator: IndicatorIcon,
        spinning: props.loading,
        tip: translate(`common.message.loading`),
    };

    // <FrownOutlined />

    const getStatusColor = (server: DeployServer) => {
        if (server.status === DeployStatus.DEPLOYED) {
            return GreenColor;
        } else if (server.status === DeployStatus.PENDING) {
            return BlueColor;
        } else if (server.status === DeployStatus.UNDEPLOYED) {
            return '#faad14';
        } else if (server.status === DeployStatus.RUNNING) {
            return '#2db7f5';
        } else if (
            server.status === DeployStatus.FAILED_TO_DEPLOY ||
            server.status === DeployStatus.FAILED_TO_UNDEPLOY
        ) {
            return '#f50';
        }
        return '#f2f4f5';
    };

    const getStatusIcon = (server: DeployServer) => {
        const color = getStatusColor(server);
        if (server.status === DeployStatus.DEPLOYED) {
            return <CheckCircleTwoTone twoToneColor={color} />;
        } else if (server.status === DeployStatus.PENDING) {
            return <InfoCircleTwoTone twoToneColor={color} />;
        } else if (server.status === DeployStatus.UNDEPLOYED) {
            return <InfoCircleTwoTone twoToneColor={color} />;
        } else if (server.status === DeployStatus.RUNNING) {
            return <InfoCircleTwoTone twoToneColor={color} />;
        } else if (
            server.status === DeployStatus.FAILED_TO_DEPLOY ||
            server.status === DeployStatus.FAILED_TO_UNDEPLOY
        ) {
            return <CloseCircleTwoTone twoToneColor={color} />;
        }
        return '#f2f4f5';
    };

    const renderUnDeployButton = (server: DeployServer) => (
        <Popconfirm
            title={`Are you sure to un-deploy server "${server.name}"?`}
            onConfirm={() => props.onUndeploy(server.id)}
            okText={translate(`common.button.undeploy`)}
            okButtonProps={{ type: 'primary' }}
            cancelText={translate(`common.button.no`)}
            placement="left"
        >
            <a>{translate(`common.button.undeploy`)}</a>
        </Popconfirm>
    );

    const renderReDeployButton = (server: DeployServer) => (
        <Popconfirm
            title={`Are you sure to re-deploy server "${server.name}"?`}
            onConfirm={() => props.onRedeploy(server.id)}
            okText={translate(`common.button.deploy`)}
            okButtonProps={{ type: 'primary' }}
            cancelText={translate(`common.button.no`)}
            placement="left"
        >
            <a>{translate(`common.button.redeploy`)}</a>
        </Popconfirm>
    );

    const renderDeployButton = (server: DeployServer) => (
        <Popconfirm
            title={`Are you sure to deploy server "${server.name}"?`}
            onConfirm={() => props.onDeploy([server.id], '')}
            okText={translate(`common.button.deploy`)}
            okButtonProps={{ type: 'primary' }}
            cancelText={translate(`common.button.no`)}
            placement="left"
        >
            <a>{translate(`common.button.deploy`)}</a>
        </Popconfirm>
    );

    const renderAction = (server: DeployServer) => {
        return (
            <Fragment>
                {server.status === DeployStatus.DEPLOYED && renderUnDeployButton(server)}
                {server.status === DeployStatus.UNDEPLOYED && renderDeployButton(server)}
                {server.status === DeployStatus.FAILED_TO_DEPLOY && renderReDeployButton(server)}
                {server.status === DeployStatus.FAILED_TO_UNDEPLOY && renderUnDeployButton(server)}
            </Fragment>
        );
    };

    const columns = [
        {
            title: translate(`resources.deploy.table_header.server`),
            width: 300,
            render: (server: DeployServer) => (
                <Fragment>
                    <span style={{ display: 'inline-block', width: 20 }}>{getStatusIcon(server)}</span>
                    <Text>{server.name}</Text>
                </Fragment>
            ),
        },
        {
            title: translate(`resources.deploy.table_header.chat_client`),
            render: (server: DeployServer) => (
                <div>
                    <a href={server.clientUrl} target="_blank">
                        {server.clientUrl}
                    </a>
                </div>
            ),
        },
        {
            title: translate(`resources.deploy.table_header.status`),
            width: 200,
            render: (server: DeployServer) => (
                <Tag style={{ fontSize: 11 }} color={getStatusColor(server)}>
                    {server.status}
                </Tag>
            ),
        },
        {
            width: 100,
            render: (server: DeployServer) => <div className="mz-table-extra">{renderAction(server)}</div>,
        },
    ];

    return (
        <Table
            id="deploy-server-table"
            className="mz-table"
            loading={spin}
            dataSource={props.serverList}
            columns={columns}
            pagination={false}
            size="small"
            rowKey="id"
        />
    );
};

export default DeployServerList;
