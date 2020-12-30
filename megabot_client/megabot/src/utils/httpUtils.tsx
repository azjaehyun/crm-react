export default class HttpUtils {
    /**
     * create query string from params object
     * @param params
     */
    static encodeFormData = (params: any) => {
        return Object.keys(params)
            .map(function(key) {
                return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
            })
            .join('&');
    };

    /**
     * send a GET request
     * @param httpClient
     * @param url
     */
    static sendGet = (httpClient: any, url: string, options: any = {}) => {
        // console.log('url', url);
        return httpClient(url, options).then(function(resp: any) {
            const json = resp.json;
            return {
                data: json,
            };
        });
    };

    /**
     * send a DELETE request
     * @param httpClient
     * @param url
     */
    static sendDelete = (httpClient: any, url: string) => {
        return httpClient(url, {
            method: 'DELETE',
        }).then(function(resp: any) {
            console.log('delete resp', resp);
            const json = resp.json;
            return { data: json };
        });
    };

    /**
     * send a DELETE request with body
     * @param httpClient
     * @param url
     */
    static sendDeleteWithBody = (httpClient: any, url: string, body: any) => {
        return httpClient(url, {
            method: 'DELETE',
            body: JSON.stringify(body),
        }).then(function(resp: any) {
            console.log('delete resp', resp);
            const json = resp.json;
            return { data: json };
        });
    };

    /**
     * send a POST request
     * @param httpClient
     * @param url
     * @param formData
     */
    static sendPost = (httpClient: any, url: string, formData: any) => {
        return httpClient(url, {
            method: 'POST',
            body: JSON.stringify(formData),
        }).then(function(resp: any) {
            const json = resp.json;
            return { data: json };
        });
    };

    static sendPostRawText = (httpClient: any, url: string, rawText: any) => {
        return httpClient(url, {
            method: 'POST',
            body: rawText,
        }).then(function(resp: any) {
            const json = resp.json;
            return { data: json };
        });
    };

    /**
     * send a PUT request
     * @param httpClient
     * @param url
     * @param formData
     */
    static sendPut = (httpClient: any, url: string, formData: any) => {
        return httpClient(url, {
            method: 'PUT',
            body: JSON.stringify(formData),
        }).then(function(resp: any) {
            // console.log('PUT resp', resp);
            const json = resp.json;
            return { data: json };
        });
    };

    /**
     * send a  request
     * @param httpClient
     * @param url
     * @param formData
     */
    static uploadFile = (httpClient: any, url: string, formData: any) => {
        return httpClient(url, {
            method: 'POST',
            body: formData,
        }).then(function(resp: any) {
            const json = resp.json;
            return { data: json };
        });
    };
}
