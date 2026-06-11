const mongoose = require('mongoose');
const valdator = require('validator');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: 4,
    maxLength: 20,
  },
    lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    validate(value) {
      if(!valdator.isEmail(value)) {
        throw new Error('Invalid email address');
      }
    }
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    min: 18,
    max: 45,
  },
    gender: {   
    type: String,
    validate(value) {
        if(!['male', 'female', 'other'].includes(value)) {
            throw new Error('Gender must be either male, female, or other');
        }
    }
  },
  photoUrl: {
    type: String,
  },
  about: {
    type: String,
    default: 'This user prefers to keep an air of mystery about them.',
  },
  skills: {
    type: [String],
  },
  
},
{
    timestamps: true,
  },
);

const User = mongoose.model('User', userSchema);

module.exports = User;