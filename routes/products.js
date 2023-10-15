const { Router } = require('express');

const router = Router();
const Product = require('../models/product')

router.use((req, res, next) => {
    if (req.session.user) next()
    else res.send(401)
})

router.get('', async(req, res) => {
    res.cookie('visted', true, {
        maxAge: 10000
    })
    try {
        const products = await Product.find({});
        res.status(200).json(products)
    } catch (err) {
        console.log(err.message)
        res.status(500).json({message: err.message})
    }
})

router.get('/:productId', async(req, res) => {
    if (typeof req.params.productId !== 'string')
    {res.status(400).json({message: "productId has to be a number"})}
    try {
        const product = await Product.findById(req.params.productId)
        res.status(200).json(product)
        console.log('Cookies: ', req.cookies)
    } catch (err) {
        console.log(err.message)
        res.status(500).json({message: err.message})
    }
})

router.post('', async(req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product)
    } catch (err) {
        console.log(err.message)
        res.status(500).json({message: err.message})
    }
    // console.log(req.body)
    // res.send(req.body)
    // return
})

router.put('/:productId', async(req, res) => {
    try {
        const {productId} = req.params
        const product = await Product.findByIdAndUpdate(productId, req.body)
        if (!product) {
            return res.status(404).json({message: "Cannot find product with id " + productId})
        }
        const updateProduct = await Product.findById(productId)
        res.status(200).json(updateProduct)
    } catch(err) {
        console.log(err.message)
        res.status(500).json({message: err.message})
    }
})

router.delete('/:productId', async(req, res) => {
    try {
        const {productId} = req.params
        const product = await Product.findByIdAndDelete(productId, req.body)
        if (!product) {
            return res.status(404).json({message: "Cannot find product with id " + productId})
        }
        res.status(200).json(product)
    } catch(err) {
        console.log(err.message)
        res.status(500).json({message: err.message})
    }
})

module.exports = router