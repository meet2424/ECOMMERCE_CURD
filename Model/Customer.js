import mongoose from 'mongoose';

import validator from 'validator';
const { isEmail } = validator;

import bcrypt from 'bcryptjs';

const CustomerSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Please enter your name'],
      lowercase: true,
    },
    email: {
      type: String,
      required: [true, 'Please enter the email'],
      unique: [true, 'Email already taken'],
      lowercase: true,
      validate(value) {
        if (!isEmail(value)) {
          throw new Error('Email is invalid');
        }
      },
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      lowercase: true,
      minlength: [7, 'Password length must be atleast 7 characters.'],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

//Find the customer by email and password from the database and send it back
CustomerSchema.statics.findByCredentials = async (email, password) => {
  const customer = await this.findOne({ email });
  if (!customer) {
    throw new Error('Unable to log in');
  }
  const isMatch = await bcrypt.compare(password, customer.password);
  // console.log(isMatch)
  if (!isMatch) {
    throw new Error('Unable to login');
  }

  return customer;
};

//Hash plain password before saving
CustomerSchema.pre('save', async function (next) {
  const customer = this;

  //only want to hash the password if the customer modifies the password, if it is already hashed, then it shouldn't get hashed again
  if (customer.isModified('password')) {
    customer.password = await bcrypt.hash(customer.password, 8);
  }

  next();
});

const customer = mongoose.model('customer', CustomerSchema);
export default customer;
