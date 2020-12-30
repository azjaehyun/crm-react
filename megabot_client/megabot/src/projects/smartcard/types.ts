import { SMART_CARD_CODE } from '../common/Constants';
import jsonUtils from '../../utils/jsonUtils';

export interface SmartCardField {
    name: string;
    label?: string;
    value: string;
    hint?: string;
    required?: boolean;
}

export interface SmartCardAction {
    id?: string;
    display: string;
    value: string;
}

export interface SmartCardFieldList extends Array<SmartCardField> {}
export interface SmartCardItemList {
    meta: SmartCardFieldList; // use for editor
    selector?: SmartCardAction;
    values: Array<any>; // use for binding data
}

export interface SmartCardData {
    templateCode: string;
    textItem?: SmartCardFieldList; // is single item, represent by list of field
    listItem?: SmartCardItemList;
    config?: any;
}

/////////////////////////////////////////////////////////
// SC001 - basic card

export interface SC001Data extends SmartCardData {}
export const SC001_FIELD = {
    TITLE: 'title',
    DESCRIPTION: 'description',
    IMAGE_URL: 'imageUrl',
};
export const SC001_DUMMY_DATA: SmartCardData = {
    templateCode: SMART_CARD_CODE.SC001,
    textItem: [
        { name: 'title', label: 'Title', value: '', required: true },
        {
            name: 'description',
            label: 'Description',
            value: '',
            required: false,
        },
        {
            name: 'imageUrl',
            label: 'Image Url',
            value: '',
            required: true,
        },
    ],
};

export const SC001_PREVIEW_DATA: SmartCardData = {
    templateCode: SMART_CARD_CODE.SC001,
    textItem: [
        { name: 'title', label: 'Title', value: 'Super Papa', required: true },
        {
            name: 'description',
            label: 'Description',
            value:
                'The ultimate combination of tasty pepperoni, italian sausage, ham, sliced mushrooms, onions, green peppers and sliced black olives.',
            required: false,
        },
        {
            name: 'imageUrl',
            label: 'Image Url',
            value: 'https://www.papajohns.ph/binary_resources/10575233',
            required: true,
        },
    ],
};

/////////////////////////////////////////////////////////

export interface SC002Data extends SmartCardData {
    imageUrl: string;
    title: string;
    description?: string;
}

/////////////////////////////////////////////////////////

export interface SC003Config {
    textAlign: string;
    showIndex: boolean;
}

export const defaultSC003Config: SC003Config = {
    textAlign: 'left',
    showIndex: true,
};

export interface SC003Data extends SmartCardData {
    title: string;
    description?: string;
    options: Array<SmartCardAction>;
    config?: SC003Config;
}

/////////////////////////////////////////////////////////
export interface SC004Config {
    cols: Number;
}

export interface SC004Data extends SmartCardData {
    title: string;
    description?: string;
    options: Array<SmartCardAction>;
    config?: SC004Config;
}

/////////////////////////////////////////////////////////
// SC005 - carousel

export interface SC005Data extends SmartCardData {}
export const SC005_DUMMY_DATA: SC005Data = {
    templateCode: SMART_CARD_CODE.SC005,
    listItem: {
        meta: [
            { name: 'title', label: 'Title', value: '', required: true },
            { name: 'description', label: 'Description', value: '', required: false },
            { name: 'imageUrl', label: 'Image Url', value: '', required: true },
        ],
        values: [{ title: '', description: '', imageUrl: '' }],
    },
};

export const SC005_PREVIEW_DATA: SC005Data = {
    templateCode: SMART_CARD_CODE.SC005,
    listItem: {
        meta: [],
        values: [
            {
                title: 'Super Papa',
                description:
                    'The ultimate combination of tasty pepperoni, italian sausage, ham, sliced mushrooms, onions, green peppers and sliced black olives.',
                imageUrl: 'https://www.papajohns.ph/binary_resources/10575233',
            },
            {
                title: 'All the Meats',
                description:
                    'An irresistible combination of tasty pepperoni, italian sausage, beef bits, ham and bacon.',
                imageUrl: 'https://www.papajohns.ph/binary_resources/10575247',
            },
            {
                title: 'Texas Heat',
                description: 'Ground beef, crispy bacon bits, onions, green peppers and spicy jalapeño peppers.',
                imageUrl: 'https://www.papajohns.ph/binary_resources/10575237',
            },
            {
                title: 'Chicken BBQ',
                description: 'Tender grilled chicken, bacon bits and onions combined with a sweet and tangy BBQ sauce.',
                imageUrl: 'https://www.papajohns.ph/binary_resources/10575241',
            },
        ],
    },
};

