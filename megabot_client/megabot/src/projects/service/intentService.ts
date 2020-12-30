import { DataProvider } from 'ra-core';
import { Method, Request } from 'ra-data-simple-rest/lib';

export interface IntentQuery {
    responseType: string;
    offset: number;
    limit: number;
}

/**
 * Expose the function in order to connect to API Server
 */
export default class IntentService {
    /**
     * get intent by id
     * @param dataProvider
     * @param intentId
     */
    static getOne = (dataProvider: DataProvider, intentId: any) => {
        const request: Request = {
            method: Method.GET,
            resource: `intents/${intentId}/view`,
        };
        return dataProvider.execute(request);
    };

    /**
     * get list of intent by bot id
     * @param dataProvider
     * @param botId
     * @param query
     */
    static search = (dataProvider: DataProvider, botId: any, query: IntentQuery) => {
        const request: Request = {
            method: Method.GET,
            resource: `intents/${botId}`,
            query: query,
        };
        return dataProvider.execute(request);
    };

    /**
     * delete an intent
     * @param dataProvider
     * @param botId
     * @param intentId
     */
    static delete = (dataProvider: DataProvider, botId: any, intentId: any) => {
        const request: Request = {
            method: Method.DELETE,
            resource: `intents/${botId}/${intentId}`,
        };
        return dataProvider.execute(request);
    };

    /**
     * create new intent
     * @param dataProvider
     * @param botId
     * @param intent
     */
    static createOrUpdate = (dataProvider: DataProvider, botId: any, intent: any) => {
        const request: Request = {
            method: Method.POST,
            resource: `intents/${botId}/${intent.id}`,
            body: intent,
        };
        return dataProvider.execute(request);
    };

    /**
     * Analyze the sentence with NLU
     * @param dataProvider
     * @param botId
     * @param intent
     * @param sentence
     */
    static convertSentence = (dataProvider: DataProvider, botId: any, intent: any, sentence: string) => {
        const request: Request = {
            method: Method.GET,
            resource: `intents/expression/${botId}/${intent.id}/convertSentence`,
            query: {
                intentName: intent.name,
                sentence: sentence,
            },
        };
        return dataProvider.execute(request);
    };

    /**
     * (Re-)train all intents of bot
     * @param dataProvider
     * @param botId
     */
    static retrain = (dataProvider: DataProvider, botId: any) => {
        const request: Request = {
            method: Method.GET,
            resource: `intents/${botId}/train`,
        };
        return dataProvider.execute(request);
    };

    /**
     * search of intent
     * @param dataProvider
     * @param query
     */
    static externalSearch = (dataProvider: DataProvider, query: any) => {
        const request: Request = {
            method: Method.GET,
            resource: `intents/externalSearch`,
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
    static fork = (dataProvider: DataProvider, botId: string, botIntentId: string, query: any) => {
        const request: Request = {
            method: Method.POST,
            resource: `intents/${botIntentId}/forkTo/${botId}`,
            query: query,
        };
        return dataProvider.execute(request);
    };

    static exportJson = (dataProvider: DataProvider, botId: string) => {
        const request: Request = {
            method: Method.GET,
            resource: `intents/${botId}/export/json`,
        };
        return dataProvider.execute(request);
    };

    static importJson = (dataProvider: DataProvider, botId: string, file: any) => {
        const request: Request = {
            method: Method.POST,
            resource: `intents/${botId}/import/json`,
            body: file,
        };
        return dataProvider.execute(request);
    };
}
