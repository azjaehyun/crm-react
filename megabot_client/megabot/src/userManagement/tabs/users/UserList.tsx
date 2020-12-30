import React, { FC, useState } from 'react';
import { Popconfirm, Select, Table } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { UserCreateDto, UserEntity } from '../../service/userService';
import { ColumnType } from 'antd/es/table';

interface Props {
    searchValue: string | undefined;
    userList: Array<UserEntity>;
    setUserId: (userId: string) => void;
    showAddUser: () => void;
}

const UserList: FC<Props> = props => {
    // delete user
    const deleteUser = () => {};

    const [statusFilter, setStatusFilter] = useState<'Status' | 'all' | 'ACTIVE' | 'INACTIVE' | 'PENDING'>('Status');

    const userList = props.userList.filter(user => {
        if (statusFilter === 'Status' || statusFilter === 'all') {
            if (props.searchValue !== undefined) {
                const { username, email, fullName } = user;
                return [username, email, fullName].indexOf(props.searchValue) !== -1;
            } else {
                return true;
            }
        } else {
            return user.status === statusFilter;
        }
    });

    const dataSource = userList.map((user: UserEntity, index: number) => ({
        ...user,
        key: index,
        createdOn: user.createdOn.slice(0, 10),
        updatedOn: user.updatedOn.slice(0, 10),
    }));

    const columns: Array<ColumnType<any>> = [
        {
            title: 'User Name',
            dataIndex: 'username',
        },
        {
            title: 'Full Name',
            dataIndex: 'fullName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: () => (
                <div>
                    <div>
                        <Select
                            value={statusFilter}
                            onChange={val => {
                                if (val === 'all') setStatusFilter('Status');
                                else setStatusFilter(val);
                            }}
                            style={{ width: 85 }}
                        >
                            <Select.Option value={'all'}>Show All</Select.Option>
                            <Select.Option value={'ACTIVE'}>ACTIVE</Select.Option>
                            <Select.Option value={'INACTIVE'}>INACTIVE</Select.Option>
                            <Select.Option value={'PENDING'}>PENDING</Select.Option>
                        </Select>
                    </div>
                </div>
            ),
            dataIndex: 'status',
            width: 85,
        },
        {
            title: 'Roles',
            dataIndex: 'roles',
            width: 170,
        },
        {
            title: 'Update Date',
            dataIndex: 'updatedOn',
            width: 100,
        },
        {
            render: (data: UserEntity) => (
                <>
                    <EditOutlined
                        onClick={() => {
                            props.setUserId(data.id);
                            props.showAddUser();
                        }}
                        style={{ marginRight: 10 }}
                    />
                    <Popconfirm
                        title="Are you sure delete this user?"
                        onConfirm={deleteUser}
                        okText="Yes"
                        cancelText="No"
                    >
                        <DeleteOutlined />
                    </Popconfirm>
                </>
            ),
            width: 50,
        },
    ];
    return <Table dataSource={dataSource} columns={columns} scroll={{ x: 1000 }} />;
};

export default UserList;
