import path from 'path'
import express from 'express'
import __dirname from '../util/rootpath.js'
import fs from 'fs'

const router = express.Router()
const productsFilePath = path.join(__dirname, 'public', 'data', 'products.json')

// Helper function to get products from file
const getProducts = (cb) => {
  fs.readFile(productsFilePath, (err, data) => {
    if (err) {
      cb([])
    } else {
      cb(JSON.parse(data))
    }
  })
}

router.get('/', (req, res, next) => {
  getProducts((products) => {
    res.render('shop', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    })
  })
})

export default router
