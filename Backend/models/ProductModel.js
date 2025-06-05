import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Product = db.define("products", {
uuid: {
type: DataTypes.UUID,
defaultValue: DataTypes.UUIDV4,
allowNull: false,
},
name: {
type: DataTypes.STRING,
allowNull: false,
},
price: {
type: DataTypes.INTEGER,
allowNull: false,
},
userId: {
type: DataTypes.INTEGER,
allowNull: false,
},
}, {
freezeTableName: true,
});

export default Product;