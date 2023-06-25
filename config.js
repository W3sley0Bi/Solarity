const path = require('path');
require('dotenv').config({ path: path.join(__dirname, './.env') })

const config = {
    db: {
      host: process.env.DB_HOSTNAME,
      user: process.env.DB_USER, 
      password: process.env.DB_PWD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT,
      // connectionLimit: process.env.CONN_LIMIT,
    },
    pythonServer: process.env.PYTHON_SERVER,
    port: process.env.PORT ? process.env.PORT : 3001,
    jwt: process.env.SECRETJWT ? process.env.SECRETJWT : "forzaNapoli",
    listPerPage: 10,
    emails:{
      sender: process.env.EMAIL_SENDER,
      senderPwd: process.env.EMAIL_SENDER_PWD,
      google:{ 
        clientId: process.env.OAUTH_CLIENTID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN,
        redirectURI: 'https://developers.google.com/oauthplayground' 
      }
    }
  };
  module.exports = config;