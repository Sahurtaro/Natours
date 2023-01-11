const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.deleteOne = (Model) =>
  catchAsync(async (req, res) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) {
      return next(new AppError('No document found with that ID', 404)); //ponemos return para que se corte la ejecución
    }
    res
      .status(204) //204 significa "no content"
      .json({ status: 'success', data: null }); // ya no enviamos datos sino que enviamos null
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      //el segundo parámetro es la información con la que queremos cambiar el doc
      new: true, //el tercer parámetro indica que queremos devolver el documento modíficado en vez del original
      runValidators: true,
    });
    if (!doc) {
      return next(new AppError('No document found with that ID', 404)); //ponemos return para que se corte la ejecución
    }
    res.status(200).json({ status: 'success', data: { data: doc } });
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res) => {
    const doc = await Model.create(req.body);
    res.status(201).json({
      status: 'success',
      data: { data: doc },
    });
  });
