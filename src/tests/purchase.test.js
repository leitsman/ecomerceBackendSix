const request = require("supertest");
const app = require("../app");
const Product = require("../models/Product");
const Cart = require("../models/Cart");
require('../models')

let userId;
let token;

beforeAll(async () => {
    const credentials = {
        email: 'testeo@gmail.com',
        password: 'hola1234'
    };
    const res = await request(app).post('/users/login').send(credentials);
    token = res.body.token;
    userId = res.body.user.id;
});

test('POST /purchases should set cart to purchases', async () => {
    const product = await Product.create({
        title: 'samsung a124sas',
        description: 'purchases (privado) debe traer las compras del usuari',
        price: 'hola1234'
    });
    const cart = await Cart.create({
        quantity: 15,
        productId: product.dataValues.id,
        userId
    });
    // console.log(cart.dataValues)
    const res = await request(app).post('/purchases').send(cart).set('Authorization', `Bearer ${token}`);
    await cart.destroy();
    await product.destroy();
    expect(res.status).toBe(200);
    expect(Cart).toHaveLength(0);
});

test('GET /purchases should return purchases', async () => {//no
    const res = await request(app).get('/purchases').set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});