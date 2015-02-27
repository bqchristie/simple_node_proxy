/**
 * Created by brucechristie on 15-02-27.
 */
var http = require('http'),
    httpProxy = require('http-proxy');

var proxy =  httpProxy.createProxyServer({target:'http://localhost:9000'}).listen(5000);

proxy.on('proxyRes', function(proxyReq, req, res, options) {
    // add the CORS header to the response
    res.setHeader('Access-Control-Allow-Origin: http://localhost:8000');
    res.setHeader('Access-Control-Allow-Methods: GET, POST, PUT');
    res.setHeader('Access-Control-Allow-Headers: Content-Type');
});

proxy.on('error', function(e) {
    console.error(e);
});