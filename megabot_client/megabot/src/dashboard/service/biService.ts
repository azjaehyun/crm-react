import { Method } from 'ra-data-simple-rest/lib';
import bot from '../../projects/service/bot';
import { DataProvider } from 'ra-core';

export interface FreqEntitiesParams {
    botId: string;
    from?: string;
    to: string;
    minFreq: number;
}

export interface TopRankParams {
    botId: string;
    from?: string;
    to: string;
    topInt: number;
    topEnt: number;
}

export type TrendsType = 'MONTH' | 'DAY' | 'HOUR';
export type TrendsFunc = 'MAX' | 'AVG' | 'MIN';

export interface TrendsParams {
    botId: string;
    from?: string;
    to: string;
    trendsType: TrendsType;
    trendsFunc: TrendsFunc;
}

export type Selection = 'NUMBER_OF_USER' | 'NUMBER_OF_CONVERSATION';

export interface RatioChannelUsageParams {
    botId: string;
    from?: string;
    to: string;
    selection: Selection;
}

export interface FreqEntityList {
    label: string;
    value: number;
}

export interface FreqIntentList {
    label: string;
    value: number;
}

export interface TopRankEntity {
    freqEnts: Array<FreqEntityList>;
    freqInts: Array<FreqIntentList>;
}

export type TrendsEntity = Array<Array<String | number>>;

export type RatioChannelUsageEntity = Array<String | number>;

export interface AllBi {
    freqEntities: FreqEntityList;
    topRank: TopRankEntity;
    trends: TrendsEntity;
    ratioChannelUsage_user: RatioChannelUsageEntity;
    ratioChannelUsage_conversation: RatioChannelUsageEntity;
}

export const getAllBi = async (dataProvider: DataProvider, botId: string) => {
    const result: AllBi = {
        freqEntities: (await biService.getFreqEntities(dataProvider, botId)).data,
        topRank: (await biService.getTopRank(dataProvider, botId)).data,
        trends: await biService.getTrendsParams(dataProvider, botId),
        ratioChannelUsage_user: (await biService.getRatioChannelUsage(dataProvider, botId, 'NUMBER_OF_USER')).data,
        ratioChannelUsage_conversation: (await biService.getRatioChannelUsage(
            dataProvider,
            botId,
            'NUMBER_OF_CONVERSATION'
        )).data,
    };
    return result;
};

interface Period {
    t: string;
    l: string;
}

export default class biService {
    static dateString = new Date()
        .toISOString()
        .slice(0, 10)
        .split('-')
        .join('.');

    static getFreqEntities = (
        dataProvider: DataProvider,
        botId: string,
        minFreq: number = 0,
        from: string = biService.dateString.slice(0, 8) + '01',
        to: string = biService.dateString
    ) => {
        const freqEntitiesParams: FreqEntitiesParams = { botId, from, to, minFreq };
        return dataProvider.execute({
            method: Method.GET,
            resource: `bot-bis/${botId}/freq-entities`,
            query: freqEntitiesParams,
        });
    };
    static getTopRank = (
        dataProvider: DataProvider,
        botId: string,
        to: string = biService.dateString,
        from: string = biService.dateString.slice(0, 8) + '01',
        topEnt: number = 50,
        topInt: number = 50
    ) => {
        const topRankParams: TopRankParams = { botId, from, to, topEnt, topInt };
        return dataProvider.execute({
            method: Method.GET,
            resource: `bot-bis/${botId}/top-rank`,
            query: topRankParams,
        });
    };
    static getTrendsParams = async (
        dataProvider: DataProvider,
        botId: string,
        date: Date = new Date(),
        trendsType: TrendsType = 'DAY',
        trendsFunc: TrendsFunc = 'MAX'
    ) => {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const time = date.getHours();
        const lastDayOfLastMonth = new Date(year, month - 1, 0).getDate();

        const initializeData = () => {
            if (trendsType === 'HOUR') {
                return {
                    period: { t: `${year}.${month}.${day}`, l: `${year}.${month}.${day - 1}` },
                    to: time + 2,
                };
            } else if (trendsType === 'DAY') {
                return {
                    period: { t: `${year}.${month}.${day}`, l: `${year}.${month - 1}.${lastDayOfLastMonth}` },
                    to: day + 1,
                };
            } else {
                return {
                    period: { t: `${year}.${month}.${day}`, l: `${year - 1}.${12}.${31}` },
                    to: month + 1,
                };
            }
        };
        const { period, to } = initializeData();
        console.log(initializeData());
        const res1 = (await dataProvider.execute({
            method: Method.GET,
            resource: `bot-bis/${botId}/trends`,
            query: {
                botId,
                trendsFunc,
                trendsType,
                to: period.t,
            },
        })).data;
        const res2 = (await dataProvider.execute({
            method: Method.GET,
            resource: `bot-bis/${botId}/trends`,
            query: {
                botId,
                trendsFunc,
                trendsType,
                to: period.l,
            },
        })).data;

        const [lColumn, lUser, lConversation, lMessage] = res1.map((val: any) => val.slice(1, to));
        const [tColumn, tUser, tConversation, tMessage] = res2.map((val: any) => val.slice(to));
        console.log(lColumn);
        console.log(tColumn);
        return [
            ...tColumn.map((column: any, i: number) => ({
                name: column,
                user: tUser[i],
                conversation: tConversation[i],
                message: tMessage[i],
            })),
            ...lColumn.map((column: any, i: number) => ({
                name: column,
                user: lUser[i],
                conversation: lConversation[i],
                message: lMessage[i],
            })),
        ];
    };
    static getRatioChannelUsage = (
        dataProvider: DataProvider,
        botId: string,
        selection: Selection = 'NUMBER_OF_CONVERSATION',
        from: string = biService.dateString.slice(0, 8) + '01',
        to: string = biService.dateString
    ) => {
        const ratioChannelUsageParams: RatioChannelUsageParams = { botId, from, to, selection };
        return dataProvider
            .execute({
                method: Method.GET,
                resource: `bot-bis/${ratioChannelUsageParams.botId}/ratio-channel-usage`,
                query: ratioChannelUsageParams,
            })
            .then((response: any) => {
                return response.data.map((v: any) => ({ name: v[0], value: v[1] }));
            });
    };
}
