import { Request, Response } from "express";
import db from "../models";

const Organisation = db.organisation;
const User = db.user;

export const createOrganisation = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const { userId } = req.params;

    if (!name) {
      res.status(400).json({ message: "Organisation name is required" });
    }

    const newOrganisation = await Organisation.create({ name });

    const findUser = await User.findByPk(userId);

    if (!findUser) {
      res.status(404).json({ message: "User not found" });
    }

    // Associate the new organisation with the user
    await findUser.update({ organisation_id: newOrganisation.id });

    res.status(201).json({
      message: "Organisation created successfully",
      organisation: {
        id: newOrganisation.id,
        name: newOrganisation.name,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getOrganisations = async (req: Request, res: Response) => {
  try {
    const organisations = await Organisation.findAll({
      attributes: ["id", "name"],
    });

    res.status(200).json(organisations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getOrganisationById = async (req: Request, res: Response) => {
  try {
    const { organisationId } = req.params;

    if (!organisationId) {
      res.status(400).json({ message: "Organisation ID is required" });
    }

    const organisation = await Organisation.findByPk(organisationId, {
      attributes: ["id", "name"],
    });

    if (!organisation) {
      res.status(404).json({ message: "Organisation not found" });
    }

    res.status(200).json(organisation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}