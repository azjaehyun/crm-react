import React, {FC, Fragment, useCallback, useEffect, useState} from 'react';
import { Button, Input, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import AddGroupForm from './AddGroupForm';
import GroupList from './GroupList';
import {useDataProvider, useVersion} from "ra-core";
import groupService, {GroupEntity} from "../../service/groupService";

const { Title } = Typography;
const { Search } = Input;

const Groups: FC = () => {
    const dataProvider = useDataProvider();
    const version = useVersion();

    const [visibleAddGroupForm, setVisibleAddGroupForm] = useState(false);
    const showAddGroupModal = () => {
        setVisibleAddGroupForm(true);
    };

    const [groupList, setGroupList] = useState<Array<GroupEntity>>([])
    const getGroupList = useCallback( ()=>{
        groupService.getListGroup(dataProvider)
            .then((res: Array<GroupEntity>)=>{
                console.log(res)
                setGroupList(res)
            })
    },[dataProvider])

    /**
     * initalize
     */
    useEffect(()=>{
        getGroupList();
    }, [version]);

    return (
        <Fragment>
            <Title level={3}>Group</Title>
            <div className="group-header" style={{ textAlign: 'right', marginBottom: 20 }}>
                <Search
                    placeholder="Search Group"
                    onSearch={value => console.log(value)}
                    style={{ width: 250, marginRight: 20 }}
                />
                <Button icon={<PlusOutlined />} onClick={showAddGroupModal}>
                    Create Group
                </Button>
            </div>
            <div className="group-body">
                <GroupList
                    groupList={groupList}
                    getGroupList={getGroupList}
                />
            </div>
            <AddGroupForm
                visible={visibleAddGroupForm}
                onClose={() => setVisibleAddGroupForm(false)}
                getGroupList={getGroupList}
            />
        </Fragment>
    );
};

export default Groups;
