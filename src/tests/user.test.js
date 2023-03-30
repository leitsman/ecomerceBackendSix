const request = require("supertest");
const app = require("../app");

let getId;
let token;

test('POST /users should create new user', async () => {
    const newUser = {
        firstName: 'manuel',
        lastName: 'cnauqi',
        email: 'misterium273@gmail.com',
        password: 'hola1234',
        phone: '72555789',
    }
    const res = await request(app).post('/users').send(newUser);
    getId = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.firstName).toBe(newUser.firstName)
});

test('POST /users should return user login', async () => {
    const body = {
        email: 'misterium273@gmail.com',
        password: 'hola1234',
    }
    const res = await request(app).post('/users/login').send(body);
    token = res.body.token;
    expect(res.status).toBe(201);
    expect(res.body.user.email).toBe(body.email);
    expect(res.body.token).toBeDefined();
});

test('GET /users should return users', async () => {
    const res = await request(app).get('/users').set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(2);
});

test('GET /users:id should return a user', async () => {
    const res = await request(app).get(`/users/${getId}`).set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe('manuel');
});

test('PUT /users:id should return a user', async () => {
    const body = {
        firstName: 'manuel',
        lastName: 'canqui',
        email: 'misterium273@gmail.com',
        password: 'hola1234',
        phone: '72555789',
    }
    const res = await request(app).put(`/users/${getId}`).send(body).set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(body.firstName);
});

test('DELETE /users:id should delete a user', async () => {
    const res = await request(app).delete(`/users/${getId}`).set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
});