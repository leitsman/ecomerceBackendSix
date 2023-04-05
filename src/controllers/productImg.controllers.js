const ProductImg = require('../models/ProductImg');
const catchError = require('../utils/catchError');
const fs = require('fs');
const path = require('path');
const { uploadToCloudinary, deleteFromCloudinary } = require('../utils/cloudinary');

const getAll = catchError(async (req, res) => {
    const images = await ProductImg.findAll(
        { attributes: { exclude: ['publicId', 'productId'] } }
    )
    return res.json(images)
});

const create = catchError(async (req, res) => {
    const { productId } = req.body;
    const { path, filename } = req.file;
    const { url, public_id } = await uploadToCloudinary(path, filename);
    const image = await ProductImg.create({ url, publicId: public_id, productId });
    return res.status(201).json(image);
});

const remove = catchError(async (req, res) => {
    const { id } = req.params;
    const image = await ProductImg.findByPk(id);
    if (!image) return res.sendStatus(404);
    await deleteFromCloudinary(image.publicId);
    await image.destroy();
    return res.sendStatus(204);
});

module.exports = {
    getAll,
    create,
    remove
}