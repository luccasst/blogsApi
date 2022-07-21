const express = require('express');
require('express-async-errors');
const loginRouter = require('./routes/loginRouter');
const userRouter = require('./routes/userRouter');
const authorization = require('./middlewares/authorization');
const categoryRouter = require('./routes/categoryRouter');
const postRouter = require('./routes/postRouter');

// ...

const app = express();

app.use(express.json());

app.use('/login', loginRouter);

app.use('/user', userRouter);

app.use('/categories', authorization.getUser, categoryRouter);

app.use('/post', authorization.getUser, postRouter);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
