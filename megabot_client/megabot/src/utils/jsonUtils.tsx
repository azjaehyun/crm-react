const readProperties = (obj: any) => {
    let properties: Array<string> = [];
    for (let key in obj) {
        if (Array.isArray(obj[key])) {
            if (obj[key].length > 0) {
                const childKeyList = readProperties(obj[key][0]);
                childKeyList.forEach(childKey => {
                    properties.push(key + '[0].' + childKey);
                });
            }
        } else if (typeof obj[key] === 'object') {
            const childKeyList = readProperties(obj[key]);
            childKeyList.forEach(childKey => {
                properties.push(key + '.' + childKey);
            });
        } else {
            properties.push(key);
        }
    }
    // console.log('properties', properties);
    return properties;
};

/**
 * a.b
 * a.c[0].name
 * a.c[0].time
 * @param obj
 */
const getPropertyPath = (obj: any) => {
    let paths: Array<string> = [];
    if (typeof obj === 'object' && !Array.isArray(obj)) {
        paths = paths.concat(readProperties(obj));
    }
    return paths;
};

const filterArrayPath = (pathList: Array<string>) => {
    let resp: Array<string> = [];
    pathList.forEach((path: string) => {
        let index = path.indexOf('[0]');
        if (index > 0) {
            const prop = path.substring(0, index + 3);
            if (resp.indexOf(prop) < 0) {
                resp.push(path.substring(0, index + 3));
            }
        }
    });
    return resp;
};

const filterObjectAttribute = (pathList: Array<string>, objectPath: string) => {
    let attrs: Array<string> = [];
    if (objectPath && objectPath.length > 0) {
        pathList.forEach((path: string) => {
            if (path.startsWith(objectPath)) {
                attrs.push(path.substring(objectPath.length + 1));
            }
        });
    }
    return attrs;
};

const getArrayProperties = (obj: any) => {
    const paths = getPropertyPath(obj);
    const resp = filterArrayPath(paths);
    return resp;
};

const getArrayObjectFromPath = (path: string) => {
    let arrObj = '';
    const index = path.indexOf('[0]');
    if (index > 0) {
        arrObj = path.substring(0, index + 3);
    }
    return arrObj;
};

const jsonUtils = {
    readProperties,
    getPropertyPath,
    filterArrayPath,
    filterObjectAttribute,
    getArrayProperties,
    getArrayObjectFromPath,
};
export default jsonUtils;
