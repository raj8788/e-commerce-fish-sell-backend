
import { Product } from "../models/productsModel.js";


export const createProduct = async (req, res) => {
    const {category_id, product_name, description, price, stock_quantity, product_img } = req.body;

    console.log(req.body);

    try {
        const newProduct = new Product({
            category_id,
            product_name,
            description,
            price,
            stock_quantity,
            product_img
        });

        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}


export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { category_id, product_name, description, price, stock_quantity, product_img, is_active } = req.body;

    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { category_id, product_name, description, price, stock_quantity, product_img, is_active },
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}


export const deleteProductById = async (req, res) => {

    const { id } = req.params;

    try {
        const deletedProduct = await Product.findById(id);
        deletedProduct.is_active = false;
        await deletedProduct.save();
        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }else{
            return res.status(200).json({ message: "Product deleted successfully" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}