import express from 'express';
import cors from 'cors';
import User from './models/User';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', async (_req, res) => {
  const response = await User.getUsers();
  return res.status(200).json(response);
});

app.post('/', async (req, res) => {
  const response = await User.newUser(req.body);
  return res.status(201).json(response);
});

app.put('/', async (req, res) => {
  const response = await User.updateUser(req.body);
  return res.status(200).json({ response });
});

app.delete('/', async (req, res) => {
  const id = Number(req.query.userId);
  const response = await User.deleteUser(id);
  return res.status(204).json(response);
});

app.listen(3333);
