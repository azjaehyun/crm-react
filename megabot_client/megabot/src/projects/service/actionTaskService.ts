import { DataProvider } from 'ra-core';
import { Method, Request } from 'ra-data-simple-rest/lib';

export interface ScriptQuery {
    keyword?: string;
    offset: number;
    limit: number;
}

export const SCRIPT_TYPE = {
    PYTHON: 'PYTHON',
    NODEJS: 'JAVASCRIPT',
};

export interface ScriptParameter {
    name: string;
    value: string;
}

export interface ScriptCategory {
    id: number;
    name: string;
}

export interface Script {
    id?: number;
    name: string;
    description: string;
    scriptType: string;
    scriptCode: string;
    scriptCategoryIds: Array<number>;
    scriptCategories: Array<ScriptCategory>;
    scriptArguments: any;
    scriptResponse: any;
    scriptReturn: string;
    testResult: string;
    scriptAccessLevel: string;
    createdOn?: string;
    updatedOn?: string;
}

export interface ScriptTest {
    scriptCode: string;
    scriptType: string;
    scriptArguments: Object;
}

export interface ScriptReturn {
    returnValue: any;
    stdout: any;
    stderr: any;
    runTime?: Date;
    isValid: boolean;
}

export const DefaultScriptReturn = {
    returnValue: '',
    stderr: '',
    stdout: '',
    isValid: false,
};

export const DEF_JS_CODE = 'module.exports = function (args) {\n\treturn args;\n};';
export const DEF_PYTHON_CODE = 'def main(args):\n\treturn args';

export const getDefaultCode = (scriptType: string) => {
    switch (scriptType) {
        case SCRIPT_TYPE.PYTHON:
            return DEF_PYTHON_CODE;
        case SCRIPT_TYPE.NODEJS:
            return DEF_JS_CODE;
        default:
            return '';
    }
};

export const TestStatus = {
    PASSED: 'PASSED',
    ERROR: 'ERROR',
};

export const EmptyScript: Script = {
    name: '',
    description: '',
    scriptType: SCRIPT_TYPE.PYTHON,
    scriptCode: DEF_PYTHON_CODE,
    scriptCategoryIds: [],
    scriptCategories: [],
    scriptArguments: {},
    scriptResponse: {},
    scriptReturn: '',
    testResult: TestStatus.ERROR,
    scriptAccessLevel: 'BOT',
};

export interface ScriptResponse {
    startCursor: number;
    totalCount: number;
    totalPage: number;
    currentPage: number;
    returnCount: number;
    visiblePage: number;
    list: Array<Script>;
}

export interface TryItOutParam {
    creatorId: string;
    script: ScriptTest;
}

export default class ActionTaskService {
    /**
     * Create new an action script by specific user
     * @param dataProvider
     * @param botId
     * @param creatorId
     * @param script
     */
    static insert = (dataProvider: DataProvider, botId: string, creatorId: string, script: Script) => {
        const request: Request = {
            method: Method.POST,
            resource: `action-scripts/${creatorId}/${botId}`,
            body: script,
        };
        return dataProvider.execute(request);
    };

    /**
     * Update an action script by specific user
     * @param dataProvider
     * @param botId
     * @param creatorId
     * @param script
     */
    static update = (dataProvider: DataProvider, botId: string, creatorId: string, script: Script) => {
        const request: Request = {
            method: Method.PUT,
            resource: `action-scripts/${creatorId}/${botId}`,
            body: script,
        };
        return dataProvider.execute(request);
    };

    static insertOrUpdate = (dataProvider: DataProvider, botId: string, creatorId: string, script: Script) => {
        if (script.id && script.id > 0) {
            return ActionTaskService.update(dataProvider, botId, creatorId, script);
        } else {
            return ActionTaskService.insert(dataProvider, botId, creatorId, script);
        }
    };

    /**
     * Remove an action script for given its Id
     * @param dataProvider
     * @param botId
     * @param creatorId
     * @param scriptId
     */
    static delete = (dataProvider: DataProvider, botId: string, creatorId: string, scriptId: number) => {
        const request: Request = {
            method: Method.DELETE,
            resource: `action-scripts/${creatorId}/${scriptId}`,
        };
        return dataProvider.execute(request);
    };

    /**
     * Select list of script
     * @param dataProvider
     * @param botId
     * @param query
     */
    static getList = (dataProvider: DataProvider, botId: any, query: ScriptQuery) => {
        const request: Request = {
            method: Method.GET,
            resource: `action-scripts/${botId}/scripts`,
            query: query,
        };
        return dataProvider.execute(request);
    };

    /**
     * Try it out a defining action script with parameters
     * @param dataProvider
     * @param params
     */
    static tryItOut = (dataProvider: DataProvider, params: TryItOutParam) => {
        const request: Request = {
            method: Method.POST,
            resource: `action-scripts/${params.creatorId}/tryItOut`,
            body: params.script,
        };
        return dataProvider.execute(request);
    };

    /**
     * Load all script categories
     * @param dataProvider
     */
    static getCategories = (dataProvider: DataProvider) => {
        const request: Request = {
            method: Method.GET,
            resource: 'action-scripts/categories',
        };
        return dataProvider.execute(request);
    };
}
