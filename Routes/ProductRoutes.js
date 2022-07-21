import Product from '../Model/Product.js';

import { Router } from 'express';

const router = new Router();

//Add Product
router.post('/', async (req, res) => {
  try {
    const findProduct = await Product.findOne({ title: req.body.title });

    if (findProduct) {
      res.status(409).json({
        message: 'Product already exists with given title',
      });
    } else {
      const newProduct = new Product({ ...req.body });

      await newProduct.save();

      res.status(200).json({
        message: 'Product Added Successfully',
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

//Edit Product
router.put('/:id', async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    if (updatedProduct) {
      res.status(200).json({
        message: 'Updated Product Successfully',
      });
    } else {
      res.status(200).json({
        message: 'Product Not Updated',
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

//Delete Product
router.delete('/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: 'Product has been deleted',
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

//View Product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json({
      message: 'Product Detail',
      data: product,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

//View All Products
router.get('/', async (req, res) => {
  const qCategory = req.query.category;
  try {
    let products;

    if (qCategory) {
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      products = await Product.find();
    }

    res.status(200).json({
      message: 'All Products Details',
      data: products,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

export default router;
