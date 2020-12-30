import {
    CREATE,
    DELETE,
    DELETE_MANY,
    GET_LIST,
    GET_MANY,
    GET_MANY_REFERENCE,
    GET_ONE,
    UPDATE,
    UPDATE_MANY,
    //TODO: hyojin
    //=============================custom==========================
    CREATE_FOR_UPLOAD_FORM_DATA,
    UPDATE_SET_METHOD,
    DELETE_WITH_BODY,
    //=============================custom==========================
} from '../core';
import { LegacyDataProvider, DataProvider } from '../types';

const defaultDataProvider = () => Promise.resolve();
defaultDataProvider.create = () => Promise.resolve(null);
defaultDataProvider.delete = () => Promise.resolve(null);
defaultDataProvider.deleteMany = () => Promise.resolve(null);
defaultDataProvider.getList = () => Promise.resolve(null);
defaultDataProvider.getMany = () => Promise.resolve(null);
defaultDataProvider.getManyReference = () => Promise.resolve(null);
defaultDataProvider.getOne = () => Promise.resolve(null);
defaultDataProvider.update = () => Promise.resolve(null);
defaultDataProvider.updateMany = () => Promise.resolve(null);
//TODO: hyojin
//=============================custom==========================
defaultDataProvider.createForUploadFormData = () => Promise.resolve(null);
defaultDataProvider.updateSetMethod = () => Promise.resolve(null);
defaultDataProvider.deleteWithBody = () => Promise.resolve(null);
//=============================custom==========================

const fetchMap = {
    create: CREATE,
    delete: DELETE,
    deleteMany: DELETE_MANY,
    getList: GET_LIST,
    getMany: GET_MANY,
    getManyReference: GET_MANY_REFERENCE,
    getOne: GET_ONE,
    update: UPDATE,
    updateMany: UPDATE_MANY,
    //TODO: hyojin
    //=============================custom==========================
    createForUploadFormData: CREATE_FOR_UPLOAD_FORM_DATA,
    updateSetMethod: UPDATE_SET_METHOD,
    deleteWithBody: DELETE_WITH_BODY,
    //=============================custom==========================
};

interface ConvertedDataProvider extends DataProvider {
    (type: string, resource: string, params: any): Promise<any>;
}
/**
 * Turn a function-based dataProvider to an object-based one
 *
 * Allows using legacy dataProviders transparently.
 *
 * @param {Function} legacyDataProvider A legacy dataProvider (type, resource, params) => Promise<any>
 *
 * @returns {Object} A dataProvider that react-admin can use
 */
const convertLegacyDataProvider = (legacyDataProvider: LegacyDataProvider): ConvertedDataProvider => {
    const proxy = new Proxy(defaultDataProvider, {
        get(_, name) {
            return (resource, params) => {
                if (Object.keys(fetchMap).includes(name.toString())) {
                    const fetchType = fetchMap[name.toString()];
                    return legacyDataProvider(fetchType, resource, params);
                }

                return legacyDataProvider(name.toString(), resource, params);
            };
        },
        apply(_, __, args) {
            return legacyDataProvider.apply(legacyDataProvider, args);
        },
    });

    return proxy;
};

export default convertLegacyDataProvider;
