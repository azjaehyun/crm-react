import React, { FC, useState, useCallback, useEffect, Fragment } from 'react';
import { Avatar, Card, Col, Empty, Layout, Row } from 'antd';
import {
    AppstoreOutlined,
    MessageOutlined,
    NodeIndexOutlined,
    FormOutlined,
    GoldOutlined,
    ApiOutlined,
    QuestionOutlined,
    CommentOutlined,
} from '@ant-design/icons';

import { useParams } from 'react-router';
import ProjectInfoHeader from './ProjectInfoHeader';
import { Loading, MenuItemLink, useTranslate } from 'react-admin';
import BotService, { BOT_TYPE } from './service/botService';

import './scss/ProjectDetail.scss';
import { BOT_GROUP, BOT_TYPES, Icon_SingleBot, NORMAL_BOT } from './common/Constants';
import { Switch, Route, Link } from 'react-router-dom';

import Intents from './intents/Intents';
import Entities from './entities/Entities';
import AutomateTasks from './automateTasks/AutomateTasks';
import BotSummary from './summary/BotSummary';
import Action from './action/Action';
import Dialog from './dialogFlow/Dialog';
import SmallTalk from './smallTalk/SmallTalk';
import { useDataProvider } from 'ra-core';
import { Bot } from '../types';
import BotMembers from './botMember/BotMembers';
import BotGroupIntents from './intents/BotGroupIntents';
import ProjectChannel from '../projects/channel/ProjectChannel';
import ProjectDeploy from './deploy/ProjectDeploy';

const { Sider, Content } = Layout;
const { Meta } = Card;

interface Prods {
    botId: any;
}

