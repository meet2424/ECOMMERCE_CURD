import Order from '../Model/Order.js';
import Product from '../Model/Product.js';

import { Router } from 'express';

const router = new Router();

//Add Order
router.post('/', async (req, res) => {
  let cost;
  const { products } = req.body;

  products.forEach(async (product) => {
    const findProduct = await Product.findOne({ _id: product.productId });
    cost += parseInt(findProduct.price) * parseInt(product.quantity);
  });

  const orderDetails = {
    ...req.body,
    total_price: cost,
  };

  console.log(orderDetails);
  const newOrder = new Order(orderDetails);

  try {
    const savedOrder = await newOrder.save();

    if (savedOrder) {
      res.status(200).json({
        message: 'Order added successfully',
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

//Update Order
router.put('/:id', async (req, res) => {
  try {
    let cost;
    if (req.body.products) {
      products.forEach(async (product) => {
        const findProduct = await Product.findOne({ _id: product.productId });
        cost += parseInt(findProduct.price) * parseInt(product.quantity);
      });

      req.body.total_price = cost;
    }

    console.log(cost);

    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    if (updatedOrder) {
      res.status(200).json({
        message: 'Order Updated Successfully',
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

//Delete Order
router.delete('/:id', async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: 'Order has been deleted',
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

//View Customer Order
router.get('/:customerID', async (req, res) => {
  try {
    const order = await Order.find({ userId: req.params.customerID });
    res.status(200).json({
      message: 'Order Detail',
      data: order,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

//View All Order

router.get('/', async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json({
      message: 'Order Detail',
      data: orders,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

export default router;
