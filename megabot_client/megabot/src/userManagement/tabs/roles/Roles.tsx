import React, {FC, Fragment, useCallback, useEffect, useState} from 'react';
import {Button, Card, Col, Collapse, Divider, Input, Row, Switch, Typography} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import AddRolesForm from './AddRolesForm';
import {PermissionEntity, resourceService, ResourceEntity} from "../../service/resourceService";
import {useDataProvider, useVersion} from "ra-core";
import {RoleEntity, roleService} from "../../service/roleService";

const { Title } = Typography;
const { Search } = Input;
const {Panel } = Collapse;

const Roles: FC = () => {
    const version = useVersion();
    const dataProvider = useDataProvider();

    const [visibleAddRolesForm, setVisibleAddRolesForm] = useState(false);

    const [resourceList, setResourceList] = useState<Array<ResourceEntity>>([])
    const getResources = useCallback(()=>{
        resourceService.getPermission(dataProvider)
            .then((res: Array<ResourceEntity>)=>{
                setResourceList(res)
            })
    }, [dataProvider])

    const [roleList, setRoleList] = useState<Array<RoleEntity>>([])
    const getRoles = useCallback(()=>{
        roleService.getRoleList(dataProvider)
            .then((res: Array<RoleEntity>)=>{
                res.forEach((role: RoleEntity)=>{
                    const result: Array<number> = [];
                    role.permissionInfos.forEach((resource: ResourceEntity)=>{
                        resource.permissionDetails.forEach((permission: PermissionEntity)=>{
                            result.push(permission.permissionId);
                        })
                    })
                    role.permissions = result;
                })
                setRoleList(res)
            })
    }, [dataProvider])

    const showAddRolesModal = () => {
        setVisibleAddRolesForm(true);
    };

    useEffect(()=>{
        getResources();
        getRoles();
    },[version])

    const roleContainer = (role: RoleEntity) => (
        <Panel header={role.name} key={role.id}>
            <Title level={4}>{role.description}</Title>
            <Card>
                {resourceList.map((resource: ResourceEntity) =>
                    resourceContainer(role, resource)
                )}
            </Card>
            <div style={{width: '100%', textAlign: 'right'}}>
                <Button type={"primary"} onClick={()=>{
                    const permissionsStr = JSON.stringify(role.permissions).slice(1,-1)
                    console.log(permissionsStr)
                    roleService.updateRole(dataProvider, role, permissionsStr)
                        .then(()=>{getRoles()})
                }}>save</Button>
            </div>
        </Panel>
    )
    const resourceContainer = (role: RoleEntity, resource: ResourceEntity) => (
        <Card.Grid style={{width: "20%"}}>
            <div>{resource.resource}</div>
            {resource.permissionDetails.map((permission: PermissionEntity)=>
                permissionContainer(role, permission)
            )}
        </Card.Grid>
    )
    const permissionContainer = (role: RoleEntity, permission: PermissionEntity)=>{
        const {permissionId} = permission;
        return <Row>
            <Col span={12} style={{display: "inline-block", width: "100px"}}>
                <b>{permission.action}</b>
            </Col>
            <Col span={12} style={{textAlign: 'right'}}>
                <Switch
                    defaultChecked={role.permissions?.indexOf(permissionId) !== -1}
                    onChange={(e: boolean) => {
                        if (!e) {
                            //@ts-ignore
                            const rolePermissionIndex: number = role.permissions.indexOf(permissionId)
                            role.permissions?.splice(rolePermissionIndex, 1);
                        } else {
                            role.permissions?.push(permissionId)
                        }
                    }}
                />
            </Col>
        </Row>
    }
    return (
        <Fragment>
            <Title level={3}>Roles</Title>
            <div className="roles-header" style={{ textAlign: 'right', marginBottom: 20 }}>
                <Search
                    placeholder="Search Roles"
                    onSearch={value => console.log(value)}
                    style={{ width: 250, marginRight: 20 }}
                />
                <Button icon={<PlusOutlined />} onClick={showAddRolesModal}>
                    Create New Role
                </Button>
            </div>
            <div className="group-body">
                <Collapse defaultActiveKey={2}>
                    {roleList.map((role: RoleEntity)=> roleContainer(role))}
                </Collapse>
            </div>
            <AddRolesForm visible={visibleAddRolesForm} onClose={() => setVisibleAddRolesForm(false)} />
        </Fragment>
    );
};

export default Roles;
