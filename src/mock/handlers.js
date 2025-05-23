
import { rest } from 'msw';

let users = [
  { id: 1, name: 'Alice', email: 'alice@example.com', phone: '+111', country: 'USA' },
  { id: 2, name: 'Bob', email: 'bob@example.com', phone: '+222', country: 'UK' },
];

export const handlers = [
  rest.get('/api/users', (req, res, ctx) => {
    return res(ctx.delay(500), ctx.status(200), ctx.json(users));
  }),
  rest.post('/api/users', async (req, res, ctx) => {
    const newUser = await req.json();
    newUser.id = Date.now();
    users.unshift(newUser);
    return res(ctx.status(201), ctx.json(newUser));
  }),
  rest.put('/api/users/:id', async (req, res, ctx) => {
    const updatedUser = await req.json();
    users = users.map(u => u.id === parseInt(req.params.id) ? updatedUser : u);
    return res(ctx.status(200), ctx.json(updatedUser));
  }),
  rest.delete('/api/users/:id', (req, res, ctx) => {
    users = users.filter(u => u.id !== parseInt(req.params.id));
    return res(ctx.status(204));
  }),
];
