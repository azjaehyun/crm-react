import React, { FC, useState, useCallback, useEffect } from 'react';
import { Bot, PGroup } from '../types';
import {
    Button,
    Badge,
    Input,
    Dropdown,
    Menu,
    Divider,
    Col,
    Row,
    Empty,
    Space,
    Typography,
    Radio,
    notification,
} from 'antd';

import { PlusOutlined, DownOutlined, CheckOutlined, SortAscendingOutlined } from '@ant-design/icons';

import CreateProjectForm from './CreateProjectForm';
import MyProjectsList from './MyProjectsList';
import { useDataProvider, useTranslate } from 'react-admin';
import {
    BOT_GROUP,
    DEFAULT_CATEGORY,
    NORMAL_BOT,
    PAGE_SIZE,
    PrimaryColor,
    SERVICE_BOT,
    SORT_DESC,
} from './common/Constants';
import BotService, { BOT_ERROR_MESSAGES } from './service/botService';
import { ReloadOutlined, SearchOutlined } from '@ant-design/icons/lib';
import { useHistory } from 'react-router';

interface State {
    pList?: Bot[];
    pGroup?: PGroup[];
    loginUsername: string;
}

const { Title } = Typography;
const { Search } = Input;

const MyProjects: FC<State> = props => {
    const dataProvider = useDataProvider();
    const translate = useTranslate();
    let history = useHistory();

    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    const [botList, setBotList] = useState([]);
    const [botTemplates, setBotTemplates] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [params, setParams] = useState({
        botName: '',
        orderBy: 'CREATED_DATE',
        sort: SORT_DESC,
        offset: 0,
        limit: PAGE_SIZE,
        category: DEFAULT_CATEGORY,
    });
    // Call API for get data
    const loadBotList = useCallback(async () => {
        setLoading(true);
        BotService.search(dataProvider, props.loginUsername, params)
            .then(({ data }: any) => {
                setBotList(data.list);
                setTotalCount(data.totalCount);
                setLoading(false);
            })
            .catch((error: any) => {
                setError(error);
                setLoading(false);
            });
    }, [dataProvider, props.loginUsername, params]);

    const loadTemplates = useCallback(() => {
        BotService.getBotTemplate(dataProvider)
            .then(({ data }: any) => {
                setBotTemplates(data);
                setLoading(false);
            })
            .catch((error: any) => {
                setLoading(false);
                setError(error);
            });
    }, [dataProvider]);

    const onDeleteBot = (botId: string) => {
        setLoading(true);
        BotService.deleteBot(dataProvider, botId)
            .then(({ data }: any) => {
                setLoading(false);
                loadBotList();
            })
            .catch((error: any) => {
                setLoading(false);
            });
    };

    useEffect(() => {
        loadBotList().then();
    }, [loadBotList, params]);

    // Event
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

    const onPagingCallback = (e: any) => {
        setParams({
            ...params,
            offset: (e - 1) * params.limit,
        });
    };

    const showDrawer = () => {
        setVisible(true);
        if (botTemplates === null || botTemplates === undefined || Object.keys(botTemplates).length == 0) {
            loadTemplates();
        }
    };

    const onClose = () => {
        setVisible(false);
    };

    const onFinish = (bot: any) => {
        setLoading(true);
        BotService.createBot(dataProvider, props.loginUsername, bot)
            .then((response: any) => {
                if (response.status === 200) {
                    notification['success']({
                        message: 'Success',
                        description: `Create bot named ${bot.name} successful!`,
                    });
                    onPagingCallback(1);
                    setLoading(false);
                    setVisible(false);

                    history.push(`project-details/${response.data.id}`);
                } else {
                    notification['error']({
                        message: 'Error',
                        description: translate(BOT_ERROR_MESSAGES[response.status]),
                    });
                }
            })
            .catch((error: any) => {
                notification['error']({
                    message: 'Error',
                    description: 'Error during create new a bot.',
                });
                setLoading(false);
            });
    };

    const onFinishFailed = (errorFields: any) => {
        // form.scrollToField(errorFields[0].name);
    };

    const onSearchEvent = (event: any) => {
        setParams(params => ({ ...params, offset: 0, botName: event }));
    };
    const menu = (
        <Menu onClick={handleMenuClick} style={{ width: 140 }}>
            <Menu.Item
                className={`project-sort-list ${params.orderBy === 'NAME' ? 'checked' : ''}`}
                key="NAME"
                icon={params.orderBy === 'NAME' ? <CheckOutlined /> : null}
            >
                {translate(`resources.projects.my_projects.sort.name`)}
            </Menu.Item>

            <Menu.Item
                className={`project-sort-list ${params.orderBy === 'CREATED_DATE' ? 'checked' : ''}`}
                key="CREATED_DATE"
                icon={params.orderBy === 'CREATED_DATE' ? <CheckOutlined /> : null}
            >
                {translate(`resources.projects.my_projects.sort.create_date`)}
            </Menu.Item>
            <Menu.Item
                className={`project-sort-list ${params.orderBy === 'UPDATED_DATE' ? 'checked' : ''}`}
                key="UPDATED_DATE"
                icon={params.orderBy === 'UPDATED_DATE' ? <CheckOutlined /> : null}
            >
                {translate(`resources.projects.my_projects.sort.update_date`)}
            </Menu.Item>
            <Divider style={{ margin: 0 }} />
            <Menu.Item
                className={`project-sort-list ${params.sort === 'ASC' ? 'checked' : ''}`}
                key="ASC"
                icon={params.sort === 'ASC' ? <CheckOutlined /> : null}
            >
                {translate(`resources.projects.my_projects.sort.ascending`)}
            </Menu.Item>
            <Menu.Item
                className={`project-sort-list ${params.sort === 'DESC' ? 'checked' : ''}`}
                key="DESC"
                icon={params.sort === 'DESC' ? <CheckOutlined /> : null}
            >
                {translate(`resources.projects.my_projects.sort.descending`)}
            </Menu.Item>
        </Menu>
    );

    return (
        <div className="my-project-container">
            <Row>
                <Col span={8}>
                    <Title level={4} style={{ fontWeight: 'normal' }}>
                        {translate(`resources.projects.my_projects.title`)} ({totalCount})
                    </Title>
                </Col>
                <Col span={16} style={{ textAlign: 'right' }} />
            </Row>
            <Row style={{ marginBottom: 8, marginTop: 8 }}>
                {/*<Col span={12}>*/}
                {/*    <Space>*/}
                {/*        <Input*/}
                {/*            placeholder="Search..."*/}
                {/*            suffix={<SearchOutlined style={{ color: PrimaryColor }} />}*/}
                {/*            style={{ width: 300 }}*/}
                {/*            onPressEnter={(e: any) => onSearchEvent(e.target.value)}*/}
                {/*            allowClear={true}*/}
                {/*            autoComplete="off"*/}
                {/*        />*/}
                {/*        <Button*/}
                {/*            type="primary"*/}
                {/*            className="create-project-btn"*/}
                {/*            icon={<PlusOutlined />}*/}
                {/*            onClick={showDrawer}*/}
                {/*        >*/}
                {/*            {translate(`resources.projects.my_projects.create`)}*/}
                {/*        </Button>*/}
                {/*    </Space>*/}
                {/*</Col>*/}
                <Col span={24} style={{ textAlign: 'right' }}>
                    <Space>
                        {/*<Button icon={<ReloadOutlined />} onClick={() => loadBotList()} className="mz-link-btn">*/}
                        {/*    {translate(`common.button.reload`)}*/}
                        {/*</Button>*/}
                        {/*<Radio.Group*/}
                        {/*    options={[*/}
                        {/*        { label: 'ALL', value: 'ALL' },*/}
                        {/*        { label: 'SINGLE', value: NORMAL_BOT },*/}
                        {/*        { label: 'SERVICE', value: SERVICE_BOT },*/}
                        {/*        { label: 'GROUP', value: BOT_GROUP },*/}
                        {/*    ]}*/}
                        {/*    value="ALL"*/}
                        {/*    optionType="button"*/}
                        {/*    buttonStyle="solid"*/}
                        {/*/>*/}
                        <Input
                            placeholder={translate(`common.message.search`)}
                            suffix={<SearchOutlined style={{ color: PrimaryColor }} />}
                            style={{ width: 250 }}
                            onPressEnter={(e: any) => onSearchEvent(e.target.value)}
                            allowClear={true}
                            autoComplete="off"
                        />
                        <Button
                            type="primary"
                            className="create-project-btn"
                            icon={<PlusOutlined />}
                            onClick={showDrawer}
                        >
                            {translate(`resources.projects.my_projects.create`)}
                        </Button>
                        <Dropdown overlay={menu}>
                            <Button>
                                <SortAscendingOutlined />
                                {translate(`resources.projects.my_projects.sort.title`)}
                                <DownOutlined />
                            </Button>
                        </Dropdown>
                    </Space>
                </Col>
            </Row>

            <CreateProjectForm
                visible={visible}
                templates={botTemplates}
                onClose={onClose}
                onSave={onFinish}
                onFinishFailed={onFinishFailed}
                loading={loading}
            />
            {loading == false && botList.length <= 0 ? (
                <Empty />
            ) : (
                <MyProjectsList
                    pList={botList}
                    total={totalCount}
                    pageSize={params.limit}
                    reload={onPagingCallback}
                    loading={loading}
                    onDeleteBot={onDeleteBot}
                />
            )}
        </div>
    );
};

export default MyProjects;
