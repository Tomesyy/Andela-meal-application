import Sequelize from 'sequelize';
import db from '../utils/database';

import Meal from './meal.model';
import Menu from './menu.model';
import Order from './order.model';

const Caterer = db.define('caterers', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    firstname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    isAdmin: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    createdAt: Sequelize.DATEONLY,
    updatedAt: Sequelize.DATEONLY
});

Caterer.hasMany(Order, { constraints: true, onDelete: 'CASCADE' });
Caterer.hasMany(Meal, { constraints: true, onDelete: 'CASCADE' });
Caterer.hasMany(Menu, { constraints: true, onDelete: 'CASCADE' });

export default Caterer