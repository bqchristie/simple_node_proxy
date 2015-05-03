/**
 * Created by brucechristie on 15-02-27.
 */
var http = require('http'),
    httpProxy = require('http-proxy');

var config = {
    whereLocalServicesAreRunning: 'http://localhost:9000',
    whereLocalWebAppIsRunning: 'http://localhost:9100',
    portToInterceptServiceCallsFromWebApp: 9200
}

var proxy = httpProxy.createProxyServer({target: config.whereLocalServicesAreRunning}).listen(config.portToInterceptServiceCallsFromWebApp);
//var proxy = httpProxy.createProxyServer(options).listen(config.portToInterceptServiceCallsFromWebApp);

proxy.on('proxyRes', function (proxyReq, req, res, options) {
        // add the CORS header to the response
        res.setHeader('Access-Control-Allow-Origin', config.whereLocalWebAppIsRunning);
        res.setHeader('Access-Control-Allow-Credentials', true);
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
});

proxy.on('error', function (e) {
    console.error(e);
});