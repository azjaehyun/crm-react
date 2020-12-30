import React, {FC} from 'react';
import {Button, Card} from "antd";
import {ResourceEntity} from "../../../service/resourceService";
import {RoleEntity, roleService} from "../../../service/roleService";
import {Collapse} from "antd";
import Title from "antd/es/typography/Title";
import {DataProvider} from "ra-core";
import ResourceSection from "./ResourceSection";

const {Panel} = Collapse;

interface Props {
    role: RoleEntity;
    dataProvider: DataProvider;
    getRoles: () => void;
    resourceList: Array<ResourceEntity>;
}

const RoleSections:FC<Props> = ({role, dataProvider, getRoles, resourceList}) => {
    return (
        <Panel header={role.name} key={role.id}>
            <Title level={4}>{role.description}</Title>
            <Card>
                {/*{resourceList.map((resource: ResourceEntity) =>*/}
                {/*    resourceContainer(role, resource)*/}
                {/*)}*/}
                {resourceList.map((resource: ResourceEntity) =>
                    <ResourceSection resource={resource} role={role}/>
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
    );
}

export default RoleSections;
