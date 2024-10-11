const Category = require('../models/categoryModel');

// Get all categories
exports.getCategories = async(req,res)=>{

    try {
        const Categories = await Category.find();

        if(!Categories){
            res.status(404).json({message:"No Categories Found"});
        }
        return res.status(200).json(Categories);
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

// Get category by id
exports.getCategoryById = async(req,res)=>{
    try {
        const categoryId = req.params.id;
        const category = await Category.findById(categoryId);

        if(!category){
            return res.status(404).json({message:"Category not Found"});
        }
        return res.status(200).json(category);
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
}


// Create category
exports.createCategory = async(req,res)=>{
    try {
        const {name} = req.body;
        const category = new Category({
            name
        });

        const newCategory = await category.save();
        return res.status(200).json(newCategory);
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
}

// Delete category
exports.deleteCategory = async(req,res)=>{
    try {
        const categoryId = req.params.id;
        await Category.findByIdAndDelete(categoryId);
        return res.status(200).json({message:"Category deleted succesfully"});
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
}