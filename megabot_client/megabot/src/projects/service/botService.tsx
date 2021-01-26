import HttpUtils from '../../utils/httpUtils';
import { httpClient } from '../../dataProvider/rest';
import { useDataProvider } from 'react-admin';
import { DataProvider } from 'ra-core';
import { Method, Request } from 'ra-data-simple-rest/lib';
import { IntentQuery } from './intentService';

export const BOT_TYPE = {
    NORMAL: 'NORMAL',
    SERVICE_BOT: 'SERVICE_BOT',
    BOT_GROUP: 'BOT_GROUP',
};

export const BOT_ERROR_MESSAGES: any = {
    '300': 'resources.projects.message_error.name_exist',
    '301': 'resources.projects.message_error.name_exist',
    '302': 'resources.projects.message_error.language_not_support',
    '303': 'resources.projects.message_error.name_invalid',
    '304': 'resources.projects.message_error.user_not_found',
    '305': 'resources.projects.message_error.group_not_found',
    '306': 'resources.projects.message_error.unable_change_type',
    '316': 'resources.projects.message_error.template_not_found',
    '319': 'resources.projects.message_error.bot_not_found',
};

export default class BotService {
    static apiURL = process.env.REACT_APP_MEGA_DIALOGFLOW_API_URL;
    static baseURL = BotService.apiURL + '/corps/';
    static basePath = 'bots/';

    // curl -X GET "http://localhost:8080/api/corps?
    // page=0&size=3&sort=corpCode" -H "accept: */*" -H "Authorization: Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTYxMTU2NjY0M30.NsDRIMyhmTC98KyVzBNJskdzcHQbfw2D0j--QjE4obAPF6w1OHMx-fph_z377zpzOadD82AcvUAGWGkgnBwq1Q"

    static search(dataProvider: DataProvider, queryParam: any, params: object) {
        const request: Request = {
            method: Method.GET,
            resource: `api/crm-customs`,
            query: params,
        };
        return dataProvider.execute(request);
    }
    // static getList(usernameOrId: any) {
    //     const url = this.baseURL + usernameOrId;
    //     return HttpUtils.sendGet(httpClient, url);
    // }
    //
    static getById(dataProvider: DataProvider, botId: any) {
        const url = this.baseURL + botId + '/view';
        return HttpUtils.sendGet(httpClient, url);
        const request: Request = {
            method: Method.POST,
            resource: `bots/${botId}/view`,
        };
        return dataProvider.execute(request);
    }
    static createBot(dataProvider: DataProvider, usernameOrId: any, bot: object) {
        const request: Request = {
            method: Method.POST,
            resource: `bots/${usernameOrId}`,
            body: bot,
        };
        return dataProvider.execute(request).then();
    }

    static updateBot(dataProvider: DataProvider, botId: any, bot: object) {
        const request: Request = {
            method: Method.PUT,
            resource: `bots/${botId}`,
            body: bot,
        };
        return dataProvider.execute(request);
    }
    static updateQA(dataProvider: DataProvider, botId: any, qaSetting: object) {
        const request: Request = {
            method: Method.POST,
            resource: `bots/${botId}/settingQA`,
            body: qaSetting,
        };
        return dataProvider.execute(request);
    }
    static settingMessage(dataProvider: DataProvider, botId: any, messageSetting: object) {
        const request: Request = {
            method: Method.POST,
            resource: `bots/${botId}/settingMessage`,
            body: messageSetting,
        };
        return dataProvider.execute(request);
    }

    static publicBot(dataProvider: DataProvider, botId: any) {
        const request: Request = {
            method: Method.POST,
            resource: `bots/${botId}/publish`,
        };
        return dataProvider.execute(request);
    }
    //
    // static uploadThumbnail(file: File, botId: any) {
    //     const url = this.baseURL + botId + '/thumbnail';
    //     const formData = new FormData();
    //     formData.append('files', file);
    //     return HttpUtils.uploadFile(httpClient, url, formData);
    // }
    static uploadThumb = (dataProvider: DataProvider, botId: any, file: FormData) => {
        const request: Request = {
            method: Method.POST,
            resource: `bots/${botId}/thumbnail`,
            body: file,
            serializeBody: false,
        };
        return dataProvider.execute(request);
    };
    static getDeletedBots(dataProvider: DataProvider, usernameOrId: any, params: any) {
        const request: Request = {
            method: Method.GET,
            resource: `bots/${usernameOrId}/deletedBots`,
            query: params,
        };
        return dataProvider.execute(request);
    }

    static updateMLSetting(dataProvider: DataProvider, botId: any, configML: object) {
        const request: Request = {
            method: Method.POST,
            resource: `bots/${botId}/settingML`,
            body: configML,
        };
        return dataProvider.execute(request);
    }

    static getBotService = (dataProvider: DataProvider, usernameOrId: any, botId: any, params: object) => {
        const request: Request = {
            method: Method.GET,
            resource: `bots/${usernameOrId}/${botId}/externalSearch`,
            query: params,
        };
        return dataProvider.execute(request);
    };

    static deleteBot = (dataProvider: DataProvider, botId: any) => {
        const request: Request = {
            method: Method.DELETE,
            resource: `bots/${botId}`,
        };
        return dataProvider.execute(request);
    };

    static forkBot(dataProvider: DataProvider, botId: any, targetUser: any, category?: any) {
        const queryParam = { category: category || 2 };
        const request: Request = {
            method: Method.GET,
            resource: `bots/${botId}/forkTo/${targetUser}`,
            query: queryParam,
        };
        return dataProvider.execute(request);
    }
    static getBotTemplate(dataProvider: DataProvider) {
        const request: Request = {
            method: Method.GET,
            resource: `admin/bot-templates`,
        };
        return dataProvider.execute(request);
    }
}
