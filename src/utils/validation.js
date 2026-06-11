const validator = require('validator');

const validateSignupData = (req) => {
  const data = req.body;

  if (!data.firstName || typeof data.firstName !== 'string' || data.firstName.length < 4 || data.firstName.length > 20) {
    throw new Error('First name must be a string between 4 and 20 characters');
  }

   if (data.lastName && (typeof data.lastName !== 'string' || data.lastName.length < 4 || data.lastName.length > 20)) {
    throw new Error('Last name must be a string between 4 and 20 characters');
  }

   if (!data.email || !validator.isEmail(data.email)) {
    throw new Error('Invalid email address');
  }

};

module.exports = {
  validateSignupData,
};