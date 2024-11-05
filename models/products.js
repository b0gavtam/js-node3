import fs from 'fs'
import path from 'path'

import __dirname from '../util/rootpath.js'

const prodsPath = path.join(__dirname, 'data', 'products.json')

const getProductsFileContent = () => {
  let content = []
  try {
    content = JSON.parse(fs.readFileSync(prodsPath, 'utf8'))
  } catch(err) {
    console.error(`File reading error: ${err}`)
  }
  return content
}

const setProductsFileContent = (content) => {
  try {
    fs.writeFileSync(prodsPath, JSON.stringify(content))
  } catch(err) {
    console.error(`File writing error: ${err}`)
    return false
  }
  return true
}

class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id
    this.title = title
    this.imageUrl = imageUrl
    this.description = description
    this.price = price
  }

  save() {
    const products = getProductsFileContent()
    if (this.id) {
      const existingProductIndex = products.findIndex(prod => prod.id === this.id)
      products[existingProductIndex] = this
      setProductsFileContent(products)
    } else {
      this.id = Math.random().toString()
      products.push(this)
      setProductsFileContent(products)
    }
  }

  static deleteById(id) {
    const products = getProductsFileContent()
    const product = products.find(prod => prod.id === id)
    const updatedProducts = products.filter(prod => prod.id !== id)
    const isDeleted = setProductsFileContent(updatedProducts)
    if (isDeleted) {
      Cart.deleteProduct(id, product.price)
    }
  }

  static fetchAll() {
    const products = getProductsFileContent()
    return products
  }

  static findById(id) {
    const products = getProductsFileContent()
    const product = products.find(prod => prod.id === id)
    return product
  }
}

export default Product