import { DataProvider } from 'ra-core';
import { Method, Request } from 'ra-data-simple-rest/lib';
import { Query } from '../../distributionServers/service/DistributionServerService';
import { Script } from '../../projects/service/actionTaskService';

export enum ServerType {
    // API_SERVER = 'API_SERVER',
    NLU_SERVER = 'NLU_SERVER',
    QA_SERVER = 'QA_SERVER',
    MRC_SERVER = 'MRC_SERVER',
    PLUGIN_SERVER = 'PLUGIN_SERVER',
}

export enum ServerStatus {
    UNKNOWN = 'UNKNOWN',
    UNAVAILABLE = 'UNAVAILABLE',
    AVAILABLE = 'AVAILABLE',
}

export enum LogServerType {
    ApiServer = 'ApiServer',
    ChatClient = 'ChatClient',
}

export enum LogOrderBy {
    FILE_NAME = 'FILE_NAME',
    CREATED_DATE = 'CREATED_DATE',
    UPDATED_DATE = 'UPDATED_DATE',
    SIZE = 'SIZE',
}

export enum SortDirection {
    ASC = 'ASC',
    DESC = 'DESC',
}

export const ServerTypes = {
    NLU_SERVER: {
        code: 'NLU_SERVER',
        display: 'NLU SERVER',
        key: 'com.megazone.nlu.url',
    },
    QA_SERVER: {
        code: 'QA_SERVER',
        display: 'QA SERVER',
        key: 'com.megazone.dialogflow.qaserver.url',
    },
    MRC_SERVER: {
        code: 'MRC_SERVER',
        display: 'MRC SERVER',
        key: 'com.megazone.dialogflow.mrcserver.url',
    },
    PLUGIN_SERVER: {
        code: 'PLUGIN_SERVER',
        display: 'Plugin SERVER',
        key: 'com.megazone.plugins.baseApiUrl',
    },
};

export enum FileType {
    text = 'text',
    gzip = 'gzip',
}

export interface LogQuery {
    serverType: LogServerType;
    page: number;
    limit: number;
    orderBy: LogOrderBy;
    sort: SortDirection;
    search: string;
}

export interface LogFileInfo {
    fileName: string;
    extension: string;
    fileSize: number;
    fileSizeDisplay: string;
    creationTime: any; // '2020-09-10T09:35:22.560Z';
    creationTimeDisplay: string;
    lastModified: any; // '2020-09-10T09:35:22.560Z';
    lastModifiedDisplay: string;
    gzip: boolean;
}

export interface LogFileResponse {
    startCursor: number;
    totalCount: number;
    totalPage: number;
    currentPage: number;
    returnCount: number;
    visiblePage: number;
    list: Array<LogFileInfo>;
}

export interface DownloadLogParam {
    serverType: LogServerType;
    fileType: FileType;
    fileName: string;
}

export interface ServerInfo {
    serverType: ServerType;
    name: string;
    link: string;
    status: string;
    checking: boolean;
}

export interface LogFileInfo {
    fileName: string;
    extension: string;
    fileSize: number;
    fileSizeDisplay: string;
    creationTime: any; // '2020-09-10T09:35:22.560Z';
    creationTimeDisplay: string;
    lastModified: any; // '2020-09-10T09:35:22.560Z';
    lastModifiedDisplay: string;
    gzip: boolean;
}

export default class SystemMonitorService {
    /**
     * Check the status of server
     * @param dataProvider
     * @param serverType
     */
    static checkServerStatus = (dataProvider: DataProvider, serverType: ServerType) => {
        const request: Request = {
            method: Method.GET,
            resource: `system-monitor/checkStatus`,
            query: { serverType: serverType },
        };
        return dataProvider.execute(request);
    };

    /**
     * Load log file list
     * @param dataProvider
     * @param query
     */
    static listLogFile = (dataProvider: DataProvider, query: LogQuery) => {
        const request: Request = {
            method: Method.GET,
            resource: `systemlog/listFile`,
            query: query,
        };
        return dataProvider.execute(request);
    };

    static downloadLog = (dataProvider: DataProvider, params: DownloadLogParam) => {
        const request: Request = {
            method: Method.GET,
            resource: `systemlog/download`,
            query: params,
        };
        return dataProvider.execute(request);
    };

    static getConfiguration = (dataProvider: DataProvider, propertyKey: string) => {
        const request: Request = {
            method: Method.GET,
            resource: `admin/configuration/${propertyKey}`,
        };
        return dataProvider.execute(request);
    };
}
