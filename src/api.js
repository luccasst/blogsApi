const express = require('express');
require('express-async-errors');
const loginRouter = require('./routes/loginRouter');
const userRouter = require('./routes/userRouter');
const authorization = require('./middlewares/authorization');
const categoryRouter = require('./routes/categoryRouter');

// ...

const app = express();

app.use(express.json());

app.use('/login', loginRouter);

app.use('/user', userRouter);

app.use('/categories', authorization, categoryRouter);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