export const convertValuesToFieldList = (item: any) => {
    let textFields: SmartCardFieldList = [];
    for (let key in item) {
        let field: SmartCardField = {
            name: key,
            value: item[key],
        };
        textFields.push(field);
    }
    return textFields;
};

/////////////////////////////////////////////////////////
// SC006 - weather

export interface SC006Data extends SmartCardData {}
export const SC006_DUMMY_DATA: SC006Data = {
    templateCode: SMART_CARD_CODE.SC006,
    textItem: [
        { name: 'location', label: 'Location', value: '', required: true },
        { name: 'time', label: 'Date time', value: '', required: true },
        { name: 'summary', label: 'Summary', value: '', required: false },
        { name: 'icon', label: 'Icon', value: '', required: false },
        { name: 'currentTemperature', label: 'Current Temperature', value: '', required: true },
        {
            name: 'humidity',
            label: 'Humidity',
            value: '',
            hint: 'The relative humidity, between 0 and 1, inclusive.',
            required: false,
        },
        {
            name: 'windSpeed',
            label: 'Wind Speed',
            value: '',
            hint: 'The wind speed in miles per hour.',
            required: false,
        },
        {
            name: 'visibility',
            label: 'Visibility',
            value: '',
            hint: 'The average visibility in miles, capped at 10 miles.',
            required: false,
        },
        {
            name: 'pressure',
            label: 'Pressure',
            value: '',
            hint: 'The columnar density of total atmospheric ozone at the given time in Dobson units.',
            required: false,
        },
    ],
};
export const SC006_PREVIEW_DATA: SC006Data = {
    templateCode: SMART_CARD_CODE.SC006,
    textItem: [
        { name: 'location', label: 'Location', value: 'Seoul', required: true },
        { name: 'time', label: 'Date time', value: '2020-06-12', required: true },
        { name: 'summary', label: 'Summary', value: 'Mostly Cloudy', required: false },
        { name: 'icon', label: 'Icon', value: 'rain', required: false },
        { name: 'currentTemperature', label: 'Current Temperature', value: '24', required: true },
        {
            name: 'humidity',
            label: 'Humidity',
            value: '35',
            hint: 'The relative humidity, between 0 and 1, inclusive.',
            required: false,
        },
        {
            name: 'windSpeed',
            label: 'Wind Speed',
            value: '2.5',
            hint: 'The wind speed in miles per hour.',
            required: false,
        },
        {
            name: 'visibility',
            label: 'Visibility',
            value: '12',
            hint: 'The average visibility in miles, capped at 10 miles.',
            required: false,
        },
        {
            name: 'ozone',
            label: 'ozone',
            value: '33',
            hint: 'The columnar density of total atmospheric ozone at the given time in Dobson units.',
            required: false,
        },
    ],
};

/////////////////////////////////////////////////////////

export interface SmartCardEditorProps {
    templateCode: String;
    scData: SmartCardData;
    inlineEdit: boolean;
    selection?: Boolean;
    onSelected?: (value: string) => void;
    onChange: (data: SmartCardData) => void;
}

/////////////////////////////////////////////////////////

