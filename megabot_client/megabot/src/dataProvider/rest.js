import simpleRestProvider from 'ra-data-simple-rest';
import { fetchUtils } from 'ra-core';
import expect from 'expect';

export const httpClient = (url, options = {}) => {
    if (!options.headers) {
        // options.headers = new Headers({ Accept: 'application/json' });,
        options.headers = new Headers({ Accept: 'application/json,text/plain' });
    }
    options.user = {
        authenticated: true,
        token: 'Bearer ' + localStorage.getItem('token'),
    };

    return fetchUtils.fetchJson(url, options);
};

const restProvider = simpleRestProvider(
    // https://ai.mz.co.kr:8443/api/v1/auth/info
    // 'https://ai.mz.co.kr:8443/api/v1',
    process.env.REACT_APP_MEGA_DIALOGFLOW_API_URL,
    httpClient
);

const delayedDataProvider = new Proxy(restProvider, {
    get: (target, name, self) => {
        if (name === 'then') {
            // as we await for the dataProvider, JS calls then on it. We must trap that call or else the dataProvider will be called with the then method
            return self;
        } else {
            return (resource, params) =>
                new Promise((resolve, reject) => {
                    console.log('---------rest proxy-------', resolve, reject);
                    if (localStorage.getItem('token') == null) {
                        reject(expect((window.location.href = '/')));
                    }

                    setTimeout(() => resolve(restProvider[name](resource, params)), 500);
                })
                    // // TODO: Modified by Jack 2020/08/11
                    // // FIXME: auto redirect to the login page when server connection timeout or token expired
                    .then(resp => {
                        if (resp.status && resp.status === 401) {
                            console.log('Token expired.. retry login ..');
                            localStorage.removeItem('token');
                            localStorage.removeItem('userId');
                            expect((window.location.href = '/'));
                        }
                        return resp;
                    });
            // .catch(error => {
            //     console.log('data provider catch log..');
            //     console.log(error);
            //     if (error.status === 401) {
            //         console.log('Token expired.. retry login ..');
            //         // localStorage.removeItem('token');
            //         // localStorage.removeItem('userId');
            //         // expect((window.location.href = '/'));
            //     }
            // });
        }
    },
});

export default delayedDataProvider;

// import simpleRestProvider from 'ra-data-simple-rest';

// const restProvider = simpleRestProvider('http://localhost:4000');

// const delayedDataProvider = new Proxy(restProvider, {
//     get: (target, name, self) =>
//         name === 'then' // as we await for the dataProvider, JS calls then on it. We must trap that call or else the dataProvider will be called with the then method
//             ? self
//             : (resource, params) =>
//                   new Promise(resolve =>
//                       setTimeout(
//                           () => resolve(restProvider[name](resource, params)),
//                           500
//                       )
//                   ),
// });

// export default delayedDataProvider;
