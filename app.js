const express = require('express');
const morgan = require('morgan');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

//MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json()); //Middleware para que express pueda leer lo que viene por req.body. El método use se usa para usar middleware
app.use(express.static(`${__dirname}/public`));
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// app.get('/api/v1/tours', getAllTours);

// app.get('/api/v1/tours/:id', getTour); //La función callback se llama Route Handler

// app.post('/api/v1/tours', createTour);

// app.patch('/api/v1/tours/:id', updateTour);

// app.delete('/api/v1/tours/:id', deleteTour);

//ROUTES
app.use('/api/v1/tours', tourRouter); //middleware
app.use('/api/v1/users', userRouter); //middleware
app.all('*', (req, res, next) => {
  // const err = new Error(`Can't find ${req.originalUrl} on this server!`);
  // err.status = 'fail';
  // err.statusCode = 404;
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler); //cuando un middleware tiene 4 parámetros express automáticamente lo identifica como un error handler

module.exports = app;
