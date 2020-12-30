import React, { FC, useCallback, useEffect, useState, Fragment } from 'react';
import {
    Col,
    Empty,
    Form,
    Input,
    Row,
    Select,
    Typography,
    Tree,
    Button,
    Collapse,
    Drawer,
    Space,
    Avatar,
    Popconfirm,
    notification,
    Spin,
} from 'antd';
import { PlusOutlined, DownOutlined, CaretRightFilled } from '@ant-design/icons';
import ActionTaskService, {
    DEF_JS_CODE,
    DEF_PYTHON_CODE,
    DefaultScriptReturn,
    EmptyScript,
    getDefaultCode,
    Script,
    SCRIPT_TYPE,
    ScriptReturn,
    TestStatus,
    TryItOutParam,
} from '../service/actionTaskService';
import { useDataProvider, useTranslate } from 'ra-core';
import { IndicatorIcon, NODE_JS_IMG_BASE64, PrimaryColor, PYTHON_IMG_BASE64 } from '../common/Constants';
import { ControlledEditor } from '@monaco-editor/react';
import {
    CheckCircleFilled,
    CloseCircleFilled,
    CodeOutlined,
    FormOutlined,
    FullscreenExitOutlined,
    FullscreenOutlined,
    FunctionOutlined,
    LeftOutlined,
    MinusOutlined,
    RightOutlined,
    SettingOutlined,
} from '@ant-design/icons/lib';
import { Scrollbars } from 'react-custom-scrollbars';

import { FullScreen, useFullScreenHandle } from 'react-full-screen';

const { Option } = Select;
const { Title, Text } = Typography;
const { Panel } = Collapse;

interface MonacoLanguage {
    name: string;
    display: string;
    version: string;
    imgSrc: any;
    serverLang: string;
    defaultCode: string;
}

const MonacoLanguageList: Array<MonacoLanguage> = [
    {
        name: 'python',
        display: 'Python',
        version: '3.x',
        imgSrc: PYTHON_IMG_BASE64,
        serverLang: SCRIPT_TYPE.PYTHON,
        defaultCode: DEF_PYTHON_CODE,
    },
    {
        name: 'javascript',
        display: 'NodeJs',
        version: '12.x',
        imgSrc: NODE_JS_IMG_BASE64,
        serverLang: SCRIPT_TYPE.NODEJS,
        defaultCode: DEF_JS_CODE,
    },
];

interface Props {
    botId: string;
    creatorId: string;
    visible: boolean;
    script: Script;
    onClose: (reload: boolean) => void;
}

