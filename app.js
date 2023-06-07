import express from 'express'
import productManager from './src/daos/Dao/daoFiles.js'
import handlebars from 'express-handlebars'
import __dirname from "./src/utils/utils.js";
import { routerProducts } from "./src/routes/routerProducts.js";
import { routerCarts } from "./src/routes/routerCarts.js";
import { routerViews } from "./src/routes/routerViews.js";
import { Server } from "socket.io";

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname +'/public'))

app.use('/api/products', routerProducts)
app.use('/api/carts', routerCarts)
app.use('/', routerViews)

app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')
app.engine('handlebars', handlebars.engine())

const PORT  = 8080
const server = app.listen(PORT,()=>{
    console.log('Escuchando en puerto ' + server.address().port)
}).on('error',err=>console.log('Fallo el servidor',err))

export const io = new Server(server)


