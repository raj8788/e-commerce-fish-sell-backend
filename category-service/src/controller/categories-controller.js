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


export const getAllCategories = async (req, res) =>{
    try {
        const categories = await Category.findAll();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({message:"Server error",error:error.message});
    }
}


export const updateCategoryById = async (req , res) =>{
    const { category_id } = req.params;
    const { category_name } = req.body;

    try {
        const category = await Category.findOne({ where: { category_id } });
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        category.category_name = category_name || category.category_name;
        await category.save();

        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }   
}


export const deleteCategoryById = async (req ,res)=>{
    const { category_id } = req.params;

    try {
        const category = await Category.findOne({ where: { category_id } });
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        await category.destroy();
        res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}