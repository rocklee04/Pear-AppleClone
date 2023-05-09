const express = require("express")

const productRouter = express.Router()
const {ProductModel} = require("../model/Product.model")

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *          type: object
 *          required:
 *            - title
 *            - price
 *            - image
 *            - category
 *          properties:
 *            _id:
 *              type: string
 *              description: The unique identifier for the note
 *            title:
 *              type: string
 *              description: The title of the product
 *            price:
 *              type: number
 *              description: The price of the product
 *            image:
 *              type: image
 *              description: The image of the product
 *            category:
 *              type: string
 *              description: The category of the particular product
 */

/**
 * @swagger
 * tags:
 *  name: Products
 *  description: All the API routes to Products
 */
/**
 * @swagger
 * /products/add:
 *   post:
 *        summary: To Add a new Product.
 *        tags: [Products]
 *        responses:
 *            200:
 *                description: Product has been addeded successfully.
 *            400:
 *                description: Bad request. An error occurred while adding the product.
 */

productRouter.post("/add",async (req, res) => {
    try {
        const product = new ProductModel(req.body)
        await product.save()
        res.status(200).send({"msg": "Product has been added"})
    } catch(err) {
        res.status(400).send({"msg": err.message})
    }
})

/** 
* @swagger
* /products:
*   get:
*       summary: To get all the products.
*       tags: [Products]
*       responses:
*           200:
*               description: All the products.
*           400:
*               description: Bad request. An error occurred while getting the product.
*/
productRouter.get("/",async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skipIndex = (page-1) * limit;
        const sort = req.query.sortBy || '_id';
        const sortOrder = req.query.sortOrder || 'desc';


        const filter = {};
        if(req.query.category) {
            filter.category = req.query.category;
        }
        if(req.query.price) {
            filter.price = {$lte: req.query.price};
        }
        if(req.query.rating) {
            filter.price = { $gte: req.query.price };
        }
        if(req.query.q) {
            filter.title = { $regex: req.query.q, $options: 'i' };
        }

        const movies = await ProductModel.find(filter).sort({ [sort]: sortOrder }).skip(skipIndex).limit(limit);
        res.send(movies);
    } catch(err) {
        console.log(err);
    }

}) 

/** 
* @swagger
* /products/update/{productID}:
*   patch:
*         summary: To update the particular product.
*         tags: [Products]
*         responses:
*             200:
*                 description: Product has been updated successfully.
*             400:
*                 description: Bad request. An error occurred while updating the product.
*/
productRouter.patch("/update/:productID",async (req, res) => {
    const {productID} = req.params;
    const product = await ProductModel.findOne({_id: productID})
    try{
        if(req.body.userID !== product.userID) {
            res.status(200).send("You are not an authorized user to do this action");
        }else {
            await ProductModel.findByIdAndUpdate({_id: productID}, req.body);
            res.status(200).send({"msg": `the product with id:${productID} has been updated`});
        }
        
    } catch(err) {
        res.status(400).send({"msg": err.message})
    }
}) 

/** 
* @swagger
* /products/delete/{productID}:
*   delete:
*          summary: To delete the particular product.
*          tags: [Products]
*          responses:
*              200:
*                  description: Product has been deleted successfully.
*              400:
*                  description: Bad request. An error occurred while deleting the product.
*/
productRouter.delete("/delete/:productID",async (req, res) => {
    const {productID} = req.params;
    const product = await ProductModel.findOne({_id: productID})

    try{
        if(req.body.userID !== product.userID) {
            res.status(200).send("You are not an authorized user to do this action");
        }else {  
            await ProductModel.findByIdAndDelete({_id: productID});
            res.status(200).send({"msg": `the product with id:${productID} has been updated`});
        }
    } catch(err) {
        res.send(400).send({"msg": err.message})
    }
}) 

//export
module.exports = {
    productRouter
}