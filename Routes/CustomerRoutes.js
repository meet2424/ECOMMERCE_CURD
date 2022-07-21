import Customer from '../Model/Customer.js';

import { Router } from 'express';

import bcrypt from 'bcryptjs';
const { hash } = bcrypt;

const router = new Router();

//View Customer by ID
router.get('/:id', async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    res.status(200).json({
      message: 'Customer Detail',
      data: customer,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

//View All Customers
router.get('/', async (req, res) => {
  try {
    const customers = await Customer.find({});

    res.status(200).json({
      message: 'All Customers Details',
      data: customers,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

//Register New Customer
router.post('/', async (req, res) => {
  try {
    const findCustomer = await Customer.findOne({ email: req.body.email });
    const findCustomerName = await Customer.findOne({
      username: req.body.username,
    });

    if (findCustomer) {
      res.status(409).json({
        message: 'Email already exists,try signing In!',
      });
    } else if (findCustomerName) {
      res.status(409).json({
        message: 'CustomerName already Taken',
      });
    } else {
      const customer = new Customer({ ...req.body });

      await customer.save();

      res.status(200).json({
        message: 'Customer successfully added',
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

//Edit Customer
router.put('/:id', async (req, res) => {
  if (req.body.password) {
    req.body.password = bcrypt.hash(req.body.password, 8);
  }

  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    if (updatedCustomer) {
      res.status(200).json({
        message: 'Updated Customer Successfully',
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

//Delete Customer
router.delete('/:id', async (req, res) => {
  try {
    await Customer.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: 'Customer has been deleted',
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

// // forgot email-password
// router.post('/forgot-password', forgotPassword);

// // Reset Password
// router.post('/reset-password/:_id/:newToken', resetPassword);

export default router;
