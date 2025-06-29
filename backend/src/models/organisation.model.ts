import { Sequelize, DataTypes } from "sequelize";

export default (sequelize: Sequelize) => {
  const Organisation = sequelize.define("organisation", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING
    },
  }, {
    freezeTableName: true, // Prevents Sequelize from pluralizing the table name
  });

  return Organisation;
};
