import path from 'path'
import express from 'express'
import bodyParser from 'body-parser'
import __dirname from './util/rootpath.js'

const app = express()
const PORT = 3000

app.set('view engine', 'ejs')
app.set('views', 'views')

import adminRoutes from './routes/admin.js'
import shopRoutes from './routes/shop.js'

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/admin', adminRoutes)
app.use(shopRoutes)

app.use((req, res, next) => {
    res.status(404).render('404', {pageTitle: 'Page Not Found', path: ''})
})

app.listen(PORT, () => console.log(`server listens on port http://localhost:${PORT}`))
