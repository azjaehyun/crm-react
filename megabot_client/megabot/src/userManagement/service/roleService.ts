// {
//     "id": 2,
//     "name": "ROLE_BUILDER",
//     "description": "Default Role Builder for new registered user",
//     "permissionInfos": [

import {ResourceEntity} from "./resourceService";
import {DataProvider} from "ra-core";
import {Method} from "ra-data-simple-rest/esm";

export interface RoleEntity {
    id: number;
    name: string;
    description: string;
    permissionInfos: Array<ResourceEntity>;
    permissions? : Array<number>;
}

export class roleService {
    static getRoleList = (dataProvider: DataProvider) =>
        dataProvider.execute({
            method: Method.GET,
            resource: `role/list`,
        }).then((e: any)=>e.data.list)

    static updateRole = (dataProvider: DataProvider, role: RoleEntity, permissionsStr: string)=>
        dataProvider.update(`role`, {
            id: role.id,
            previousData: role,
            data: {
                ...role,
                permissions: permissionsStr
            }
        });

    // static createRole = (dataProvider: DataProvider, )
}
