import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import session from 'express-session';
import passport from 'passport';
import authRoutes from './routes/auth';
import './config/passport'; // Ensure passport configuration is loaded
import cors from 'cors';
import path from "path";
import uploadRoute from "./routes/upload";
import db from "./models";

dotenv.config();

db.sequelize.authenticate().then(() => {
  console.log("Connected to the database!");
}).catch((error: any) => {
  console.log("Cannot connect to the database! ", error)
  process.exit();
})

// Production method of connecting to db
// db.sequelize.sync();

// Development method of connecting to db which dorp all the existing tables before starting the db
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db");
}).error((error: any) => {
  console.error("Error syncing database: ", error)})

const app: Application = express();
const PORT = process.env.PORT || 8000;

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'default_secret',
    resave: false,
    saveUninitialized: false,
  }
));

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use("/upload", uploadRoute);

app.get('/profile', (req: Request, res: Response) => {
  interface GoogleUser {
    id?: string;
    displayName?: string;
    emails?: { value: string }[];
  }
  const user = req.user as GoogleUser;
  if (req.isAuthenticated()) {
    res.send(`Welcome, ${user?.displayName}`)
  } else {
    res.send('You are not authenticated');
  }
});

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Pulse Reatime Dashboard API')
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});