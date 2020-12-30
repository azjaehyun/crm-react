import React, { FC, useCallback, useEffect, useState } from 'react';
import { Bot, PGroup } from '../types';
import { Button, Input, Dropdown, Menu, Divider, Row, Col, Typography, Space } from 'antd';

import { DownOutlined, CheckOutlined, SortAscendingOutlined } from '@ant-design/icons';

import SharedList from './SharedList';
import 'antd/dist/antd.css';
import { useDataProvider, useTranslate } from 'react-admin';
import { NAME, PAGE_SIZE, PrimaryColor, SORT_ASC } from './common/Constants';
import { SearchOutlined } from '@ant-design/icons/lib';

interface State {
    pList?: Bot[];
    pGroup?: PGroup[];
    loginUsername?: string;
}

const { Search } = Input;
const { Title } = Typography;
const Shared: FC<State> = props => {
    const dataProvider = useDataProvider();
    const translate = useTranslate();
    const [sharedBots, setSharedBots] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [params, setParams] = useState({
        botName: '',
        orderBy: NAME,
        sort: SORT_ASC,
        offset: 0,
        limit: PAGE_SIZE,
    });
    const loadSharedBot = useCallback(async () => {
        console.log('loading list of bots');
        setLoading(true);
        dataProvider
            .getList('bots/externalSearch', params)
            .then(({ data }: any) => {
                setSharedBots(data.list);
                setTotalCount(data.totalCount);
                setLoading(false);
            })
            .catch((error: any) => {
                console.log(error);
                setLoading(false);
            });
    }, [dataProvider, params]);

    useEffect(() => {
        loadSharedBot().then();
    }, [loadSharedBot, params]);

    const onSearchEvent = (even: any) => {
        setParams(params => ({ ...params, botName: even }));
    };

    const handleMenuClick = (e: any) => {
        if (e.key === 'ASC' || e.key === 'DESC') {
            setParams({
                ...params,
                sort: e.key,
            });
        } else {
            setParams({
                ...params,
                orderBy: e.key,
            });
        }
    };

    const menu = (
        <Menu onClick={handleMenuClick} style={{ width: 120 }}>
            <Menu.Item
                className={`project-sort-list ${params.orderBy === 'NAME' ? 'checked' : ''}`}
                key="NAME"
                icon={params.orderBy === 'NAME' ? <CheckOutlined /> : null}
            >
                {translate(`resources.projects.shared.sort.name`)}
            </Menu.Item>

            <Menu.Item
                className={`project-sort-list ${params.orderBy === 'CREATED_DATE' ? 'checked' : ''}`}
                key="CREATED_DATE"
                icon={params.orderBy === 'CREATED_DATE' ? <CheckOutlined /> : null}
            >
                {translate(`resources.projects.shared.sort.create_date`)}
            </Menu.Item>
            <Menu.Item
                className={`project-sort-list ${params.orderBy === 'UPDATED_DATE' ? 'checked' : ''}`}
                key="UPDATED_DATE"
                icon={params.orderBy === 'UPDATED_DATE' ? <CheckOutlined /> : null}
            >
                {translate(`resources.projects.shared.sort.update_date`)}
            </Menu.Item>
            <Divider style={{ margin: 0 }} />
            <Menu.Item
                className={`project-sort-list ${params.sort === 'ASC' ? 'checked' : ''}`}
                key="ASC"
                icon={params.sort === 'ASC' ? <CheckOutlined /> : null}
            >
                {translate(`resources.projects.shared.sort.ascending`)}
            </Menu.Item>
            <Menu.Item
                className={`project-sort-list ${params.sort === 'DESC' ? 'checked' : ''}`}
                key="DESC"
                icon={params.sort === 'DESC' ? <CheckOutlined /> : null}
            >
                {translate(`resources.projects.shared.sort.descending`)}
            </Menu.Item>
        </Menu>
    );

    return (
        <div className="shared-container">
            <Row>
                <Col span={8}>
                    <Title level={4} style={{ fontWeight: 'normal' }}>
                        {translate(`resources.projects.shared.title`)} ({totalCount})
                    </Title>
                </Col>
                <Col span={16} style={{ textAlign: 'right' }} />
            </Row>
            <Row style={{ marginBottom: 8, marginTop: 8 }}>
                <Col span={24} style={{ textAlign: 'right' }}>
                    <Space>
                        {/*<Search*/}
                        {/*    placeholder="Enter Keyword"*/}
                        {/*    onSearch={value => setParams(params => ({ ...params, botName: value }))}*/}
                        {/*    style={{ width: 250 }}*/}
                        {/*/>*/}
                        <Input
                            placeholder={translate(`common.message.search`)}
                            suffix={<SearchOutlined style={{ color: PrimaryColor }} />}
                            style={{ width: 250 }}
                            onPressEnter={(e: any) => onSearchEvent(e.target.value)}
                            allowClear={true}
                            autoComplete="off"
                        />
                        <Dropdown overlay={menu}>
                            <Button>
                                <SortAscendingOutlined />
                                {translate(`resources.projects.shared.sort.title`)}
                                <DownOutlined />
                            </Button>
                        </Dropdown>
                    </Space>
                </Col>
            </Row>
            <SharedList sharedBots={sharedBots} loading={loading} loginUsername={props.loginUsername} />
        </div>
    );
};

export default Shared;
