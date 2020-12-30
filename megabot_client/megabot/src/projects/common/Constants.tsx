import React from 'react';
import { LoadingOutlined } from '@ant-design/icons/lib';
import { Avatar } from 'antd';

export const TOKEN_REFRESH_TIME = 1000 * 60 * 60; // millisecond

export const NORMAL_BOT = 'NORMAL';
export const SERVICE_BOT = 'SERVICE_BOT';
export const BOT_GROUP = 'BOT_GROUP';

export const PAGE_SIZE = 5;
export const DEFAULT_CATEGORY = 2;

export const NAME = 'NAME';
export const CREATED_DATE = 'NAME';
export const UPDATED_DATE = 'NAME';
export const SORT_ASC = 'ASC';
export const SORT_DESC = 'DESC';

export const UNKNOWN_INTENT_ID = 'UnknownIntentId';

export const IndicatorIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
export const Icon_SingleBot = process.env.PUBLIC_URL + '/icon/SingleBot.png';
export const Icon_ServiceBot = process.env.PUBLIC_URL + '/icon/ServiceBot.png';
export const Icon_GroupBot = process.env.PUBLIC_URL + '/icon/GroupBot.png';

export const BOT_TYPES: any = {
    NORMAL: {
        name: 'Single Bot',
        icon: Icon_SingleBot,
    },
    SERVICE_BOT: {
        name: 'Bot Service',
        icon: Icon_ServiceBot,
    },
    BOT_GROUP: {
        name: 'Bot Group',
        icon: Icon_GroupBot,
    },
};

export const PrimaryColor = '#1890FF';
export const GreenColor = '#52c41a';
export const BlueColor = '#108ee9';
export const BotPrivateColor = '#fa8c16';
export const BotPublicColor = '#52c41a'; // #52c41a

export const COMP_IMAGE_NOT_AVAILABLE = (
    <Avatar src="data:image/png;base64,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" />
);

export const CHECKIN_AVATAR = (
    <Avatar
        size={14}
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABPklEQVQ4T4XTwSunURTG8c+vpCZ/gJSasrIyJVEKCykLWStZWciGkihioQmZlOVkrP0JbCY1Mws1FpSFrbGwsR+kYTp11ev2vq9bb92ec+73Pfc55zZUrxZ0pvAV/palNkrEVuxgAs0p/ohDLOOueCYHdOAH2isKu8Eg/rzGi4DY/0YPnrGOb3jCFL6kik7RXwYYxXEKbGElq2IBu0kbxknsixXEHxZTQhcuM0AbbpO2idUccIDplNCN8wzwEddJ+4rZHLCBtZSwj5kMsJ26EHLkfc4BA/hZOBQGxheGholzhSv3JcPfeBBnL/CpZrgidIbesi6EFu5+rwG8YAi/qgCh72G+AhKdWqqbxIg14QgjGSS0cfx7DxDxeEgxVGFsrBiaMdznlZU9ptecD+kBRRcm8VB2rTpAsc1hXun6D9DoNRHEVXv0AAAAAElFTkSuQmCC"
    />
);

