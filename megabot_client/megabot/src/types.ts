import { ReduxState, Record, Identifier } from 'ra-core';
import exp from 'constants';

export type ThemeName = 'light' | 'dark';

export interface AppState extends ReduxState {
    theme: ThemeName;
}

export interface Category extends Record {
    name: string;
}

export interface Product extends Record {
    category_id: Identifier;
    description: string;
    height: number;
    image: string;
    price: number;
    reference: string;
    stock: number;
    thumbnail: string;
    width: number;
}

export interface Customer extends Record {
    first_name: string;
    last_name: string;
    address: string;
    city: string;
    zipcode: string;
    avatar: string;
    birthday: string;
    first_seen: string;
    last_seen: string;
    has_ordered: boolean;
    latest_purchase: string;
    has_newsletter: boolean;
    groups: string[];
    nb_commands: number;
    total_spent: number;
}

export interface Order extends Record {
    basket: BasketItem[];
}

export interface BasketItem {
    product_id: string;
    quantity: number;
}

/**
 * Types to eventually add in react-admin
 */
export interface FieldProps<T extends Record = Record> {
    addLabel?: boolean;
    label?: string;
    record?: T;
    source?: string;
}

export interface Review extends Record {
    customer_id: string;
}

export interface Bot extends Record {
    id: string;
    name: string;
    fullName: string;
    language: string;
    state: string;
    botType: string;
    createdOn: string;
    updatedOn: string;
    description: string;
    createdUser: string;
    thumbnail: string;
    private: boolean;
    enableSystemWelcome: boolean;
    triggerStartStep: boolean;
    discardStopwords: boolean;
    threshold: string;
    defaultReplyType: string;
    turnOffIrQA: boolean;
    qaThreshold: string;
    qaEmbeddingModelType: string;
    tags: string[];
    irQAType: string;
    modelType: string;
}

export interface PGroup extends Record {
    id: string;
}
export interface Result extends Record {
    id: string;
}

export interface BotMessage extends Record {
    id: string;
    message: string;
}

export interface Sentence extends Record {
    id: string;
    text: string;
}

export interface Intent extends Record {
    id: string;
    name: string;
    language: string;
    createdOn: string;
    updatedOn: string;
    updatedUser: string;
    state: string;
    sentences: Sentence[];
}
export interface Entity extends Record {
    id: string;
    name: string;
    prefix: any;
    description: string;
    suffixes: [];
    prefixes: [];
    enrichmentBy: any;
    values: any[];
}

export interface Template extends Record {
    id: string;
    name: string;
    type: string;
    language: string;
    thumbnail: string;
    welcome: [];
    defaultReplies: [];
    intents: [];
}

export interface User extends Record {
    id: string;
    username: string;
    fullName: string;
}
export interface LockStatus extends Record {
    lockStatus: string;
    lockOn: string;
}

export interface ActionMapping {
    id: string;
    name: string;
    orderNo: any;
    parameters: any;
    scripts: string;
}
export interface SlotTable {
    name: string;
    require: boolean;
    promptToUser: [];
    defaultValue: string;
}
export interface BlockReply {
    uuid: string;
    id?: number;
    responseType: string;
    value: string;
    jsonValue: any;
    orderNo: number;
    state: string;
}
export interface Condition {
    id?: number;
    uuid?: string;
    fullScript: boolean;
    variable: string;
    expression: string;
    value: string;
    state: string;
}
export interface BlockScript {
    id?: number;
    scriptId?: number;
    uuid: string;
    actionType: string;
    name: string;
    parameters: {};
    scriptCodes: string;
    state: string;
    orderNo: number;
    isValid?: boolean; // only use in the client for validate the action
    oldName?: string;
}
export interface BlockCondReply {
    id: number;
    orderNo: number;
    conditions: Condition[];
    replies: BlockReply[];
    slotTables: SlotTable[];
    scripts: BlockScript[];
    doNothing: any;
    state: string;
    fillToSlots: string;
    nextStepId: string;
    activePanel: string[]; // only use in the client side to control which panel will be show
}
export interface ServiceBot {
    alias: string;
    botId: string;
    turnOnDefaultReply: boolean;
    showWelcomeMessage: boolean;
}
export interface Step {
    id: string;
    name: string;
    stepType: string;
    state: string;
    description: string;
    allowTriggerGlobalStep: boolean;
    connectors: [];
    blocks: BlockCondReply[];
    servicebot: {
        alias: string;
        botId: string;
        turnOnDefaultReply: boolean;
        showWelcomeMessage: boolean;
    };
}
