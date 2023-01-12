const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('./../../models/tourModel');
const User = require('./../../models/userModel');
const Review = require('./../../models/reviewModel');
dotenv.config({ path: './config.env' });

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

//READ JSON FILE
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8')); //convertimos los datos que vienen en formato json a un objeto de javascript, para que mongoose pueda crear los documentos
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8')); //convertimos los datos que vienen en formato json a un objeto de javascript, para que mongoose pueda crear los documentos
const reviews = JSON.parse(
  fs.readFileSync(`${__dirname}/reviews.json`, 'utf-8')
); //convertimos los datos que vienen en formato json a un objeto de javascript, para que mongoose pueda crear los documentos
//IMPORT DATA INTO DATABASE
const importData = async () => {
  try {
    await Tour.create(tours);
    await User.create(users, { validateBeforeSave: false });
    await Review.create(reviews);
    console.log('Data successfully loaded');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

//DELETE ALL DATA FROM COLLECTION
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    await User.deleteMany();
    await Review.deleteMany();
    console.log('Data successfully deleted');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
