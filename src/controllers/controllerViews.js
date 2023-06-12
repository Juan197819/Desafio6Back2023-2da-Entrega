import { serviceProducts } from "../services/serviceProducts.js"
import __dirname from "../../utils.js";

import {io} from '../../app.js'

class ControllerViews{

    async controllerHome(req, res, next){
        try {
            const productsList = await serviceProducts.serviceGetProducts()
            res.status(200).render('home',{productsList})
        } catch (error) {
            next(error)
        }
    }
    async cotrollerRealtimeproducts(req, res, next){
        try {
            console.log('hollaaaaa')
            
            io.on('connection', async socket=>{
                console.log('Usuario conectado')
                socket.emit('messageServer', await serviceProducts.serviceGetProducts())
                
                socket.on('messageClient', async product=>{
                    await serviceProducts.serviceAddProduct(product)
                    io.emit('messageServer', await serviceProducts.serviceGetProducts())
                })
            })
            res.status(200).render('realtimeproducts.handlebars')
        } catch (error) {
            next(error)
        }
    }
}                
export const controllerViews = new ControllerViews()