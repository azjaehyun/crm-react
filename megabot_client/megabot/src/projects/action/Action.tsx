import React, { FC, useCallback, useEffect, useState } from 'react';
import { Button, Col, Empty, notification, Row, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import ActionTaskList from './ActionTaskList';
import CreateActionForm from './CreateActionForm';
import { ReloadOutlined, SmileOutlined } from '@ant-design/icons/lib';
import { useDataProvider, useTranslate } from 'ra-core';
import ActionTaskService, { EmptyScript, Script, ScriptQuery, ScriptResponse } from '../service/actionTaskService';

interface Prods {
    botId: any;
}

const Action: FC<Prods> = (prods: Prods) => {
    const translate = useTranslate();
    const dataProvider = useDataProvider();

    const [creatorId, setCreatorId] = useState();
    const [queryParams, setQueryParams] = useState<ScriptQuery>({ offset: 0, limit: 15 });
    const [resp, setResp] = useState<ScriptResponse>();
    const [selectedScript, setSelectedScript] = useState();

    const [loading, setLoading] = useState(false);
    const [visibleForm, setVisibleForm] = useState(false);

    const pagination = {
        current: queryParams.offset + 1,
        pageSize: queryParams.limit,
        total: resp ? resp.totalCount : 0,
        showTotal: (total: any, range: any) => `${range[0]}-${range[1]} of ${total} items`,
        showSizeChanger: false,
    };

    const showDrawer = (script: any) => {
        let selectedScript = script !== null && script !== undefined ? script : EmptyScript;
        const temp = { ...selectedScript };
        setSelectedScript(temp);
        console.log('showDrawer -> script', temp);
        setVisibleForm(true);
    };

    const closeDrawer = (reload: boolean) => {
        setVisibleForm(false);
        setSelectedScript(null);
        if (reload) {
            loadActionTasks().then();
        }
    };

    const loadActionTasks = useCallback(async () => {
        setLoading(true);
        ActionTaskService.getList(dataProvider, prods.botId, queryParams)
            .then(({ data }: any) => {
                setLoading(false);
                setResp(data);
            })
            .catch((error: any) => {
                setLoading(false);
                notification['error']({
                    message: translate(`common.message.error`),
                    description: translate(`common.message.unknown_error_try_again`),
                });
            });
    }, [dataProvider, prods.botId, queryParams, translate]);

    const onReloadClick = () => {
        if (queryParams.offset !== 0) {
            setQueryParams({ ...queryParams, offset: 0 });
        } else {
            loadActionTasks().then();
        }
    };

    // delete task
    const doDeleteScript = useCallback(
        async (script: Script) => {
            setLoading(true);
            ActionTaskService.delete(dataProvider, prods.botId, creatorId, script.id as number)
                .then(({ data }: any) => {
                    notification['success']({
                        message: translate(`common.message.success`),
                        description: `The script "${script.name}" have been removed.`,
                    });
                    loadActionTasks().then();
                })
                .catch((error: any) => {
                    setLoading(false);
                    notification['error']({
                        message: translate(`common.message.error`),
                        description: translate(`common.message.unknown_error_try_again`),
                    });
                });
        },
        [creatorId, dataProvider, loadActionTasks, prods.botId, translate]
    );

    useEffect(() => {
        setCreatorId(localStorage.getItem('userId'));
        loadActionTasks().then();
    }, [loadActionTasks]);

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
                        {translate(`resources.action.name`)} ({resp ? resp.totalCount : 0})
                    </h5>
                </Col>
                <Col span={16} style={{ textAlign: 'right' }}>
                    {resp && resp.list && resp.list.length > 0 && (
                        <Space>
                            <Button
                                icon={<ReloadOutlined />}
                                className="mz-link-btn"
                                onClick={onReloadClick}
                                disabled={loading}
                            >
                                {translate(`common.button.reload`)}
                            </Button>
                            <Button
                                type="primary"
                                icon={<PlusOutlined />}
                                onClick={() => showDrawer(null)}
                                disabled={loading}
                            >
                                {translate(`resources.action.button.create_action`)}
                            </Button>
                        </Space>
                    )}
                </Col>
            </Row>

            {(loading || (resp && resp.list.length > 0)) && (
                <ActionTaskList
                    botId={prods.botId}
                    actionTaskList={resp ? resp.list : []}
                    loading={loading}
                    pagination={pagination}
                    onPageChange={(page: number) => setQueryParams({ ...queryParams, offset: page - 1 })}
                    onSelected={(script: Script) => showDrawer(script)}
                    onDelete={script => doDeleteScript(script)}
                />
            )}

            {!loading && (!resp || resp.list.length === 0) && (
                <Empty
                    className="mz-empty-big"
                    description={
                        <span>
                            ( <SmileOutlined /> {translate(`resources.action.message.empty`)} )
                        </span>
                    }
                >
                    <Button disabled={loading} type="primary" icon={<PlusOutlined />} onClick={() => showDrawer(null)}>
                        {translate(`resources.action.button.create_action`)}
                    </Button>
                </Empty>
            )}

            <CreateActionForm
                botId={prods.botId}
                creatorId={creatorId}
                visible={visibleForm}
                script={selectedScript}
                onClose={(reload: boolean) => closeDrawer(reload)}
            />
        </div>
    );
};

export default Action;
