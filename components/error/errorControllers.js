exports.catchAsync = (func) => {
    return (request, response, next) => func(request, response, next).catch(next);
  };