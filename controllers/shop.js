import Product from '../models/product.js'
import Cart from '../models/cart.js'

export const getProducts = (req, res, next) => {
  const products = Product.fetchAll()
  res.render('shop/product-list', {
    prods: products,
    pageTitle: 'All Products',
    path: '/products'
  })
}

export const getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  const product = Product.findById(prodId)
    res.render('shop/product-detail', {
      product: product,
      pageTitle: product.title,
      path: '/products'
    })
}

export const getIndex = (req, res, next) => {
  const products = Product.fetchAll()
  res.render('shop/index', {
    prods: products,
    pageTitle: 'Shop',
    path: '/'
  })
}

export const getCart = (req, res, next) => {
  const cart = Cart.getCart()
  const products = Product.fetchAll()
  const cartProducts = []
  for (let product of products) {
    const cartProductData = cart.products.find( prod => prod.id === product.id )
    if (cartProductData) {
      cartProducts.push({ productData: product, qty: cartProductData.qty })
    }
  }
  res.render('shop/cart', {
    path: '/cart',
    pageTitle: 'Your Cart',
    products: cartProducts
  })
}

export const postCart = (req, res, next) => {
  const prodId = req.body.productId
  const product = Product.findById(prodId)
  Cart.addProduct(prodId, product.price)
  res.redirect('/cart')
}

export const postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId
  const product = Product.findById(prodId)
  Cart.deleteProduct(prodId, product.price)
  res.redirect('/cart')
}

export const getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  })
}

export const getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  })
}