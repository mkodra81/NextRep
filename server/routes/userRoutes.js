import { Router } from "express";
import { getUsers, getUserById, updateUser, deleteUser } from "../controllers/userController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = Router();

router.use(authenticateToken); // Protect all routes with authentication middleware

router.get("/", getUsers); 
router.get("/:id", getUserById); 
router.put("/:id", updateUser); 
router.delete("/:id", deleteUser); 
// router.get("/xp/:id", getUserXp)
// router.get("/streak/:id", getUserStreak)

export default router;

