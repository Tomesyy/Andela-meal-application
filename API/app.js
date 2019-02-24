import express from 'express';
import bodyParser from 'body-parser';


const app = express();
const PORT = process.env.PORT || 3000;
const VERSION_API = '/api/v1'

app.use(bodyParser.json());

// Routes
import mealRoutes from './routes/meal.routes';
import menuRoutes from './routes/menu.routes';
import orderRoutes from './routes/order.routes';

app.get('/', (req, res) => res.send('API is working'));

// handler
app.use(`${VERSION_API}/meals`, mealRoutes);
app.use(`${VERSION_API}/menus`, menuRoutes);
app.use(`${VERSION_API}/orders`, orderRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});

export default app;

