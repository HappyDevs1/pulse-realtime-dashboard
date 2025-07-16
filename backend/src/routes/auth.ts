import { Router, Request, Response } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import db from "../models";

dotenv.config();

const router = Router();

const User = db.user;

const jwtSecret = process.env.JWT_SECRET as string;

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: "/login" }),
  async (req: Request, res: Response) => {
    const userData = req.user as any;

    if (!userData) {
      res.status(401).json({ message: "Google authentication failed" });
      return;
    }

    try {
      const googleEmail = userData.emails?.[0]?.value;
      const googleName = userData.displayName;

      let user = await User.findOne({
        where: { email: googleEmail },
      });

      if (!user) {
        user = await User.create({
          name: googleName,
          email: googleEmail,
          role: "master",
        });
      }

      const token = jwt.sign(
        {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        jwtSecret,
        {
          expiresIn: "1d",
        }
      );
      
      res.redirect(`http://localhost:3000/auth-success?token=${token}`);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
});

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).send("Logout failed");
    }
    res.redirect("/");
  });
});

export default router;

// const token = jwt.sign(
//       {
//         id: user.id,
//         name: user.displayName,
//         email: user.emails?.[0]?.value,
//       },
//       process.env.JWT_SECRET as string,
//       {
//         expiresIn: "1d",
//       }
//     );

//     res.redirect(`http://localhost:3000/auth-success?token=${token}`)
//   }
