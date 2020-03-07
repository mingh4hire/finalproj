var Request = require("request");

Request.get({
    "headers": {
        "content-type": "application/json"
    },
    "url": 'http://api.openweathermap.org/data/2.5/weather?q=saint%20louis&APPID=4f1dc020feb035971c309f2a30e0f383'
}, (error, response, body) => {
    console.log(body);
    console.log('response is ', response);
});