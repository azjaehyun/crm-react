import HttpUtils from '../../utils/httpUtils';
import { httpClient } from '../../dataProvider/rest';
import { Method, Request } from 'ra-data-simple-rest/lib';
import { DataProvider } from 'ra-core';
import bot from './bot';

export default class EntitiesService {
    static apiURL = process.env.REACT_APP_MEGA_DIALOGFLOW_API_URL;
    static baseURL = 'entities/';
    static getList = (dataProvider: DataProvider, botId: any, params: any) => {
        const request: Request = {
            method: Method.GET,
            resource: `entities/${botId}`,
            query: params,
        };
        return dataProvider.execute(request);
    };

    static getById = (dataProvider: DataProvider, botId: any, entityId: any) => {
        const request: Request = {
            method: Method.GET,
            resource: EntitiesService.baseURL
                .concat(botId)
                .concat('/')
                .concat(entityId),
        };
        return dataProvider.execute(request);
    };

    static create = (dataProvider: DataProvider, botId: any, entity: object) => {
        const request: Request = {
            method: Method.POST,
            resource: EntitiesService.baseURL.concat(botId),
            body: entity,
        };
        return dataProvider.execute(request);
    };

    static update = (dataProvider: DataProvider, botId: any, entity: object) => {
        const request: Request = {
            method: Method.PUT,
            resource: EntitiesService.baseURL.concat(botId),
            body: entity,
        };
        return dataProvider.execute(request);
    };

    static delete = (dataProvider: DataProvider, botId: any, entityId: any) => {
        const request: Request = {
            method: Method.DELETE,
            resource: EntitiesService.baseURL
                .concat(botId)
                .concat('/')
                .concat(entityId),
        };
        return dataProvider.execute(request);
    };

    static getSystemEntities = (dataProvider: DataProvider, botId: any) => {
        const request: Request = {
            method: Method.GET,
            resource: EntitiesService.baseURL.concat(botId).concat('/listSystemEntities'),
        };
        return dataProvider.execute(request);
    };

    static turnOnSystemEntity = (dataProvider: DataProvider, botId: any, params: object) => {
        const request: Request = {
            method: Method.POST,
            body: params,
            resource: EntitiesService.baseURL.concat(botId).concat('/addSystemEntity'),
        };
        return dataProvider.execute(request);
    };
    static updateSystemEntity = (botId: any, entity: object) => {
        const url = EntitiesService.baseURL.concat(botId).concat('/updateSystemEntity');
        return HttpUtils.sendPut(httpClient, url, entity);
    };

    /**
     * search of entites
     * @param dataProvider
     * @param query
     */
    static entitiesSearch = (dataProvider: DataProvider, query: any) => {
        console.log(query);
        const request: Request = {
            method: Method.GET,
            resource: `entities/externalSearch`,
            query: query,
        };
        return dataProvider.execute(request);
    };

    /**
     * fork of intent
     * @param dataProvider
     * @param botId
     * @param botIntentId
     * @param query
     */
    static fork = (dataProvider: DataProvider, botId: string, entityId: string) => {
        const request: Request = {
            method: Method.POST,
            resource: `entities/${entityId}/forkTo/${botId}`,
            //query: query,
        };
        return dataProvider.execute(request);
    };

    static exportAll = (dataProvider: DataProvider, botId: string) => {
        const request: Request = {
            method: Method.GET,
            resource: `entities/${botId}/exportAll`,
        };
        return dataProvider.execute(request);
    };
    static importJson = (dataProvider: DataProvider, botId: string, file: any) => {
        console.log('----file upload: ', file);
        const request: Request = {
            method: Method.POST,
            resource: `entities/${botId}/import/json`,
            body: file,
        };
        return dataProvider.execute(request);
    };
}
