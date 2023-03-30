const { getAll, create, remove } = require('../controllers/productImg.controllers');
const express = require('express');
const upload = require('../utils/multer');
const verifyJWT = require('../utils/verifyJWT');
const { setProductImages } = require('../controllers/product.controllers');

const productImgRouter = express.Router();
//verifyJWT,
productImgRouter.route('/')
    .get(getAll)
    .post(upload.single("image"), create);

productImgRouter.route('/:id')
    .delete(verifyJWT, remove);

module.exports = productImgRouter;