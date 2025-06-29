import { Sequelize, Dialect } from "sequelize";
import dbConfig from "../config/db";
import UserModel from "./user.model";
import OrganisationModel from "./organisation.model";
import DatasetModel from "./dataset.model";
import dotenv from "dotenv";

dotenv.config();


const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});

const db: any = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = UserModel(sequelize);
db.organisation = OrganisationModel(sequelize);
db.dataset = DatasetModel(sequelize);

// Associations
db.organisation.hasMany(db.user, {
  foreignKey: "organisation_id",
  onDelete: "SET NULL",
  onUpdate: "CASCADE"
});
db.user.belongsTo(db.organisation, {
  foreignKey: "organisation_id",
  onDelete: "SET NULL",
  onUpdate: "CASCADE"
});

export default db;