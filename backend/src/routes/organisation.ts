import { Router } from "express";
import { createOrganisation, getOrganisations, getOrganisationById } from "../controllers/organisation";

const router = Router();

router.post("/:userId", createOrganisation);
router.get("/", getOrganisations);
router.get("/:organisationId", getOrganisationById);

export default router;