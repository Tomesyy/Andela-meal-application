import Sequelize from 'sequelize';
import db from '../utils/database';

import Caterer from './caterers.model';

const Menu = db.define('menus', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    meals: {
        type: Sequelize.JSON,
        allowNull: false
    },
    catererId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    createdAt: Sequelize.DATEONLY,
    updatedAt: Sequelize.DATEONLY
});

Menu.belongsTo(Caterer, { constraints: true, onDelete: 'CASCADE' });

export default Menu;