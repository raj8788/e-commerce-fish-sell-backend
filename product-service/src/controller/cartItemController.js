
import CartItem from '../models/cartItemModel.js';

export const addItemToCart = async(req, res) => {

    const { product_id, quantity } = req.body;
    try {
        const newCartItem = await CartItem.create({
            product_id,
            quantity
        });
        res.status(201).json(newCartItem);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }

}