const request = require("supertest");
const app = require("../app");
const Category = require("../models/Category");
const Product = require("../models/Product");
const ProductImg = require("../models/ProductImg");
const User = require("../models/User");
require('../models')

let getId;
let token;

beforeAll(async () => {
    const credentials = {
        email: 'testeo@gmail.com',
        password: 'hola1234'
    };
    const res = await request(app).post('/users/login').send(credentials);
    token = res.body.token;
});

test('POST /products should create new product', async () => {
    const category = await Category.create({ name: "phones" })
    const newProduct = {
        title: 'samsung a124s',
        description: 'purchases (privado) debe traer las compras del usuari',
        categoryId: 1,
        price: 'hola1234'
    };
    const res = await request(app).post('/products').send(newProduct).set('Authorization', `Bearer ${token}`);
    getId = res.body.id;
    await category.destroy();
    expect(res.status).toBe(201);
    expect(res.body.title).toBe(newProduct.title);
});

test('GET /products should return products', async () => {
    const res = await request(app).get('/products');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

test('GET /products:id should return a product', async () => {
    const res = await request(app).get(`/products/${getId}`);
    expect(res.status).toBe(200);
    expect(res.body.title).toBe("samsung a124s");
});

test('PUT /products:id should return a product', async () => {
    const body = {
        title: 'samsung a124sss',
        description: '/purchases (privado) debe traer las compras del usuario',
        price: 'hola1234'
    }
    const res = await request(app).put(`/products/${getId}`).send(body).set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.title).toBe(body.title);
});

test('POST /products should set in product', async () => {
    const images = await ProductImg.create({ url: "http://localtest0000", publicId: 'uploads/amongUs.png' })
    const res = await request(app).post(`/products/${getId}/images`).send([images.id]).set('Authorization', `Bearer ${token}`);
    await images.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

test('DELETE /products:id should delete a product', async () => {
    const res = await request(app).delete(`/products/${getId}`).set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
});