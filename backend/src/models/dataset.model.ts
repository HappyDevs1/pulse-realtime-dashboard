import { Sequelize, DataTypes } from "sequelize";

export default (sequelize: Sequelize) => {
  const Dataset = sequelize.define("dataset", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    organisation_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "organisation",
        key: "id"
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL"
    },
    s3_path: {
      type: DataTypes.STRING,
    },
  }, {
    freezeTableName: true, // Prevents Sequelize from pluralizing the table name
  });

  return Dataset;
};
