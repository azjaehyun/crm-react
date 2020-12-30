import React, { FC, useCallback, useEffect, useState } from 'react';
import {
    Button,
    Col,
    Input,
    notification,
    Popconfirm,
    Popover,
    Row,
    Space,
    Table,
    Pagination,
    Typography,
    Tooltip,
    Empty,
    Avatar,
} from 'antd';
import { useDataProvider, useTranslate } from 'ra-core';
import BotGroupService, { BotMemberEvent, EXTERNAL_BOT_CREATED_BY, SearchBotQuery } from '../service/botGroupService';
import { BOT_TYPE } from '../service/botService';
import {
    CheckOutlined,
    DeleteOutlined,
    PlusOutlined,
    ReloadOutlined,
    SearchOutlined,
    UserOutlined,
} from '@ant-design/icons/lib';
import { BOT_LANGUAGES, Icon_SingleBot, PrimaryColor } from '../common/Constants';
import { Scrollbars } from 'react-custom-scrollbars';
import BotMemberSettingForm from './BotMemberSettingForm';
import Moment from 'react-moment';
import { IconText } from '../common/IconText';

const { Paragraph, Text } = Typography;

interface Prods {
    botId: any;
}

const PAGE_SIZE = 10;

const BotMembers: FC<Prods> = (prods: Prods) => {
    const dataProvider = useDataProvider();
    const translate = useTranslate();
    const loginUser = JSON.parse(localStorage.getItem('logged-user') || '{}');

    const [loading, setLoading] = useState<boolean>(false);
    const [searching, setSearching] = useState<boolean>(false);
    const [deleting, setDeleting] = useState<boolean>(false);
    const [addingBotId, setAddingBotId] = useState<string>('');
    const [externalBotResp, setExternalBotResp] = useState<any>([]);

    const [botGroup, setBotGroup] = useState();
    const [childrenBots, setChildrenBots] = useState<Array<any>>([]);
    const [botMemberIds, setBotMemberIds] = useState<Array<string>>([]);
    const [selectedChildIds, setSelectedChildIds] = useState<Array<any>>([]);

    const [editBotMember, setEditBotMember] = useState<any>({});
    const [visibleSettingForm, setVisibleSettingForm] = useState<boolean>(false);
    const [settingSaving, setSettingSaving] = useState<boolean>(false);

    const [searchBotQuery, setSearchBotQuery] = useState<SearchBotQuery>({
        botName: '',
        botType: BOT_TYPE.NORMAL,
        createdBy: EXTERNAL_BOT_CREATED_BY.ALL,
        offset: 0,
        limit: PAGE_SIZE,
    });

    /**
     * get order for new bot member
     */
    const getNextOrder = () => {
        if (childrenBots && childrenBots.length > 0) {
            const lst = childrenBots.map((b: BotMemberEvent) => b.orderNo);
            const maxOrder = Math.max(...lst);
            return maxOrder + 1;
        }
        return 1;
    };

    /**
     * load bot group info
     */
    const loadBotGroupInfo = useCallback(async () => {
        setLoading(true);
        BotGroupService.getBot(dataProvider, prods.botId)
            .then(({ status, data }: any) => {
                setLoading(false);
                if (status === 200) {
                    setBotGroup(data);
                    setBotMemberIds((data.childrenBots || []).map((m: any) => m.bot.id));
                    setChildrenBots(data.childrenBots);
                } else {
                    notification['error']({
                        message: translate(`common.message.error`),
                        description: data.message,
                    });
                    setBotMemberIds([]);
                    setChildrenBots([]);
                }
            })
            .catch((error: any) => {
                setLoading(false);
                notification['error']({
                    message: translate(`common.message.error`),
                    description: translate(`common.message.unknown_error_try_again`),
                });
            });
    }, [dataProvider, prods.botId, translate]);

    /**
     * Load external bot to add to bot group
     */
    const loadExternalBots = useCallback(
        async (query: SearchBotQuery) => {
            setSearching(true);
            BotGroupService.searchExternalBot(dataProvider, loginUser.username, prods.botId, query)
                .then(({ status, data }: any) => {
                    setSearching(false);
                    if (status === 200) {
                        setExternalBotResp(data);
                    } else {
                        notification['error']({
                            message: translate(`common.message.error`),
                            description: data.message,
                        });
                    }
                })
                .catch((error: any) => {
                    setSearching(false);
                    notification['error']({
                        message: translate(`common.message.error`),
                        description: translate(`common.message.unknown_error_try_again`),
                    });
                });
        },
        [dataProvider, loginUser.username, prods.botId, translate]
    );

    /**
     * Add a bot to bot group
     */
    const addBotMember = useCallback(
        async (bot: any) => {
            setAddingBotId(bot.id);
            BotGroupService.addBotMember(dataProvider, botGroup, bot.id, getNextOrder())
                .then(({ status, data }: any) => {
                    setAddingBotId('');
                    if (status === 200) {
                        notification['success']({
                            message: translate(`common.message.success`),
                            description: `Bot '${bot.name}' have been added to '${botGroup.name}'`,
                        });
                        loadBotGroupInfo().then();
                    } else {
                        notification['error']({
                            message: translate(`common.message.error`),
                            description: data.message,
                        });
                    }
                })
                .catch((error: any) => {
                    setAddingBotId('');
                    notification['error']({
                        message: translate(`common.message.error`),
                        description: translate(`common.message.unknown_error_try_again`),
                    });
                });
        },
        [botGroup, dataProvider, getNextOrder, loadBotGroupInfo, translate]
    );

    /**
     * Remove a child' bot from group
     */
    const removeOneBotMember = useCallback(
        async (botMember: BotMemberEvent) => {
            BotGroupService.removeBotMember(dataProvider, botGroup, [botMember.id.botId])
                .then(({ status, data }: any) => {
                    if (status === 200) {
                        loadBotGroupInfo().then();
                        notification['success']({
                            message: translate(`common.message.success`),
                            description: `Bot '${botMember.bot.name}' have been removed from '${botGroup.name}'`,
                        });
                    } else {
                        setLoading(false);
                        notification['error']({
                            message: translate(`common.message.error`),
                            description: data.message,
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
        },
        [botGroup, dataProvider, loadBotGroupInfo, translate]
    );

    /**
     * Remove list of bot members
     */
    const removeListBotMembers = useCallback(
        async (botIdList: Array<string>) => {
            setDeleting(true);
            BotGroupService.removeBotMember(dataProvider, botGroup, botIdList)
                .then(({ status, data }: any) => {
                    setDeleting(false);
                    setSelectedChildIds([]);
                    if (status === 200) {
                        loadBotGroupInfo().then();
                        notification['success']({
                            message: translate(`common.message.success`),
                            description: `'${botIdList.length}' bots member have been removed from '${botGroup.name}'`,
                        });
                    } else {
                        setLoading(false);
                        notification['error']({
                            message: translate(`common.message.error`),
                            description: data.message,
                        });
                    }
                })
                .catch((error: any) => {
                    setDeleting(false);
                    notification['error']({
                        message: translate(`common.message.error`),
                        description: translate(`common.message.unknown_error_try_again`),
                    });
                });
        },
        [botGroup, dataProvider, loadBotGroupInfo, translate]
    );

    /**
     * Update bot member configuration
     */
    const updateBotMember = useCallback(
        async (botMember: BotMemberEvent) => {
            setSettingSaving(true);
            BotGroupService.updateBotMember(dataProvider, botGroup, botMember)
                .then(({ status, data }: any) => {
                    setSettingSaving(false);
                    if (status === 200) {
                        notification['success']({
                            message: translate(`common.message.success`),
                            description: `Bot member '${botMember.bot.name}' have been updated`,
                        });

                        loadBotGroupInfo().then();
                        setEditBotMember({});
                        setVisibleSettingForm(false);
                    } else {
                        notification['error']({
                            message: translate(`common.message.error`),
                            description: data.message,
                        });
                    }
                })
                .catch((error: any) => {
                    setSettingSaving(false);
                    notification['error']({
                        message: translate(`common.message.error`),
                        description: translate(`common.message.unknown_error_try_again`),
                    });
                });
        },
        [botGroup, dataProvider, loadBotGroupInfo, translate]
    );

    /**
     * Render external bot table for adding to group
     */
    const renderExternalBotList = () => (
        <div style={{ padding: '4px 0' }}>
            <Input
                placeholder="Search..."
                suffix={<SearchOutlined style={{ color: PrimaryColor }} />}
                style={{ width: '100%', marginBottom: 8 }}
                onPressEnter={(e: any) => {
                    const query = {
                        ...searchBotQuery,
                        botName: e.target.value,
                        offset: 0,
                        language: botGroup.language,
                    };
                    setSearchBotQuery(query);
                    loadExternalBots(query).then();
                }}
            />
            <Row style={{ margin: '2px 0px 8px 0' }}>
                <Col span={12}>
                    <Text style={{ fontWeight: 500, color: '#222' }}>
                        Total {externalBotResp ? externalBotResp.totalCount : 0} items{' '}
                    </Text>
                </Col>
                <Col span={12} style={{ textAlign: 'right' }}>
                    <Pagination
                        size="small"
                        current={externalBotResp ? externalBotResp.currentPage : 1}
                        pageSize={searchBotQuery.limit}
                        total={externalBotResp ? externalBotResp.totalCount : 0}
                        showTotal={(total: any, range: any) => `${range[0]}-${range[1]} of ${total} items`}
                        showSizeChanger={false}
                        onChange={(page: number) => {
                            const query = { ...searchBotQuery, offset: (page - 1) * PAGE_SIZE };
                            setSearchBotQuery(query);
                            loadExternalBots(query).then();
                        }}
                    />
                </Col>
            </Row>
            <div style={{ height: 400, borderTop: '1px solid #f0f0f0' }}>
                <Scrollbars autoHide autoHideTimeout={500} autoHideDuration={100}>
                    <Table
                        showHeader={false}
                        loading={searching}
                        dataSource={externalBotResp.list || []}
                        rowKey="id"
                        pagination={false}
                        columns={[
                            {
                                render: (bot: any) => (
                                    <div style={{ display: 'flex' }}>
                                        <div style={{ width: 30, marginRight: 16 }}>
                                            <Avatar
                                                shape="square"
                                                style={{ backgroundColor: 'transparent' }}
                                                src={bot.thumbnail}
                                                icon={<Avatar src={Icon_SingleBot} />}
                                            />
                                        </div>
                                        <div style={{ paddingRight: 16 }}>
                                            <div>
                                                <Tooltip
                                                    overlayClassName="mz-tooltip-bot-description"
                                                    title={
                                                        bot.description
                                                            ? bot.description
                                                            : translate(`common.label.no_description`)
                                                    }
                                                >
                                                    <Text style={{ fontWeight: 600, color: '#222' }}>{bot.name}</Text>
                                                </Tooltip>
                                            </div>
                                            <Paragraph
                                                style={{ marginBottom: 4, marginTop: 0 }}
                                                ellipsis={{ rows: 2, expandable: false }}
                                            >
                                                {bot.description
                                                    ? bot.description
                                                    : translate(`common.label.no_description`)}
                                            </Paragraph>
                                            <Space size="large" style={{ color: 'rgba(0, 0, 0, 0.45)', fontSize: 11 }}>
                                                <IconText icon={<UserOutlined />} text={bot.user.username} />
                                                <IconText
                                                    icon={
                                                        <span style={{ color: '#000' }}>
                                                            {BOT_LANGUAGES[bot.language].icon}
                                                        </span>
                                                    }
                                                    text={BOT_LANGUAGES[bot.language].name}
                                                />
                                            </Space>
                                        </div>
                                    </div>
                                ),
                            },
                            {
                                width: 70,
                                render: (bot: any) => (
                                    <div style={{ textAlign: 'center' }}>
                                        {botMemberIds.findIndex(id => id === bot.id) < 0 ? (
                                            <Button
                                                loading={addingBotId === bot.id}
                                                size="small"
                                                icon={<PlusOutlined />}
                                                onClick={() => onAddBotMember(bot)}
                                            >
                                                {translate(`common.button.add`)}
                                            </Button>
                                        ) : (
                                            <CheckOutlined style={{ color: PrimaryColor }} />
                                        )}
                                    </div>
                                ),
                            },
                        ]}
                    />
                </Scrollbars>
            </div>
        </div>
    );

    /**
     * on click add button on external bot list
     */
    const onAddBotMember = (bot: any) => {
        addBotMember(bot).then();
    };

    /**
     * show bot member setting form
     * @param botMember
     */
    const showBotMemberSetting = (botMember: BotMemberEvent) => {
        setEditBotMember({ ...botMember });
        setVisibleSettingForm(true);
    };

    const onSaveBotMember = (botMember: BotMemberEvent) => {
        console.log('onSaveBotMember', botMember);
        updateBotMember(botMember).then();
    };

    useEffect(() => {
        loadBotGroupInfo().then();
    }, [loadBotGroupInfo]);

    /**
     * Bot members columns
     */
    const columns = [
        {
            title: translate('resources.botmember.table_header.bot_member'),
            render: (bot: BotMemberEvent) => (
                <div style={{ display: 'flex', padding: '4px 0px' }}>
                    <div style={{ width: 30, marginRight: 16 }}>
                        <Avatar
                            shape="square"
                            style={{ backgroundColor: 'transparent' }}
                            src={bot.bot.thumbnail}
                            icon={<Avatar src={Icon_SingleBot} />}
                        />
                    </div>
                    <div>
                        <div>
                            <a style={{ fontWeight: 500 }} onClick={() => showBotMemberSetting(bot)}>
                                {bot.bot.name}
                            </a>
                        </div>
                        <Paragraph
                            style={{ marginBottom: 8 }}
                            ellipsis={{
                                rows: 2,
                                expandable: true,
                                symbol: translate('common.label.more'),
                            }}
                        >
                            {bot.bot.description ? bot.bot.description : translate(`common.label.no_description`)}
                        </Paragraph>
                        <div style={{ color: 'rgba(0, 0, 0, 0.45)', fontSize: 11 }}>
                            <Space size="large">
                                <IconText icon={<UserOutlined />} text={bot.bot.botOwner.username} />
                                <IconText
                                    icon={<span style={{ color: '#000' }}>{BOT_LANGUAGES[bot.bot.language].icon}</span>}
                                    text={BOT_LANGUAGES[bot.bot.language].name}
                                />
                                <span>
                                    Updated{' '}
                                    <Moment fromNow withTitle={true} locale={bot.bot.language}>
                                        {bot.bot.updatedOn}
                                    </Moment>
                                </span>
                            </Space>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            width: 120,
            title: translate('resources.botmember.table_header.switch_context'),
            render: (bot: BotMemberEvent) => (
                <div style={{ textAlign: 'center' }}>{bot.allowSwitchContext ? <CheckOutlined /> : null}</div>
            ),
        },
        {
            width: 100,
            title: translate('resources.botmember.table_header.show_confirm'),
            render: (bot: BotMemberEvent) => (
                <div style={{ textAlign: 'center' }}>{bot.allowShowConfirm ? <CheckOutlined /> : null}</div>
            ),
        },
        {
            width: 120,
            title: translate('resources.botmember.table_header.remove_context'),
            render: (bot: BotMemberEvent) => (
                <div style={{ textAlign: 'center' }}>{bot.allowRemoveContext ? <CheckOutlined /> : null}</div>
            ),
        },
        {
            width: 150,
            title: translate('resources.botmember.table_header.trigger_start_step'),
            render: (bot: BotMemberEvent) => (
                <div style={{ textAlign: 'center' }}>{bot.allowTriggerStartStep ? <CheckOutlined /> : null}</div>
            ),
        },
        {
            width: 70,
            title: translate('resources.botmember.table_header.focus_out_message'),
            render: (bot: BotMemberEvent) => (
                <div style={{ textAlign: 'center' }}>{bot.focusOutMessages ? bot.focusOutMessages.length : 0}</div>
            ),
        },
        {
            width: 50,
            render: (botMember: BotMemberEvent) => (
                <div style={{ textAlign: 'right', paddingRight: 8 }}>
                    <Popconfirm
                        overlayStyle={{ width: 300 }}
                        placement="left"
                        title={`Do you want remove bot '${botMember.bot.name}' from bot group '${botGroup.name}'?`}
                        onConfirm={() => removeOneBotMember(botMember)}
                        okText={translate(`common.button.yes`)}
                        cancelText={translate(`common.button.no`)}
                    >
                        <DeleteOutlined className="trash-btn" />
                    </Popconfirm>
                </div>
            ),
        },
    ];

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
                        {translate('resources.botmember.name')} ({botGroup ? botGroup.totalChildBots : 0})
                    </h5>
                </Col>
                <Col span={16} style={{ textAlign: 'right' }}>
                    <Space>
                        <Button icon={<ReloadOutlined />} onClick={() => loadBotGroupInfo()} className="mz-link-btn">
                            {translate(`common.button.reload`)}
                        </Button>
                        {selectedChildIds.length > 0 && (
                            <Popconfirm
                                overlayStyle={{ width: 300 }}
                                placement="left"
                                title={`Do you want remove ${selectedChildIds.length} bot members from bot group '${
                                    botGroup.name
                                }'?`}
                                onConfirm={() => removeListBotMembers(selectedChildIds)}
                                okText={translate(`common.button.yes`)}
                                cancelText={translate(`common.button.no`)}
                            >
                                <Button
                                    loading={deleting}
                                    icon={<DeleteOutlined style={{ color: 'red' }} />}
                                    className="mz-link-btn"
                                    onClick={() => {}}
                                >
                                    {translate('common.button.delete')} ({selectedChildIds.length})
                                </Button>
                            </Popconfirm>
                        )}
                        <Popover
                            overlayStyle={{ width: 550 }}
                            placement="leftTop"
                            content={renderExternalBotList}
                            trigger="click"
                        >
                            <Button
                                type="primary"
                                icon={<PlusOutlined />}
                                onClick={() => {
                                    const query = {
                                        ...searchBotQuery,
                                        botName: '',
                                        offset: 0,
                                        language: botGroup.language,
                                    };
                                    setSearchBotQuery(query);
                                    loadExternalBots(query).then();
                                }}
                            >
                                {translate('resources.botmember.button.add_bot')}
                            </Button>
                        </Popover>
                    </Space>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    {(childrenBots.length > 0 || loading) && (
                        <Table
                            className="mz-table"
                            showHeader={true}
                            tableLayout="auto"
                            size="small"
                            loading={loading}
                            dataSource={(childrenBots || []).sort((a: BotMemberEvent, b: BotMemberEvent) => {
                                return a.orderNo > b.orderNo ? -1 : 1;
                            })}
                            rowKey={(bot: any) => bot.id.botId}
                            rowSelection={{
                                onChange: (selectedRowKeys, selectedRows) => {
                                    setSelectedChildIds(selectedRowKeys);
                                },
                            }}
                            pagination={false}
                            columns={columns}
                        />
                    )}

                    {childrenBots.length === 0 && !loading && (
                        <Empty className="mz-empty" description="No member yet." />
                    )}
                </Col>
            </Row>

            <BotMemberSettingForm
                botGroup={botGroup}
                saving={settingSaving}
                visible={visibleSettingForm}
                botMember={editBotMember}
                onClose={(reload: boolean) => {
                    setEditBotMember(undefined);
                    setVisibleSettingForm(false);
                    if (reload) loadBotGroupInfo().then();
                }}
                onSave={(botMember: BotMemberEvent) => onSaveBotMember(botMember)}
            />
        </div>
    );
};

export default BotMembers;
