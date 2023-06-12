import daoProducts from "../daos/FileSystem/daoProducts.js";

class ServiceProducts {
    async serviceAddProduct (product){
        try {
            const newProduct = await daoProducts.addProduct(product)
            return newProduct
        } catch (error) {
            throw error
        }
    }
    async serviceGetProducts (limit){
        try {
            const productos = await daoProducts.getProducts(limit)
            return productos
        } catch (error) {
            throw error
        }
    }
    async serviceGetProductById (id){
        try {
            const product = await daoProducts.getProductById(id)
            return product
        } catch (error) {
            throw error
        }
    }
    async serviceUpdateProduct (id, product){
        try {
            const response = await daoProducts.updateProduct(id, product)
            return response
        } catch (error) {
            throw error
        }
    }
    async serviceDeleteProduct (id){
        try {
            const response = await daoProducts.deleteProduct(id)
            return response
        } catch (error) {
            throw error
        }
    }
}
export const serviceProducts = new ServiceProducts()