const getDummyData = (templateCode: string) => {
    let dummyData = {};
    switch (templateCode) {
        case SMART_CARD_CODE.SC001:
            dummyData = SC001_DUMMY_DATA as SC001Data;
            break;
        case SMART_CARD_CODE.SC002:
            dummyData = {
                templateCode: SMART_CARD_CODE.SC002,
                title: 'The card title...',
                description: 'The card description...',
                imageUrl: '',
            };
            break;
        case SMART_CARD_CODE.SC003:
            dummyData = {
                templateCode: SMART_CARD_CODE.SC003,
                title: '',
                description: '',
                options: [{ display: '', value: '' }],
            } as SC003Data;
            break;
        case SMART_CARD_CODE.SC004:
            dummyData = {
                templateCode: SMART_CARD_CODE.SC004,
                title: '',
                description: '',
                options: [{ display: '', value: '' }, { display: '', value: '' }, { display: '', value: '' }],
                config: { cols: 3 },
            } as SC004Data;
            break;
        case SMART_CARD_CODE.SC005:
            dummyData = SC005_DUMMY_DATA;
            break;
        case SMART_CARD_CODE.SC006:
            dummyData = SC006_DUMMY_DATA;
            break;
    }
    const temp = { ...dummyData };
    return temp;
};

const getPreviewData = (templateCode: string) => {
    let previewData = {};
    switch (templateCode) {
        case SMART_CARD_CODE.SC001:
            previewData = SC001_PREVIEW_DATA;
            break;
        case SMART_CARD_CODE.SC002:
            previewData = {
                templateCode: SMART_CARD_CODE.SC002,
                title: 'How to Train Your Dragon: The Hidden World',
                imageUrl: 'https://image.tmdb.org/t/p/w780//lFwykSz3Ykj1Q3JXJURnGUTNf1o.jpg',
                description:
                    'When Hiccup discovers Toothless isn\'t the only Night Fury, he must seek "The Hidden World", a secret Dragon Utopia before a hired tyrant named Grimmel finds it first.',
            };
            break;
        case SMART_CARD_CODE.SC003:
            previewData = {
                templateCode: SMART_CARD_CODE.SC003,
                title: 'Select which one do you like?',
                description: 'Description here...',
                options: [
                    { display: 'Option 1', value: 'Option 1' },
                    { display: 'Option 2', value: 'Option 2' },
                    { display: 'Option 2', value: 'Option 2' },
                ],
                config: {
                    textAlign: 'left',
                    showIndex: true,
                },
            } as SC003Data;
            break;
        case SMART_CARD_CODE.SC004:
            previewData = {
                templateCode: SMART_CARD_CODE.SC004,
                title: 'Confirmation message here',
                description: 'Description here',
                options: [
                    { display: 'Yes', value: 'Yes' },
                    { display: 'No', value: 'No' },
                    { display: 'Cancel', value: 'Cancel' },
                ],
                config: {
                    cols: 3,
                },
            } as SC004Data;
            break;
        case SMART_CARD_CODE.SC005:
            previewData = SC005_PREVIEW_DATA;
            break;
        case SMART_CARD_CODE.SC006:
            previewData = SC006_PREVIEW_DATA;
            break;
    }
    return previewData;
};

const fieldValueIsImage = (value: any) => {
    try {
        if (typeof value === 'string') {
            if (value.startsWith('http:') || value.startsWith('https:')) {
                return true;
            }
            if (value.indexOf('data:image') >= 0 && value.indexOf(';base64,') > 0) {
                return true;
            }
        }
    } catch (e) {
        console.error(e, 'value', value);
    }
    return false;
};

const getValuesFromFieldList = (fieldList: SmartCardFieldList, basePath: string = '') => {
    let record: any = {};
    fieldList.forEach((field: SmartCardField) => {
        let val = field.value;
        if (!fieldValueIsImage(val) && basePath && basePath.length > 0 && val && val.length > 0) {
            val = basePath + '.' + val;
        }
        record[field.name] = val;
    });
    return record;
};

const setFieldValuesForTextItem = (scData: SmartCardData, values: any) => {
    if (scData.textItem) {
        scData.textItem.forEach((field: SmartCardField) => {
            field.value = values[field.name];
        });
    }
};

// const setListItemFieldValue = (scData: SmartCardData, values: any) => {
//     if (scData.listItem) {
//         scData.listItem.values = [];
//         scData.listItem.values.push(values);
//     }
// };

