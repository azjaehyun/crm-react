import React, { FC, useCallback, useEffect, useState } from 'react';
import { Button, Col, Empty, Input, Modal, notification, Row, Space, Upload } from 'antd';
import {
    DownloadOutlined,
    ExclamationCircleOutlined,
    PlusOutlined,
    ReloadOutlined,
    RetweetOutlined,
    SearchOutlined,
    SmileOutlined,
    UploadOutlined,
} from '@ant-design/icons/lib';
import SmallTalkQAList from './SmallTalkQAList';
import EditQAForm from './EditQAForm';
import { useDataProvider, useTranslate } from 'react-admin';
import SmallTalkService, { QA, SmallTalkQuery } from '../../service/smallTalkService';
import { API_ERROR_MESSAGES, PrimaryColor } from '../../common/Constants';
import SaveFile from '../../common/SaveFile';
import moment from 'moment';

const { confirm } = Modal;

interface Props {
    botId: string;
    onLoaded: (count: number) => void;
}

const SmallTalkQATab: FC<Props> = (prods: Props) => {
    const dataProvider = useDataProvider();
    const translate = useTranslate();

    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState();

    const [keywordSearch, setKeywordSearch] = useState<string>('');
    const [queryParams, setQueryParams] = useState<SmallTalkQuery>({ page: 1, limit: 10 });
    const [irqaResp, setIrqaResp] = useState<any>();
    const [selectedIrqa, setSelectedIrqa] = useState<QA>();

    const [visibleCreateForm, setVisibleCreateForm] = useState(false);

    const pagination = {
        current: queryParams.page,
        pageSize: queryParams.limit,
        total: irqaResp ? irqaResp.totalCount : 0,
        showTotal: (total: any, range: any) => `${range[0]}-${range[1]} of ${total} items`,
        showSizeChanger: false,
    };

    const loadRepresentQueryList = useCallback(async () => {
        setLoading(true);
        SmallTalkService.search(dataProvider, prods.botId, queryParams)
            .then(({ data }: any) => {
                setLoading(false);
                setIrqaResp(data);
                prods.onLoaded(data.totalCount);
            })
            .catch((error: any) => {
                setLoading(false);
                setError(error);
            });
    }, [dataProvider, prods, queryParams]);

    const doDelete = (irqa: any) => {
        setLoading(true);
        SmallTalkService.deleteQa(dataProvider, prods.botId, irqa.id)
            .then(({ data }: any) => {
                notification['success']({
                    message: translate(`common.message.success`),
                    description: translate(`resources.smalltalk.message.delete_completed`),
                });
                loadRepresentQueryList().then();
            })
            .catch((error: any) => {
                notification['error']({
                    message: translate(`common.message.error`),
                    description: translate(`common.message.unknown_error_try_again`),
                });
                setLoading(false);
            });
    };

    const doEdit = (irqa: any) => {
        const index = irqaResp.list.findIndex((item: any) => irqa.id === item.id);
        if (index > -1) {
            const item = { ...irqaResp.list[index], ...irqa };
            setSaving(true);
            SmallTalkService.editQa(dataProvider, prods.botId, item)
                .then(({ data }: any) => {
                    notification['success']({
                        message: translate(`common.message.success`),
                        description: 'Edit successful!',
                    });
                    loadRepresentQueryList().then();
                    setSaving(false);
                })
                .catch((error: any) => {
                    notification['error']({
                        message: translate(`common.message.error`),
                        description: translate(`common.message.unknown_error_try_again`),
                    });
                    setSaving(false);
                });
        }
    };

    /**
     * Perform create
     * @param irqa
     */
    const doCreate = (irqa: any) => {
        SmallTalkService.addQa(dataProvider, prods.botId, irqa)
            .then(({ data }: any) => {
                notification['success']({
                    message: translate(`common.message.success`),
                    description: 'Create successful!',
                });
                setQueryParams({ ...queryParams, page: 1 });
                setSelectedIrqa({ id: 0, question: '', answer: '' });
                setSaving(false);
                setVisibleCreateForm(false);
            })
            .catch((error: any) => {
                notification['error']({
                    message: translate(`common.message.error`),
                    description: translate(`common.message.unknown_error_try_again`),
                });
                setSaving(false);
            });
    };

    /**
     * Perform save (insert/update)
     * @param irqa
     */
    const doSave = (irqa: any) => {
        if (irqa.id && irqa.id > 0) {
            doEdit(irqa);
        } else {
            doCreate(irqa);
        }
    };

    /**
     * Onclick re-train button
     */
    const onRetrainClick = () => {
        confirm({
            title: translate('resources.smalltalk.message.retrain_confirm.title'),
            icon: <ExclamationCircleOutlined />,
            content: translate('resources.smalltalk.message.retrain_confirm.description'),
            okText: translate('common.button.retrain'),
            cancelText: translate('common.button.cancel'),
            onOk() {
                SmallTalkService.retrain(dataProvider, prods.botId)
                    .then(({ data }: any) => {
                        notification['success']({
                            message: translate('common.message.success'),
                            description: translate('resources.smalltalk.message.retrain_completed'),
                        });
                    })
                    .catch((error: any) => {
                        notification['error']({
                            message: translate('common.message.error'),
                            description: translate('common.message.unknown_error_try_again'),
                        });
                    });
            },
            onCancel() {},
        });
    };

    const onSearchClick = () => {
        setQueryParams({ ...queryParams, page: 1, keyword: keywordSearch });
    };

    const reload = () => {
        if (queryParams.page !== 1) {
            setQueryParams({ ...queryParams, page: 1 });
        } else {
            loadRepresentQueryList().then();
        }
    };

    const showDrawer = (irqa: any) => {
        if (irqa) {
            setSelectedIrqa({ ...irqa });
        } else {
            setSelectedIrqa({ id: 0, question: '', answer: '' });
        }
        setVisibleCreateForm(true);
    };

    const closeDraw = () => {
        setVisibleCreateForm(false);
    };
    const handleExportExcel = () => {
        console.log('handle export excel');
        SmallTalkService.exportQasExcel(dataProvider, prods.botId)
            .then((resp: any) => {
                console.log(resp);
                const link = document.createElement('a');
                const fileName = 'demo.xls';
                // SaveFile.exportExcel(fileName,resp.d link)
            })
            .catch((error: any) => {});
    };
    const handleImportExcel = () => {};

    const handleExportJson = () => {
        console.log('handle export json');
        setLoading(true);
        SmallTalkService.exportQasJson(dataProvider, prods.botId)
            .then((resp: any) => {
                setLoading(false);
                if (resp.status === 200) {
                    const fileName = 'qac_' + moment() + '.json';
                    SaveFile.saveJson(resp.data, fileName);
                }
            })
            .catch((error: any) => {});
    };

    const handleImportJson = (file: any) => {
        const isJpgOrPng = file.type === 'json';
        if (!isJpgOrPng) {
            console.log('You can only upload JSON file!');
            // return isJpgOrPng;
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            console.log('Image must smaller than 2MB!');
            // return isLt2M;
        }
        setLoading(true);
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = (e: any) => {
            SmallTalkService.importQasJson(dataProvider, prods.botId, JSON.parse(e.target.result))
                .then((resp: any) => {
                    setLoading(false);
                    if (resp.status === 200) {
                        notification['success']({
                            message: 'Success',
                            description: `Import question & answering pairs successful!`,
                        });
                        loadRepresentQueryList();
                    } else {
                        const message = resp.data ? resp.data.message : API_ERROR_MESSAGES[resp.status];
                        notification['error']({
                            message: 'Error',
                            description: message,
                        });
                    }
                })
                .catch((error: any) => {});
        };
        return isJpgOrPng && isLt2M;
    };

    useEffect(() => {
        loadRepresentQueryList().then();
    }, [loadRepresentQueryList]);

    return (
        <>
            <Row className="content-body-header">
                <Col span={12}>
                    <Space>
                        <Input
                            placeholder={translate(`common.message.search`)}
                            suffix={<SearchOutlined style={{ color: PrimaryColor }} />}
                            style={{ width: 300 }}
                            value={keywordSearch}
                            onChange={(e: any) => setKeywordSearch(e.target.value)}
                            onPressEnter={() => onSearchClick()}
                        />
                    </Space>
                </Col>
                <Col span={12} style={{ textAlign: 'right' }}>
                    <Space>
                        {irqaResp && irqaResp.list && irqaResp.list.length > 0 && (
                            <>
                                <Button icon={<ReloadOutlined />} onClick={reload} className="mz-link-btn">
                                    {translate(`common.button.reload`)}
                                </Button>
                                <Button icon={<RetweetOutlined />} className="mz-link-btn" onClick={onRetrainClick}>
                                    {translate(`common.button.retrain`)}
                                </Button>
                            </>
                        )}
                        <Upload name="file" showUploadList={false} beforeUpload={handleImportJson}>
                            <Button loading={loading} icon={<UploadOutlined />} className="mz-link-btn">
                                {translate(`common.button.import`)}
                            </Button>
                        </Upload>
                        <Button
                            loading={loading}
                            icon={<DownloadOutlined />}
                            className="mz-link-btn"
                            onClick={handleExportJson}
                        >
                            {translate(`common.button.export`)}
                        </Button>
                        {irqaResp && irqaResp.list && irqaResp.list.length > 0 && (
                            <Button type="primary" icon={<PlusOutlined />} onClick={() => showDrawer(null)}>
                                {translate(`resources.smalltalk.button.create_smalltalk`)}
                            </Button>
                        )}
                    </Space>
                </Col>
            </Row>
            {(loading || (irqaResp && irqaResp.list.length > 0)) && (
                <SmallTalkQAList
                    botId={prods.botId}
                    irqaList={irqaResp && irqaResp.list ? irqaResp.list : []}
                    loading={loading}
                    pagination={pagination}
                    onPageChange={(page: any) => setQueryParams({ ...queryParams, page: page })}
                    onEditClick={(irqa: any) => showDrawer(irqa)}
                    onDeleteClick={(irqa: any) => doDelete(irqa)}
                />
            )}

            {!loading && (!irqaResp || irqaResp.list.length === 0) && (
                <Empty
                    className="mz-empty-big"
                    description={
                        <span>
                            ( <SmileOutlined /> {translate(`resources.smalltalk.message.no_smalltalk_yet`)} )
                        </span>
                    }
                >
                    <Button disabled={loading} type="primary" icon={<PlusOutlined />} onClick={() => showDrawer(null)}>
                        {translate(`resources.smalltalk.button.create_smalltalk`)}
                    </Button>
                </Empty>
            )}
            <EditQAForm
                botId={prods.botId}
                irqa={selectedIrqa}
                visible={visibleCreateForm}
                onClose={closeDraw}
                onSave={doSave}
                saving={saving}
            />
        </>
    );
};

export default SmallTalkQATab;
