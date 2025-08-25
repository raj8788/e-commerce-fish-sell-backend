import express from "express";
import {createCategory, getAllCategories, updateCategoryById, deleteCategoryById} from '../controller/categories-controller.js'
import { authMiddleware } from "../middleware/authMiddleware.js";


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
categoryRoute.post("/categories",authMiddleware, createCategory);




/**
 * @swagger
 * /categories/getAll:
 *   get:
 *     summary: Retrieve all categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: List of categories retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   category_id:
 *                     type: integer
 *                     example: 1
 *                   category_name:
 *                     type: string
 *                     example: "Electronics"
 *       500:
 *         description: Server error
 */

categoryRoute.get("/categories/getAll", authMiddleware, getAllCategories);



/**
 * @swagger
 * /categories/{id}:
 *   put:
 *     summary: Update a category by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The category ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               category_id:
 *                 type: integer
 *                 example: 1
 *               category_name:
 *                 type: string
 *                 example: "Updated Electronics"
 *     responses:
 *       200:
 *         description: Category updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 category_id:
 *                   type: integer
 *                   example: 1
 *                 category_name:
 *                   type: string
 *                   example: "Updated Electronics"
 *       400:
 *         description: Validation error
 *       404:
 *         description: Category not found
 *       500:
 *         description: Server error
 */
categoryRoute.put("/categories/:category_id", authMiddleware, updateCategoryById);   



/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     summary: Delete a category by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The category ID
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Category deleted successfully"
 *       404:
 *         description: Category not found
 *       500:
 *         description: Server error
 */

categoryRoute.delete("/categories/:category_id", authMiddleware, deleteCategoryById);

export default categoryRoute;