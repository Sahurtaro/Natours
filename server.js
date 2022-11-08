const mongooose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongooose
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
app.listen(port, () => {
  console.log(`Running on port ${port}...`);
}); //Así se inicializa el servidor, recibe como parámetros el puerto y un callback
