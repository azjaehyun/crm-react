import { DataProvider } from 'ra-core';
import { Method, Request } from 'ra-data-simple-rest/lib';

export default class DialogflowService {
    /**
     * List all steps of bot
     * @param dataProvider
     * @param botId
     */
    static getList = (dataProvider: DataProvider, botId: any) => {
        const request: Request = {
            method: Method.GET,
            resource: `step/${botId}`,
        };
        return dataProvider.execute(request);
    };

    /**
     * Create new step
     * @param dataProvider
     * @param botId
     * @param params
     */
    static createNew = (dataProvider: DataProvider, botId: any, params: object) => {
        const request: Request = {
            method: Method.POST,
            resource: `step/${botId}`,
            body: params,
        };
        return dataProvider.execute(request);
    };

    /**
     * View step info
     * @param dataProvider
     * @param botId
     * @param stepId
     */
    static getById = (dataProvider: DataProvider, botId: any, stepId: any) => {
        const request: Request = {
            method: Method.GET,
            resource: `step/${botId}/${stepId}`,
        };
        return dataProvider.execute(request);
    };

    /**
     * Update step
     * @param dataProvider
     * @param botId
     * @param stepId
     * @param params
     */
    static update = (dataProvider: DataProvider, botId: any, stepId: any, params: object) => {
        const request: Request = {
            method: Method.PUT,
            resource: `step/${botId}/${stepId}`,
            body: params,
        };
        return dataProvider.execute(request);
    };

    /**
     * Delete a step by id
     * @param dataProvider
     * @param botId
     * @param stepId
     */
    static deleteStep = (dataProvider: DataProvider, botId: any, stepId: any) => {
        const request: Request = {
            method: Method.DELETE,
            resource: `step/${botId}/${stepId}`,
        };
        return dataProvider.execute(request);
    };

    static exportJson = (dataProvider: DataProvider, botId: any) => {
        const request: Request = {
            method: Method.GET,
            resource: `step/${botId}/export`,
        };
        return dataProvider.execute(request);
    };

    static importJson = (dataProvider: DataProvider, botId: any, data: any) => {
        const request: Request = {
            method: Method.POST,
            resource: `step/${botId}/import/collection`,
            body: data,
        };
        return dataProvider.execute(request);
    };
}
