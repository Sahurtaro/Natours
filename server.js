const app = require('./app');

//START THE SERVER
const port = 3000;
app.listen(port, () => {
  console.log(`Running on port ${port}...`);
}); //Así se inicializa el servidor, recibe como parámetros el puerto y un callback
