export default module.exports = (sequelize: any, Sequelize: any) => {
  const User = sequelize.define("user", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.TEXT
    },
    role: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    }
  });

  return User;
};
