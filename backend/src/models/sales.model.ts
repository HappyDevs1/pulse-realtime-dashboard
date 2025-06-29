import { Sequelize, DataType, DataTypes } from "sequelize";

export default (sequelize: Sequelize) => {
  const Sales = sequelize.define("sales_data", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    total: {
      type: DataTypes.INTEGER,
    },
    cogs: {
      type: DataTypes.INTEGER
    },
    gross_income: {
      type: DataTypes.INTEGER
    },
    date: {
      type: DataTypes.STRING
    },
    time: {
      type: DataTypes.STRING
    },
    product_line: {
      type: DataTypes.STRING
    },
    payment: {
      type: DataTypes.STRING
    },
    branch: {
      type: DataTypes.STRING
    },
  });
  return Sales;
};
