import express from "express";
import {createCategory} from '../controller/categories-controller.js'


const categoryRoute = express.Router();


/**
 * @swagger
 * tags:
 *   name: Category
 *   description: User Category endpoints
 */


/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Create a new category
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - category_id
 *               - category_name
 *             properties:
 *               category_id:
 *                 type: integer
 *                 example: 1
 *               category_name:
 *                 type: string
 *                 example: "Electronics"
 *     responses:
 *       201:
 *         description: Category created successfully
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */
categoryRoute.post("/categories", createCategory);


export default categoryRoute;