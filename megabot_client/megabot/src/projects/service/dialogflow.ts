// import HttpUtils from '../../utils/httpUtils';
// import { httpClient } from '../../dataProvider/rest';

export default class DialogflowService {
    // static apiURL = process.env.REACT_APP_MEGA_DIALOGFLOW_API_URL;
    // static baseURL = DialogflowService.apiURL + '/step/';

    // static getList = (botId: any) => {
    //     const url = DialogflowService.baseURL.concat(botId);
    //     return HttpUtils.sendGet(httpClient, url);
    // };
    static getList = (dataProvider: any, botId: any) =>
        dataProvider.getOne(`step/`, {id: botId});

    // static createNew = (botId: any, params: object) => {
    //     const url = DialogflowService.baseURL.concat(botId);
    //     return HttpUtils.sendPost(httpClient, url, params);
    // };
    static createNew = (dataProvider: any, botId: any, params: object) =>
        dataProvider.create(`step/${botId}`, {data: params})

    // static getById = (botId: any, stepId: any) => {
    //     const url = DialogflowService.baseURL
    //         .concat(botId)
    //         .concat('/')
    //         .concat(stepId);
    //     return HttpUtils.sendGet(httpClient, url);
    // };
    static getById = (dataProvider: any, botId: any, stepId: any) =>
        dataProvider.getOne(`step/${botId}`, {id: stepId})

    // static update = (botId: any, stepId: any, params: object) => {
    //     const url = DialogflowService.baseURL
    //         .concat(botId)
    //         .concat('/')
    //         .concat(stepId);
    //     return HttpUtils.sendPut(httpClient, url, params);
    // };
    static update = (dataProvider: any, botId: any, stepId: any, params: object) =>
        dataProvider.update(`step/${botId}`, {id: stepId, data: params})
}
