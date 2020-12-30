import React, { FC, Fragment, useCallback, useEffect, useState } from 'react';
import { Button, Col, Divider, Dropdown, Empty, Menu, Row, Select, Space, Table } from 'antd';
import SystemMonitorService, {
    LogFileInfo,
    LogFileResponse,
    LogOrderBy,
    LogQuery,
    LogServerType,
    SortDirection,
} from '../service/SystemMonitorService';
import { IndicatorIcon } from '../../projects/common/Constants';
import { SpinProps } from 'antd/es/spin';
import {
    CheckOutlined,
    DownloadOutlined,
    DownOutlined,
    SmileOutlined,
    SortAscendingOutlined,
} from '@ant-design/icons/lib';
import { useDataProvider, useTranslate } from 'ra-core';

const { Option } = Select;

const SystemLogs: FC = () => {
    const translate = useTranslate();
    const dataProvider = useDataProvider();

    const [loading, setLoading] = useState(false);
    const [query, setQuery] = useState<LogQuery>({
        serverType: LogServerType.ApiServer,
        page: 1,
        limit: 20,
        sort: SortDirection.DESC,
        orderBy: LogOrderBy.UPDATED_DATE,
        search: '',
    });
    const [resp, setResp] = useState<LogFileResponse>();

    const pagination = {
        current: query.page,
        pageSize: query.limit,
        total: resp ? resp.totalCount : 0,
        showTotal: (total: any, range: any) => `${range[0]}-${range[1]} of ${total} items`,
        showSizeChanger: false,
    };

    const loadLogFile = useCallback(async () => {
        setLoading(true);
        SystemMonitorService.listLogFile(dataProvider, query)
            .then(({ data }: any) => {
                setLoading(false);
                setResp(data);
            })
            .catch((error: any) => {
                setLoading(false);
            });
    }, [dataProvider, query]);

    const downloadLogFile = (file: LogFileInfo) => {};

    const spin: SpinProps = {
        indicator: IndicatorIcon,
        spinning: loading,
        tip: translate(`common.message.loading`),
    };

    const columns = [
        {
            title: 'Name',
            render: (file: LogFileInfo) => file.fileName,
        },
        {
            width: 100,
            title: 'Extension',
            render: (file: LogFileInfo) => file.extension,
        },
        {
            width: 100,
            title: 'Size',
            render: (file: LogFileInfo) => file.fileSizeDisplay,
        },
        {
            width: 200,
            title: 'Created Time',
            render: (file: LogFileInfo) => file.creationTimeDisplay,
        },
        {
            width: 200,
            title: 'Modified Time',
            render: (file: LogFileInfo) => file.lastModifiedDisplay,
        },
        {
            width: 70,
            render: (file: LogFileInfo) => (
                <div style={{ textAlign: 'center' }}>
                    <DownloadOutlined className="edit-btn" onClick={() => downloadLogFile(file)} />
                </div>
            ),
        },
    ];

    const onPageChange = (page: number) => {
        setQuery({ ...query, page: page });
    };

    const onServerTypeChange = (serverType: any) => {
        setQuery({ ...query, page: 1, serverType: serverType });
    };

    const handleMenuClick = (e: any) => {
        if (e.key === SortDirection.ASC || e.key === SortDirection.DESC) {
            setQuery({ ...query, sort: e.key });
        } else {
            setQuery({ ...query, orderBy: e.key });
        }
    };

    const sortMenu = (
        <Menu onClick={handleMenuClick} style={{ width: 140 }}>
            <Menu.Item
                className={`system-log-sort-menu ${query.orderBy === LogOrderBy.CREATED_DATE ? 'checked' : ''}`}
                key="CREATED_DATE"
                icon={query.orderBy === LogOrderBy.CREATED_DATE ? <CheckOutlined /> : null}
            >
                Created Date
            </Menu.Item>

            <Menu.Item
                className={`system-log-sort-menu ${query.orderBy === LogOrderBy.UPDATED_DATE ? 'checked' : ''}`}
                key="UPDATED_DATE"
                icon={query.orderBy === LogOrderBy.UPDATED_DATE ? <CheckOutlined /> : null}
            >
                Updated Date
            </Menu.Item>
            <Menu.Item
                className={`system-log-sort-menu ${query.orderBy === LogOrderBy.SIZE ? 'checked' : ''}`}
                key="SIZE"
                icon={query.orderBy === LogOrderBy.SIZE ? <CheckOutlined /> : null}
            >
                Size
            </Menu.Item>
            <Menu.Item
                className={`system-log-sort-menu ${query.orderBy === LogOrderBy.FILE_NAME ? 'checked' : ''}`}
                key="FILE_NAME"
                icon={query.orderBy === LogOrderBy.FILE_NAME ? <CheckOutlined /> : null}
            >
                File Name
            </Menu.Item>
            <Divider style={{ margin: 0 }} />
            <Menu.Item
                className={`system-log-sort-menu ${query.sort === SortDirection.ASC ? 'checked' : ''}`}
                key="ASC"
                icon={query.sort === SortDirection.ASC ? <CheckOutlined /> : null}
            >
                Ascending
            </Menu.Item>
            <Menu.Item
                className={`system-log-sort-menu ${query.sort === SortDirection.DESC ? 'checked' : ''}`}
                key="DESC"
                icon={query.sort === SortDirection.DESC ? <CheckOutlined /> : null}
            >
                Descending
            </Menu.Item>
        </Menu>
    );

    useEffect(() => {
        loadLogFile().then();
    }, [loadLogFile]);

    return (
        <Fragment>
            <Row>
                <Col span={16}>
                    <h2 style={{ fontWeight: 500 }}>{translate(`resources.systemmonitor.system_log`)}</h2>
                </Col>
                <Col span={8} style={{ textAlign: 'right' }}>
                    <Space>
                        <Select
                            defaultValue={LogServerType.ApiServer}
                            style={{ width: 150, textAlign: 'left' }}
                            onSelect={(value: any) => onServerTypeChange(value)}
                        >
                            <Option value={LogServerType.ApiServer}>API SERVER</Option>
                            <Option value={LogServerType.ChatClient}>CHAT CLIENT</Option>
                        </Select>
                        <Dropdown overlay={sortMenu}>
                            <Button>
                                <SortAscendingOutlined />
                                {translate(`resources.projects.my_projects.sort.title`)}
                                <DownOutlined />
                            </Button>
                        </Dropdown>
                    </Space>
                </Col>
            </Row>

            {(loading || (resp && resp.list.length > 0)) && (
                <Table
                    id="system-log-table"
                    className="mz-table"
                    dataSource={resp ? resp.list : []}
                    rowKey="id"
                    columns={columns}
                    pagination={{ ...pagination, size: 'small', onChange: onPageChange }}
                    size="small"
                    loading={spin}
                />
            )}

            {!loading && (!resp || !resp.list || resp.list.length === 0) && (
                <Empty
                    className="mz-empty-big"
                    description={
                        <span>
                            ( <SmileOutlined /> {translate(`resources.systemmonitor.message.have_no_log`)} )
                        </span>
                    }
                />
            )}
        </Fragment>
    );
};

export default SystemLogs;
