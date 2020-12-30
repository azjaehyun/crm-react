import { DataProvider } from 'ra-core';
import { Method, Request } from 'ra-data-simple-rest/lib';

export interface SendMessageParam {
    botId: any;
    conversationId: any;
    turnNo: any;
    message: any;
}

export interface AssignSentenceToIntentParam {
    botId: any;
    sentence: any;
    fromIntentId: any;
    toIntentId: any;
}

export default class ChatService {
    /**
     * Start a new conversation
     * @param dataProvider
     * @param botId
     */
    static startConversation = (dataProvider: DataProvider, botId: any) => {
        const request: Request = {
            method: Method.GET,
            resource: `chat/${botId}/startConversation`,
        };
        return dataProvider.execute(request);
    };

    /**
     * Stop conversation
     * @param dataProvider
     * @param botId
     * @param conversationId
     */
    static stopConversation = (dataProvider: DataProvider, botId: any, conversationId: any) => {
        const request: Request = {
            method: Method.GET,
            resource: `chat/${botId}/stopConversation/${conversationId}`,
        };
        return dataProvider.execute(request);
    };

    /**
     * User send a message to bot
     * @param dataProvider
     * @param param
     */
    static sendMessage = (dataProvider: DataProvider, param: SendMessageParam) => {
        const request: Request = {
            method: Method.POST,
            resource: `chat/${param.botId}/${param.conversationId}/${param.turnNo}`,
            body: param.message,
            serializeBody: false,
        };
        return dataProvider.execute(request);
    };

    /**
     * Assign a sample message to an specific intent
     * @param dataProvider
     * @param param
     */
    static assignSentenceToIntent = (dataProvider: DataProvider, param: AssignSentenceToIntentParam) => {
        const request: Request = {
            method: Method.POST,
            resource: `intents/expression/${param.botId}/${param.fromIntentId}/assignTo/${param.toIntentId}`,
            body: {
                rawText: param.sentence,
            },
        };
        return dataProvider.execute(request);
    };
}
