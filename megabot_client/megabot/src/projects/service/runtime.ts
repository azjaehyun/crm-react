import HttpUtils from '../../utils/httpUtils';
import { httpClient } from '../../dataProvider/rest';

export default class RuntimeService {
    static apiURL = process.env.REACT_APP_MEGA_DIALOGFLOW_API_URL;
    static baseURL = RuntimeService.apiURL + '/runtime/';

    // static getOperator = () => {
    //     const url = RuntimeService.baseURL.concat('operators');
    //     return HttpUtils.sendGet(httpClient, url);
    // };
    static getOperator = (dataProvider: any) => {
        dataProvider.getOne(`runtime`, {id: 'operators'})
    }

    // static getBotResource = (botId: any) => {
    //     const url = RuntimeService.baseURL.concat('resources/').concat(botId);
    //     return HttpUtils.sendGet(httpClient, url);
    // };
    static getBotResource = (dataProvider: any, botId: any) =>
        dataProvider.getOne(`runtime/resources`, {id: botId})
}
