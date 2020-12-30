import HttpUtils from '../../utils/httpUtils';
import { httpClient } from '../../dataProvider/rest';

export default class EntitiesService {
    static apiURL = process.env.REACT_APP_MEGA_DIALOGFLOW_API_URL;
    static baseURL = EntitiesService.apiURL + '/entities/';
    // static getList = (botId: any, params: any) => {
    //     const queryParams = HttpUtils.encodeFormData(params);
    //     const url = EntitiesService.baseURL + botId + '?' + queryParams;
    //     return HttpUtils.sendGet(httpClient, url);
    // };
    static getList = (dataProvider: any, botId: any, params: any) => dataProvider.getList(`entities/${botId}`, params);

    // static getById = (botId: any, entityId: any) => {
    //     const url = EntitiesService.baseURL
    //         .concat(botId)
    //         .concat('/')
    //         .concat(entityId)
    //         .concat('/view');
    //     return HttpUtils.sendGet(httpClient, url);
    // };
    static getById = (dataProvider: any, botId: any, entityId: any) =>
        dataProvider.getOne(`entities/${botId}/${entityId}`, { id: 'view' });

    // static create = (botId: any, entity: object) => {
    //     const url = EntitiesService.baseURL.concat(botId);
    //     return HttpUtils.sendPost(httpClient, url, entity);
    // };
    static create = (dataProvider: any, botId: any, entity: object) =>
        dataProvider.create(`entities/${botId}`, { data: entity });

    // static update = (botId: any, entity: object) => {
    //     const url = EntitiesService.baseURL.concat(botId);
    //     return HttpUtils.sendPut(httpClient, url, entity);
    // };
    static update = (dataProvider: any, botId: any, entity: object) =>
        dataProvider.update(`entities/${botId}`, { data: entity });

    // static delete = (botId: any, entityId: any) => {
    //     const url = EntitiesService.baseURL
    //         .concat(botId)
    //         .concat('/')
    //         .concat(entityId);
    //     return HttpUtils.sendDelete(httpClient, url);
    // };
    static delete = (dataProvider: any, botId: any, entityId: any) =>
        dataProvider.delete(`entities/${botId}`, { id: entityId });

    // static getSystemEntities = (botId: any) => {
    //     const url = EntitiesService.baseURL.concat(botId).concat('/listSystemEntities');
    //     return HttpUtils.sendGet(httpClient, url);
    // };
    static getSystemEntities = (dataProvider: any, botId: any) =>
        dataProvider.getOne(`entities/${botId}`, { id: 'listSystemEntities' });

    // static turnOnSystemEntity = (botId: any, params: object) => {
    //     const url = EntitiesService.baseURL.concat(botId).concat('/addSystemEntity');
    //     return HttpUtils.sendPost(httpClient, url, params);
    // };
    static turnOnSystemEntity = (dataProvider: any, botId: any) =>
        dataProvider.create(`entities/${botId}/addSystemEntity`, {});

    // static updateSystemEntity = (botId: any, entity: object) => {
    //     const url = EntitiesService.baseURL.concat(botId).concat('/updateSystemEntity');
    //     return HttpUtils.sendPut(httpClient, url, entity);
    // };
    static updateSystemEntity = (dataProvider: any, botId: any, entity: object) =>
        dataProvider.update(`entities/${botId}/updateSystemEntity`, { data: entity });
}
