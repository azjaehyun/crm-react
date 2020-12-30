import { DataProvider } from 'ra-core';
import { Method, Request } from 'ra-data-simple-rest/lib';

export interface SmallTalkQuery {
    page: number;
    limit: number;
    keyword?: string;
}

export interface QA {
    id: any;
    question: string;
    answer: string;
}

export default class SmallTalkService {
    /**
     * Search IRQA(s) of bot
     * @param dataProvider
     * @param botId
     * @param query the query parameters
     */
    static search = (dataProvider: DataProvider, botId: any, query: SmallTalkQuery = { page: 1, limit: 10 }) => {
        const request: Request = {
            method: Method.GET,
            resource: `irqa/${botId}/search`,
            query: query,
        };
        return dataProvider.execute(request);
    };

    /**
     * Create new irqa
     * @param dataProvider
     * @param botId
     * @param irqa the irqa object
     */
    static addQa = (dataProvider: DataProvider, botId: any, irqa: any) => {
        const request: Request = {
            method: Method.POST,
            resource: `irqa/${botId}/addQa`,
            body: irqa,
        };
        return dataProvider.execute(request);
    };

    /**
     * Edit a irqa
     * @param dataProvider
     * @param botId
     * @param irqa
     */
    static editQa = (dataProvider: DataProvider, botId: any, irqa: any) => {
        const request: Request = {
            method: Method.PUT,
            resource: `irqa/${botId}/editQa`,
            body: irqa,
        };
        return dataProvider.execute(request);
    };

    /**
     * Delete a irqa
     * @param dataProvider
     * @param botId
     * @param seq
     */
    static deleteQa = (dataProvider: DataProvider, botId: any, seq: number) => {
        const request: Request = {
            method: Method.DELETE,
            resource: `irqa/${botId}/deleteQa`,
            query: { qaSeq: seq },
        };
        return dataProvider.execute(request);
    };

    /**
     * (Re-)train all qa of bot
     * @param dataProvider
     * @param botId
     */
    static retrain = (dataProvider: DataProvider, botId: any) => {
        const request: Request = {
            method: Method.POST,
            resource: `irqa/${botId}/retrain`,
        };
        return dataProvider.execute(request);
    };

    static importQasExcel = (dataProvider: DataProvider, botId: any, file: FormData) => {
        const request: Request = {
            method: Method.POST,
            resource: `irqa/${botId}/import`,
            body: file,
            serializeBody: false,
        };
        return dataProvider.execute(request);
    };

    static exportQasExcel = (dataProvider: DataProvider, botId: any) => {
        const request: Request = {
            method: Method.GET,
            resource: `irqa/${botId}/export`,
            headers: new Headers({
                'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8',
            }),
        };

        return dataProvider.execute(request);
    };

    static importQasJson = (dataProvider: DataProvider, botId: any, data: any) => {
        const request: Request = {
            method: Method.POST,
            resource: `irqa/${botId}/import/json`,
            body: data,
        };
        return dataProvider.execute(request);
    };

    static exportQasJson = (dataProvider: DataProvider, botId: any) => {
        const request: Request = {
            method: Method.GET,
            resource: `irqa/${botId}/export/json`,
        };

        return dataProvider.execute(request);
    };
}
