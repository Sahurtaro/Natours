const fs = require('fs');

//ROUTE HANDLERS
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`) //se lee los datos que están en el archivo de texto y se transforman a formato JSON
);

exports.checkID = (req, res, next, val) => {
  console.log(`Tour id is: ${val}`);
  //Param middleware para hacer chequeo del ID válido
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({ status: 'Failed', message: 'Invalid ID' }); //Es importante el return para cortar la ejecución de la función y que no ejecute el next()
  }
  next();
};

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res
      .status(400)
      .json({ status: 'failed', message: 'Missing name or price' });
  }
  next();
};
exports.getAllTours = (req, res) => {
  //La función callback se llama Route Handler
  res
    .status(200)
    .json({ status: 'success', results: tours.length, data: { tours: tours } });
};

exports.getTour = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1; //transformamos el id que viene por params(que es un string), en un número
  const tour = tours.find((el) => el.id === id);
  //   if (id > tours.length) {

  res.status(200).json({ status: 'success', data: { tour } });
};

exports.createTour = (req, res) => {
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
exports.updateTour = (req, res) => {
  res
    .status(200)
    .json({ status: 'success', data: { tour: '<Updated tour here...>' } });
};
exports.deleteTour = (req, res) => {
  res
    .status(204) //204 significa "no content"
    .json({ status: 'success', data: null }); // ya no enviamos datos sino que enviamos null
};
