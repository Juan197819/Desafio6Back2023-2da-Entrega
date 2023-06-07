import {Router} from 'express'
import productManager from '../daos/Dao/daoFiles.js'
import {io} from '../../app.js'

export const routerViews = Router()

routerViews.get('/',async (req,res)=>{
    const productsList = await productManager.getProducts()
    res.status(200).render('home',{productsList})
}) 
routerViews.get('/realtimeproducts',async (req,res)=>{
    console.log('hollaaaaa')
    
    io.on('connection', async socket=>{
        console.log('Usuario conectado')
        socket.emit('messageServer', await productManager.getProducts())

        socket.on('messageClient', async product=>{
            await productManager.addProduct(product)
            io.emit('messageServer', await productManager.getProducts())
        })
    })
    res.status(200).render('realtimeproducts')
}) 