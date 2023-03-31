const request = require("supertest");
const app = require("../app");
const Category = require("../models/Category");
const Product = require("../models/Product");
require("../models")

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

test('POST /cart should create new cart', async () => {
    const newProduct = {
        title: 'samsung a124sas',
        description: 'purchases (privado) debe traer las compras del usuari',
        price: 'hola1234'
    };
    const product = await Product.create(newProduct)
    const newCart = {
        quantity: 15,
        product: product.id
    }
    const res = await request(app).post('/cart').send(newCart).set('Authorization', `Bearer ${token}`);
    getId = res.body.id;
    await product.destroy();
    expect(res.status).toBe(201);
    expect(res.body.quantity).toBe(newCart.quantity);
});

test('GET /cart should return cart', async () => {
    const res = await request(app).get('/cart').set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

test('PUT /cart:id should return a cart', async () => {
    const body = {
        quantity: 2
    }
    const res = await request(app).put(`/cart/${getId}`).send(body).set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.quantity).toBe(body.quantity);
});

test('DELETE /cart:id should delete a cart', async () => {
    const res = await request(app).delete(`/cart/${getId}`).set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
});