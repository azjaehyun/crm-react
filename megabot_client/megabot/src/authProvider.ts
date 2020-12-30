import { AuthProvider } from 'ra-core';

// function
const encodeFormData = ({ data }: { data: any }) => {
    return Object.keys(data)
        .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
        .join('&');
};

const authProvider: AuthProvider = {
    login: ({ username, password }) => {
        let formData = {
            username: username,
            password: password,
            rememberMe: 'undefined',
        };

        const request = new Request(`${process.env.REACT_APP_MEGA_DIALOGFLOW_API_URL}/auth`, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Accept: 'application/json',
            },
            method: 'POST',
            // body: JSON.stringify({ username, password }),
            body: encodeFormData({ data: formData }),
        });

        let promise = fetch(request)
            .then(response => {
                if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then(({ token }) => {
                localStorage.setItem('token', token);
                localStorage.setItem('jhi-userlang-admin', 'ko');
                localStorage.setItem('loglevel:webpack-dev-server', 'INFO');

                const accessInfo = new Request(`${process.env.REACT_APP_MEGA_DIALOGFLOW_API_URL}/auth/info`, {
                    method: 'GET',
                    headers: new Headers({
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + localStorage.getItem('token'),
                    }),
                });

                fetch(accessInfo)
                    .then(response => {
                        if (response.status < 200 || response.status >= 300) {
                            throw new Error(response.statusText);
                        }

                        return response.json();
                    })
                    .then(({ userId, languageCode, avatarUrl, avatarUrl200, lgu, gal }) => {
                        const userInfo = {
                            userId: userId,
                            username: username,
                            languageCode: languageCode,
                            avatarUrl: avatarUrl,
                            avatarUrl200: avatarUrl200,
                            lgu: lgu,
                            gal: gal,
                        };
                        localStorage.setItem('userId', userId);
                        localStorage.setItem('logged-user', JSON.stringify(userInfo));
                        sessionStorage.setItem('jhi-authenticationtoken', localStorage.getItem('token') as string);
                        sessionStorage.setItem('jhi-talkbotaccount', JSON.stringify(userInfo));
                        sessionStorage.setItem('jhi-previousurl', '/project-list');
                    });
            });

        return promise;
    },
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('logged-user');
        return Promise.resolve();
    },
    checkError: () => Promise.resolve(),
    checkAuth: () => (localStorage.getItem('token') ? Promise.resolve() : Promise.reject()),
    getPermissions: () => Promise.reject('Unknown method'),
};

export default authProvider;
