const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'], //valor requerido y error
    unique: true,
    trim: true, //solo funciona para strings y remueve todos los espacios en blanco al inicio y al final del string
  },
  duration: {
    type: Number,
    required: [true, 'A tour must have a duration'],
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'A tour must have a group size'],
  },
  difficulty: {
    type: String,
    required: [true, 'A tour must have a difficulty'],
  },
  ratingsAverage: { type: Number, default: 4.5 },
  ratingsQuantity: { type: Number, default: 0 },
  price: {
    type: Number,
    required: [true, 'The tour must have a price'], //valor requerido y error
  },
  priceDiscount: Number,
  summary: {
    type: String,
    trim: true, //solo funciona para strings y remueve todos los espacios en blanco al inicio y al final del string
    required: [true, 'A tour must have a description'],
  },
  description: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: String,
    required: [true, 'A tour must have a cover image'],
  },
  images: [String], //acá aclaro que para esta propiedad quiero un arreglo de strings
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  startDates: [Date], //acá aclaro que para esta propiedad quiero un arreglo de fechas
});
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