const setListItemMetaValue = (scData: SmartCardData, itemPath: any, values: any) => {
    if (scData.listItem) {
        for (let name in values) {
            let field = scData.listItem.meta.filter((field: SmartCardField) => field.name === name)[0];
            if (field) {
                field.value = values[name];
            }
        }
        // update values for binding
        scData.listItem.values = [getValuesFromFieldList(scData.listItem.meta, itemPath)];

        // update selector info to values
        if (values['selector']) {
            let selector = values['selector'] as SmartCardAction;
            scData.listItem.selector = selector;
            scData.listItem.values[0]['selector'] = {
                display: selector.display,
                value:
                    selector.value && itemPath && !selector.value.startsWith(itemPath)
                        ? itemPath + '.' + selector.value
                        : selector.value,
            };
        }
    }
};

const getTextItemValues = (scData: SmartCardData) => {
    let record: any = {};
    if (scData.textItem) {
        record = getValuesFromFieldList(scData.textItem);
    }
    return record;
};

const getListItemMetaValues = (scData: SmartCardData) => {
    let values: any = {};
    if (scData.listItem && scData.listItem.meta) {
        values = getValuesFromFieldList(scData.listItem.meta);
        if (scData.listItem.selector) {
            values['selector'] = scData.listItem.selector;
        }
    }

    return values;
};

const scGetRepresentRecordOfList = (scData: SmartCardData) => {
    let record: any = null;
    if (scData.listItem) {
        if (scData.listItem.values.length > 0) {
            record = scData.listItem.values[0];
        }

        if (!record) {
            record = getValuesFromFieldList(scData.listItem.meta);
        }
    }
    return record;
};

const convertListItemDataToListOfTextItemData = (scData: SmartCardData, newTemplateCode: string) => {
    const resp: Array<SmartCardData> = [];
    if (scData.listItem && scData.listItem.values) {
        scData.listItem.values.forEach(item => {
            const data = {
                templateCode: newTemplateCode,
                textItem: convertValuesToFieldList(item),
            };
            resp.push(data);
        });
    }
    return resp;
};

const getArrayObjectPath = (scData: SmartCardData) => {
    let path = '';
    if (scData.listItem && scData.listItem.values && scData.listItem.values.length > 0) {
        let firstItem = scData.listItem.values[0];
        let firstKey = Object.keys(firstItem)[0];
        path = jsonUtils.getArrayObjectFromPath(firstItem[firstKey]);
    }
    return path;
};

const WeatherIcons: any = {
    'clear-day': 'day',
    'clear-night': 'night',
    rain: 'rainy-5',
    snow: 'snowy-6',
    sleet: 'rainy-6',
    wind: 'cloudy',
    fog: 'cloudy',
    cloudy: 'cloudy',
    'partly-cloudy-day': 'cloudy-day-3',
    'partly-cloudy-night': 'cloudy-night-3',
    hail: 'rainy-7',
    lightning: 'thunder',
    thunderstorm: 'thunder',
    'windy-variant': 'cloudy-day-3',
    exceptional: '!!',
};

const getWeatherIcon = (weatherData: any) => {
    // const iconUrl =
    //     process.env.PUBLIC_URL + '/icon/weather/animated/' + weatherData.icon + '-' + weatherData.uvIndex + '.svg';
    const iconUrl = process.env.PUBLIC_URL + '/icon/weather/animated/' + WeatherIcons[weatherData.icon] + '.svg';
    return iconUrl;
};

const defaultWeatherIcon = () => {
    return process.env.PUBLIC_URL + '/icon/weather/animated/cloudy-1.svg';
};

const defaultSmartCardIcon = () => {
    return process.env.PUBLIC_URL + '/icon/smartcard/default.jpeg';
};

const getSmartCardIcon = (templateCode: string) => {
    return process.env.PUBLIC_URL + '/icon/smartcard/' + templateCode + '.jpeg';
};

const smartCardDataHelper = {
    fieldValueIsImage,
    getDummyData,
    getPreviewData,
    getValuesFromFieldList,
    getTextItemValues,
    setFieldValuesForTextItem,
    setListItemMetaValue,
    convertValuesToFieldList,
    getListItemMetaValues,
    scGetRepresentRecordOfList,
    convertListItemDataToListOfTextItemData,
    getArrayObjectPath,
    getWeatherIcon,
    defaultWeatherIcon,
    defaultSmartCardIcon,
    getSmartCardIcon,
};

export default smartCardDataHelper;
