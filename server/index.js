const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const app = express()
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { mongoUrl } = require('./config.json');
const payment = require('./routes/payment');
const accountOperations = require('./routes/account');
const usersOperations = require('./routes/users');

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'

async function start () {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  await mongoose.connect(mongoUrl, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
    .then((mongooseData) => {
      mongooseData.connection.on('close', () => {
        mongooseData.connection.removeAllListeners();
      });
      console.log('Connected to database at', mongoUrl);
    })
    .catch(err => console.log(err));

  const { host, port } = nuxt.options.server

  await nuxt.ready()
  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  // Give nuxt middleware to express

  app.use(bodyParser.json());
  app.use('/payment', payment);
  app.use('/account', accountOperations);
  app.use('/users', usersOperations);
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
