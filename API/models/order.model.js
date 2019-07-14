import Sequelize from 'sequelize';
import db from '../utils/database';
import User from './users.model';

const Order = db.define('orders', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  order: {
    type: Sequelize.JSON,
    allowNull: false
  },
  total: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  billing_address: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  delivery_status: {
    type: Sequelize.INTEGER,
    default: 0
  },
  userId: {
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


Order.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });


export default Order;