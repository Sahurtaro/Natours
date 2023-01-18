const AppError = require('./../utils/appError');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const factory = require('./handlerFactory');
const multer = require('multer');

//MULTER CONFIGURATION

const multerStorage = multer.diskStorage({
  //acá configuramos que el archivo de imagen tenga un nombre único
  destination: (req, file, dc) => {
    cb(null, 'public/img/users');
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    cb(null, `user-${req.user.id}-${Date.now()}-${ext}`);
  },
});

const multerFilter = (req, file, cb) => {
  //acá nmos cercioramos que el archivo que se sube sea efectivamente una imagen
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image, please upload only images,', 400), false);
  }
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter }); //here we gonna save the images we'll upload

//END OF MULTER CONFIGURATION

exports.uploadUserPhoto = upload.single('photo');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

//ROUTE HANDLERS

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates. Please use /updateMyPassword.',
        400 //400 stands for bad request
      )
    );
  }
  // 2) Filtered out unwanted field names that are not allowed to be updated
  const filteredBody = filterObj(req.body, 'name', 'password');
  if (req.file) filteredBody.photo = req.file.filename;
  // 3)Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });
  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined! Please use /signup instead',
  });
};
exports.getAllUsers = factory.getAll(User);
exports.getUser = factory.getOne(User);
//Do NOT update passwords with this!!!
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);
