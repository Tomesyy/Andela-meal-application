import Sequelize from 'sequelize';
import db from '../utils/database';

const Meal = db.define('meals', { 
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    imageUrl: {
        type: Sequelize.STRING,
        allowNull: false
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    price: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    catererId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    createdAt: Sequelize.DATEONLY,
    updatedAt: Sequelize.DATEONLY

});

export default Meal;