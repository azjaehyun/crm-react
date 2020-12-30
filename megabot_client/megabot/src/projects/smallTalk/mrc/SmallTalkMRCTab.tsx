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
import { useDataProvider, useTranslate } from 'ra-core';
import SmallTalkDocumentList from './SmallTalkDocumentList';
import EditDocumentForm from './EditDocumentForm';
import MRCService, {
    DefaultMrcSearchQuery,
    getEmptyMrcDocument,
    MrcDocument,
    MrcSearchQuery,
} from '../../service/MRCService';
import { DataPageResp } from '../../service/type';
import { uuid } from '../../../utils/uuid';
import { API_ERROR_MESSAGES, PrimaryColor } from '../../common/Constants';
import SmallTalkService from '../../service/smallTalkService';
import moment from 'moment';
import SaveFile from '../../common/SaveFile';

const { confirm } = Modal;

interface Props {
    botId: string;
    onLoaded: (count: number) => void;
}

const SmallTalkMRCTab: FC<Props> = (prods: Props) => {
    const translate = useTranslate();
    const dataProvider = useDataProvider();

    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);

    const [keywordSearch, setKeywordSearch] = useState<string>('');
    const [searchQuery, setSearchQuery] = useState<MrcSearchQuery>(DefaultMrcSearchQuery);
    const [mrcResp, setMrcResp] = useState<DataPageResp>();

    const [visibleCreateForm, setVisibleCreateForm] = useState(false);
    const [selectedDoc, setSelectedDoc] = useState();

    /**
     * load all mrc document
     */
    const loadDocuments = useCallback(async () => {
        setLoading(true);
        MRCService.search(dataProvider, prods.botId, searchQuery)
            .then(({ data, status }: any) => {
                if (status === 200) {
                    setLoading(false);
                    setMrcResp(data);
                    prods.onLoaded(data.totalCount);
                }
            })
            .catch((error: any) => {
                setLoading(false);
                notification['error']({
                    message: translate(`common.message.error`),
                    description: translate(`common.message.unknown_error_try_again`),
                });
            });
    }, [dataProvider, prods, searchQuery, translate]);

    /**
     * Perform add document
     */
    const doCreate = useCallback(
        async (saveDoc: MrcDocument) => {
            setSaving(true);
            MRCService.addDocument(dataProvider, prods.botId, saveDoc)
                .then(({ data, status }: any) => {
                    setSaving(false);
                    notification['success']({
                        message: translate(`common.message.success`),
                        description: 'Create successful!',
                    });
                    setSearchQuery({ ...searchQuery, page: 1 });
                    setSelectedDoc({
                        paragraph: '',
                        questions: [],
                    });
                    loadDocuments().then();
                })
                .catch((error: any) => {
                    setSaving(false);
                    notification['error']({
                        message: translate(`common.message.error`),
                        description: translate(`common.message.unknown_error_try_again`),
                    });
                });
        },
        [dataProvider, loadDocuments, prods.botId, searchQuery, translate]
    );

    /**
     * Perform add document
     */
    const doUpdate = useCallback(
        async (saveDoc: MrcDocument) => {
            setSaving(true);
            MRCService.updateDocument(dataProvider, prods.botId, saveDoc)
                .then(({ data }: any) => {
                    setSaving(false);
                    notification['success']({
                        message: translate(`common.message.success`),
                        description: 'Update successful!',
                    });
                    setSelectedDoc(getEmptyMrcDocument());
                    setVisibleCreateForm(false);
                    loadDocuments().then();
                })
                .catch((error: any) => {
                    setSaving(false);
                    loadDocuments().then();
                    notification['error']({
                        message: translate(`common.message.error`),
                        description: translate(`common.message.unknown_error_try_again`),
                    });
                });
        },
        [dataProvider, loadDocuments, prods.botId, translate]
    );

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
                setLoading(true);
                MRCService.retrain(dataProvider, prods.botId)
                    .then(({ data, status }: any) => {
                        setLoading(false);
                        if (status === 200) {
                            notification['success']({
                                message: translate('common.message.success'),
                                description: translate('resources.smalltalk.message.retrain_completed'),
                            });
                        }
                    })
                    .catch((error: any) => {
                        setLoading(false);
                        notification['error']({
                            message: translate('common.message.error'),
                            description: translate('common.message.unknown_error_try_again'),
                        });
                    });
            },
            onCancel() {},
        });
    };

    const doSave = (saveDoc: MrcDocument) => {
        if (saveDoc.id && saveDoc.id > 0) {
            doUpdate(saveDoc).then();
        } else {
            doCreate(saveDoc).then();
        }
    };

    /**
     * Perform delete document by id
     * @param docId
     */
    const doDelete = (docId: number) => {
        setLoading(true);
        MRCService.deleteDocument(dataProvider, prods.botId, docId)
            .then(({ data, status }: any) => {
                notification['success']({
                    message: translate(`common.message.success`),
                    description: 'Delete successful!',
                });
                loadDocuments().then();
            })
            .catch((error: any) => {
                setLoading(false);
                notification['error']({
                    message: translate(`common.message.error`),
                    description: translate(`common.message.unknown_error_try_again`),
                });
            });
    };

    const onSearchClick = () => {
        setSearchQuery({ ...searchQuery, page: 1, keyword: keywordSearch });
    };

    const showDrawer = (doc: any) => {
        if (doc) {
            setSelectedDoc({ ...doc });
        } else {
            setSelectedDoc({
                paragraph: '',
                questions: [],
            } as MrcDocument);
        }
        setVisibleCreateForm(true);
    };

    const closeDraw = (reload: boolean) => {
        setVisibleCreateForm(false);
    };

    const reload = () => {
        if (searchQuery.page !== 1) {
            setSearchQuery({ ...searchQuery, page: 1 });
        } else {
            loadDocuments().then();
        }
    };

    const pagination = {
        current: searchQuery.page,
        pageSize: searchQuery.limit,
        total: mrcResp ? mrcResp.totalCount : 0,
        showTotal: (total: any, range: any) => `${range[0]}-${range[1]} of ${total} items`,
        showSizeChanger: false,
    };
    const handleExportMRCJson = () => {
        console.log('handle export json');
        setLoading(true);
        MRCService.exportDocJson(dataProvider, prods.botId)
            .then((resp: any) => {
                setLoading(false);
                if (resp.status === 200) {
                    const fileName = 'mrc_' + moment() + '.json';
                    SaveFile.saveJson(resp.data, fileName);
                }
            })
            .catch((error: any) => {});
    };

    const handleImportMRCJson = (file: any) => {
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
            MRCService.importDocJson(dataProvider, prods.botId, JSON.parse(e.target.result))
                .then((resp: any) => {
                    setLoading(false);
                    if (resp.status === 200) {
                        notification['success']({
                            message: 'Success',
                            description: `Import question & answering pairs successful!`,
                        });
                        loadDocuments();
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
        if (searchQuery) {
            loadDocuments().then();
        }
    }, [loadDocuments, searchQuery]);

    return (
        <>
            <Row className="content-body-header">
                <Col span={12}>
                    <Space>
                        <Input
                            placeholder="Search..."
                            suffix={<SearchOutlined style={{ color: PrimaryColor }} />}
                            value={keywordSearch}
                            onChange={(e: any) => setKeywordSearch(e.target.value)}
                            onPressEnter={() => onSearchClick()}
                            style={{ width: 300 }}
                        />
                    </Space>
                </Col>
                <Col span={12} style={{ textAlign: 'right' }}>
                    <Space>
                        {mrcResp && mrcResp.list && mrcResp.list.length > 0 && (
                            <>
                                <Button icon={<ReloadOutlined />} onClick={reload} className="mz-link-btn">
                                    {translate(`common.button.reload`)}
                                </Button>
                                <Button
                                    icon={<RetweetOutlined />}
                                    className="mz-link-btn"
                                    onClick={() => onRetrainClick()}
                                >
                                    {translate(`common.button.retrain`)}
                                </Button>
                            </>
                        )}
                        <Upload name="mrcFile" showUploadList={false} beforeUpload={handleImportMRCJson}>
                            <Button loading={loading} icon={<UploadOutlined />} className="mz-link-btn">
                                {translate(`common.button.import`)}
                            </Button>
                        </Upload>
                        <Button
                            loading={loading}
                            icon={<DownloadOutlined />}
                            className="mz-link-btn"
                            onClick={handleExportMRCJson}
                        >
                            {translate(`common.button.export`)}
                        </Button>
                        {mrcResp && mrcResp.list && mrcResp.list.length > 0 && (
                            <Button type="primary" icon={<PlusOutlined />} onClick={() => showDrawer(null)}>
                                {translate(`resources.smalltalk.button.create_smalltalk`)}
                            </Button>
                        )}
                    </Space>
                </Col>
            </Row>
            {(loading || (mrcResp && mrcResp.list && mrcResp.list.length > 0)) && (
                <SmallTalkDocumentList
                    loading={loading}
                    pagination={pagination}
                    docList={mrcResp ? mrcResp.list || [] : []}
                    onEditClick={(doc: MrcDocument) => showDrawer(doc)}
                    onDeleteClick={(doc: MrcDocument) => doDelete(doc.id as number)}
                    onPageChange={(page: any) => setSearchQuery({ ...searchQuery, page: page })}
                />
            )}

            {!loading && (!mrcResp || mrcResp.list.length === 0) && (
                <Empty
                    className="mz-empty-big"
                    description={
                        <span>
                            ( <SmileOutlined /> No document yet. )
                        </span>
                    }
                >
                    <Button disabled={loading} type="primary" icon={<PlusOutlined />} onClick={() => showDrawer(null)}>
                        {translate(`resources.smalltalk.button.create_smalltalk`)}
                    </Button>
                </Empty>
            )}
            <EditDocumentForm
                botId={prods.botId}
                doc={selectedDoc}
                visible={visibleCreateForm}
                onSave={(doc: MrcDocument) => doSave(doc)}
                onClose={reload => closeDraw(reload)}
                saving={saving}
            />
        </>
    );
};

export default SmallTalkMRCTab;
