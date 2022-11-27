const mongoose = require('mongoose');
const slugify = require('slugify');

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour must have a name'], //valor requerido y error
      unique: true,
      trim: true, //solo funciona para strings y remueve todos los espacios en blanco al inicio y al final del string
    },
    slug: String,
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
    secretTour: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true }, //cada vez que los datos se muestren como JSON queremos que virtuals sean parte del resultado
    toObject: { virtuals: true }, //cada vez que los datos se muestren como Objects queremos que virtuals ean parte del resultado
  }
); //el segundo objeto que pasamos como argumento al Schema es de opciones

//Virtual features are fields that we can define in our schema but will not be persisted or not be saved

tourSchema.virtual('durationWeeks').get(function () {
  //los virtuals no se pueden usar en query, porque no son parte de la base de datos realmente
  return this.duration / 7;
});

//DOCUMENT MIDDLEWARE: runs before the .save() command or on the .create() command only.
tourSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// tourSchema.pre('save', function (next) {
//   console.log('Will save document...');
//   next();
// });

// tourSchema.post('save', function (doc, next) {});

// QUERY MIDDLEWARE
// tourSchema.pre('find', function (next) {
tourSchema.pre(/^find/, function (next) {
  //esta expresión regular va a usar todos los strings que empiecen con find, como find y findOne
  // la palabra clave "find" va a apuntar a la query actual y no al documento actual
  this.find({ secretTour: { $ne: true } });
  this.start = Date.now();
  next();
});

tourSchema.post(/^find/, function (docs, next) {
  console.log(`Query took ${Date.now() - this.start} milliseconds!`);
  next();
});

// tourSchema.pre('findOne', function (next) {
//   // la palabra clave "find" va a apuntar a la query actual y no al documento actual
//   this.find({ secretTour: { $ne: true } });
//   next();
// });

// AGGREGATION MIDDLEWARE
tourSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
  next();
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
