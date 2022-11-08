const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

//MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json()); //Middleware para que express pueda leer lo que viene por req.body. El método use se usa para usar middleware
app.use((req, res, next) => {
  //Aplica para todas las request porque está antes de todas las rutas
  console.log('Hello from the middleware');
  next(); //siempre usar next en todos los middlewares, sino no se va a enviar una respuesta
});
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
app.use(express.static(`${__dirname}/public`));
module.exports = app;
