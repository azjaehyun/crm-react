import {
    fetchActionsWithRecordResponse,
    fetchActionsWithArrayOfIdentifiedRecordsResponse,
    fetchActionsWithArrayOfRecordsResponse,
    fetchActionsWithTotalResponse,
} from '../core';

function validateResponseFormat(
    response,
    type,
    logger = console.error // eslint-disable-line no-console
) {
    // by jaehyun add.
    // status error

    if (response.data) {
        if (response.data.hasOwnProperty('status')) {
            if (response.data.status > 200) {
                console.log(`ValidateResponseFormat .. The dataProvider request response error .. `);
                console.log('********* return response data : start ********* ');
                console.log(response);
                console.log('********* return response data : end *********** ');
                throw new Error(JSON.stringify(response.data));
            }
        }

        // statcktrace error jsondata sample ..
        // {
        // "stackTrace" : [ {
        //     "methodName" : "match",
        //     "fileName" : "SegmentNode.java",
        //     "lineNumber" : 447,
        //     "className" : "org.jboss.resteasy.core.registry.SegmentNode",
        //     "nativeMethod" : false
        // }
        // statcktrace error
        if (response.data.hasOwnProperty('stackTrace')) {
            console.log(`stackTrace error .. The dataProvider request response error .. `);
            console.log('********* return response data : start ********* ');
            console.log(response);
            console.log('********* return response data : end *********** ');
            throw new Error(JSON.stringify(response.data));
        }
    }

    if (!response) {
        logger(`The dataProvider returned an empty response for '${type}'.`);
        // error.message ... "ra.notification.data_provider_error"
        throw new Error('ra.notification.data_provider_error');
    }
    if (!response.hasOwnProperty('data')) {
        logger(
            `The response to '${type}' must be like { data: ... }, but the received response does not have a 'data' key. The dataProvider is probably wrong for '${type}'.`
        );
        throw new Error('ra.notification.data_provider_error');
    }
    if (fetchActionsWithArrayOfRecordsResponse.includes(type) && !Array.isArray(response.data)) {
        logger(
            `The response to '${type}' must be like { data : [...] }, but the received data is not an array. The dataProvider is probably wrong for '${type}'`
        );
        throw new Error('ra.notification.data_provider_error');
    }
    if (
        fetchActionsWithArrayOfIdentifiedRecordsResponse.includes(type) &&
        Array.isArray(response.data) &&
        response.data.length > 0 &&
        !response.data[0].hasOwnProperty('id')
    ) {
        logger(
            `The response to '${type}' must be like { data : [{ id: 123, ...}, ...] }, but the received data items do not have an 'id' key. The dataProvider is probably wrong for '${type}'`
        );
        throw new Error('ra.notification.data_provider_error');
    }
    if (fetchActionsWithRecordResponse.includes(type) && !response.data.hasOwnProperty('id')) {
        logger(
            `The response to '${type}' must be like { data: { id: 123, ... } }, but the received data does not have an 'id' key. The dataProvider is probably wrong for '${type}'`
        );
        throw new Error('ra.notification.data_provider_error');
    }
    if (fetchActionsWithTotalResponse.includes(type) && !response.hasOwnProperty('total')) {
        logger(
            `The response to '${type}' must be like  { data: [...], total: 123 }, but the received response does not have a 'total' key. The dataProvider is probably wrong for '${type}'`
        );
        throw new Error('ra.notification.data_provider_error');
    }
}

export default validateResponseFormat;
