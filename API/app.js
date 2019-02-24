import express from 'express';
import bodyParser from 'body-parser';


// Routes
import mealRoutes from './routes/meal.routes';
import menuRoutes from './routes/menu.routes';
import orderRoutes from './routes/order.routes';




const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/', (req, res) => res.send('API is working'));

// handler
app.use('/api/v1/meals', mealRoutes);
app.use('/api/v1/menus', menuRoutes);
app.use('/api/v1/orders', orderRoutes);


export default app;

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});

