const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api/v1',
        createProxyMiddleware({
            //target: 'http://ai.mz.co.kr:`${REACT_APP_MEGA_DIALOGFLOW_API_PORT}`', // for local
            target: '`${REACT_APP_MEGA_DIALOGFLOW_API_URL}`', // for server
            // target: 'http://localhost:12345',
            changeOrigin: true,
        })
    );
};
