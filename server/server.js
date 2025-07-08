import express from 'express';
import mongoose from 'mongoose';
import json from 'express';
import cors from 'cors';
import { Users } from './models/Users.js'; 

const app = express()
const port = 3000

app.use(cors());
app.use(express.json());


let conn = await mongoose.connect("mongodb://localhost:27017/UsersDB");



app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/submit', async(req, res) => {
  const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }
    console.log('Received submission:', { username, password });
    res.status(200).json({ message: 'Form submitted successfully', data: { username, password } });

    const newUser = new Users({ username, password });
    await newUser.save();
    console.log('User saved to database:', newUser);

})


// GET all users
app.get('/users', async (req, res) => {
  const users = await Users.find();
  res.json(users);
});

// PUT to update password
app.put('/users/:username', async (req, res) => {
  const { password } = req.body;
  const user = await Users.findOneAndUpdate(
    { username: req.params.username },
    { password },
    { new: true }
  );
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json({ message: 'Updated', user });
});

// DELETE user
app.delete('/users/:username', async (req, res) => {
  const result = await Users.findOneAndDelete({ username: req.params.username });
  if (!result) return res.status(404).json({ error: 'User not found' });
  res.json({ message: 'User deleted' });
});



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
