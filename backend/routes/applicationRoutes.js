import express from "express";
import {isAuthenticated} from "../middlewares/authentication.js";
import { applyJob, getApplicants, getAppliedJobs, updateStatus } from "../controllers/applicationController.js";
 
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Applications
 *   description: Job application operations
 */

/**
 * @swagger
 * /api/v1/application/apply/{id}:
 *   get:
 *     summary: Apply for a job
 *     tags: [Applications]
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
 *         description: Job applied successfully
 */

router.route("/apply/:id").get(isAuthenticated, applyJob);

/**
 * @swagger
 * /api/v1/application/get:
 *   get:
 *     summary: Get jobs applied by the current user
 *     tags: [Applications]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of applied jobs retrieved
 */

router.route("/get").get(isAuthenticated, getAppliedJobs);

/**
 * @swagger
 * /api/v1/application/{id}/applicants:
 *   get:
 *     summary: Get all applicants for a job
 *     tags: [Applications]
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
 *         description: List of applicants retrieved
 */

router.route("/:id/applicants").get(isAuthenticated, getApplicants);

/**
 * @swagger
 * /api/v1/application/status/{id}/update:
 *   post:
 *     summary: Update application status
 *     tags: [Applications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, accepted, rejected]
 *     responses:
 *       200:
 *         description: Application status updated
 */


router.route("/status/:id/update").post(isAuthenticated, updateStatus);
 

export default router;
