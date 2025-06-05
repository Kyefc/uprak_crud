import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import db from "./config/Database.js";
import SequelizeStore from "connect-session-sequelize";
import UserRoute from "./routes/UserRoute.js";
import ProductRoute from "./routes/ProductRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import cookieParser from "cookie-parser";
import TransactionRoute from "./routes/TransactionRoute.js";

dotenv.config();

const app = express();

// Session store menggunakan Sequelize
const SequelizeSessionStore = SequelizeStore(session.Store);
const store = new SequelizeSessionStore({
  db: db,
});

(async () => {
  await db.sync();
})();

app.use(cookieParser());

app.use(
session({
secret: process.env.SESS_SECRET || "defaultsecret",
resave: false,
saveUninitialized: false,
store: store,
cookie: {
secure: false,
httpOnly: true,
maxAge: 1000 * 60 * 60,
},
})
);

// Konfigurasi CORS agar dapat menerima cookie dari frontend
app.use(
cors({
origin: "http://localhost:3000",
credentials: true,
})
);

app.use(express.json());

// Routes (harus dipasang setelah session & json parser)
app.use(UserRoute);
app.use(ProductRoute);
app.use(AuthRoute);
app.use(TransactionRoute);

import Product from "./models/ProductModel.js";
import User from "./models/UserModel.js";

User.hasMany(Product);
Product.belongsTo(User, { foreignKey: "userId" });

// Jalankan server
const PORT = process.env.APP_PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server up and running on port ${PORT}...`);
});
