const request = require("supertest");
const app = require("../app");

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

test('POST /categories should create new category', async () => {
    const newCategory = {
        name: 'nevertel'
    }
    const res = await request(app).post('/categories').send(newCategory).set('Authorization', `Bearer ${token}`);
    getId = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.name).toBe(newCategory.name);
});

test('GET /categories should return all categories', async () => {
    const res = await request(app).get('/categories');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});
test('DELETE /categories should deleted a category', async () => {
    const res = await request(app).delete(`/categories/${getId}`).set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
});