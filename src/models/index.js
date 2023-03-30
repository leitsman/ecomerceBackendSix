const Category = require("./Category");
const Product = require("./Product");
const ProductImg = require("./ProductImg");


Category.hasMany(Product)
Product.belongsTo(Category)

// images:
Product.hasMany(ProductImg)
ProductImg.belongsTo(Product)

// setProductImages
ProductImg.belongsToMany(Product, { through: 'productsImgs' })
Product.belongsToMany(ProductImg, { through: 'productsImgs' })