import { models } from '../models/index.js';

export const loadData = async (req, res) => {
  const loadAllProducts = await models.products.findAll({});

  return res.json({
    success: true,
    loadAllProducts,
  });
};

export const checkOut = async (req, res) => {
  const { arrOfProducts } = req.body;
  const email = req.user.dataValues.email;

  let totalPrice = 0;

  arrOfProducts.map((i) => {
    models.orders.create({
      email,
      product_name: i.product_name,
    });

    totalPrice += i.price;
  });

  return res.json({
    success: true,
    message: 'Check out successfull',
    totalPrice,
  });
};
