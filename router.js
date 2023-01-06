const home = require('./components/home/index')
const login = require('./components/login/index')
const infouser = require('./components/infouser/index')

module.exports = (app, database, utils) => {
  app.use('/', home(database, utils))
  app.use('/login', login(database, utils))
  app.use('/infouser', infouser(database, utils))
}
