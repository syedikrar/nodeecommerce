const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require('jsonwebtoken');
const User = require("../models/userModel");

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
    const { token } = req.cookies;
    console.log(token);
    if(!token){
        return next(new ErrorHandler("Please login to access resources", 401));
    }

    const decodedData = jwt.verify(token, 'jljlspSGASGljkkojlsvsafsa');

    req.user = await User.findById(decodedData.id);
    next();
  });

  exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        
      if (!roles.includes(req.user.role)) {
        return next(
          new ErrorHandler(
            `Role: ${req.user.role} is not allowed to access this resouce `,
            403
          )
        );
      }
  
      next();
    };
  };