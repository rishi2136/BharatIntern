const mongoose = require('mongoose');
require('dotenv').config({ path: "../.env" })

module.exports = async function main() {
  await mongoose.connect(process.env.MONGODB_URL);
}

