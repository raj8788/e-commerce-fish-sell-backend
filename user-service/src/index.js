import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import sequelize  from './config/db.js';
import swaggerDocs from './docs/swagger.js';



const app = express();
const PORT = 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(express.json());
swaggerDocs(app);

app.get('/', (req, res)=>{
    res.send('User Service is running');
})


sequelize.sync({ force: false }).then(() => {
    console.log("Database connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});