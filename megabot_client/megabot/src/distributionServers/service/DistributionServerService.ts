import { DataProvider } from 'ra-core';
import { Method, Request } from 'ra-data-simple-rest/lib';

export enum OrderBy {
    NAME = 'NAME',
    CREATED_DATE = 'CREATED_DATE',
    UPDATED_DATE = 'UPDATED_DATE',
    HOST = 'HOST',
}

export enum SortDirection {
    ASC = 'ASC',
    DESC = 'DESC',
}

export interface DispServer {
    id?: number;
    name: string;
    host: string;
    port?: number;
    username: string;
    password: string;
    database: string;
    contextPath: string;
    chatServer: string;
}

export interface Query {
    keyword?: string;
    orderBy?: Array<string>;
    sort: SortDirection;
    offset: number;
    limit: number;
}

export interface ConnectionResp {
    status: number;
    title: string;
}

export default class DistributionServerService {
    /**
     * Create empty server info
     */
    static emptyServer = () => {
        const server: DispServer = {
            name: '',
            host: '',
            username: '',
            password: '',
            database: '',
            contextPath: '',
            chatServer: '',
        };
        return server;
    };

    /**
     * Filter distributed ChatServer with keyword and paging
     * @param dataProvider
     * @param query
     */
    static search = (dataProvider: DataProvider, query: Query) => {
        const request: Request = {
            method: Method.GET,
            resource: `distribution-server/listAllServers`,
            query: query,
        };
        return dataProvider.execute(request);
    };

    /**
     * Show all distribution servers
     * @param dataProvider
     */
    static all = (dataProvider: DataProvider) => {
        const query: Query = {
            orderBy: [OrderBy.CREATED_DATE],
            sort: SortDirection.ASC,
            offset: 0,
            limit: 1000,
        };
        return DistributionServerService.search(dataProvider, query);
    };

    /**
     * Create new distributed ChatServer
     * @param dataProvider
     * @param server
     */
    static create = (dataProvider: DataProvider, server: DispServer) => {
        const request: Request = {
            method: Method.POST,
            resource: `distribution-server/createNew`,
            body: server,
        };
        return dataProvider.execute(request);
    };

    /**
     * Update an existing distributed ChatServer
     * @param dataProvider
     * @param server
     */
    static update = (dataProvider: DataProvider, server: DispServer) => {
        const request: Request = {
            method: Method.PUT,
            resource: `distribution-server/${server.id}/update`,
            body: server,
        };
        return dataProvider.execute(request);
    };

    /**
     * insert or update
     * @param dataProvider
     * @param server
     */
    static save = (dataProvider: DataProvider, server: DispServer) => {
        if (server.id && server.id > 0) {
            return DistributionServerService.update(dataProvider, server);
        } else {
            return DistributionServerService.create(dataProvider, server);
        }
    };

    /**
     * Remove an existing distributed ChatServer
     * @param dataProvider
     * @param serverId
     */
    static delete = (dataProvider: DataProvider, serverId: number) => {
        const request: Request = {
            method: Method.DELETE,
            resource: `distribution-server/${serverId}/delete`,
        };
        return dataProvider.execute(request);
    };

    /**
     * Verify distribution server
     * @param dataProvider
     * @param server
     */
    static testConnection = (dataProvider: DataProvider, server: DispServer) => {
        const request: Request = {
            method: Method.POST,
            resource: `distribution-server/testConnection`,
            body: server,
        };
        return dataProvider.execute(request);
    };

    /**
     * Verify distribution server
     * @param dataProvider
     * @param server
     */
    static testServerConnection = (dataProvider: DataProvider, serverId: number) => {
        const request: Request = {
            method: Method.GET,
            resource: `distribution-server/${serverId}/testConnection`,
        };
        return dataProvider.execute(request);
    };

    /**
     * Retrieve all deployed bots on ChatServer
     * @param dataProvider
     * @param serverId
     */
    static deployedBots = (dataProvider: DataProvider, serverId: number) => {
        const request: Request = {
            method: Method.GET,
            resource: `distribution-server/${serverId}/bots`,
        };
        return dataProvider.execute(request);
    };
}
