import express from 'express';
import { createAdmin, createUser, deleteUser, getAdminJobs, getAllUsers, getAppliedJobs } from '../controllers/adminController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin-related operations
 */

/**
 * @swagger
 * /api/v1/admin/get/{studentId}:
 *   get:
 *     summary: Get jobs applied by a specific student
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: studentId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Applied jobs retrieved
 */

// Get all students and recruiters
router.route("/get/:studentId").get( getAppliedJobs);

/**
 * @swagger
 * /api/v1/admin/getjobs/{recruiterId}:
 *   get:
 *     summary: Get jobs posted by a specific recruiter
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: recruiterId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Jobs retrieved
 */

router.route("/getjobs/:recruiterId").get( getAdminJobs);

/**
 * @swagger
 * /api/v1/admin/users:
 *   get:
 *     summary: Get all users (students and recruiters)
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: Users retrieved
 */

router.route("/users").get( getAllUsers);

/**
 * @swagger
 * /api/v1/admin/users:
 *   post:
 *     summary: Create a new user
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
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
 *     responses:
 *       201:
 *         description: User created
 */


router.route("/users").post( createUser);

/**
 * @swagger
 * /api/v1/admin/users/delete/{id}:
 *   get:
 *     summary: Delete a user by ID
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted
 */


router.route("/users/delete/:id").get( deleteUser);

/**
 * @swagger
 * /api/v1/admin/create:
 *   post:
 *     summary: Create an admin user
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
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
 *     responses:
 *       201:
 *         description: Admin user created
 */


router.route("/create").post( createAdmin);

export default router;