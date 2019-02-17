import express from 'express';
import bodyParser from 'body-parser';


// Routes
import mealRoutes from './routes/meal.routes';
import menuRoutes from './routes/menu.routes';




const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.get('/', (req, res) => {
    return res.send('API is working');
});


// handler
app.use('/api/v1/meals', mealRoutes);
app.use('/api/v1/menus', menuRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});