import Sequelize from 'sequelize';
import db from '../utils/database';

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
  catererId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  createdAt: Sequelize.DATEONLY,
  updatedAt: Sequelize.DATEONLY
});


export default Order;