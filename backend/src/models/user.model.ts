import { Sequelize, DataTypes } from "sequelize";

export default (sequelize: Sequelize) => {
  const User = sequelize.define("user", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.TEXT
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
    role: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    freezeTableName: true, // Prevents Sequelize from pluralizing the table name
  });

  return User;
};
