import '@babel/polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import UserRoutes from './routes/user.routes';
import CatererRoutes from './routes/caterer.routes';


const app = express();
const PORT = 3000;
const VERSION_API = '/api/v1';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

import db from './utils/database';

// Routes
import mealRoutes from './routes/meal.routes';
import menuRoutes from './routes/menu.routes';
import orderRoutes from './routes/order.routes';

app.get('/', (req, res) => res.send('API is working'));

// handler
app.use(`${VERSION_API}/auth/user`, UserRoutes);
app.use(`${VERSION_API}/auth/caterer`, CatererRoutes);
app.use(`${VERSION_API}/meals`, mealRoutes);
app.use(`${VERSION_API}/menus`, menuRoutes);
app.use(`${VERSION_API}/orders`, orderRoutes);



db.sync()
  .then(() => {
    app.listen(PORT);
    console.log(`Server is running on PORT ${PORT}`);
    console.log('Database connected!');
  })
  .catch(error => console.log(error));
  

export default app;