const ProjectsDetail: FC<Prods> = (prods: Prods) => {
    const dataProvider = useDataProvider();
    const [loading, setLoading] = useState(false);
    const [collapsed, setCollapsed] = useState(false);
    const [bot, setBot] = useState<Bot>();
    let { botId } = useParams();

    const translate = useTranslate();

    const getBotInfo = useCallback(
        async (noLoading?: boolean) => {
            console.log('loading bot information for Id: ' + botId, noLoading);
            if (noLoading !== false) {
                setLoading(true);
            }
            BotService.getById(dataProvider, botId)
                .then(({ data }: any) => {
                    setLoading(false);
                    setBot(data);
                })
                .catch((error: any) => {
                    setLoading(false);
                });
        },
        [botId, dataProvider]
    );
    useEffect(() => {
        getBotInfo().then();
    }, [botId, getBotInfo]);

    const callBackUpdate = (botUpdated: any) => {
        getBotInfo(false);
    };

    const onCollapse = (collapsed: any) => {
        setCollapsed(collapsed);
    };

    if (loading) return <Loading />;
    if (!bot) return <Empty />;

    return (
        <Layout>
            <Sider className="mz-bot-sider">
                <div style={{ textAlign: 'center', padding: '16px 0px' }}>
                    <Avatar
                        shape="square"
                        style={{ backgroundColor: 'transparent' }}
                        src={bot.thumbnail}
                        size={collapsed ? 50 : 100}
                        icon={<Avatar shape="square" size={collapsed ? 50 : 100} src={BOT_TYPES[bot.botType].icon} />}
                    />
                </div>
                <div className="mz-bot-menu">
                    <Link to={`/project-details/${bot.id}/summary`}>
                        <Card style={{ borderRadius: 10, margin: 5 }}>
                            <Meta
                                avatar={<AppstoreOutlined style={{ fontSize: 16, paddingTop: 10 }} />}
                                title={translate(`resources.projects.menu.bot_summary.title`)}
                                description={translate(`resources.projects.menu.bot_summary.description`)}
                            />
                        </Card>
                    </Link>
                    <Link to={`/project-details/${bot.id}/automate`}>
                        <Card style={{ borderRadius: 10, margin: 5 }}>
                            <Meta
                                avatar={<MessageOutlined style={{ fontSize: 16, paddingTop: 10 }} />}
                                title={translate(`resources.projects.menu.automate_tasks.title`)}
                                description={translate(`resources.projects.menu.automate_tasks.description`)}
                            />
                        </Card>
                    </Link>
                    {bot.botType !== BOT_TYPE.BOT_GROUP && (
                        <Link to={`/project-details/${bot.id}/entity`}>
                            <Card style={{ borderRadius: 10, margin: 5 }}>
                                <Meta
                                    avatar={<GoldOutlined style={{ fontSize: 16, paddingTop: 10 }} />}
                                    title={translate(`resources.projects.menu.entities`)}
                                    description={translate(`resources.projects.menu.entities`)}
                                />
                            </Card>
                        </Link>
                    )}
                    <Link to={`/project-details/${bot.id}/intent`}>
                        <Card style={{ borderRadius: 10, margin: 5 }}>
                            <Meta
                                avatar={<FormOutlined style={{ fontSize: 16, paddingTop: 10 }} />}
                                title={translate(`resources.projects.menu.intents`)}
                                description={translate(`resources.projects.menu.intents`)}
                            />
                        </Card>
                    </Link>
                    {bot.botType !== BOT_TYPE.BOT_GROUP && (
                        <Fragment>
                            <Link to={`/project-details/${bot.id}/action`}>
                                <Card style={{ borderRadius: 10, margin: 5 }}>
                                    <Meta
                                        avatar={<ApiOutlined style={{ fontSize: 16, paddingTop: 10 }} />}
                                        title={translate(`resources.projects.menu.action_tasks`)}
                                        description={translate(`resources.projects.menu.action_tasks`)}
                                    />
                                </Card>
                            </Link>
                            <Link to={`/project-details/${bot.id}/smalltalk`}>
                                <Card style={{ borderRadius: 10, margin: 5 }}>
                                    <Meta
                                        avatar={<QuestionOutlined style={{ fontSize: 16, paddingTop: 10 }} />}
                                        title={translate(`resources.projects.menu.small_talk.title`)}
                                        description={translate(`resources.projects.menu.small_talk.description`)}
                                    />
                                </Card>
                            </Link>
                            <Link to={`/project-details/${bot.id}/dialogflow`}>
                                <Card style={{ borderRadius: 10, margin: 5 }}>
                                    <Meta
                                        avatar={<NodeIndexOutlined style={{ fontSize: 16, paddingTop: 10 }} />}
                                        title={translate(`resources.projects.menu.dialog_flow`)}
                                        description={translate(`resources.projects.menu.dialog_flow`)}
                                    />
                                </Card>
                            </Link>
                            <Link to={`/project-details/${bot.id}/deploy`}>
                                <Card style={{ borderRadius: 10, margin: 5 }}>
                                    <Meta
                                        avatar={<NodeIndexOutlined style={{ fontSize: 16, paddingTop: 10 }} />}
                                        title={translate(`resources.projects.menu.deploy`)}
                                        description={translate(`resources.projects.menu.deploy`)}
                                    />
                                </Card>
                            </Link>
                            <Link to={`/project-details/${bot.id}/channel`}>
                                <Card style={{ borderRadius: 10, margin: 5 }}>
                                    <Meta
                                        avatar={<CommentOutlined style={{ fontSize: 16, paddingTop: 10 }} />}
                                        title={translate(`resources.projects.menu.channel.title`)}
                                        description={translate(`resources.projects.menu.channel.description`)}
                                    />
                                </Card>
                            </Link>
                        </Fragment>
                    )}
                    {bot.botType === BOT_TYPE.BOT_GROUP && (
                        <Fragment>
                            <Link to={`/project-details/${bot.id}/bot-members`}>
                                <Card style={{ borderRadius: 10, margin: 5 }}>
                                    <Meta
                                        avatar={<GoldOutlined style={{ fontSize: 16, paddingTop: 10 }} />}
                                        title={translate(`resources.projects.menu.bot_members`)}
                                        description={translate(`resources.projects.menu.bot_members`)}
                                    />
                                </Card>
                            </Link>
                            <Link to={`/project-details/${bot.id}/deploy`}>
                                <Card style={{ borderRadius: 10, margin: 5 }}>
                                    <Meta
                                        avatar={<NodeIndexOutlined style={{ fontSize: 16, paddingTop: 10 }} />}
                                        title={translate(`resources.projects.menu.deploy`)}
                                        description={translate(`resources.projects.menu.deploy`)}
                                    />
                                </Card>
                            </Link>
                        </Fragment>
                    )}
                    {/*<MenuItemLink*/}
                    {/*    to={`/project-details/${bot.id}/summary`}*/}
                    {/*    primaryText={translate(`resources.projects.menu.bot_summary`)}*/}
                    {/*    leftIcon={<AppstoreOutlined />}*/}
                    {/*/>*/}
                    {/*<MenuItemLink*/}
                    {/*    to={`/project-details/${bot.id}/automate`}*/}
                    {/*    primaryText={translate(`resources.projects.menu.automate_tasks`)}*/}
                    {/*    leftIcon={<MessageOutlined />}*/}
                    {/*/>*/}
                    {/*{bot.botType !== BOT_TYPE.BOT_GROUP && (*/}
                    {/*    <MenuItemLink*/}
                    {/*        to={`/project-details/${bot.id}/entity`}*/}
                    {/*        primaryText={translate(`resources.projects.menu.entities`)}*/}
                    {/*        leftIcon={<GoldOutlined />}*/}
                    {/*    />*/}
                    {/*)}*/}
                    {/*<MenuItemLink*/}
                    {/*    to={`/project-details/${bot.id}/intent`}*/}
                    {/*    primaryText={translate(`resources.projects.menu.intents`)}*/}
                    {/*    leftIcon={<FormOutlined />}*/}
                    {/*/>*/}
                    {/*{bot.botType !== BOT_TYPE.BOT_GROUP && (*/}
                    {/*    <Fragment>*/}
                    {/*        <MenuItemLink*/}
                    {/*            to={`/project-details/${bot.id}/action`}*/}
                    {/*            primaryText={translate(`resources.projects.menu.action_tasks`)}*/}
                    {/*            leftIcon={<ApiOutlined />}*/}
                    {/*        />*/}
                    {/*        <MenuItemLink*/}
                    {/*            to={`/project-details/${bot.id}/smalltalk`}*/}
                    {/*            primaryText={translate(`resources.projects.menu.small_talk`)}*/}
                    {/*            leftIcon={<QuestionOutlined />}*/}
                    {/*        />*/}
                    {/*        <MenuItemLink*/}
                    {/*            to={`/project-details/${bot.id}/dialogflow`}*/}
                    {/*            primaryText={translate(`resources.projects.menu.dialog_flow`)}*/}
                    {/*            leftIcon={<NodeIndexOutlined />}*/}
                    {/*        />*/}
                    {/*        <MenuItemLink*/}
                    {/*            to={`/project-details/${bot.id}/channel`}*/}
                    {/*            primaryText={translate(`resources.projects.menu.channel`)}*/}
                    {/*            leftIcon={<CommentOutlined />}*/}
                    {/*        />*/}
                    {/*    </Fragment>*/}
                    {/*)}*/}
                    {/*{bot.botType === BOT_TYPE.BOT_GROUP && (*/}
                    {/*    <MenuItemLink*/}
                    {/*        to={`/project-details/${bot.id}/bot-members`}*/}
                    {/*        primaryText={translate(`resources.projects.menu.bot_members`)}*/}
                    {/*        leftIcon={<GoldOutlined />}*/}
                    {/*    />*/}
                    {/*)}*/}
                </div>
            </Sider>
            <Layout className="site-layout">
                <Content>
                    <Row className="detail-container">
                        <Col span={24} className="contents-container">
                            <ProjectInfoHeader bot={bot} />
                            <Switch>
                                <Route exact path="/project-details/:botId/summary">
                                    <BotSummary bot={bot} callBackUpdate={callBackUpdate} />
                                </Route>
                                <Route path="/project-details/:botId/automate">
                                    <AutomateTasks bot={bot} />
                                </Route>
                                <Route path="/project-details/:botId/entity">
                                    <Entities botId={botId} />
                                </Route>
                                <Route path="/project-details/:botId/intent">
                                    {bot.botType !== BOT_GROUP ? (
                                        <Intents bot={bot} />
                                    ) : (
                                        <BotGroupIntents botId={botId} />
                                    )}
                                </Route>
                                <Route path="/project-details/:botId/action">
                                    <Action botId={botId} />
                                </Route>
                                <Route path="/project-details/:botId/smalltalk">
                                    <SmallTalk botId={botId} />
                                </Route>
                                <Route path="/project-details/:botId/dialogflow">
                                    <Dialog botId={botId} />
                                </Route>
                                <Route path="/project-details/:botId/bot-members">
                                    <BotMembers botId={botId} />
                                </Route>
                                <Route path="/project-details/:botId/deploy">
                                    <ProjectDeploy botId={botId} />
                                </Route>
                                <Route path="/project-details/:botId">
                                    <ProjectChannel botId={botId} />
                                </Route>
                            </Switch>
                        </Col>
                    </Row>
                </Content>
            </Layout>
        </Layout>
    );
};

export default ProjectsDetail;
