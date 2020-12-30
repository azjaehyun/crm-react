import React, {FC} from 'react';
import {Card, Col, Row, Switch} from "antd";
import {PermissionEntity, ResourceEntity} from "../../../service/resourceService";
import {RoleEntity} from "../../../service/roleService";

interface Props {
    resource: ResourceEntity,
    role: RoleEntity
}

const ResourceSection: FC<Props> = ({resource, role}) => {
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
        <Card.Grid style={{width: "20%"}}>
            <div>{resource.resource}</div>
            {resource.permissionDetails.map((permission: PermissionEntity)=>
                permissionContainer(role, permission)
            )}
        </Card.Grid>
    );
}

export default ResourceSection;