const CreateActionForm: FC<Props> = (props: Props) => {
    const dataProvider = useDataProvider();
    const translate = useTranslate();

    const [scriptForm] = Form.useForm();

    const [argument, setArgument] = useState<string>('');
    const [script, setScript] = useState<Script>();
    const [categoryList, setCategoryList] = useState();
    const [scriptReturn, setScriptReturn] = useState<ScriptReturn>({ ...DefaultScriptReturn });
    const [scriptCode, setScriptCode] = useState<string>('');
    const [scriptRunning, setScriptRunning] = useState(false);
    const [initScriptType, setInitScriptType] = useState('');
    const [initScriptCode, setInitScriptCode] = useState('');

    const [showCodeTemplate, setShowCodeTemplate] = useState<boolean>(true);
    const [fullscreen, setFullScreen] = useState(false);

    const onClose = useCallback(
        (reload: boolean) => {
            scriptForm.resetFields();
            props.onClose(reload);
        },
        [props, scriptForm]
    );

    const onLanguageChange = (language: string) => {
        let newScript = {
            ...script,
            scriptType: language,
            scriptCode: getDefaultCode(language),
        } as Script;

        if (initScriptCode && language === initScriptType) {
            newScript.scriptCode = initScriptCode;
        }
        setScript(newScript);
        initScriptCode && language === initScriptType
            ? setScriptCode(initScriptCode)
            : setScriptCode(getDefaultCode(language));
    };

    /**
     * form invalid
     * @param errorFields
     */
    const onFormScriptFinishFailed = (errorFields: any) => {
        // console.log('onFormScriptFinishFailed', errorFields);
    };

    const doRunTest = useCallback(
        (params: TryItOutParam, callback: any) => {
            setScriptRunning(true);
            let testResult: ScriptReturn = {
                returnValue: undefined,
                stdout: '',
                stderr: '',
                runTime: new Date(),
                isValid: false,
            };
            ActionTaskService.tryItOut(dataProvider, params)
                .then(({ data }: any) => {
                    setScriptRunning(false);
                    testResult = { ...testResult, ...data, isValid: isValidScriptResponse(data) };

                    // has response but is not object or array
                    if (testResult.returnValue && !testResult.isValid) {
                        testResult.stderr =
                            JSON.stringify(testResult.returnValue) +
                            '\nResponseTypeError: The response type must be an object or an array ';
                    }

                    // update response to script
                    const newScript = {
                        ...script,
                        scriptResponse: testResult.isValid ? testResult.returnValue : null,
                        scriptReturn: testResult.isValid ? JSON.stringify(testResult.returnValue) : testResult.stderr,
                        testResult: testResult.isValid ? TestStatus.PASSED : TestStatus.ERROR,
                        scriptCode: scriptCode,
                    } as Script;

                    setScript(newScript);
                    setScriptReturn(testResult);

                    // console.log('testResult ->', testResult);
                    // console.log('callback -> type', typeof callback);

                    if (testResult.isValid && typeof callback === 'function') {
                        callback({ ...newScript });
                    }

                    if (!testResult.isValid) {
                        notification['error']({
                            message: translate('common.message.error'),
                            description: testResult.stderr,
                        });
                    }
                })
                .catch((error: any) => {
                    setScriptRunning(false);
                    testResult = {
                        ...testResult,
                        stderr: translate(`common.message.unknown_error_try_again`),
                    };
                    setScriptReturn(testResult);
                    // console.log('doRunTest -> error', error);
                });
        },
        [dataProvider, script, scriptCode, translate]
    );

    const doSaveScript = useCallback(
        async (saveScript: any) => {
            // console.log('doSave (after test) -> script', saveScript);

            let temp = { ...saveScript };
            delete temp.scriptCategories;
            delete temp.scriptParameters;

            setScriptRunning(true);
            ActionTaskService.insertOrUpdate(dataProvider, props.botId, props.creatorId, temp)
                .then(({ data }: any) => {
                    setScriptRunning(false);
                    onClose(true);
                })
                .catch((error: any) => {
                    setScriptRunning(false);
                    notification['error']({
                        message: translate(`common.message.error`),
                        description: translate(`common.message.unknown_error_try_again`),
                    });
                });
        },
        [dataProvider, onClose, props.botId, props.creatorId, translate]
    );

    const doSave = useCallback(
        async (saveScript: Script) => {
            // console.log('doSave (before test) -> script', saveScript);

            // 1. test script
            const tryItOutParam: TryItOutParam = {
                creatorId: props.creatorId,
                script: {
                    scriptType: saveScript.scriptType,
                    scriptCode: saveScript.scriptCode,
                    scriptArguments: saveScript.scriptArguments ? saveScript.scriptArguments : {},
                },
            };

            doRunTest(tryItOutParam, (saveScript: Script) => {
                doSaveScript(saveScript);
            });
        },
        [doRunTest, doSaveScript, props.creatorId]
    );

    /**
     * on click to save button
     * @param e
     */
    const onSaveClick = (e: any) => {
        e.preventDefault();
        scriptForm.submit();
    };

    const formScriptOnChange = (changedValues: any, allValues: any) => {
        let newScript = {
            ...allValues,
            scriptType: script ? script.scriptType : '',
            scriptCode: scriptCode,
        } as Script;
        setScript(newScript);
    };

    /**
     * form valid -> save
     * @param intent
     */
    const onFormScriptFinish = () => {
        const newScript = { ...script, scriptCode: scriptCode } as Script;
        setScript(newScript);

        console.log('onFormScriptFinish -> newScript', newScript);
        doSave(newScript).then();
    };

    const treeData = [
        {
            title: 'Common',
            key: '0',
            children: [
                {
                    title: 'Send Mail',
                    key: '0-0',
                },
                {
                    title: 'Regex',
                    key: '0-1',
                },
            ],
        },
        {
            title: 'File',
            key: '1',
            children: [
                {
                    title: 'Read Text File',
                    key: '1-0',
                },
                {
                    title: 'Read Text File',
                    key: '1-1',
                },
                {
                    title: 'Read Text File',
                    key: '1-2',
                },
            ],
        },
    ];

    const loadCategories = useCallback(async () => {
        ActionTaskService.getCategories(dataProvider)
            .then(({ data }: any) => {
                setCategoryList(data);
            })
            .catch((error: any) => {
                console.log(error);
            });
    }, [dataProvider]);

    const onTestClick = (e: any) => {
        e.preventDefault();
        const params: TryItOutParam = {
            creatorId: props.creatorId,
            script: {
                scriptType: script ? script.scriptType : '',
                scriptCode: scriptCode,
                scriptArguments: script ? script.scriptArguments : {},
            },
        };
        doRunTest(params, null);
    };

    // script response type must be object or array
    const isValidScriptResponse = (testResult: ScriptReturn) => {
        let isValid = false;
        if (testResult && testResult.returnValue) {
            if (typeof testResult.returnValue === 'object' || Array.isArray(testResult.returnValue)) {
                isValid = true;
            }
        }
        return isValid;
    };

    const onAddArgument = () => {
        if (argument && argument.length > 0) {
            let newScript = { ...script } as Script;
            if (!newScript.scriptArguments) {
                newScript.scriptArguments = {};
            }
            if (!newScript.scriptArguments[argument]) {
                newScript.scriptArguments[argument] = '';
                setArgument('');
                setScript(newScript);
            }
        }
    };

    const deleteArgument = (name: string) => {
        try {
            let newScript = { ...script } as Script;
            if (newScript.scriptArguments) {
                delete newScript.scriptArguments[name];
            }
            setScript(newScript);
        } catch (e) {
            console.log('deleteArgument', e);
        }
    };

    const hideCodeTemplate = () => {
        const hide = !showCodeTemplate;
        setShowCodeTemplate(hide);
        window.dispatchEvent(new Event('resize'));
    };

    useEffect(() => {
        console.log('CreateActionForm.tsx -> re-render -> props', props);
        scriptForm.setFieldsValue(props.script);
        if (props.script) {
            loadCategories().then();
            setScript(props.script);
            setScriptCode(props.script.scriptCode);
            setScriptReturn(DefaultScriptReturn);
            setInitScriptType(props.script.scriptType);
            setInitScriptCode(props.script.scriptCode);
        }
    }, [loadCategories, props, scriptForm]);

    if (!script) return null;

    return (
        <Drawer
            title={
                <div>
                    {translate(`resources.action.form.title`)}
                    <Button
                        size="small"
                        icon={fullscreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
                        onClick={() => setFullScreen(!fullscreen)}
                    />
                </div>
            }
            className="drawer-edit-action-task"
            placement="right"
            onClose={() => onClose(false)}
            visible={props.visible}
            width={fullscreen ? '100%' : '1000px'}
            maskClosable={false}
            keyboard={false}
            destroyOnClose={true}
            footer={
                <div
                    style={{
                        textAlign: 'right',
                    }}
                >
                    <Space>
                        <Button onClick={() => onClose(false)} className="mz-btn mz-drawer-btn-footer">
                            {translate(`common.button.cancel`)}
                        </Button>
                        <Button onClick={onSaveClick} type="primary" className="mz-btn mz-drawer-btn-footer">
                            {translate(`common.button.save`)}
                        </Button>
                    </Space>
                </div>
            }
        >
            <Spin
                wrapperClassName="mz-drawer-spin"
                indicator={IndicatorIcon}
                spinning={scriptRunning}
                tip={translate(`common.message.processing`)}
            >
                <Row style={{ height: '100%' }}>
                    <Col flex="250px" className="action-task-info-area">
                        <Scrollbars autoHide autoHideTimeout={500} autoHideDuration={100}>
                            <Form
                                layout="vertical"
                                form={scriptForm}
                                name="scriptForm"
                                scrollToFirstError={true}
                                initialValues={EmptyScript}
                                onFinish={onFormScriptFinish}
                                onFinishFailed={onFormScriptFinishFailed}
                                onValuesChange={formScriptOnChange}
                            >
                                <div>
                                    <Title className="group-title" level={4}>
                                        <Space>
                                            <FormOutlined />
                                            {translate(`resources.action.form.task_info.name`)}
                                        </Space>
                                    </Title>
                                    <div className="group-body">
                                        <Form.Item
                                            name="name"
                                            label={translate(`resources.action.form.task_info.label`)}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Enter task name',
                                                },
                                            ]}
                                        >
                                            <Input placeholder="Script name" autoComplete="off" />
                                        </Form.Item>
                                        <Form.Item
                                            name="description"
                                            label={translate(`resources.action.form.task_info.description`)}
                                        >
                                            <Input.TextArea
                                                rows={3}
                                                placeholder="Description"
                                                style={{ resize: 'none' }}
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            name="scriptCategoryIds"
                                            label={translate(`resources.action.form.task_info.categories`)}
                                        >
                                            <Select
                                                className="action-task-category-select"
                                                mode="multiple"
                                                placeholder="Select categories"
                                            >
                                                {categoryList &&
                                                    categoryList.map((cat: any) => (
                                                        <Option key={cat.id} value={cat.id}>
                                                            {cat.name}
                                                        </Option>
                                                    ))}
                                            </Select>
                                        </Form.Item>
                                    </div>

                                    <Title className="group-title" level={4}>
                                        <Space>
                                            <SettingOutlined />
                                            <span>
                                                {translate(`resources.action.form.argument.name`)}(
                                                {script.scriptArguments
                                                    ? Object.keys(script.scriptArguments).length
                                                    : 0}
                                                )
                                            </span>
                                        </Space>
                                    </Title>
                                    <div className="group-body">
                                        <Input
                                            placeholder="Argument name"
                                            autoComplete="off"
                                            style={{ marginBottom: 8 }}
                                            value={argument}
                                            onChange={(e: any) => setArgument(e.target.value.trim())}
                                            onPressEnter={onAddArgument}
                                            suffix={<PlusOutlined style={{ color: PrimaryColor }} />}
                                        />
                                        {script.scriptArguments && (
                                            <div className="argument-list">
                                                {Object.entries(script.scriptArguments).map(([key, value]) => (
                                                    <div className="argument-item" key={key}>
                                                        <Form.Item
                                                            key={key}
                                                            name={['scriptArguments', key]}
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                    message: `Argument '${key}' is required`,
                                                                },
                                                            ]}
                                                        >
                                                            <Input
                                                                title={value as string}
                                                                prefix={<Text title={key}>{key}</Text>}
                                                                placeholder="Test value"
                                                                autoComplete="off"
                                                                className="arg-input"
                                                            />
                                                        </Form.Item>
                                                        <div className="argument-action">
                                                            <Popconfirm
                                                                placement="top"
                                                                title={`Are you sure to delete argument '${key}'?`}
                                                                onConfirm={() => deleteArgument(key)}
                                                                okText={translate(`common.button.yes`)}
                                                                cancelText={translate(`common.button.no`)}
                                                            >
                                                                <a className="action-btn trash-btn">
                                                                    <MinusOutlined />
                                                                </a>
                                                            </Popconfirm>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {(!script.scriptArguments ||
                                            Object.keys(script.scriptArguments).length == 0) && (
                                            <Empty
                                                className="mz-empty"
                                                description="No argument yet."
                                                imageStyle={{
                                                    height: 40,
                                                }}
                                            />
                                        )}
                                    </div>
                                    <Title className="group-title" level={4}>
                                        <Space>
                                            <FunctionOutlined />
                                            {translate(`resources.action.form.response.name`)}
                                        </Space>
                                    </Title>
                                    <div className="group-body">
                                        <Input.TextArea
                                            value={
                                                script &&
                                                script.scriptResponse &&
                                                script.testResult === TestStatus.PASSED
                                                    ? JSON.stringify(script.scriptResponse, undefined, 4)
                                                    : ''
                                            }
                                            rows={8}
                                            readOnly={true}
                                            style={{ resize: 'none' }}
                                        />
                                        <p>* {translate(`resources.action.form.response.format`)}</p>
                                    </div>
                                </div>
                            </Form>
                        </Scrollbars>
                    </Col>
                    <Col flex="auto" className="action-task-code-editor-area">
                        <Title level={4} className="group-title">
                            <div className="language-group">
                                {MonacoLanguageList.map((lang: MonacoLanguage) => (
                                    <Fragment key={lang.name}>
                                        {script && script.scriptType.toLowerCase() !== lang.name && (
                                            <Popconfirm
                                                placement="bottom"
                                                overlayStyle={{ width: 300 }}
                                                title="Your code will be clear and can not rollback. Are you sure to change the script language?"
                                                onConfirm={() => onLanguageChange(lang.serverLang)}
                                                okText={translate(`common.button.yes`)}
                                                cancelText={translate(`common.button.no`)}
                                            >
                                                <a>
                                                    <Avatar size={16} src={lang.imgSrc} style={{ marginRight: 4 }} />
                                                    {lang.display} ({lang.version})
                                                </a>
                                            </Popconfirm>
                                        )}
                                        {script && script.scriptType.toLowerCase() === lang.name && (
                                            <a className="active">
                                                <Avatar size={16} src={lang.imgSrc} style={{ marginRight: 4 }} />
                                                {lang.display} ({lang.version})
                                            </a>
                                        )}
                                    </Fragment>
                                ))}
                            </div>
                            <div className="group-action">
                                <Space>
                                    <Button
                                        type="primary"
                                        icon={<CaretRightFilled />}
                                        loading={scriptRunning}
                                        style={{ fontSize: 11 }}
                                        onClick={onTestClick}
                                        size="small"
                                    >
                                        Run
                                    </Button>
                                    <a className="extend-btn" title="Hide code template" onClick={hideCodeTemplate}>
                                        {showCodeTemplate ? <RightOutlined /> : <LeftOutlined />}
                                    </a>
                                </Space>
                            </div>
                        </Title>
                        <div className="action-task-code-editor">
                            <ControlledEditor
                                value={scriptCode}
                                language={script.scriptType.toLowerCase()}
                                theme="vs"
                                loading="Loading..."
                                onChange={(ev, value) => {
                                    setScriptCode(value as string);
                                }}
                            />
                        </div>
                        <Collapse
                            className="action-task-terminal-collapse"
                            defaultActiveKey={['terminal']}
                            expandIconPosition="right"
                        >
                            <Panel
                                header={
                                    <Fragment>
                                        {scriptReturn.stderr && scriptReturn.stderr.length > 0 ? (
                                            <CloseCircleFilled style={{ color: '#ff4d4f' }} />
                                        ) : scriptReturn.isValid ? (
                                            <CheckCircleFilled style={{ color: PrimaryColor }} />
                                        ) : (
                                            <CodeOutlined />
                                        )}{' '}
                                        {translate(`resources.action.form.terminal.name`)} (
                                        {scriptReturn && scriptReturn.runTime
                                            ? `${scriptReturn.runTime.getHours()}:${scriptReturn.runTime.getMinutes()}:${scriptReturn.runTime.getSeconds()}`
                                            : ''}
                                        )
                                    </Fragment>
                                }
                                key="terminal"
                                style={{ padding: 0 }}
                            >
                                <Input.TextArea
                                    className={
                                        scriptReturn && scriptReturn.stderr && scriptReturn.stderr.length > 0
                                            ? 'execute-error'
                                            : ''
                                    }
                                    style={{ border: 'none', fontSize: 11, color: '#222' }}
                                    autoSize={{ minRows: 10, maxRows: 10 }}
                                    value={
                                        scriptReturn.isValid
                                            ? JSON.stringify(scriptReturn.returnValue, undefined, 4)
                                            : scriptReturn.stderr
                                    }
                                />
                            </Panel>
                        </Collapse>
                    </Col>
                    <Col
                        flex={showCodeTemplate ? '200px' : '0px'}
                        className={`action-task-code-template-area ${showCodeTemplate ? 'show' : 'hide'}`}
                    >
                        <Title className="group-title" level={4}>
                            Code Template
                        </Title>
                        <div className="group-body">
                            <Tree
                                showLine
                                switcherIcon={<DownOutlined />}
                                defaultExpandedKeys={['0-0-0']}
                                treeData={treeData}
                            />
                        </div>
                    </Col>
                </Row>
            </Spin>
        </Drawer>
    );
};

export default CreateActionForm;
