import React, { FC } from 'react';
import { Popconfirm, Table } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import groupService, {GroupEntity} from "../../service/groupService";
import {useDataProvider} from "ra-core";

interface Props {
    groupList: Array<GroupEntity>;
    getGroupList: () => void;
}

const GroupList: FC<Props> = (props) => {
    const dataProvider = useDataProvider();
    // delete Group
    const deleteGroup = (id: number) => {
        groupService.deleteGroup(dataProvider, id)
            .then(()=>{
                props.getGroupList();
            })
    };

    const dataSource = props.groupList.map((group: GroupEntity, index: number)=>({
        ...group,
        key: index,
        userCount: group.users.length,
    }))
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
        }, {
            title: 'Group Name',
            dataIndex: 'name',
        }, {
            title: 'Description',
            dataIndex: 'description',
        }, {
            title: 'users',
            dataIndex: 'userCount'
        }, {
            dataIndex: 'id',
            render: (id: number) => (
                <Popconfirm
                    title="Are you sure delete this group?"
                    onConfirm={()=> {
                        deleteGroup(id);
                    }}
                    okText="Yes"
                    cancelText="No"
                >
                    <DeleteOutlined />
                </Popconfirm>
            ),
        },
    ];
    return <Table dataSource={dataSource} columns={columns} />;
};

export default GroupList;
