import { DataProvider } from 'ra-core';
import { Method, Request } from 'ra-data-simple-rest/lib';
import { BOT_TYPE } from './botService';

export const EXTERNAL_BOT_CREATED_BY = {
    USER: 'USER',
    ALL: 'ALL',
};

export interface SearchBotQuery {
    botName?: string;
    botType: string;
    language?: string;
    createdBy: string; // USER, ALL
    offset: number;
    limit: number;
}

export interface BotMemberEvent {
    allowSwitchContext?: boolean;
    allowShowConfirm?: boolean;
    allowRemoveContext?: boolean;
    allowTriggerStartStep?: boolean;
    orderNo: number;
    focusOutMessages?: any[];
    id: any;
    bot?: any;
    event: string;
}

export const BOT_GROUP_EVENT = {
    CREATE_NEW: 'CREATE_NEW',
    UPDATE: 'UPDATE',
    DELETE: 'DELETE',
    UNKNOWN: 'UNKNOWN',
};

export interface SimilarIntent {
    id: string;
    name: string;
    botId: string;
    botName: string;
    numberOfSentences: string;
    similarity: string;
}

export default class BotGroupService {
    /**
     * Search bot for adding to Group
     * @param dataProvider
     * @param creator
     * @param botGroupId
     * @param query
     */
    static searchExternalBot = (
        dataProvider: DataProvider,
        creator: string,
        botGroupId: string,
        query: SearchBotQuery
    ) => {
        const request: Request = {
            method: Method.GET,
            resource: `bots/${creator}/${botGroupId}/externalSearch`,
            query: { ...query, botType: BOT_TYPE.NORMAL },
        };
        return dataProvider.execute(request);
    };

    /**
     * load bot members of bot group
     * @param dataProvider
     * @param botGroupId
     */
    static getBot = (dataProvider: DataProvider, botGroupId: string) => {
        const request: Request = {
            method: Method.GET,
            resource: `bot-groups/${botGroupId}`,
        };
        return dataProvider.execute(request);
    };

    /**
     * Load all bot members by bot group Id
     * @param dataProvider
     * @param botGroupId
     */
    static getChildrens = (dataProvider: DataProvider, botGroupId: string) => {
        const request: Request = {
            method: Method.GET,
            resource: `bot-groups/${botGroupId}/searchChild`,
        };
        return dataProvider.execute(request);
    };

    /**
     * CRUD child bot(s) in a bot group
     * @param dataProvider
     * @param botGroupId
     * @param events
     */
    static crud = (dataProvider: DataProvider, botGroupId: string, events: Array<BotMemberEvent>) => {
        const request: Request = {
            method: Method.POST,
            resource: `bot-groups/${botGroupId}/child/CRUD`,
            body: {
                botGroupEvents: events,
            },
        };
        return dataProvider.execute(request);
    };

    /**
     * Add a single bot to bot group
     * @param dataProvider
     * @param botGroup
     * @param botMemberId
     */
    static addBotMember = (dataProvider: DataProvider, botGroup: any, botMemberId: string, orderNo: number) => {
        const botMemberEvent: BotMemberEvent = {
            allowSwitchContext: true,
            allowShowConfirm: true,
            allowRemoveContext: true,
            allowTriggerStartStep: true,
            orderNo: orderNo,
            focusOutMessages: [
                {
                    contentType: 'TEXT',
                    type: 'WELCOME',
                    language: botGroup.language,
                    message: 'Do you want to switch BOT?',
                },
            ],
            id: {
                botId: botMemberId,
            },
            event: BOT_GROUP_EVENT.CREATE_NEW,
        };
        return BotGroupService.crud(dataProvider, botGroup.id, [botMemberEvent]);
    };

    /**
     * Remove child(s) bot
     * @param dataProvider
     * @param botGroup
     * @param botMemberIdList the list of bot member id
     */
    static removeBotMember = (dataProvider: DataProvider, botGroup: any, botMemberIdList: Array<string>) => {
        const events: Array<BotMemberEvent> = botMemberIdList.map(botMemberId => {
            return {
                id: {
                    botId: botMemberId,
                },
                orderNo: 0,
                event: BOT_GROUP_EVENT.DELETE,
            };
        });
        return BotGroupService.crud(dataProvider, botGroup.id, events);
    };

    /**
     * Update bot member setting
     * @param dataProvider
     * @param botGroup
     * @param botMember
     */
    static updateBotMember = (dataProvider: DataProvider, botGroup: any, botMember: BotMemberEvent) => {
        const events = [{ ...botMember, event: BOT_GROUP_EVENT.UPDATE }];
        return BotGroupService.crud(dataProvider, botGroup.id, events);
    };

    /**
     *
     * @param dataProvider
     * @param botGroupId
     */
    static loadChildBotIntents = (dataProvider: DataProvider, botGroupId: string) => {
        const request: Request = {
            method: Method.GET,
            resource: `intents/${botGroupId}/childBotIntents`,
        };
        return dataProvider.execute(request);
    };

    /**
     * List all intents which one similar to TRUE / YES intent of bot group
     * @param dataProvider
     * @param botGroupId
     * @param intentId
     */
    static loadRecommendConfirmIntents = (dataProvider: DataProvider, botGroupId: string, intentId: string) => {
        const request: Request = {
            method: Method.GET,
            resource: `bot-groups/${botGroupId}/confirmIntents/${intentId}/recommendation`,
        };
        return dataProvider.execute(request);
    };

    /**
     * Link confirm intent (add new confirm intent to a bot group)
     * @param dataProvider
     * @param botGroupId
     * @param intentId
     */
    static updateLinkedConfirmIntent = (
        dataProvider: DataProvider,
        botGroupId: string,
        similarIntents: Array<SimilarIntent>
    ) => {
        const request: Request = {
            method: Method.POST,
            resource: `bot-groups/${botGroupId}/confirmIntents/link`,
            body: similarIntents.map((intent: any) => {
                return {
                    id: intent.id,
                    name: intent.name,
                    sampleCount: intent.numberOfSentences,
                    bot: {
                        id: intent.botId,
                        name: intent.botName,
                    },
                };
            }),
        };
        return dataProvider.execute(request);
    };

    static getGraph = (dataProvider: DataProvider, botGroupId: string) => {
        const request: Request = {
            method: Method.GET,
            resource: `bot-groups/${botGroupId}/graph`,
        };
        return dataProvider.execute(request);
    };
}
