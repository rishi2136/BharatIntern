const mongoose = require('mongoose');


const connectDB = async () => {
  await mongoose.connect('mongodb://localhost:27017/bharatIntern', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
}

module.exports = connectDB;
