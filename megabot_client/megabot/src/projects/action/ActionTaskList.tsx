import React, { FC, Fragment } from 'react';
import { Avatar, Button, Input, Popconfirm, Table, Tag, Tooltip, Typography } from 'antd';
import { CaretRightFilled, CheckCircleFilled, DeleteOutlined } from '@ant-design/icons';
import { Script, SCRIPT_TYPE, ScriptCategory, TestStatus } from '../service/actionTaskService';
import { IndicatorIcon, PrimaryColor, PYTHON_IMG_BASE64 } from '../common/Constants';
import { useTranslate } from 'ra-core';
import { SpinProps } from 'antd/es/spin';
import { CloseCircleFilled, TagOutlined } from '@ant-design/icons/lib';

const { Text, Paragraph } = Typography;

interface Props {
    botId: string;
    actionTaskList: Array<Script>;
    pagination: any;
    loading: boolean;
    onPageChange: (page: number) => void;
    onSelected: (script: Script) => void;
    onDelete: (script: Script) => void;
}

const ActionTaskList: FC<Props> = (props: Props) => {
    const translate = useTranslate();

    const content = (
        <div className="">
            <div style={{ marginBottom: 10 }}>
                <Input prefix="brand:" style={{ width: 220, margin: '5px 0' }} />
                <br />
                <Input prefix="cat_id: " style={{ width: 220, margin: '5px 0' }} />
            </div>
            <div style={{ textAlign: 'right' }}>
                <Button style={{ border: 'none', marginRight: 10 }}>Cancel</Button>
                <Button type="primary" icon={<CaretRightFilled />}>
                    Run
                </Button>
            </div>
        </div>
    );

    const typeOfResponse = (resp: any) => {
        if (resp) {
            if (Array.isArray(resp)) {
                return 'Array []';
            }
            let type = typeof resp;
            if (type === 'object') return 'object {}';
            return type;
        }
        return '';
    };

    const columns = [
        {
            title: translate(`resources.action.table_header.task`),
            render: (record: Script) => (
                <div style={{ display: 'flex', padding: '4px 0px' }}>
                    <Avatar
                        size={16}
                        src={record.scriptType === SCRIPT_TYPE.PYTHON ? PYTHON_IMG_BASE64 : PYTHON_IMG_BASE64}
                        style={{ marginRight: 10, marginTop: 4 }}
                    />
                    <div>
                        <a
                            style={{
                                fontWeight: 400,
                                color: PrimaryColor,
                                marginBottom: 0,
                            }}
                            onClick={() => props.onSelected({ ...record })}
                        >
                            {record.name}
                        </a>
                        <Paragraph style={{ marginBottom: 0 }}>
                            {record.description && record.description.length > 0
                                ? record.description
                                : translate(`common.label.no_description`)}
                        </Paragraph>
                        {record.scriptCategories && record.scriptCategories.length > 0 && (
                            <div style={{ marginTop: 8 }}>
                                {record.scriptCategories.map((cat: ScriptCategory) => {
                                    return (
                                        <Tag
                                            key={cat.id}
                                            style={{
                                                border: 'none',
                                                fontSize: 11,
                                                backgroundColor: '#f2f4f5',
                                                borderRadius: 10,
                                            }}
                                        >
                                            {cat.name}
                                        </Tag>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            ),
        },
        {
            title: translate(`resources.action.table_header.argument`),
            render: (record: Script) => (
                <>
                    {record.scriptArguments &&
                        Object.entries(record.scriptArguments).map(([key, value]) => <Tag key={key}>{key}</Tag>)}
                </>
            ),
        },
        {
            title: translate(`resources.action.table_header.response_type`),
            width: 150,
            render: (record: Script) => (
                <Tooltip
                    overlayClassName="mz-tooltip-json-preview"
                    title={
                        <pre>{record.scriptResponse ? JSON.stringify(record.scriptResponse, undefined, 4) : ''}</pre>
                    }
                >
                    <Text>{typeOfResponse(record.scriptResponse)}</Text>
                </Tooltip>
            ),
        },
        {
            title: translate(`resources.action.table_header.test_result`),
            render: (record: Script) => (
                <>
                    {record.testResult === TestStatus.PASSED && <CheckCircleFilled style={{ color: PrimaryColor }} />}
                    {record.testResult === TestStatus.ERROR && (
                        <Tooltip title={record.scriptReturn} overlayClassName="mz-tooltip-error">
                            <CloseCircleFilled style={{ color: '#ff4d4f' }} />
                        </Tooltip>
                    )}
                </>
            ),
        },
        {
            width: 45,
            render: (record: Script) => (
                <Popconfirm
                    title={`Are you sure to delete task "${record.name}"?`}
                    onConfirm={() => props.onDelete(record)}
                    okText={translate(`common.button.delete`)}
                    okButtonProps={{ danger: true, type: 'default' }}
                    cancelText={translate(`common.button.no`)}
                    placement="left"
                >
                    <DeleteOutlined className="trash-btn" />
                </Popconfirm>
            ),
        },
    ];

    const spin: SpinProps = {
        indicator: IndicatorIcon,
        spinning: props.loading,
        tip: translate(`common.message.loading`),
    };

    const onPageChange = (page: any) => {
        console.log('onPageChange', page);
        props.onPageChange(page);
    };

    return (
        <Table
            id="action-task-table"
            className="mz-table"
            dataSource={props.actionTaskList}
            rowKey="id"
            columns={columns}
            pagination={{ ...props.pagination, size: 'small', onChange: onPageChange }}
            size="small"
            loading={spin}
        />
    );
};

export default ActionTaskList;
