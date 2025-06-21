import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import session from 'express-session';
import passport from 'passport';
import authRoutes from './routes/auth';
import './config/passport'; // Ensure passport configuration is loaded


dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 8000;


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