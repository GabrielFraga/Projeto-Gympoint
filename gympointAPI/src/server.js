import app from './app';

require('dotenv/config');

app.listen(process.env.APP_DEV_PORT);
