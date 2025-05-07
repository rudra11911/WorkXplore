import express from "express";
import {isAuthenticated} from "../middlewares/authentication.js";
import { getAdminJobs, getAllJobs, getJobById, postJob } from "../controllers/jobController.js";

const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Jobs
 *   description: Job posting and retrieval
 */

/**
 * @swagger
 * /api/v1/job/post:
 *   post:
 *     summary: Post a new job
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               requirements:
 *                 type: array
 *                 items:
 *                   type: string
 *               salary:
 *                 type: number
 *               experienceLevel:
 *                 type: number
 *               location:
 *                 type: string
 *               jobType:
 *                 type: string
 *               position:
 *                 type: number
 *               company:
 *                 type: string
 *               created_by:
 *                 type: string
 *     responses:
 *       201:
 *         description: Job created successfully
 */


router.route("/post").post(isAuthenticated, postJob);

/**
 * @swagger
 * /api/v1/job/get:
 *   get:
 *     summary: Get all jobs
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all jobs
 */

router.route("/get").get(isAuthenticated, getAllJobs);

/**
 * @swagger
 * /api/v1/job/getadminjobs:
 *   get:
 *     summary: Get jobs posted by an admin/recruiter
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of jobs for the admin
 */

router.route("/getadminjobs").get(isAuthenticated, getAdminJobs);

/**
 * @swagger
 * /api/v1/job/get/{id}:
 *   get:
 *     summary: Get job by ID
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Job details retrieved successfully
 */

router.route("/get/:id").get(isAuthenticated, getJobById);

export default router;
