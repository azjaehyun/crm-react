import React, { FC, useState, useCallback, useEffect } from 'react';
import { forwardRef } from 'react';
import ReactDOM from 'react-dom';
import MaterialTable from 'material-table';
import { Bot, PGroup } from '../types';
import {
    Button,
    Badge,
    Input,
    Dropdown,
    Menu,
    Divider,
    Col,
    Row,
    Empty,
    Space,
    Typography,
    Radio,
    notification,
} from 'antd';

//import { PlusOutlined, DownOutlined, CheckOutlined, SortAscendingOutlined } from '@ant-design/icons';
import { ReloadOutlined, SearchOutlined } from '@ant-design/icons/lib';
import CreateProjectForm from './CreateProjectForm';
import MyProjectsList from './MyProjectsList';
import { useDataProvider, useTranslate } from 'react-admin';
import {
    BOT_GROUP,
    DEFAULT_CATEGORY,
    NORMAL_BOT,
    PAGE_SIZE,
    PrimaryColor,
    SERVICE_BOT,
    SORT_DESC,
} from './common/Constants';
import BotService, { BOT_ERROR_MESSAGES } from './service/botService';
//import { ReloadOutlined, SearchOutlined } from '@ant-design/icons/lib';
import { useHistory } from 'react-router';

import { Table, Tag } from 'antd';
export declare type Key = React.Key;

interface State {
    pList?: Bot[];
    pGroup?: PGroup[];
    loginUsername: string;
}

const { Title } = Typography;
const { Search } = Input;

const MyProjects: FC<State> = props => {
    const dataProvider = useDataProvider();
    const translate = useTranslate();
    let history = useHistory();

    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    const [botList, setBotList] = useState([]);
    const [botTemplates, setBotTemplates] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    // antd table select box
    const [selectionType, setSelectionType] = useState('checkbox');
    const [params, setParams] = useState({
        page: 0,
        size: 3,
        sort: '',
    });

    const [pagination, setPagination] = useState({
        current: 0,
        pageSize: 20,
        total: 10,
        pageSizeOptions: ['10', '20', '50', '100', '1000', '5000'],
    });
    // Call API for get data

    const dataSource = [
        {
            key: '1',
            name: 'Mike',
            age: 32,
            address: '10 Downing Street',
        },
        {
            key: '2',
            name: 'John',
            age: 42,
            address: '10 Downing Street',
        },
    ];
    //  corp_code
    // ,phone_num
    // ,five_dayfree_yn
    // ,sales_status
    // ,sms_reception_yn
    // ,call_status
    // ,custom_status
    // ,temp_one_status
    // ,temp_two_status
    // ,db_insert_type
    // ,use_yn
    // ,manager_id
    // ,tm_manager_id
    const columns = [
        {
            id: 'id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'phoneNum',
            dataIndex: 'phoneNum',
            key: 'phoneNum',
        },
        {
            title: 'corpCode',
            dataIndex: 'corpCode',
            key: 'corpCode',
        },
    ];

    const onSearchEvent = (event: any) => {
        setParams(params => ({ ...params, offset: 0, botName: event }));
    };

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const rowSelection = (selectedRowKeys: any, onSelectChange: any) => {
        onSelectChange(selectedRowKeys);
    };

    const onSelectChange = (selectedRowKeys: any) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        setSelectedRowKeys(selectedRowKeys);
    };

    const loadBotList = useCallback(
        async event => {
            setLoading(true);
            console.log(event);
            debugger;
            let paramsObj = { ...event };

            const paramsData = {
                page: paramsObj.current,
                size: paramsObj.pageSize,
                sort: '',
            };

            // page=0&size=3&sort=corpCode
            BotService.search(dataProvider, props.loginUsername, paramsData)
                .then(({ data, totalCnt }: any) => {
                    setBotList(data);
                    // setTotalCount(data.totalCount);
                    setLoading(false);
                    console.log(data);
                    let paginationObj = { ...pagination };
                    paginationObj.total = totalCnt;
                    paginationObj.current = paramsObj.current;
                    paginationObj.pageSize = paramsObj.pageSize;
                    //console.log(pagingTotalCnt)
                    setPagination(paginationObj);
                    setParams(paramsData);
                })
                .catch((error: any) => {
                    setError(error);
                    setLoading(false);
                });
        },
        [dataProvider, pagination, props.loginUsername]
    );

    useEffect(() => {
        loadBotList(pagination).then();
    }, [loadBotList, pagination]);

    return (
        <div>
            abcd
            <div style={{ width: '80%' }}>
                <Input
                    placeholder={translate(`common.message.search`)}
                    suffix={<SearchOutlined style={{ color: PrimaryColor }} />}
                    style={{ width: 250 }}
                    onPressEnter={(e: any) => onSearchEvent(e.target.value)}
                    allowClear={true}
                    autoComplete="off"
                />
                <Table
                    // rowSelection={rowSelection({...rowSelection})}

                    dataSource={botList}
                    columns={columns}
                    pagination={pagination}
                    loading={loading}
                    onChange={e => loadBotList(e)}
                />
            </div>
        </div>
    );
};

export default MyProjects;
