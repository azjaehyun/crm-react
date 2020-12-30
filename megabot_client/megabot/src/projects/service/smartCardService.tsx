import { DataProvider } from 'ra-core';
import { Method, Request } from 'ra-data-simple-rest/lib';

export default class SmartCardService {
    static apiUrl = process.env.REACT_APP_MEGA_DIALOGFLOW_API_URL;

    /**
     * Load all IRQA(s) of bot
     * @param botId
     */
    static all = (dataProvider: DataProvider) => {
        const request: Request = {
            method: Method.GET,
            resource: 'smartCard/all',
        };
        return dataProvider.execute(request);
    };
}
