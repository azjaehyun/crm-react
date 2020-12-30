import { DataProvider } from 'ra-core';
import { Method, Request } from 'ra-data-simple-rest/lib';

export enum DeployStatus {
    PENDING = 'PENDING',
    RUNNING = 'RUNNING',
    DEPLOYED = 'DEPLOYED',
    UNDEPLOYED = 'UNDEPLOYED',
    FAILED_TO_DEPLOY = 'FAILED_TO_DEPLOY',
    FAILED_TO_UNDEPLOY = 'FAILED_TO_UNDEPLOY',
}

export enum DeployScheduleType {
    IMMEDIATELY = 'IMMEDIATELY',
    SPECIFIC_TIME = 'SPECIFIC_TIME',
}

interface DispBot {
    id: string;
    name: string;
    fullName: string;
    language: string;
    botType: string;
}

export interface DeployServer {
    id: number;
    name: string;
    host: string;
    distBot: DispBot;
    status: DeployStatus;
    contextPath: string;
    chatServer: string;
    wsConversations: string;
    clientUrl: string;
}

export interface DeployFormData {
    serverIds: Array<number>;
    scheduleType: DeployScheduleType;
    deployDate: string;
    deployTime: string;
}

export default class BotDeployService {
    /**
     * Check deployment status of a bot
     * @param dataProvider
     * @param botId
     */
    static status = (dataProvider: DataProvider, botId: string) => {
        const request: Request = {
            method: Method.GET,
            resource: `bots/deployment/status/${botId}`,
        };
        return dataProvider.execute(request);
    };

    /**
     * Undeploy a bot on distributed DbServer/ChatServer
     * @param dataProvider
     * @param botId
     * @param distServerId
     */
    static undeploy = (dataProvider: DataProvider, botId: string, distServerId: number) => {
        const request: Request = {
            method: Method.POST,
            resource: `bots/undeploy/${botId}/${distServerId}`,
        };
        return dataProvider.execute(request);
    };

    /**
     * Redeploy a bot on a distribution DbServer/ChatServer
     * @param dataProvider
     * @param botId
     * @param distServerId
     */
    static redeploy = (dataProvider: DataProvider, botId: string, distServerId: number) => {
        const request: Request = {
            method: Method.POST,
            resource: `bots/redeploy/${botId}/dist`,
            query: { distServerId: distServerId },
        };
        return dataProvider.execute(request);
    };

    /**
     * Undeploy a bot on distributed DbServer/ChatServer
     * @param dataProvider
     * @param botId
     * @param distServerId
     */
    static unDeploy = (dataProvider: DataProvider, botId: string, distServerId: number) => {
        const request: Request = {
            method: Method.POST,
            resource: `bots/undeploy/${botId}/${distServerId}`,
        };
        return dataProvider.execute(request);
    };

    /**
     * Deploy a bot on a list of distribution DbSer
     *  ver/ChatServer
     * @param dataProvider
     * @param botId
     * @param distServerIds
     * @param date
     */
    static deploy = (dataProvider: DataProvider, botId: string, distServerIds: Array<number>, date: string) => {
        const query: any = {
            distServerIds: distServerIds,
        };

        if (date && date.length > 0) {
            query.date = date;
        }

        const request: Request = {
            method: Method.POST,
            resource: `bots/deploy/${botId}/dist`,
            query: query,
        };
        return dataProvider.execute(request);
    };
}
