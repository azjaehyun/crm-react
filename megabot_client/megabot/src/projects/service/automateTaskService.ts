import { SmartCardData } from '../smartcard/types';
import { DataProvider } from 'ra-core';
import { Method, Request } from 'ra-data-simple-rest/lib';
import { message } from 'antd';

export interface MessageEntity {
    id?: number;
    contentType: string;
    type: string;
    language: string;
    message: string;
    state: string;
    createdType: string;
    jsonMessage?: SmartCardData;
}

export interface MessageQuery {
    language: string;
    type: string;
}

export default class AutomateTaskService {
    /**
     * Select all messages
     * @param dataProvider
     * @param botId
     * @param query
     */
    static select = (dataProvider: DataProvider, botId: string, query: MessageQuery) => {
        const request: Request = {
            method: Method.GET,
            resource: `bots/message/${botId}`,
            query: query,
        };
        return dataProvider.execute(request);
    };

    /**
     * Insert new message
     * @param dataProvider
     * @param botId
     * @param message
     */
    static insert = (dataProvider: DataProvider, botId: string, message: MessageEntity) => {
        const request: Request = {
            method: Method.POST,
            resource: `bots/message/${botId}`,
            body: message,
        };
        return dataProvider.execute(request);
    };

    /**
     * update a message
     * @param dataProvider
     * @param botId
     * @param message
     */
    static update = (dataProvider: DataProvider, botId: string, message: MessageEntity) => {
        const request: Request = {
            method: Method.PUT,
            resource: `bots/message/${botId}`,
            body: message,
        };
        return dataProvider.execute(request);
    };

    /**
     * Delete message by list id
     * @param dataProvider
     * @param botId
     * @param messageIdList
     */
    static delete = (dataProvider: DataProvider, botId: string, messageIdList: Array<number>) => {
        const request: Request = {
            method: Method.DELETE,
            resource: `bots/message/${botId}`,
            body: messageIdList,
        };
        return dataProvider.execute(request);
    };

    /**
     * insert or update a message
     * @param dataProvider
     * @param botId
     * @param message
     */
    static insertOrUpdate = (dataProvider: any, botId: string, message: MessageEntity) =>
        message.id && message.id > 0
            ? AutomateTaskService.update(dataProvider, botId, message)
            : AutomateTaskService.insert(dataProvider, botId, message);

    static exportJson = (dataProvider: any, botId: string, query: MessageQuery) => {
        const request: Request = {
            method: Method.GET,
            resource: `bots/message/${botId}`,
            query: query,
        };
        return dataProvider.execute(request);
    };

    static importJson = (dataProvider: any, botId: string, isWelcome: boolean, data: any) => {
        const type = isWelcome ? 'welcome' : 'not-understand';
        const request: Request = {
            method: Method.POST,
            resource: `bots/message/${botId}/import/${type}`,
            body: data,
        };
        return dataProvider.execute(request);
    };
    static importWelcomeJson = (dataProvider: any, botId: string, data: any) => {
        const request: Request = {
            method: Method.POST,
            resource: `bots/message/${botId}/import/welcome`,
            body: data,
        };
        return dataProvider.execute(request);
    };
}
