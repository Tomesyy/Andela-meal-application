import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import Meal from './models/meal.model';
import User from './models/users.model';
import Caterer from './models/caterers.model';
import Menu from './models/menu.model';
import Order from './models/order.model';
import UserRoutes from './routes/user.routes';
import CatererRoutes from './routes/caterer.routes';


const app = express();
const PORT = process.env.PORT || 8000;
const VERSION_API = '/api/v1'

app.use(bodyParser.json());

import db from './utils/database';

// Routes
import mealRoutes from './routes/meal.routes';
import menuRoutes from './routes/menu.routes';
import orderRoutes from './routes/order.routes';

app.get('/', (req, res) => res.send('API is working'));

// handler
app.use(`${VERSION_API}/auth`, UserRoutes);
app.use(`${VERSION_API}/auth/caterer`, CatererRoutes);
app.use(`${VERSION_API}/meals`, mealRoutes);
app.use(`${VERSION_API}/menus`, menuRoutes);
app.use(`${VERSION_API}/orders`, orderRoutes);


User.hasMany(Order, { constraints: true, onDelete: 'CASCADE' });
Order.belongsTo(Caterer, { constraints: true, onDelete: 'CASCADE' });
Meal.belongsTo(Caterer, { constraints: true, onDelete: 'CASCADE' });
Menu.belongsTo(Caterer, { constraints: true, onDelete: 'CASCADE' });


db.sync()
  .then(() => {
    app.listen(PORT);
  })
  .catch(error => console.log(error));
  

export default app;

