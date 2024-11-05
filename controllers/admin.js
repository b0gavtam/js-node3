import Product from '../models/product.js'

export const getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product'
  })
}

export const postAddProduct = (req, res, next) => {
  const title = req.body.title
  const imageUrl = req.body.imageUrl || "https://cdn.pixabay.com/photo/2016/03/31/20/51/book-1296045_960_720.png"
  const price = req.body.price
  const description = req.body.description
  const product = new Product(null, title, imageUrl, description, price)
  product.save()
  res.redirect('/')
}

export const getProducts = (req, res, next) => {
  const products = Product.fetchAll()
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    })
}

export const postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId
  Product.deleteById(prodId)
  res.redirect('/admin/products')
}