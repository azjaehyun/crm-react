import HttpUtils from '../../utils/httpUtils';
import { httpClient } from '../../dataProvider/rest';
import { DataProvider } from 'ra-core';
import { Method, Request } from 'ra-data-simple-rest/lib';
import jsonUtils from '../../utils/jsonUtils';

export interface Script {
    id: number;
    name: string;
    actionType: string;
    response: string;
}

export default class RuntimeService {
    static apiURL = process.env.REACT_APP_MEGA_DIALOGFLOW_API_URL;
    static baseURL = RuntimeService.apiURL + '/runtime/';

    static getOperator = (dataProvider: DataProvider) => {
        const request: Request = {
            method: Method.GET,
            resource: `runtime/operators`,
        };
        return dataProvider.execute(request);
    };

    /**
     * Get the list variables (including INNER BOT)
     * @param botId
     */
    static getBotResource = (dataProvider: DataProvider, botId: any) => {
        const request: Request = {
            method: Method.GET,
            resource: `runtime/resources/${botId}`,
        };
        return dataProvider.execute(request);
    };

    static validateCondition = (botId: any, condition: object) => {
        const url = RuntimeService.baseURL
            .concat('spel/')
            .concat(botId)
            .concat('/validate');
        return HttpUtils.sendPost(httpClient, url, condition);
    };

    /**
     * Get the list action scripts that have been mapped in the all blocks of steps of specific bot
     * @param dataProvider
     * @param botId
     */
    static getScripts = (dataProvider: DataProvider, botId: string) => {
        const request: Request = {
            method: Method.GET,
            resource: `runtime/scripts/${botId}`,
        };
        return dataProvider.execute(request);
    };

    static verifyActionName = (dataProvider: DataProvider, botId: any, aliasName: any) => {
        const request: Request = {
            method: Method.GET,
            resource: `runtime/scripts/${botId}/verifyActionName`,
            query: { actionName: aliasName },
        };
        return dataProvider.execute(request);
    };

    static getPropertyFromScripList = (scriptList: Array<Script>) => {
        let pathList = Array<string>();
        scriptList.forEach((script: Script) => {
            try {
                const json = JSON.parse(script.response as string);
                let paths = jsonUtils.getPropertyPath(json);
                paths.forEach((path: string) => {
                    const newPath = '$' + script.name + '.' + path;
                    if (pathList.indexOf(newPath) < 0) {
                        pathList.push(newPath);
                    }
                });
            } catch (e) {}
        });
        return pathList;
    };
}
