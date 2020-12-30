import React, { FC, useCallback, useEffect, useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Button, Card, Col, notification, Popconfirm, Row, Table, Typography } from 'antd';
import DistributionServerService, {
    DispServer,
    OrderBy,
    Query,
    SortDirection,
} from './service/DistributionServerService';
import { IndicatorIcon } from '../projects/common/Constants';
import { SpinProps } from 'antd/es/spin';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons/lib';
import { useDataProvider, useTranslate } from 'ra-core';
import AddServerForm from './AddServerForm';

const { Text } = Typography;

const useStyles = makeStyles({
    root: {
        marginTop: 16,
        backgroundColor: 'white',
        color: `black`,
    },
});

const DistributionServers: FC = () => {
    const translate = useTranslate();
    const dataProvider = useDataProvider();

    const [serverList, setServerList] = useState<Array<DispServer>>([]);
    const [selectedServer, setSelectedServer] = useState<DispServer>(DistributionServerService.emptyServer());

    const [loading, setLoading] = useState<boolean>(false);
    const [visibleForm, setVisibleForm] = useState(false);

    /**
     * Load all servers
     */
    const loadServers = useCallback(async () => {
        const query: Query = {
            orderBy: [OrderBy.CREATED_DATE],
            sort: SortDirection.ASC,
            offset: 0,
            limit: 1000,
        };

        setLoading(true);
        DistributionServerService.search(dataProvider, query)
            .then(({ data, status }: any) => {
                setLoading(false);
                if (status === 200) {
                    setServerList(data.list);
                } else {
                    notification['error']({
                        message: translate(`common.message.error`),
                        description: translate(`common.message.unknown_error_try_again`),
                    });
                }
            })
            .catch((error: any) => {
                setLoading(false);
                notification['error']({
                    message: translate(`common.message.error`),
                    description: translate(`common.message.unknown_error_try_again`),
                });
            });
    }, [dataProvider, translate]);

    /**
     * Perform delete server by id
     */
    const doDeleteServer = useCallback(
        async (serverId: number) => {
            setLoading(true);
            DistributionServerService.delete(dataProvider, serverId)
                .then(({ data, status }: any) => {
                    setLoading(false);
                    if (status === 200) {
                        loadServers().then();
                    } else {
                        if (data.message) {
                            notification['error']({
                                message: translate(`common.message.error`),
                                description: data.message,
                            });
                        }
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
        [dataProvider, loadServers, translate]
    );

    const showDraw = (server: any) => {
        setVisibleForm(true);
        if (server) {
            setSelectedServer(server);
        } else {
            setSelectedServer(DistributionServerService.emptyServer());
        }
    };

    const onFormClose = (reload: boolean) => {
        setVisibleForm(false);
        if (reload) {
            loadServers().then();
        }
    };

    const spin: SpinProps = {
        indicator: IndicatorIcon,
        spinning: loading,
        tip: translate(`common.message.loading`),
    };

    const columns = [
        {
            title: translate(`resources.distributionservers.table_header.name`),
            width: 200,
            render: (server: DispServer) => <a onClick={() => showDraw(server)}>{server.name}</a>,
        },
        {
            title: translate(`resources.distributionservers.table_header.database`),
            width: 450,
            render: (server: DispServer) => (
                <Text>
                    jdbc:mariadb://{server.host}:{server.port}/{server.database}
                </Text>
            ),
        },
        {
            title: translate(`resources.distributionservers.table_header.api_server`),
            render: (server: DispServer) => <Text>{server.contextPath}</Text>,
        },
        {
            title: translate(`resources.distributionservers.table_header.chat_server`),
            render: (server: DispServer) => <Text>{server.chatServer}</Text>,
        },
        {
            width: 40,
            render: (server: DispServer) => (
                <Popconfirm
                    title={translate(`resources.distributionservers.message.confirm_delete`, {
                        server_name: server.name,
                    })}
                    onConfirm={() => doDeleteServer(server.id ? server.id : 0)}
                    okText={translate(`common.button.delete`)}
                    okButtonProps={{ danger: true, type: 'default' }}
                    cancelText={translate(`common.button.no`)}
                    placement="left"
                >
                    <DeleteOutlined className="trash-btn" />
                </Popconfirm>
            ),
        },
    ];

    useEffect(() => {
        loadServers().then();
    }, [loadServers]);

    return (
        <Card style={{ margin: '50px' }} bordered={true}>
            <Card style={{ backgroundColor: '#FCFCFC' }}>
                <Row style={{ paddingTop: 12 }}>
                    <Col span={12}>
                        <h1 style={{ fontWeight: 500 }}>{translate(`resources.distributionservers.name`)}</h1>
                    </Col>
                    <Col span={12} style={{ textAlign: 'right' }}>
                        <Button type={'primary'} icon={<PlusOutlined />} onClick={() => showDraw(null)}>
                            {translate(`common.button.add`)}
                        </Button>
                    </Col>
                </Row>
            </Card>

            <Table
                // bordered
                className="mz-table"
                dataSource={serverList}
                rowKey="id"
                columns={columns}
                pagination={false}
                // size="small"
                loading={spin}
                style={{ marginTop: 20 }}
            />

            <AddServerForm
                server={selectedServer}
                visible={visibleForm}
                onClose={(reload: boolean) => onFormClose(reload)}
            />
        </Card>
    );
};

export default DistributionServers;
