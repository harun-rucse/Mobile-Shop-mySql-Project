const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

dotenv.config();
const db = require('./db');
const webRouter = require('./routes/web');
const apiRouter = require('./routes/api');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/error');

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Serve cookie in request object
app.use(cookieParser());

app.use((req, res, next) => {
  req.db = db;

  next();
});

app.use('/api', apiRouter);
app.use('/', webRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}...`);
});
