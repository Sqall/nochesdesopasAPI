const express = require('express');
const cors = require('cors');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//DEFINED ROUTES TO THEIR FILES
const heroesRoutes = require('./api/routes/heroes');
const userRoutes = require('./api/routes/users');
const clothRoutes = require('./api/routes/clothes');
const foodRoutes = require('./api/routes/foods');
const transitRoutes = require('./api/routes/intransit');
const zoneRoutes = require('./api/routes/zones');

// mongoose.connect('mongodb://jacksun:Fullmetala06!@cluster0-shard-00-00-qb15r.gcp.mongodb.net:27017,cluster0-shard-00-01-qb15r.gcp.mongodb.net:27017,cluster0-shard-00-02-qb15r.gcp.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true',{useNewUrlParser: true})
mongoose.connect('mongodb://angrydante:angrydan@ds125048.mlab.com:25048/angryiglesia',{useNewUrlParser: true})
.then(console.log('Connected'))
.catch(err => {console.log(err)});

mongoose.Promise = global.Promise;
//MIDDLEWARES
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req,res,next) => {
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','Origin, X-Requested-Withm Content-Type, Accept, Authorization');
    if(req.method == 'OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});


//ROUTES REQUESTED
app.use('/cloth',clothRoutes);
app.use('/food',foodRoutes);
app.use('/heroes',heroesRoutes);
app.use('/user',userRoutes);
app.use('/intransit',transitRoutes);
app.use('/zone',zoneRoutes);

app.use((req,res,next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
})

app.use((error,req,res,next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});

module.exports = app;