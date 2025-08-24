import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())



app.get('/', (req, res) => {
  res.send('User Service is running');
});



app.listen(PORT, () => {
  console.log(`User Service is running on http://localhost:${PORT}`);
});