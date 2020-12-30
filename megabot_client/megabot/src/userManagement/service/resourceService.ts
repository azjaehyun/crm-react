// [
//     {
//         "resource": "BOT",
//         "permissionDetails": [
//             {
//                 "permissionId": 15,
//                 "resourceName": "BOT",
//                 "action": "CREATE",
//                 "permissionName": "Create",
//                 "description": "Create Bot"
//             },

import {DataProvider} from "ra-core";
import {Method} from "ra-data-simple-rest/lib";

export interface PermissionEntity {
    permissionId: number;
    resourceName: string;
    action: string;
    permissionName: string;
    description: string;
}

export interface ResourceEntity {
    resource: string;
    permissionDetails: Array<PermissionEntity>;
    permissions? : Array<number>;
}

export interface PermissionData {[key: string]: ResourceEntity}

export class resourceService {
    static getPermission = (dataProvider: DataProvider) =>
        dataProvider.execute({
            method: Method.GET,
            resource: `role/permissionList`,
        }).then((e: {
            [key:string] : any
            data: Array<ResourceEntity>
        })=>e.data)
}
