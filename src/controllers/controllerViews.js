import { serviceProducts } from "../services/serviceProducts.js"
import { serviceCarts } from "../services/serviceCarts.js";
import __dirname from "../../utils.js";
import {io} from '../../app.js'

 function dtoViews(response) {
    const prod=  response.payload.map(p=>{
        return {
            id:p._id,
            title:p.title,
            description:p.description,
            price:p.price,
            stock:p.stock, 
            category:p.category,
            thumbnail:p.thumbnail
        } 
    }) 
    return prod
}

class ControllerViews{
    async controllerHome(req, res, next){
        const {limit, page, sort, ...query} = req.query
        try {
            const response = await serviceProducts.serviceGetProducts(limit, page, sort, query)
            const products = dtoViews(response)
            res.status(200).render('home',{products})
        } catch (error) { 
            next(error)
        }
    }
    async controllerRealtimeproducts(req, res, next){
        const {limit, page, sort, ...query} = req.query
        try {            
            io.on('connection', async socket=>{
                console.log('Usuario conectado')
                const response = await serviceProducts.serviceGetProducts(limit, page, sort, query)
                socket.emit('messageServer', dtoViews(response))
                
                socket.on('messageClient', async product=>{
                    console.log('pro', product)
                    await serviceProducts.serviceAddProduct(product)
                    const response = await serviceProducts.serviceGetProducts(limit, page, sort, query)
                    io.emit('messageServer', dtoViews(response))
                })
            })
            res.status(200).render('realtimeproducts.handlebars')
        } catch (error) {
            next(error)
        }
    }
    async controllerProducts(req, res, next){
        const {limit, page, sort, ...query} = req.query
        console.log(req.url)
        try {
            const response = await serviceProducts.serviceGetProducts(limit, page, sort, query)
            const products = dtoViews(response)
            console.log(1,products)
            console.log(2,response)
            res.status(200).render('products',{products, ...response})
        } catch (error) { 
            next(error)
        }
    }
    async controllerViewCart(req, res, next){
        try {
            const {cid} = req.params
            const products = await serviceCarts.serviceGetProdToCart(cid)
            const newMap = products.map(p=>{

                return {
                    ...p.product._doc,quantity:p.quantity
                }
            })
            console.log(1,products)
            console.log(2,newMap)
            res.status(200).render('cart',{newMap})
        } catch (error) { 
            next(error)
        }
    }
}                
export const controllerViews = new ControllerViews()