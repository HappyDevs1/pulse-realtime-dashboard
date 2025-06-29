import { Router } from "express";
import { createUser, getUsersByOrganisation, getUserById } from "../controllers/user";

const router = Router();

router.post("/:organisationId", createUser);
router.get("/:organisationId", getUsersByOrganisation);
router.get("/user/:userId", getUserById);

export default router;