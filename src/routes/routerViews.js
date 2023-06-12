import {Router} from 'express'
import { controllerViews } from '../controllers/controllerViews.js'

export const routerViews = Router()

routerViews.get('/', controllerViews.controllerHome) 
routerViews.get('/realtimeproducts', controllerViews.cotrollerRealtimeproducts) 