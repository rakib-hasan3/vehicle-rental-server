import { Request, Response, Router } from "express";
import { pool } from "../../config/db";
import { userControllers } from "./user.controller";
import auth from "../../middleware/auth";
import logger from "../../middleware/logger";

const router = Router();

router.post("/",auth("admin"),userControllers.createUser);

router.get("/",logger,auth("admin"),userControllers.getUser);

router.get("/:id",auth("admin","user"),userControllers.getSingleUser);

router.put("/:id",auth("admin","user"),userControllers.updateUser);

router.delete("/:id",auth("admin"),userControllers.deleteUser);

export const userRoute = router;
