class CustomError extends Error {
  constructor(message = "something went wrong!", status = 404) {
    super();
    this.status = status;
    this.message = message;
  }
}

module.exports = CustomError;