import { DataProvider } from 'ra-core';
import {Method, Request} from "ra-data-simple-rest/lib";
import {ScriptQuery} from "../../projects/service/actionTaskService";

export type UserRole = "ROLE_ADMINISTRATOR" | "ROLE_BUILDER" | "ROLE_READ_BOT" | "ROLE_WRITE_BOT" | "ROLE_PUBLISH_BOT" | "ROLE_DELETE_BOT" | "ROLE_FORK_BOT" | "ROLE_CREATE_BOT" | "ROLE_READ_USER" | "ROLE_WRITE_USER" | "ROLE_CREATE_USER" | "ROLE_DELETE_USER" | "ROLE_READ_SCRIPT" | "ROLE_WRITE_SCRIPT" | "ROLE_CREATE_SCRIPT" | "ROLE_DELETE_SCRIPT" | "ROLE_READ_BOT_SCRIPT" | "ROLE_WRITE_BOT_SCRIPT" | "ROLE_CREATE_BOT_SCRIPT" | "ROLE_DELETE_BOT_SCRIPT" | "ROLE_READ_USER_GROUP" | "ROLE_WRITE_USER_GROUP" | "ROLE_CREATE_USER_GROUP" | "ROLE_DELETE_USER_GROUP" | "ROLE_TAKE_OVER_BOT" | "ROLE_USER";
export type UserGender = "MALE" | "FEMALE" | "UNKNOWN";
export type UserStatus = "ACTIVE" | "INACTIVE" | "PENDING";
export interface User {
    fullName: string
    username: string,
    email: string,
    password: string,
    role: UserRole,
    avatarUrl: string,
    avatarUrl200: string,
    gender: UserGender,
    birthday: string,
    status: UserStatus,
}

export const initialUser: User = {
    fullName: "",
    username: "",
    email: "",
    password: "",
    role: "ROLE_USER",
    avatarUrl: "",
    avatarUrl200: "",
    gender: "UNKNOWN",
    birthday: "",
    status: "ACTIVE"
}

export const OPTIONS = {
    GENDERS: ["MALE", "FEMALE", "UNKNOWN"],
    STATES: ['ACTIVE', 'INACTIVE'],
    ROLES: ["ROLE_ADMINISTRATOR", "ROLE_BUILDER", "ROLE_READ_BOT", "ROLE_WRITE_BOT", "ROLE_PUBLISH_BOT", "ROLE_DELETE_BOT", "ROLE_FORK_BOT", "ROLE_CREATE_BOT", "ROLE_READ_USER", "ROLE_WRITE_USER", "ROLE_DELETE_USER", "ROLE_CREATE_USER", "ROLE_READ_SCRIPT", "ROLE_WRITE_SCRIPT", "ROLE_DELETE_SCRIPT", "ROLE_CREATE_SCRIPT", "ROLE_READ_BOT_SCRIPT", "ROLE_WRITE_BOT_SCRIPT", "ROLE_DELETE_BOT_SCRIPT", "ROLE_CREATE_BOT_SCRIPT", "ROLE_READ_USER_GROUP", "ROLE_WRITE_USER_GROUP", "ROLE_DELETE_USER_GROUP", "ROLE_CREATE_USER_GROUP", "ROLE_TAKE_OVER_BOT", "ROLE_USER"]
}

class userManagement{
    static createUser = (dataProvider: DataProvider, user: User) => {
        const request: Request = {
            method: Method.POST,
            resource: `admin/createNew`,
            query: user,
        };
        return dataProvider.excute(request)
    }
}

