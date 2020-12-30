import { DataProvider } from 'ra-core';
import { Method, Request } from 'ra-data-simple-rest/lib';
import { uuid } from '../../utils/uuid';

export interface Question {
    id?: number;
    question: string;
    uuid: string;
}

export interface MrcDocument {
    id?: number;
    paragraph: string;
    questions: Array<Question>;
    deletedQuestions?: Array<Question>;
}

export const getEmptyMrcDocument = () => {
    return {
        paragraph: '',
        questions: [],
        deletedQuestions: [],
    };
};

export interface MrcSearchQuery {
    limit: number;
    page: number;
    keyword?: string;
}

export const DefaultMrcSearchQuery = {
    limit: 5,
    page: 1,
};

export default class MRCService {
    /**
     * Add a Document
     * @param dataProvider
     * @param doc
     */
    static addDocument = (dataProvider: DataProvider, botId: string, doc: MrcDocument) => {
        const request: Request = {
            method: Method.POST,
            resource: `mrc/${botId}/addQa`,
            body: doc,
        };
        return dataProvider.execute(request);
    };

    /**
     * Update document
     * @param dataProvider
     * @param doc
     */
    static updateDocument = (dataProvider: DataProvider, botId: string, doc: MrcDocument) => {
        const request: Request = {
            method: Method.PUT,
            resource: `mrc/${botId}/editQa`,
            body: doc,
        };
        return dataProvider.execute(request);
    };

    /**
     * Delete document by qaSeq
     * @param dataProvider
     * @param qaSeq
     */
    static deleteDocument = (dataProvider: DataProvider, botId: string, qaSeq: number) => {
        const request: Request = {
            method: Method.DELETE,
            resource: `mrc/${botId}/deleteQa`,
            query: { qaSeq: qaSeq },
        };
        return dataProvider.execute(request);
    };

    /**
     * Retrain a list of Qas for given bot
     * @param dataProvider
     * @param botId
     */
    static retrain = (dataProvider: DataProvider, botId: string) => {
        const request: Request = {
            method: Method.POST,
            resource: `mrc/${botId}/retrain`,
        };
        return dataProvider.execute(request);
    };

    static tryItOut = (dataProvider: DataProvider, botId: string) => {
        const request: Request = {
            method: Method.GET,
            resource: `mrc/${botId}/tryItOut`,
        };
        return dataProvider.execute(request);
    };

    /**
     * search documents
     * @param dataProvider
     * @param botId
     * @param query
     */
    static search = (dataProvider: DataProvider, botId: string, query: MrcSearchQuery) => {
        const request: Request = {
            method: Method.GET,
            resource: `mrc/${botId}/search`,
            query: query,
        };
        return dataProvider.execute(request);
    };

    /**
     * load all documents
     * @param dataProvider
     * @param botId
     * @param query
     */
    static all = (dataProvider: DataProvider, botId: string) => {
        const request: Request = {
            method: Method.GET,
            resource: `mrc/${botId}`,
        };
        return dataProvider.execute(request);
    };

    static importDocJson = (dataProvider: DataProvider, botId: any, data: any) => {
        const request: Request = {
            method: Method.POST,
            resource: `mrc/${botId}/import/json`,
            body: data,
        };
        return dataProvider.execute(request);
    };

    static exportDocJson = (dataProvider: DataProvider, botId: any) => {
        const request: Request = {
            method: Method.GET,
            resource: `mrc/${botId}/export/json`,
        };

        return dataProvider.execute(request);
    };
}
