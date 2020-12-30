import React, { FC, useState, useCallback, useEffect } from 'react';
import { Button, Input, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import AddUserForm from './AddUserForm';
import UserList from './UserList';
import { useDataProvider, useVersion } from 'ra-core';
import { INITIAL_USER_DATA, UserCreateDto, UserEntity, userService } from '../../service/userService';

const { Title } = Typography;
const { Search } = Input;

const Users: FC = () => {
    const version = useVersion();
    const dataProvider = useDataProvider();

    const [visibleAddUserForm, setVisibleAddUserForm] = useState<boolean>(false);

    const [userList, setUserList] = useState<Array<UserEntity>>([]);
    const getUserList = useCallback(() => {
        userService.getUserList(dataProvider).then((res: any) => {
            setUserList(res);
        });
    }, [dataProvider]);

    const showAddUserDrawer = () => {
        setVisibleAddUserForm(true);
    };

    /**
     * initialize
     */
    useEffect(() => {
        getUserList();
    }, [getUserList, version]);

    const [userData, setUserData] = useState<UserEntity>(INITIAL_USER_DATA);
    const setUserIdHandler = (tUserId: string | undefined) => {
        if (tUserId !== undefined) {
            for (let i = 0; i < userList.length; i++) {
                let user = userList[i];
                if (user.id === tUserId) {
                    setUserData(user);
                    break;
                }
            }
        }
    };
    const initialUserDataHandler = () => {
        setUserData(INITIAL_USER_DATA);
    };

    const [searchValue, setSearchValue] = useState<string>();
    return (
        <>
            <Title level={3}>Users</Title>
            <div className="users-header" style={{ textAlign: 'right', marginBottom: 20 }}>
                <Search
                    placeholder="Username or Full Name or Email"
                    onSearch={value => {
                        setSearchValue(value === '' ? undefined : value);
                    }}
                    style={{ width: 250, marginRight: 20 }}
                />
                <Button icon={<PlusOutlined />} onClick={showAddUserDrawer}>
                    Create Users
                </Button>
            </div>
            <div className="users-body">
                <UserList
                    searchValue={searchValue}
                    userList={userList}
                    setUserId={setUserIdHandler}
                    showAddUser={showAddUserDrawer}
                />
            </div>
            <AddUserForm
                user={userData}
                initializeUserData={initialUserDataHandler}
                setUserId={setUserIdHandler}
                getUserList={getUserList}
                visible={visibleAddUserForm}
                onClose={() => setVisibleAddUserForm(false)}
            />
        </>
    );
};

export default Users;
