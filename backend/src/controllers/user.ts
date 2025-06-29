import { Request, Response } from "express";
import db from "../models";

const User = db.user;

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, role } = req.body;
    const { organisationId } = req.params;

    if (!name || !email || !role || !organisationId) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      res.status(400).json({ message: "User already exist" });
      return;
    }

    const newUser = await User.create({
      name,
      email,
      role,
      organisation_id: parseInt(organisationId, 10),
    });

    res.status(201).json({
      message: "User created successfully",
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        organisation_id: newUser.organisation_id,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export const getUsersByOrganisation = async (req: Request, res: Response) => {
  try {
    const { organisationId } = req.params;

    if (!organisationId) {
      res.status(400).json({ message: "Organisation ID is required" });
      return;
    }

    const users = await User.findAll({
      where: { organisation_id: parseInt(organisationId, 10) },
      attributes: ["id", "name", "email", "role"],
    });

    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      res.status(400).json({ message: "User ID is required" });
      return;
    }

    const user = await User.findByPk(parseInt(userId, 10), {
      attributes: ["id", "name", "email", "role", "organisation_id"],
    });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}