const helmet = require('helmet')
const noCache = require('nocache')
const cors = require('cors')
const bodyParser = require('body-parser')
const error = require('../middlewares/error')

const home = require('../routes/home')
const users = require('../routes/users')

module.exports = (app) => {
    app.use(helmet())
    app.use(noCache())
    app.use(cors())
    app.use(bodyParser.urlencoded({ 
        extended: false 
    }))
    app.use(bodyParser.json())
    app.use('/', home)
    app.use('/v1/users', users)
    app.use(error)
}