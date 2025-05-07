import express from "express";
import { register, login, logout, updateProfile } from "../controllers/userController.js";
import  {isAuthenticated}  from "../middlewares/authentication.js";
import { singleupload } from "../middlewares/multer.js";

 
const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management and authentication
 */

/**
 * @swagger
 * /api/v1/users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               fullname:
 *                 type: string
 *               email:
 *                 type: string
 *               phoneNumber:
 *                 type: number
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [student, recruiter, admin]
 *               profilePhoto:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: User registered successfully
 */


router.route("/register").post( singleupload, register);

/**
 * @swagger
 * /api/v1/users/login:
 *   post:
 *     summary: Login as a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully
 */

router.route("/login").post(login);

/**
 * @swagger
 * /api/v1/users/logout:
 *   get:
 *     summary: Logout the user
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: User logged out successfully
 */

router.route("/logout").get(logout);

/**
 * @swagger
 * /api/v1/users/profile/update:
 *   post:
 *     summary: Update user profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               bio:
 *                 type: string
 *               skills:
 *                 type: array
 *                 items:
 *                   type: string
 *               resume:
 *                 type: string
 *                 format: binary
 *               profilePhoto:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Profile updated successfully
 */


router.route("/profile/update").post(isAuthenticated,singleupload,updateProfile);

export default router;