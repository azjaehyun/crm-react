import React, { FC, useCallback, useEffect, useState } from 'react';
import BotService from './service/botService';
import { PAGE_SIZE, SORT_DESC } from './common/Constants';
import { notification, Empty, Col, Space, Button, Dropdown, Row, Typography, Input } from 'antd';
import { SortAscendingOutlined, PlusOutlined, DownOutlined } from '@ant-design/icons';
import RecycleBinList from './RecycleBinList';
import { useDataProvider, useTranslate } from 'react-admin';

interface Props {
    loginUsername: any;
}
const { Title } = Typography;
const { Search } = Input;

const RecycleBin: FC<Props> = props => {
    const dataProvider = useDataProvider();
    const translate = useTranslate();
    const [params, setParams] = useState({
        botName: '',
        orderBy: 'CREATED_DATE',
        sort: SORT_DESC,
        offset: 0,
        limit: PAGE_SIZE,
    });

    const [deletedBots, setDeletedBots] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalCount, setTotalCount] = useState(0);
    const loadDeletedBot = useCallback(() => {
        // TODO: error occurred on pagination, need to fix, need to test
        // BotService.getDeletedBots(params)
        // dataProvider
        //     .getList(`bots/listDeletedBots`, params)

        BotService.getDeletedBots(dataProvider, props.loginUsername, params)
            .then(({ data }: any) => {
                console.log(data);
                setDeletedBots(data.list);
                setTotalCount(data.totalCount);
                // notification['success']({
                //     message: 'Success',
                //     description: `Load deleted bot successful`,
                // });
            })
            .then((error: any) => {
                if (error) {
                    notification['error']({
                        message: 'Error',
                        description: `Error during load deleted bots`,
                    });
                }
            });
    }, [dataProvider, params, props.loginUsername]);

    const onPagingCallback = (e: any) => {
        console.log('callback', e);
        setParams({
            ...params,
            offset: (e - 1) * params.limit,
        });
    };
    const onSearchEvent = (event: any) => {
        setParams(params => ({ ...params, botName: event }));
        console.log('search bot with params: ', params);
    };

    useEffect(() => {
        loadDeletedBot();
    }, [loadDeletedBot]);
    if (deletedBots.length <= 0) return <Empty />;
    return (
        <div className="recycle-bin-container">
            <Row>
                <Col span={8}>
                    <Title level={4} style={{ fontWeight: 'normal' }}>
                        {translate(`resources.projects.recycle_bin.title`)} ({totalCount})
                    </Title>
                </Col>
                <Col span={16} style={{ textAlign: 'right' }}>
                    <Space>
                        {/*<Search placeholder="Enter Keyword" onSearch={onSearchEvent} style={{ width: 250 }} />*/}
                        {/*<Dropdown overlay={menu}>*/}
                        {/*    <Button>*/}
                        {/*        <SortAscendingOutlined />*/}
                        {/*        {translate(`resources.projects.my_projects.sort.title`)}*/}
                        {/*        <DownOutlined />*/}
                        {/*    </Button>*/}
                        {/*</Dropdown>*/}
                    </Space>
                </Col>
            </Row>
            <RecycleBinList
                loading={loading}
                reload={onPagingCallback}
                deletedBots={deletedBots}
                total={totalCount}
                pageSize={params.limit}
            />
        </div>
    );
};

export default RecycleBin;
