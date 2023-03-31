const Category = require("./Category");
const Product = require("./Product");
const ProductImg = require("./ProductImg");
const User = require("./User");
const Cart = require("./Cart");
const Purchase = require("./Purchase");

// category
Product.belongsTo(Category);
Category.hasMany(Product);

// images:
ProductImg.belongsTo(Product);
Product.hasMany(ProductImg);

// setProductImages
// ProductImg.belongsToMany(Product, { through: 'productsImgs' });
// Product.belongsToMany(ProductImg, { through: 'productsImgs' });

// Cart user
Cart.belongsTo(User);
User.hasMany(Cart);
// cart  product
Cart.belongsTo(Product)
Product.hasMany(Cart)

// purchases User
Purchase.belongsTo(User)
User.hasMany(Purchase)

// purchases Product
Purchase.belongsTo(Product)
Product.hasMany(Purchase)