class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  filter() {
    //1A) Filtering
    const queryObj = { ...this.queryString }; //así creamos un objeto con lo que trae el query y no una referencia en memoria
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]); //usamos forEach para no crear un arreglo nuevo. Esto va a borrar todos los excluidos de mi queryObj, así no pasan al método find()

    //1B) Advanced filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    this.query = this.query.find(JSON.parse(queryStr));
    // let query = Tour.find(JSON.parse(queryStr)); //lo llamamos como query sin el await para poder encadenar métodos como sort, limit, y otros, con await no se puede
    return this;
  }
  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }
  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }
  paginate() {
    const page = this.queryString.page * 1 || 1; //los números que vienen por query son strings, multiplicamos * 1 para convertirlos en números
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;

    //page=3&limit=10, 1-10 : page 1, 11-20 : page 2, 21-30 : page 3
    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

module.exports = APIFeatures;