export const NO_PHOTO = (
    <Avatar
        style={{ width: '100%' }}
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAC00lEQVR4Xu3ZTchVVRQG4EctkJQMGqQIilJoqCGKoSA40YkFpogQ/kAoiuIfQj84MMiJf6igSIMGIjpQlIhKlAopCSFxFKKiIBmpo2amoGWs2Bculy/51HPg2+fsDZd7Odyzzlrvetd6195nkJavQS2PXwGgMKDlCJQSaDkBShMsJVBKoOUIlBJoOQGKCpQSKCXQcgRKCbScAJWqwAv4EMNqBvUeduHvKp5TZQmMxB38hhtVONeHjal4FWPwexXPqAOAN3G1Cuf6sDERVzAKd6t4RgGgChSTjU4JVMGAl5LNv3r8azwDpuAA5uAxfsB6XEtANBqACfgFx3GY/xRqDeZjGm6h0QCcSFle0kX7AOE0/sCqpgNwGx/haE/dr8VmBEMazYCQzoPp043BVryHt5sOwKdYipn4MyHwGi5iL/Y3HYCh+AaT8SUGYxEupO9HuQMwGofwQVeGe8eQ2E+sSJ3/H3yNY4jfsbLtAePxPcbhZ8zD/WcYwrIEYBK+w2VswFn8ioV4+JQgZAfADJzBT3gfD/AGzuMclj3ltjYrAGKcjRqOhrYS0cQ66y38mKa+0PkYezsrhp/PsRpDuuo/qx4QNX8KX2BTTxCdQEPuoi+E9n+SLkbw+9I9cSmk8bMucLJgwJZ0YrMD23qy21vyc/FtCnQn4p6NeBevIMbjd1IZZcOAkKyPsaefDS6mvJNJGkdgQVfAcfQVe4DpuDnQZfB1XE9Z397P4Dt/W44jaeT9quvemAtCQV7GbIxt8olQTIKhEr0rxuFLST53NxmAJ5FmVlKNaIjBrlaeCa5LG6IXBzoAdR6Lh3TGe4foBXFC9NyrylPhGFrixcjw5/bq/w1E9mMWWPwMY3SfVqsEoMa46zNdAKgP2zwsFwbkkaf6vCwMqA/bPCwXBuSRp/q8LAyoD9s8LBcG5JGn+rwsDKgP2zwsFwbkkaf6vCwMqA/bPCz/C9RotUFcceDwAAAAAElFTkSuQmCC"
    />
);

