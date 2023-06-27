import {Router} from 'express'
import { controllerViews } from '../controllers/controllerViews.js'

export const routerViews = Router()

routerViews.get('/', controllerViews.controllerHome) 
routerViews.get('/realtimeproducts', controllerViews.controllerRealtimeproducts) 
routerViews.get('/products', controllerViews.controllerProducts) 
routerViews.get('/carts/:cid', controllerViews.controllerViewCart) 