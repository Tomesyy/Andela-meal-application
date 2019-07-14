import Sequelize from 'sequelize';
import db from '../utils/database';
import Meal from '../models/meal.model';

const OrderItem = db.define('orderItem', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  mealId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  quantity: {
      type: Sequelize.STRING,
      allowNull: false
  },
  userId: {
      type: Sequelize.INTEGER,
      allowNull: false
  },
  createdAt: Sequelize.DATEONLY,
  updatedAt: Sequelize.DATEONLY
});

OrderItem.belongsTo(Meal, { constraints: true, onDelete: 'CASCADE' });


export default OrderItem;