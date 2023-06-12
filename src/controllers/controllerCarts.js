import { serviceCarts } from "../services/serviceCarts.js"

class ControllerCarts {

    async controllerAddCart (req, res, next){
        try {
            const response = await serviceCarts.serviceAddCart()
            res.status(200).json(response)           
        } catch (error) {
            next(error)
        }
    }
    async controllerGetCart (req, res, next){
        try {
            const {cid} = req.params
            const products = await serviceCarts.serviceGetCart(cid)
            if (!products.length) throw new Error('Todavia no hay productos en tu carrito')
            res.status(200).json(products)
        } catch (error) {
            next(error)
        }
    }
    async controllerAddProductToCart (req, res, next){
        try {
            const {cid, pid} = req.params
            const cart = await serviceCarts.serviceAddProductToCart(cid,pid)
            res.status(200).json(cart)
        } catch (error) {
            next(error)
        }
    }
}

export const controllerCarts = new ControllerCarts()