const catchError = require('../utils/catchError');
const Cart = require('../models/Cart');
const Purchase = require('../models/Purchase');
const Product = require('../models/Product');

const getAll = catchError(async (req, res) => {
    const purchase = await Purchase.findAll({ include: [Product], where: { userId: req.user.id } });
    return res.json(purchase)
});

const purchaseCart = catchError(async (req, res) => {
    const userId = req.user.id;
    const cart = await Cart.findAll({
        where: { userId },
        attributes: ['quantity', 'productId', 'userId'],
        raw: true
    })
    await Purchase.bulkCreate(cart);
    await Cart.destroy({ where: { userId } })
    return res.json(cart);
});

module.exports = {
    getAll,
    purchaseCart
}