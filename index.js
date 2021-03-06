require('dotenv').config()

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const routes = require('./routes/router')

const URI = process.env.MONGO_URI
mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true, autoIndex: true })

const port = process.env.PORT || 3000
const app = express()
const router = express.Router()

app.use(cors({ origin: '*' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '10mb', type: 'application/json' }));

app.use('/api', router);
routes(router);

app.listen(port, function () {
    console.log(process.env.ENV, ': Listening on port', port, '- start:', Date(Date.now()).toString());
}); 