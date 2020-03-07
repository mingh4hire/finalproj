// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");
// Start up an instance of app
const app = express();
const http = require('http');
/* Middleware*/
const bodyParser = require('body-parser');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));
const api = '4f1dc020feb035971c309f2a30e0f383';
const baseurl = 'http://api.openweathermap.org/data/2.5/weather?q=#location#&APPID=';

const router = express.Router();


router.get('/all/:loc/:content/:apikey', async function (req, res) {
    console.log('params ', req.params);

    var Request = require("request");
    console.log('base url is ', baseurl.replace('#location#', req.params.loc) + req.params.apikey)
    Request.get({
        "headers": {
            "content-type": "application/json"
        },
        "url": baseurl.replace('#location#', req.params.loc) + req.params.apikey
    }, (error, response, body) => {
        if (error) {

            res.send({
                success: false,
                error: 'error'
            });
            return console.log(error);
        }
        // console.log('obdy is ', body);
        try {
            console.log('tepm body is ', body)
            body = JSON.parse(body);
            const datasendback = {
                temp: body.main.temp,
                image: req.params.content,
                date: body.sys.sunrise
            }


            Request.get({
                "headers": {
                    "content-type": "application/json"
                },
                "url": 'https://serpapi.com/search?q=' + req.params.content + '&tbm=isch&ijn=0'
            }, (error, response, body) => {
                if (error) {

                    res.send({
                        success: false,
                        error: 'error'
                    });
                    return console.log(error);
                }
                body = JSON.parse(body);
                console.log('body is ', body);
                if (body.images_results && body.images_results[0])
                    datasendback.image = body.images_results[0].original

                res.send(JSON.stringify(datasendback));
                return;
            });
            return;
        } catch (err) {
            res.send({
                success: false,
                error: 'error'
            });
            return;
        }

    });


    // console.log('data is '  , data);
});

app.use(router);
// Setup Server
app.listen(8080, (e) => {
    console.log("listening on port 8080");
    console.log(e);
});