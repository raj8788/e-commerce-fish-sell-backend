import Category from "../models/category-model.js";

export const createCategory = async (req , res ) => {

    const {category_id,category_name} = req.body;

    try {
        const newCategory = await Category.create({
            category_id,
            category_name
        })
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(500).json({message:"Server error",error:error.message});
    }

}