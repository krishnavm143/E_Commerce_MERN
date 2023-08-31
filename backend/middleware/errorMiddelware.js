const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.orignalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  //check mongoose error
  if (err.name === 'CastError' && err.Kind === 'ObjectId') {
    (message = 'Resource Not Found'), (statusCode = 404);
  }
  res.status(statusCode).json({
    message,
  });
};

export {notFound,errorHandler}