import express from 'express';
import {register} from '../controller/auth-controller.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication endpoints
 */



/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - password
 *               - role
 *             properties:
 *               name:
 *                 type: string
 *                 description: User name
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User email (optional if phone provided)
 *               phone:
 *                 type: string
 *                 description: User phone number (optional if email provided)
 *               password:
 *                 type: string
 *                 format: password
 *                 description: User password
 *               role:
 *                 type: string
 *                 enum: [admin, user]
 *                 description: User role
 *             oneOf:
 *               - required: [email]
 *               - required: [phone]
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request, missing required fields
 *       500:
 *         description: Internal server error
 */
router.post('/auth/register',register);   


export default router;