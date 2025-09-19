import express from 'express';
import { createProduct, getAllProducts, updateProduct, deleteProductById, getProductById, getProductsByCategory } from '../controller/productController.js';
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
 * /create:
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
 *               rating:
 *                 type: number
 *                 format: float
 *                 description: Product rating
 *                 example: 4.5   
 *              
 *     responses:
 *       201:
 *         description: Product created successfully
 *       400:
 *         description: Bad request, missing required fields
 *       500:
 *         description: Internal server error
 */
router.post('/create', authMiddleware, createProduct);


/**
 * @swagger
 * /get-all:
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
 *           type: string
 *           description: Price as a decimal string
 *           example: "19.99"          
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
 *         rating:
 *           type: number
 *           format: float
 *           description: Product rating
 *           example: 4.5   
 */
router.get('/get-all', getAllProducts);



/**
 * @swagger
 * /getBy-id:
 *   get:
 *     summary: Retrieve a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The product ID
 *     responses:
 *       200:
 *         description: Product details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductResponse'
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */
router.get('/getBy-id', authMiddleware, getProductById);


/**
 * @swagger
 * /update/{id}:
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
 *                 type: string
 *                 description: Price as a decimal string
 *                 example: "29.99"
 *               stock_quantity:
 *                 type: integer
 *                 description: Number of items available in stock
 *                 example: 100
 *               rating:
 *                 type: number
 *                 format: float
 *                 description: Product rating
 *                 example: 4.5   
 *               product_img:
 *                 type: string
 *                 format: uri
 *                 description: URL of the product image
 *                 example: "https://example.com/images/salmon.png"
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
router.put('/update/:id', authMiddleware, updateProduct);



/**
 * @swagger
 * /delete/{id}:
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
router.delete('/delete/:id', authMiddleware, deleteProductById)



// find category wise products

/**
 * @swagger
 * /categoriesById:
 *   get:
 *     summary: Retrieve a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: category_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The category ID
 *     responses:
 *       200:
 *         description: Product details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductResponse'
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */
router.get('/categoriesById', getProductsByCategory);

export default router;