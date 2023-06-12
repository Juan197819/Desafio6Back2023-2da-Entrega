import daoCart from "../daos/FileSystem/daoCarts.js";

class ServiceCarts {
    async serviceAddCart (){
        try {
            const newCart = await daoCart.addCart()
            return newCart
        } catch (error) {
            throw error
        }
    }
    async serviceGetCart (cid){
        try {
            const cart = await daoCart.getCarts(cid)
            console.log(cart)
            if (!cart.length) throw new Error('Carrito inexistente')
            return cart[0].products
        } catch (error) {
            throw error
        }
    }
    async serviceAddProductToCart (cid, pid){
        try {
            const cartUpdated = await daoCart.updateCart(cid,pid)
            return cartUpdated
        } catch (error) {
            throw error
        }
    }
}
export const serviceCarts = new ServiceCarts()