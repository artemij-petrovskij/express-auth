const express = require('express')
const app = express()

const session = require('express-session')
const varMiddleware = require('./middleware/variables')

const flash = require('connect-flash')

const mongoose = require('mongoose')
const MongoStore = require('connect-mongodb-session')(session)

const homeRoute = require('./routes/index');
const accountRoute = require('./routes/authorization');
const walletRoute = require('./routes/wallet');

const Handlebars = require('handlebars')
const exphbs = require("express-handlebars");
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')
var hbs = exphbs.create({
    defayltLayout: 'main',
    extname: 'hbs',
    handlebars: allowInsecurePrototypeAccess(Handlebars)
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');


const PORT = process.env.PORT || 3000
let PASS = process.env.MONGO_DB_PASS
if (!!!PASS) {
    const config = require('./config')
    PASS = config.password
}

const MONGODB_URI = `mongodb+srv://user1:${PASS}@cluster0-nmc55.mongodb.net/Users`

const store = new MongoStore({
    collection: 'sessions',
    uri: MONGODB_URI

})

app.use(session({
    secret: 'SeCrEt',
    resave: false,
    saveUninitialized: false,
    store
}))
app.use(flash())


app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))

app.use(varMiddleware)
app.use('/', homeRoute)
app.use('/account', accountRoute)
app.use('/wallet', walletRoute)

app.get('/*', function (req, res) {
    res.status(404)
    res.end()
});


async function start() {
    try {

        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })

        app.listen(PORT, function () {
            console.log(`App listening on port ${PORT}`);
        });
    }
    catch (e) {
        console.log(e)
    }

}

start()



