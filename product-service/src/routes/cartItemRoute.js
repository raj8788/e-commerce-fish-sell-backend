import express from 'express';
import {addItemToCart} from '../controller/cartItemController.js';
import {authMiddleware} from '../middleware/authMiddleware.js'


const router = express.Router();


/**
 * @swagger
 * tags:
 *   name: Cart Items
 *   description: User cart item endpoints
 */


/**
 * @swagger
 * /addToCart:
 *   post:
 *     summary: Create a new cart item
 *     tags: ["Cart Items"]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - product_id
 *               - quantity
 *             properties:
 *               product_id:
 *                 type: string
 *                 description: ID of the product to add to the cart
 *                 example: "788"
 *               quantity:
 *                 type: number
 *                 description: Quantity of the product to add
 *                 example: 7 
 *     responses:
 *       201:
 *         description: Product created successfully
 *       400:
 *         description: Bad request, missing required fields
 *       500:
 *         description: Internal server error
 */
router.post('/addToCart', authMiddleware, addItemToCart);



export default router;