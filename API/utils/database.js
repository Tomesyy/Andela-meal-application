import Sequelize from 'sequelize';

const db = new Sequelize('andelamealapplicationdatabase', 'postgres', 'bluwaters2001', {
  logging: false,
  host: 'localhost',
  dialect: 'postgres',
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
});

export default db;
