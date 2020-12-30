import HttpUtils from '../../utils/httpUtils';
import { httpClient } from '../../dataProvider/rest';

export default class BotService {
    static search = (dataProvider: any, usernameOrId: any, params: object) =>
        dataProvider.create(`bots/${usernameOrId}/search`, { data: params });

    static getList = (dataProvider: any, usernameOrId: any) => dataProvider.getOne(`bots`, { id: usernameOrId });

    static getById = (dataProvider: any, botId: any) => dataProvider.getOne(`bots`, { id: `${botId}/view` });

    static updateBot = (dataProvider: any, botId: any, bot: object) =>
        dataProvider.update(`bots`, { id: botId, data: bot, previousData: bot });

    // static updateQA(botId: any, smallTalk: boolean, defaultReply: string) {
    //     const url = this.baseURL + botId + '/updateQA?smallTalk=' + smallTalk + '&defaultReply=' + defaultReply;
    //     return HttpUtils.sendGet(httpClient, url);
    // }
    static updateQA = (dataProvider: any, botId: any, smallTalk: boolean, defaultReply: string) =>
        dataProvider.getOne(`bots`, { id: `/${botId}/updateQA?smallTalk=${smallTalk}&defaultReply=${defaultReply}` });

    // static publicBot(botId: any) {
    //     const url = this.baseURL + botId + '/publish';
    //     return HttpUtils.sendGet(httpClient, url);
    // }
    static publicBot = (dataProvider: any, botId: any) => dataProvider.getOne(`bots`, { id: `${botId}/publish` });

    // static uploadThumbnail(file: File, botId: any) {
    //     const url = this.baseURL + botId + '/thumbnail';
    //     const formData = new FormData();
    //     formData.append('files', file);
    //     return HttpUtils.uploadFile(httpClient, url, formData);
    // }
    static uploadThumbnail = (dataProvider: any, file: File, botId: any) =>
        dataProvider.create(`bots/${botId}/thumbnail`, { data: { files: file } });

    // static getDeletedBots(params: object) {
    //     const queryParams = HttpUtils.encodeFormData(params);
    //     const url = this.baseURL + 'listDeletedBots?' + queryParams;
    //     return HttpUtils.sendGet(httpClient, url);
    // }
    static getDeletedBots = (dataProvider: any, params: object) => dataProvider.getList(`bots/listDeletedBots`, params);

    // static updateMLSetting(botId: any, configML: object) {
    //     const url = this.baseURL.concat(botId).concat('/settingML');
    //     return HttpUtils.sendPost(httpClient, url, configML);
    // }
    static updateMLSetting = (dataProvider: any, botId: any, configML: object) =>
        dataProvider.create(`bots/${botId}/settingML`, { data: configML });

    // static getBotService = (usernameOrId: any, params: object) => {
    //     const queryParam = HttpUtils.encodeFormData(params);
    //     const url = BotService.baseURL
    //         .concat(usernameOrId)
    //         .concat('/externalSearch?')
    //         .concat(queryParam);
    //     return HttpUtils.sendGet(httpClient, url);
    // };
    static gotBotService = (dataProvider: any, usernameOrId: any, params: object) =>
        dataProvider.getList(`bots/externalSerch`, params);

    // static deleteBot = (botId: any) => {
    //     const url = BotService.baseURL.concat(botId);
    //     return HttpUtils.sendDelete(httpClient, url);
    // };
    static deleteBot = (dataProvider: any, botId: any) => dataProvider.delete(`bots`, { id: botId });
}
