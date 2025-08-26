import express from "express";
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import sequelize  from './config/db.js';
import swaggerDocs from './docs/swagger.js';    
import productRoute from './routes/productRoute.js';


const app = express();
const PORT = 3003;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(express.json());


app.use('/api/v1/prod', productRoute);

swaggerDocs(app);

sequelize.sync({ force: false }).then(() => {
    console.log("Database connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

