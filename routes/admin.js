import path from 'path'
import express from 'express'
import __dirname from '../util/rootpath.js'
import fs from 'fs'

const router = express.Router()
const productsFilePath = path.join(__dirname, 'public', 'data', 'products.json')

// Helper function to save product to file
const saveProduct = (product) => {
  fs.readFile(productsFilePath, (err, data) => {
    let products = []
    if (!err) {
      products = JSON.parse(data); // Parse existing products
    }
    products.push(product); // Add the new product
    fs.writeFile(productsFilePath, JSON.stringify(products, null, 2), (err) => {
      if (err) {
        console.log(err)
      }
    })
  })
}

// /admin/add-product => GET
router.get('/add-product', (req, res, next) => {
  res.render('add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product'
  })
})

// /admin/add-product => POST
router.post('/add-product', (req, res, next) => {
  const newProduct = { title: req.body.title }
  saveProduct(newProduct)
  res.redirect('/')
})

export default router
