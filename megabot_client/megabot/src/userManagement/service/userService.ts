import {Gender, Status, UserRoles} from "./type";
import {DataProvider} from "ra-core";
import {Method} from "ra-data-simple-rest/esm";

export interface UserCreateDto {
    role: UserRoles;
    username: string;
    email: string;
    fullName: string;
    password: string;
    gender: Gender;
    avatarUrl: string;
    avatarUrl200: string;
    birthday: string;
    status: Status;
    defaultGroup: string;
}
export interface UserUpdateDto {
    id: string;
    role: UserRoles;
    username: string;
    email: string;
    fullName: string;
    password: string;
    gender: Gender;
    avatarUrl: string;
    avatarUrl200: string;
    birthday: string;
    status: Status;
    defaultGroup: string;
}
export interface UserEntity {
    id: string;
    username: string;
    email: string;
    fullName: string;
    birthday: string;
    gender: Gender;
    status: Status;
    roles: Array<UserRoles>;
    defaultGroup: string;
    createdOn: string;
    updatedOn: string;
}
export const INITIAL_USER_DATA: UserEntity = {
    id: "",
    username: "",
    email: "",
    fullName: "",
    birthday: "",
    gender: "UNKNOWN",
    status: "ACTIVE",
    roles: ["ROLE_USER"],
    defaultGroup: "",
    createdOn: "",
    updatedOn: "",
}
// export interface UserEntity {
//     id: c0efa1d412374a7a84ac477a719aadff,
//     fullName: itsme,
//     username: mario,
//     email: hi@mz.co.kr,
//     birthday: 1994-05-20,
//     gender: MALE,
//     languageCode: KO,
//     loginFailedCount: 0,
//     joinDate: 2020-08-06 20:29:03,
//     status: ACTIVE,
//     state: ACTIVE,
//     createdOn: 2020-08-06 20:29:03,
//     updatedOn: 2020-08-06 20:29:03
// }
export interface userData {[key: string]: UserEntity}

export class userService{
    static getUserList = (dataProvider: DataProvider) =>
        dataProvider.execute({
            method: Method.GET,
            resource: `admin/groupUsers?limit=99999`
        }).then((res:any)=>res.data.list)

    static createUser = (dataProvider: DataProvider, user: UserCreateDto) =>
        // dataProvider.execute({
        //     method: Method.POST,
        //     resource: `admin/createNew`
        // })
        dataProvider.create(`admin/createNew`, {data: user})

    static updateUser = (dataProvider: DataProvider, user: UserUpdateDto) =>
        dataProvider.execute({
            method: Method.PUT,
            resource:`admin/${user.id}`,
            body: user
        })
}
