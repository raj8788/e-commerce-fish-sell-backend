import express from 'express';
import { createProduct, getAllProducts, updateProduct, deleteProductById } from '../controller/productController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';


const router = express.Router();



/**
 * @swagger
 * tags:
 *   name: Products
 *   description: User Products endpoints
 */



/**
 * @swagger
 * /prod/create:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - category_id
 *               - product_name
 *               - price
 *               - stock_quantity
 *             properties:
 *               category_id:
 *                 type: string
 *                 description: Category the product belongs to
 *                 example: "c67890"
 *               product_name:
 *                 type: string
 *                 description: Name of the product
 *                 example: "Sample Product"
 *               description:
 *                 type: string
 *                 description: Detailed product description
 *                 example: "This is a sample product description."
 *               price:
 *                 type: number
 *                 format: float
 *                 description: Price of the product
 *                 example: 19.99
 *               stock_quantity:
 *                 type: integer
 *                 description: Number of items available in stock
 *                 example: 150
 *               product_img:
 *                 type: string
 *                 format: uri
 *                 description: URL of the product image
 *                 example: "https://example.com/images/mouse.png"
 *     responses:
 *       201:
 *         description: Product created successfully
 *       400:
 *         description: Bad request, missing required fields
 *       500:
 *         description: Internal server error
 */
router.post('/prod/create', authMiddleware, createProduct);


/**
 * @swagger
 * /prod/getAll:
 *   get:
 *     summary: Retrieve all categories
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Product details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ProductResponse'
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 *
 * components:
 *   schemas:
 *     ProductResponse:
 *       type: object
 *       properties:
 *         product_id:
 *           type: string
 *           description: Unique product identifier (string)
 *           example: "68ac2af24ef3e6560c0d38ef"
 *         category_id:
 *           type: integer
 *           description: Category ID
 *           example: 1
 *         product_name:
 *           type: string
 *           description: Name of the product
 *           example: "fish"
 *         description:
 *           type: string
 *           description: Product description
 *           example: "This is a sample product description."
 *         price:
 *           type: object
 *           properties:
 *             $numberDecimal:
 *               type: string
 *               description: Price as a decimal string
 *               example: "19.99"
 *         stock_quantity:
 *           type: integer
 *           description: Number of items available in stock
 *           example: 150
 *         product_img:
 *           type: string
 *           format: uri
 *           description: URL of the product image
 *           example: "https://example.com/images/mouse.png"
 *         is_active:
 *           type: boolean
 *           description: Product active status
 *           example: true
 *         _id:
 *           type: string
 *           description: MongoDB document ID
 *           example: "68ac2af24ef3e6560c0d38f0"
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the product was created
 *           example: "2025-08-25T09:20:50.119Z"
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the product was last updated
 *           example: "2025-08-25T09:20:50.119Z"
 */
router.get('/prod/getAll', authMiddleware, getAllProducts);


/**
 * @swagger
 * /prod/update/{id}:
 *   put:
 *     summary: Update an existing product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               category_id:
 *                 type: integer
 *                 description: Category ID
 *                 example: 2
 *               product_name:
 *                 type: string
 *                 description: Name of the product
 *                 example: "salmon"
 *               description:
 *                 type: string
 *                 description: Product description
 *                 example: "Updated product description."
 *               price:
 *                 type: object
 *                 properties:
 *                   $numberDecimal:
 *                     type: string
 *                     description: Price as a decimal string
 *                     example: "29.99"
 *               stock_quantity:
 *                 type: integer
 *                 description: Number of items available in stock
 *                 example: 100
 *               product_img:
 *                 type: string
 *                 format: uri
 *                 description: URL of the product image
 *                 example: "https://example.com/images/salmon.png"
 *               is_active:
 *                 type: boolean
 *                 description: Product active status
 *                 example: true
 *     responses:
 *       200:
 *         description: Product updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductResponse'
 *       400:
 *         description: Invalid product ID or bad request
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */
router.put('/prod/update/:id', authMiddleware, updateProduct);



/**
 * @swagger
 * /prod/delete/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID to delete
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Product deleted successfully
 *       400:
 *         description: Invalid product ID
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */
router.delete('/prod/delete/:id', authMiddleware, deleteProductById)

export default router;