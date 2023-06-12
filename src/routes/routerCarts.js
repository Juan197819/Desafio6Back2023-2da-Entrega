import {Router} from 'express'
import {controllerCarts} from '../controllers/controllerCarts.js'

export const routerCarts = Router()

routerCarts.post('/',controllerCarts.controllerAddCart)
routerCarts.get('/:cid',controllerCarts.controllerGetCart)
routerCarts.post('/:cid/product/:pid',controllerCarts.controllerAddProductToCart)