export const PYTHON_IMG_BASE64 =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAH7UlEQVR4Xu1bbXBUZxV+zrv5aBIwDAqWJCuxIiOFaWE/sqHEdsLYAe0GaFWcEduO2vGrUyu1X9lthwZho620HfSP40yHKRUr6NQ0u8if2mgLNPshIIgYyoC7G8caGghpFrLs3uPc1N3sJ3vv3rvrMnD/JXPOc57zvOe997wfS7jGH7rG88d1AUpdAcs37q6bbKhvFZJoZXAzSPoIsZgJQj1BikqSmIBABIyzzBxiQcEFQxPhPXvWx0vNTcbXvwI2bRLWmLUdjNUMWg2wGYBQmcw4GG4heI+3yt+Hnh5Jpb9ic10FMDn3tguWfglgiWIGhQ3/zHHp3sBP1gQLm6q30E0A65OvW1mIPwGoE0RYvbQJn2lqxIGhEbxzckQ9s3SP82SQOnw/WvM3rUCZ/voJ4Og/yKB2OcC3P7cQD3R+Ohnr6d2HsO/Iv7RyPxypjtiO96yPagVK9ddFgGXde+cYSPpPAvj1x1Zi3qy6ZBzvqbN48KVBzbwZeDTgsm/TDJQCoIsAVodnKYMPJXBf/l4HFjU3JsPsOzKMp3cf1sybwO/4XF3LNQPpLYDJ4V4lgH0J3KXzZ+OnXzOjsb4Gw6MRPLTDi9D7E3rwHvG77HP1AEpg6FIB5u7+dUT0Wiqx2moDbmy8AcPnIojFWS/OE36XfYZeYDJOyQTQk2QKVmUKYHrKvUhI2KAy6TkAvqXSpzIFUJnElLnF4ZabpaMqfa8LUJHvAJWjeHVWgMnRd4uBhZmBOQxRU0zSaR0Ysfw5e0glTvmngMXhuRNglzxtVZIthXk5BWCyOPbuAPi+UmRSJGaaAHyodRai0g/SsITEkDAKoiOwht4mwhWX0nn7AEu3ZxuIHymSaKnc0gU42NoKQ/x0/mB0GAbpy2QOv5vPJqcAVmf/BmZ6pVRZaMBVKcBUpAsgvpOsYW+uuNkCbNokzJetpwho1UC0VK7FCCBzOYqJkIk6EcskliWA1em5nZnljY2Kewg453PZZyeIccEpkPbdeZjagtsLCmBxuLcAcFZc9jIhxlF/r/2WIgU4TG3BZQUFsDrc+xhYVYkCEPN2X2/Xw0kBBpsXgsQ/FHOVeCG1h0+m1UWms8Xhlnd25IVKpT3jRLHFvq3rQkkBvC13ADSgmCjRRrIGX8wrwHJnf/NlprBiwHIaMn3H33vXL1JDsq/lMTA9q5wGvUJtwXvzCvC/nd2cnwvlQXS3vMjAEwGX/WeZyOw1BgCYlEfkE9QWXnQFATyrWfAflAOWzJJBeI8lvAHwlkBv14ms5H3GtWD8XiUDCfWXGmnJyAcJv7TPoNnh+SqBf6USNNN8jEFyC91XQzxUWzXj/SLwYgM9nVnf7OTcP9DSjCryAZinGluixdQePJ5TAIvT80Uw/1Y1aBKNd3I1Hgk803W2aIwCjvyXT85HLOYBsLioGIzbyRZ6K6cApqf2rhSS9EZRwKBn/K67eorzLezFDAFvy9dB1KvpK8W4m2yh5NRJmwJtT/TfKhlI/QY+8U7/1q6cq0b2m6vB7y2DRE0QVFU41RQLCQTBc8G4GcA6AE2q/HMZM28gW3hXzgpY8XjfzMkqw5jK3eIxwdFPeXvvSZvrUyPmb/khmOSucvqURHMGWgH489QWTp5hZK0FzA73EAHTB3uF473gd9nTls082PxRkPgdgDsKu5fdoo3aQvILdOrJEsDS7XkVxF9RTEtwp39LV1o3xl7jbwCsV4xRTsMYt9Bt4eH8Ajg8GwF+XimneCzefOjZtcmjX/a23AOQPPqV9zD/k2zhtGV+VgUsc3rmG5jlXRZFp0YzqhvqBno6LyWyZd8n/gjmzsrLfiqjl8kauj+VW84kLQ732wBWKEkiS4BB4zgIup7fKeGhyIboPrIGdxYWwOlZC2ZFbWaqAHzs5hpExicVkSm3EeMDNFyal9oG53wJJnhZne4dzEgrl1yc0wR4s/UGNMQvljs3RfEYL5Et9M1M27zzXO4JotViFzPZrxTgKhEgDolN1B7+q2IBEoZmh+cBAncDuOmqrQDGC2QL5dziV/SmlxO3Ofo+LqFqHhHS2lnv1i8EAJq6AcGVOQUGEL24hjrOjucaQMUCKJlnFSbAKEA/x5ngZlqPvLdOK0MACasgpm+ZKRE7rw2DUV1zHu+eDl8p8bydoJbgRVeAJBmpffj/shdZIRVwXYBrvAIAeXmq7gqs4O+SJaz2jlHWDK+MKVDMi0fQZ8kSlNcsmh59BTi5oBbnJpMrQ03Mam4EaluByDEgntzFnoYk6iBrcL+mGEqXvGqCsNcYka/Mq/HJsp1tB27aDshbiNF/Aye+BExm/FxAGBaR5UzWeYHauLpWwFQ3OGh8C4QOtUTS7G89CNQ0T/9rZBdw5slUkwuonzmHlhxX997IQUp/AXzGNWD0FS8AAaZjgGHmNMRoP3Dqwem/mZ4jW/Dx4mOkzCQ9QDIx2GfcBkbx94uaHwWavv8hLMeBoQ3AhQOJMPsh5naSJXBZD+66V8AU5zdRhQbjZgDyKBnUEyVg1kqgbiEwNgBE/v4hBLEH0dpv0IpTyR9nqMdO9yiJAIkQ7DVaAf4xQPIeoYZYfAJEm8ka+rXWhDP9NZBSToUDLQsQp/sBXgmQ/DO62gLe8sHoEYD3g/lVsg0fVB5NnWVZBEilxHKvMHrRBDIYQdJcSOJjII6B+DwgxkA4jagUoNvCZdlaK7sA6san9NbXBSi9xpUd4b9s6+Bffu26cwAAAABJRU5ErkJggg==';
export const NODE_JS_IMG_BASE64 =
    'data:image/png;base64,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';

export const AUTOMATE_MESSAGE_TYPE = {
    WELCOME: 'WELCOME',
    DEFAULT_REPLY: 'DEFAULT_REPLY',
};

// BaseMessageEntity
export const MESSAGE_CONTENT_TYPE = {
    ALL: 'ALL',
    TEXT: 'TEXT',
    SMART_CARD: 'SMART_CARD',
    INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
};

