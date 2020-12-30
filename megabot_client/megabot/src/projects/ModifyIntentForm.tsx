import React, { FC, useCallback, useEffect, useState } from 'react';
import { Col, Form, Input, Row, Button, Menu, Dropdown, Table, Popconfirm, List } from 'antd';
import {
    DownloadOutlined,
    UploadOutlined,
    FileExcelOutlined,
    FileTextOutlined,
    DeleteOutlined,
} from '@ant-design/icons';
import { useParams } from 'react-router';
import { useDataProvider } from 'react-admin';
import { Intent, Sentence } from '../types';

const { Search } = Input;
interface Props {
    intentId: string;
}
const ModifyIntentForm: FC<Props> = props => {
    let { botId } = useParams();
    const dataProvider = useDataProvider();
    const [loading, setLoading] = useState(false);
    const [intent, setIntent] = useState<Intent>({
        createdOn: '',
        id: '',
        language: '',
        name: '',
        sentences: [],
        state: '',
        updatedOn: '',
        updatedUser: '',
    });
    const [sentences, setSentences] = useState<Sentence[]>([]);
    const [sample, setSample] = useState('');
    const exportJSON = () => {};

    const exportExcel = () => {};

    const viewIntent = useCallback(async () => {
        setLoading(true);
        let url = 'intents/' + botId + '/' + props.intentId + '/view';
        const { data: res } = await dataProvider.getList(url, {});
        setLoading(false);
        setIntent(res);
        setSentences(res.sentences);
    }, [botId, dataProvider, props.intentId]);

    useEffect(() => {
        if (props.intentId != 'UnknownIntentId') {
            viewIntent();
        }
    }, [props.intentId, viewIntent]);
    const exportMenu = (
        <Menu>
            <Menu.Item style={{ width: 95, padding: 0, height: 42 }}>
                <Button
                    className="export-json-btn"
                    icon={<FileTextOutlined />}
                    style={{
                        border: 'none',
                        width: 95,
                        padding: 0,
                        height: 42,
                    }}
                    onClick={exportJSON}
                >
                    JSON
                </Button>
            </Menu.Item>
            <Menu.Item style={{ width: 95, padding: 0, height: 42 }}>
                <Button
                    className="export-excel-btn"
                    icon={<FileExcelOutlined />}
                    style={{
                        border: 'none',
                        width: 95,
                        padding: 0,
                        height: 42,
                    }}
                    onClick={exportExcel}
                >
                    Excel
                </Button>
            </Menu.Item>
        </Menu>
    );

    const handleDeleteSample = (key: any) => {
        console.log(key);
    };

    const checkSample = useCallback(async () => {
        if (sample == '') {
            return;
        }
        console.log('=====');
        let url = 'intents/expression/' + botId + '/' + props.intentId + '/convertSentence';
        let param = {
            intentName: intent.name,
            sentence: sample,
        };
        const { data: res } = await dataProvider.getList(url, param);
        setLoading(false);
        intent.sentences.push(res as Sentence);
        setIntent(intent);
        setSample('');
    }, [botId, dataProvider, intent, props.intentId, sample]);

    return (
        <Form layout="vertical" hideRequiredMark>
            <Row gutter={16}>
                <Col span={24}>
                    <div className="ant-row ant-form-item">
                        <div className="ant-col ant-form-item-label">
                            <label>Intent name</label>
                        </div>
                        <div className="ant-col ant-form-item-control">
                            <div className="ant-form-item-control-input-content">
                                <Input placeholder="Enter Intent name" value={intent.name} />
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={24}>
                    <div className="ant-row ant-form-item">
                        <div className="ant-col ant-form-item-label">
                            <label>Definition Sample</label>
                        </div>
                        <div className="ant-col ant-form-item-control">
                            <div className="ant-form-item-control-input-content">
                                <Input
                                    placeholder="Enter definition sample"
                                    onPressEnter={checkSample}
                                    value={sample}
                                    onChange={e => setSample(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
            <Row gutter={16} style={{ marginTop: 15 }}>
                <Col span={24}>
                    <Form.Item name="importSamples" style={{ textAlign: 'right' }}>
                        <Button style={{ marginRight: 10 }} icon={<DownloadOutlined />}>
                            Import samples
                        </Button>
                        <Dropdown overlay={exportMenu}>
                            <Button>
                                <UploadOutlined /> Export
                            </Button>
                        </Dropdown>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={24}>
                    <Form.Item name="sampleSearch">
                        <Search placeholder="Search Samples" />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={24}>
                    <List
                        dataSource={intent.sentences}
                        renderItem={record => (
                            <List.Item
                                className="intent-item"
                                key={record.id}
                                actions={[
                                    <Popconfirm
                                        title="Are you sure delete this sample?"
                                        onConfirm={() => handleDeleteSample(record.id)}
                                        okText="Yes"
                                        cancelText="No"
                                    >
                                        <DeleteOutlined key="deleteSample" />
                                    </Popconfirm>,
                                ]}
                            >
                                {record.text}
                            </List.Item>
                        )}
                    />
                </Col>
            </Row>
        </Form>
    );
};

export default ModifyIntentForm;
