const Tour = require('./../models/tourModel');

//ROUTE HANDLERS

exports.getAllTours = async (req, res) => {
  //La función callback se llama Route Handler
  try {
    //BUILD QUERY
    const queryObj = { ...req.query }; //así creamos un objeto con lo que trae el query y no una referencia en memoria
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]); //usamos forEach para no crear un arreglo nuevo. Esto va a borrar todos los excluidos de mi queryObj, así no pasan al método find()

    const query = Tour.find(queryObj); //lo llamamos como query sin el await para poder encadenar métodos como sort, limit, y otros, con await no se puede

    //EXECUTE THE QUERY
    const tours = await query; //esto va a devolver una promesa, por eso usamos await

    //SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: { tours: tours },
    });
  } catch (err) {
    res.status(404).json({ status: 'fail', message: err });
  }
};

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    res.status(200).json({ status: 'success', data: { tour } });
  } catch (err) {
    res.status(404).json({ status: 'fail', message: err });
  }

  //   if (id > tours.length) {
};

exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: 'success',
      data: { tour: newTour },
    });
  } catch (err) {
    res.status(400).json({ status: 'fail,', message: err });
  }
};
exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      //el segundo parámetro es la información con la que queremos cambiar el tour
      new: true, //el tercer parámetro indica que queremos devolver el documento modíficado en vez del original
      runValidators: true,
    });
    res.status(200).json({ status: 'success', data: { tour: tour } });
  } catch (err) {
    res.status(404).json({ status: 'fail', message: err });
  }
};
exports.deleteTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndDelete(req.params.id);
    res
      .status(204) //204 significa "no content"
      .json({ status: 'success', data: null }); // ya no enviamos datos sino que enviamos null
  } catch (err) {
    res.status(404).json({ status: 'fail', message: err });
  }
};
