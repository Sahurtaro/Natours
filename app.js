const fs = require('fs');
const express = require('express');
const morgan = require('morgan');
const app = express();

//MIDDLEWARES
app.use(morgan('dev'));
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

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`) //se lee los datos que están en el archivo de texto y se transforman a formato JSON
);
//ROUTE HANDLERS
const getAllTours = (req, res) => {
  //La función callback se llama Route Handler
  res
    .status(200)
    .json({ status: 'success', results: tours.length, data: { tours: tours } });
};
const getTour = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1; //transformamos el id que viene por params(que es un string), en un número
  const tour = tours.find((el) => el.id === id);
  //   if (id > tours.length) {
  if (!tour) {
    return res.status(404).json({ status: 'Failed', message: 'Invalid ID' });
  }

  res.status(200).json({ status: 'success', data: { tour } });
};

const createTour = (req, res) => {
  //   console.log(req.body);
  const newId = tours[tours.length - 1].id + 1; //aquí se crea un índica mayor al índice del último objeto en el archivo
  const newTour = Object.assign({ id: newId }, req.body); //con esto creamos un nuevo tour combinando el nuevo id creado con la info que viene por el body
  tours.push(newTour); //agregamos este nuevo objeto al arreglo de tours
  fs.writeFile(
    //aquí agregamos el nuevo tour al archivo de texto donde tenemos todos los tours y funciona provicionalmente como base de datos
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({ status: 'success', data: { tour: newTour } }); //Status 201 indica Created
    }
  );
};
const updateTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({ status: 'Failed', message: 'Invalid ID' });
  }
  res
    .status(200)
    .json({ status: 'success', data: { tour: '<Updated tour here...>' } });
};
const deleteTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({ status: 'Failed', message: 'Invalid ID' });
  }
  res
    .status(204) //204 significa "no content"
    .json({ status: 'success', data: null }); // ya no enviamos datos sino que enviamos null
};

const getAllUsers = (req, res) => {
  res
    .status(500) //500 significa internal server error
    .json({ status: 'error', message: 'This route is not yet defined' });
};
const createUser = (req, res) => {
  res
    .status(500)
    .json({ status: 'error', message: 'This route is not yet defined' });
};
const getUser = (req, res) => {
  res
    .status(500)
    .json({ status: 'error', message: 'This route is not yet defined' });
};
const updateUser = (req, res) => {
  res
    .status(500)
    .json({ status: 'error', message: 'This route is not yet defined' });
};
const deleteUser = (req, res) => {
  res
    .status(500)
    .json({ status: 'error', message: 'This route is not yet defined' });
};
// app.get('/api/v1/tours', getAllTours);

// app.get('/api/v1/tours/:id', getTour); //La función callback se llama Route Handler

// app.post('/api/v1/tours', createTour);

// app.patch('/api/v1/tours/:id', updateTour);

// app.delete('/api/v1/tours/:id', deleteTour);

//ROUTES
const tourRouter = express.Router();
const userRouter = express.Router();

tourRouter.route('/').get(getAllTours).post(createTour); //Refactoring routes
tourRouter.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

userRouter.route('/').get(getAllUsers).post(createUser);
userRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

app.use('/api/v1/tours', tourRouter); //middleware
app.use('/api/v1/users', userRouter); //middleware
//START THE SERVER
const port = 3000;
app.listen(port, () => {
  console.log(`Running on port ${port}...`);
}); //Así se inicializa el servidor, recibe como parámetros el puerto y un callback
