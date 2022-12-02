const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
  console.log(err.name, err.message);
  console.log('Uncaught Exception! Shutting down...');
  process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

//Conexión con la base de datos
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  }) //conexión a la base de datos, el primer argumento es el string de la base de datos, el segundo es un objeto con opciones
  .then(() => {
    console.log('DB connection successful!');
  });

//START THE SERVER
// console.log(process.env);
const port = 3000;
const server = app.listen(port, () => {
  console.log(`Running on port ${port}...`);
}); //Así se inicializa el servidor, recibe como parámetros el puerto y un callback

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('Unhandled rejection! Shutting down...');
  server.close(() => {
    process.exit(1); //code 0 stands for success and 1 is for uncaught exception
  });
});
