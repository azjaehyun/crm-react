import React, { FC } from 'react';
import { useTranslate } from 'react-admin';
import { Col, List, Popconfirm, Row, Space, Table, Typography } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons/lib';
import { MrcDocument } from '../../service/MRCService';

const { Text } = Typography;

interface Props {
    loading: boolean;
    pagination: any;
    docList: Array<MrcDocument>;
    onPageChange: any;
    onEditClick: (doc: MrcDocument) => void;
    onDeleteClick: (doc: MrcDocument) => void;
}

const SmallTalkDocumentList: FC<Props> = (props: Props) => {
    const translate = useTranslate();
    return (
        <List
            loading={props.loading}
            className="small-talk-document-list"
            itemLayout="vertical"
            size="small"
            pagination={{ ...props.pagination, size: 'small', onChange: props.onPageChange }}
            rowKey="id"
            dataSource={props.docList}
            renderItem={(doc: MrcDocument) => (
                <List.Item className="document-list-item">
                    <Row>
                        <Col flex="50%">
                            <div className="document-text">
                                <Scrollbars autoHide autoHideTimeout={500} autoHideDuration={100}>
                                    <pre>{doc.paragraph}</pre>
                                </Scrollbars>
                            </div>
                        </Col>
                        <Col flex="auto">
                            <div className="document-question-list">
                                <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                                    <div style={{ height: '100%' }}>
                                        <Scrollbars autoHide autoHideTimeout={500} autoHideDuration={100}>
                                            <ol style={{ height: '100%' }}>
                                                {(doc.questions || []).map((q: any) => (
                                                    <li key={q.id}>{q.question}</li>
                                                ))}
                                            </ol>
                                        </Scrollbars>
                                    </div>

                                    <div style={{ padding: '8px 16px', textAlign: 'right' }}>
                                        <Text style={{ fontWeight: 500, float: 'left' }}>
                                            {doc.questions.length} questions
                                        </Text>
                                        <Space size="small">
                                            <EditOutlined
                                                onClick={() => props.onEditClick({ ...doc })}
                                                className="edit-btn"
                                            />
                                            <Popconfirm
                                                placement="left"
                                                title={translate(`resources.smalltalk.message.delete_confirm`)}
                                                onConfirm={() => props.onDeleteClick(doc)}
                                                okText={translate(`common.button.yes`)}
                                                cancelText={translate(`common.button.no`)}
                                            >
                                                <DeleteOutlined title="Delete" className="trash-btn" />
                                            </Popconfirm>
                                        </Space>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </List.Item>
            )}
        />
    );
};

export default SmallTalkDocumentList;
