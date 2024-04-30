import { config } from 'dotenv';
import express, { json } from 'express';
import path from 'path';

const app = express();

config();

const PORT = process.env.PORT || 1604;

app.use(json());

app.use(express.static('/public'));

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: '.' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