export const BOT_RESPONSE_TYPE: any = {
    BOT: 'Bot',
    GENERAL_QA: 'General Q&A',
    IR_QA: 'Small Talk',
    USER_DEFINE: 'Default Answer',
    SYSTEM_DEFINE: 'System Answer',
};

export const BOT_CONVERSATION_TYPE: any = {
    BOT_MESSAGE: 'Bot',
    MONITOR_MESSAGE: 'Monitor',
    CHANNEL_MESSAGE: 'Channel',
};

export const SMART_CARD_CODE = {
    SC001: 'SC001',
    SC002: 'SC002',
    SC003: 'SC003',
    SC004: 'SC004',
    SC005: 'SC005',
    SC006: 'SC006',
};
export const AUTOMATE_WELCOME = 'WELCOME';
export const AUTOMATE_DEFAULT_REPLY = 'DEFAULT_REPLY';
// STEP TYPE
export const STEP_TYPE_START = 'START';
export const STEP_TYPE_BUSINESS = 'BUSINESS';
export const STEP_TYPE_GLOBAL = 'GLOBAL';
export const STEP_TYPE_BOT_INNER = 'BOT_INNER';
export const STEP_TYPE_END = 'END';

//
export const STATE_DELETED = 'DELETED';

export const RESPONSE_TYPE_TEXT = 'TEXT';
export const RESPONSE_TYPE_SMARTCARD = 'SMART_CARD';
export const RESPONSE_TYPE_JUMPTO = 'JUMP_TO';
export const RESPONSE_TYPE_ACTION_TASK = 'SCRIPT';
export const RESPONSE_TYPE_FUNCTION = 'BOT_FUNCTIONS';

export const SLOT_TABLE_PANEL = 'slotCondPanel';
export const RESPONSE_PANEL = 'responsePanel';
export const FILL_SLOT_PANEL = 'fillSlotPanel';

export const BOT_LANGUAGE2: any = {
    KO: 'Korean',
    EN: 'English',
    VI: 'Vietnamese',
};

export const BOT_LANGUAGES: any = {
    VI: {
        name: 'Vietnamese',
        icon: '🇻🇳', //process.env.PUBLIC_URL + '/icon/language/vi.png',
    },
    KO: {
        name: 'Korean',
        icon: '🇰🇷', //process.env.PUBLIC_URL + '/icon/language/ko.png',
    },
    EN: {
        name: 'English',
        icon: '🇬🇧', //process.env.PUBLIC_URL + '/icon/language/en.png',
    },
};

export const QA_MODEL: any = {
    TOKEN_BASE: 'Token Base',
    CONTEXT_BASE: 'Contextual Base',
};
export const ML_MODEL: any = {
    GUSE: 'Sentence Embedding',
    SENT2VEC: 'Sentence To Vector',
    TF_IDF: 'TF-IDF',
};

export const language_VI = 'VI';
export const language_EN = 'EN';
export const language_KO = 'KO';

export const Icon_language_VI = process.env.PUBLIC_URL + '/icon/language/vi.png';
export const Icon_language_EN = process.env.PUBLIC_URL + '/icon/language/en.png';
export const Icon_language_KO = process.env.PUBLIC_URL + '/icon/language/ko.png';

// export const API_ERROR_MESSAGES: any = {
//     '301': 'common.error_message.name_exist',
//     '302': 'common.error_message.language_not_support',
//     '303': 'common.error_message.name_invalid',
//     '304': 'common.error_message.user_not_found',
//     '305': 'common.error_message.group_not_found',
//     '306': 'common.error_message.unable_change_type',
//     '316': 'common.error_message.template_not_found',
//     '319': 'common.error_message.bot_not_found',
//     '358': 'common.error_message.entity_not_found',
// };

export const API_ERROR_MESSAGES: any = {
    '301': 'Name already exist',
    '302': 'The language is not support',
    '303': 'The name is invalid',
    '304': 'The user not found',
    '305': 'The group not found',
    '306': 'The type can not chang because it is being used by other bots',
    '316': 'The template not found',
    '319': 'Bot not found',
    '358': 'Entity not found',
};

export const FILL_ALL_SLOT = '*';
