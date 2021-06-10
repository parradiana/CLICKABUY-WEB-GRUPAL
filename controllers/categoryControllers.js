const Category = require('../models/CategoryModel')

const categoryControllers = {
    getAllCategories: async (req, res) => {
        var response;
        var error;        
        try {
            const categories = await Category.find()
            response = categories
        } catch(err) {
            console.log(err)
            error = err
        }        
        res.json({
            success: !error ? true : false,
            response: !error && response,
            error
        })
    },    
    getSingleCategory: async (req, res) => {
        const id = req.params.id     
        var response;
        var err;    
        try {
            const category = await Category.findOne({_id: id})
            response = category
        } catch(error) {
            err = 'An unexpected error has occurred with our servers'
        }    
        res.json({
            success: !err ? true : false,
            response: !err && response,
            err: err
        })
    },
    addCategory: async (req,res) => {
        // const { nameCategory } = req.body 
        var response;
        var err;
        try {
            const categoryToSave = new Category(req.body)
            await categoryToSave.save()
            response = categoryToSave
        } catch(error) {
            err = 'An unexpected error has occurred with our servers'
        }
        res.json({
            success: !err ? true : false,
            response: !err && response,
            err: err
        })
    },
    deleteCategory: async (req, res) => {
        const id = req.params.id
        var response;
        var err;
        try {
            response = await Category.findOneAndDelete({_id: id})
        } catch(error) {
            err = 'An unexpected error has occurred with our servers'
        }
        res.json({
            success: !err ? true : false,
            response: !err && response,
            err: err
        })
    },
    modifyCategory: async (req,res) => {
        const id = req.params.id
        var response;
        var err;
        try {
            response = await Category.findOneAndUpdate({_id: id}, { ...req.body }, { new: true })
        } catch(error) {
            err = 'An unexpected error has occurred with our servers'
        }
        res.json({
            success: !err ? true : false,
            response: !err && response,
            err: err
        })
    }
}

module.exports = categoryControllers