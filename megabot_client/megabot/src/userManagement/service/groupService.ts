import {Status} from './type';
import {DataProvider} from 'ra-core';
import {Method} from 'ra-data-simple-rest/lib';
import {UserEntity} from './userService';

export type GroupState = Status;
export interface GroupEntity {
    id: number;
    name: string;
    description: string;
    users: Array<UserEntity>
}
export interface GroupDto {
    name: string;
    description: string;
    status: Status;
}
export interface GroupData {[key: string]: GroupEntity}

export default class groupService {
    static getListGroup = (dataProvider: DataProvider) =>
        dataProvider.execute({
            method: Method.GET,
            resource: `group/filter`
        }).then((res:any)=>(res.data.list))

    static createGroup = (dataProvider: DataProvider, groupDto: GroupDto)=>
        dataProvider.create('group', {data: groupDto})

    static deleteGroup = (dataProvider: DataProvider, groupId: number)=>
        /**
         * Uncaught (in promise) Error: {"message":"The group (Id: 6) has been removed"}
         * validateResponseFormat validateResponseFormat.js:12
         */
        //dataProvider.delete("group", {id: groupId})
        dataProvider.execute({
            method: Method.DELETE,
            resource: `group/${groupId}`
        })

}
