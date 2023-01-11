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

exports.deleteTour = catchAsync(async (req, res) => {
  const tour = await Tour.findByIdAndDelete(req.params.id);
  if (!tour) {
    return next(new AppError('No tour found with that ID', 404)); //ponemos return para que se corte la ejecución
  }
  res
    .status(204) //204 significa "no content"
    .json({ status: 'success', data: null }); // ya no enviamos datos sino que enviamos null
});
