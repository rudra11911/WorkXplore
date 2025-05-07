import express from "express";
import {isAuthenticated} from "../middlewares/authentication.js ";
import { getCompany, getCompanyById, registerCompany, updateCompany } from "../controllers/companyController.js";
import { singleupload } from "../middlewares/multer.js";


const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Companies
 *   description: Company registration and management
 */

/**
 * @swagger
 * /api/v1/company/register:
 *   post:
 *     summary: Register a new company
 *     tags: [Companies]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               website:
 *                 type: string
 *               location:
 *                 type: string
 *               logo:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Company registered successfully
 */


router.route("/register").post(isAuthenticated,registerCompany);

/**
 * @swagger
 * /api/v1/company/get:
 *   get:
 *     summary: Get the current user's company profile
 *     tags: [Companies]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Company profile retrieved successfully
 */

router.route("/get").get(isAuthenticated,getCompany);

/**
 * @swagger
 * /api/v1/company/get/{id}:
 *   get:
 *     summary: Get company details by ID
 *     tags: [Companies]
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
 *         description: Company details retrieved successfully
 */

router.route("/get/:id").get(isAuthenticated,getCompanyById);

/**
 * @swagger
 * /api/v1/company/update/{id}:
 *   put:
 *     summary: Update company profile
 *     tags: [Companies]
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
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               website:
 *                 type: string
 *               location:
 *                 type: string
 *               logo:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Company updated successfully
 */


router.route("/update/:id").put(isAuthenticated,singleupload, updateCompany);

export default router;
