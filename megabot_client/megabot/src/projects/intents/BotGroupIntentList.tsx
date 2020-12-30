import React, { FC, useCallback, useState } from 'react';
import { Button, notification, Popover, Table, Tag } from 'antd';
import { CommentOutlined } from '@ant-design/icons';
import { LinkOutlined, PlusOutlined } from '@ant-design/icons/lib';
import { IndicatorIcon, PrimaryColor } from '../common/Constants';
import { useTranslate } from 'react-admin';
import { Scrollbars } from 'react-custom-scrollbars';
import BotGroupService, { SimilarIntent } from '../service/botGroupService';
import { useDataProvider } from 'ra-core';

interface Prods {
    loading: any;
    intentList: any;
    botGroup: any;
    onChange: () => void;
}

const BotGroupIntentsList: FC<Prods> = (prods: Prods) => {
    const translate = useTranslate();
    const dataProvider = useDataProvider();

    const [updating, setUpdating] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedSimilarIntents, setSelectedSimilarIntents] = useState<Array<SimilarIntent>>(
        prods.botGroup
            ? (prods.botGroup.linkedConfirmIntents || []).map((it: any) => {
                  return {
                      id: it.id,
                      name: it.name,
                      numberOfSentences: it.sampleCount || 0,
                      botId: it.bot.id,
                      botName: it.bot.name,
                  } as SimilarIntent;
              })
            : []
    );
    const [similarIntents, setSimilarIntents] = useState<Array<SimilarIntent>>([]);

    /**
     * List all intents which one similar to TRUE / YES intent of bot group
     */
    const loadSimilarConfirmIntents = useCallback(
        async (intentId: string) => {
            setLoading(true);
            BotGroupService.loadRecommendConfirmIntents(dataProvider, prods.botGroup.id, intentId)
                .then(({ status, data }: any) => {
                    setLoading(false);
                    if (status === 200) {
                        setSimilarIntents(data);
                    } else {
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
        [dataProvider, prods.botGroup.id, translate]
    );

    /**
     * update linked intents
     */
    const updateLinkedConfirmIntents = useCallback(async () => {
        setUpdating(true);
        BotGroupService.updateLinkedConfirmIntent(dataProvider, prods.botGroup.id, selectedSimilarIntents)
            .then(({ status, data }: any) => {
                setUpdating(false);
                if (status === 200) {
                    prods.onChange();
                    notification['success']({
                        message: translate(`common.message.success`),
                        description: translate(`resources.intents.message.update_linked_confirm_intent_completed`),
                    });
                } else {
                    notification['error']({
                        message: translate(`common.message.error`),
                        description: data.message,
                    });
                }
            })
            .catch((error: any) => {
                setUpdating(false);
                notification['error']({
                    message: translate(`common.message.error`),
                    description: translate(`common.message.unknown_error_try_again`),
                });
            });
    }, [dataProvider, prods, selectedSimilarIntents, translate]);

    const spin = {
        indicator: IndicatorIcon,
        spinning: prods.loading,
        tip: translate(`common.message.loading`),
    };

    const onRowCheckChange = (selectedRowKeys: any, selectedRows: any) => {
        setSelectedSimilarIntents(selectedRows);
    };

    /**
     * Search similar confirm intent
     */
    const renderChildBotIntents = (
        <>
            <h5 style={{ fontSize: 15, fontWeight: 400 }}>Linked Confirm Intent</h5>

            {/*<Input*/}
            {/*    placeholder="Search..."*/}
            {/*    suffix={<SearchOutlined style={{ color: PrimaryColor }} />}*/}
            {/*    style={{ width: '100%', marginBottom: 8 }}*/}
            {/*    onPressEnter={(e: any) => {}}*/}
            {/*/>*/}
            <div style={{ paddingBottom: 6 }}>
                {(selectedSimilarIntents || []).map((it: any) => (
                    <Tag icon={<LinkOutlined />} color="blue" style={{ marginBottom: 3 }}>
                        #{it.botName}.{it.name}
                    </Tag>
                ))}
            </div>
            <div style={{ height: 400, border: '1px solid #f0f0f0' }}>
                <Scrollbars autoHide autoHideTimeout={500} autoHideDuration={100}>
                    <Table
                        size="small"
                        loading={loading}
                        showHeader={false}
                        dataSource={similarIntents || []}
                        rowKey="id"
                        pagination={false}
                        rowSelection={{
                            type: 'checkbox',
                            selectedRowKeys: (selectedSimilarIntents || []).map((it: any) => it.id),
                            onChange: onRowCheckChange,
                        }}
                        columns={[
                            {
                                render: (childIntent: any) => (
                                    <div style={{ paddingRight: 16 }}>
                                        #{childIntent.botName}.{childIntent.name} ({childIntent.similarity.toFixed(3)})
                                    </div>
                                ),
                            },
                            {
                                width: 70,
                                render: (childIntent: any) => (
                                    <Tag className="mz-tag mz-tag-white">
                                        <CommentOutlined />
                                        <span className="mz-tag-content">{childIntent.numberOfSentences || 0}</span>
                                    </Tag>
                                ),
                            },
                        ]}
                    />
                </Scrollbars>
            </div>

            <div style={{ marginTop: 8 }}>
                <Button
                    loading={updating}
                    disabled={similarIntents.length === 0}
                    style={{ width: '100%' }}
                    type="primary"
                    ghost
                    onClick={() => updateLinkedConfirmIntents()}
                >
                    UPDATE
                </Button>
            </div>
        </>
    );

    const columns = [
        {
            title: translate(`resources.intents.table_header.intent`),
            width: 150,
            render: (intent: any) => <span style={{ color: PrimaryColor }}>#{intent.name}</span>,
        },
        {
            title: translate(`resources.intents.table_header.samples`),
            width: 150,
            render: (record: any) => (
                <div>
                    <Tag title={`There are ${record.sampleCount} samples`} className="mz-tag mz-tag-white">
                        <CommentOutlined />
                        <span className="mz-tag-content">{record.sampleCount}</span>
                    </Tag>
                    {record.slots.map((slot: any, index: number) => {
                        return (
                            <Tag color={slot.color} key={index} title={slot.name} className="mz-tag-white">
                                {slot.name}
                            </Tag>
                        );
                    })}
                </div>
            ),
        },
        {
            title: translate(`resources.intents.table_header.linked`),
            render: (intent: any) => (
                <>
                    {prods.botGroup &&
                        prods.botGroup.linkedConfirmIntents.map((linkedIntent: any) => (
                            <Tag icon={<LinkOutlined />} color="blue">
                                #{linkedIntent.fullConfirmIntent} ({linkedIntent.sampleCount || 0})
                            </Tag>
                        ))}
                    <Popover
                        overlayStyle={{ width: 500 }}
                        placement="bottom"
                        content={renderChildBotIntents}
                        trigger="click"
                    >
                        <Button
                            size="small"
                            className="intent-linked-plus"
                            style={{ backgroundColor: '#fff', borderStyle: 'dashed' }}
                            onClick={() => loadSimilarConfirmIntents(intent.id)}
                        >
                            <PlusOutlined /> Add Linked
                        </Button>
                    </Popover>
                </>
            ),
        },
    ];

    if (!prods.botGroup) return null;

    return (
        <Table
            id="intent-table"
            className="mz-table"
            loading={spin}
            dataSource={prods.intentList}
            columns={columns}
            expandable={{
                expandedRowRender: intent => (
                    <div style={{ paddingLeft: 8 }}>
                        {intent.sentences.map((sentence: any, index: number) => (
                            <div key={sentence.id}>
                                {index + 1}. {sentence.text}
                            </div>
                        ))}
                    </div>
                ),
                rowExpandable: intent => true,
            }}
            pagination={false}
            size="small"
            rowKey="id"
        />
    );
};

export default BotGroupIntentsList;
