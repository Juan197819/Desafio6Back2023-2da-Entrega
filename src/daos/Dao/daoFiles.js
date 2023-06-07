import fs from 'fs'
import productsList from '../db/products.js'  

class ProductManager {
    constructor(pathProducts,pathCarts){
        this.pathProducts=pathProducts,
        this.pathCarts=pathCarts
    }
    async addProduct(product){
        try {
                const arrayProd = await this.getProducts()
                let newId
                if (arrayProd.length) {
                    newId = arrayProd[arrayProd.length -1].id+1
                } else {
                    newId= 1
                }
                arrayProd.push({...product,id:newId})
                    await fs.promises.writeFile(this.pathProducts, JSON.stringify(arrayProd))
                return arrayProd
        } catch (error) {
            console.log(error)
        }
    }
    async getProducts(limit){
        try {
            if (fs.existsSync(this.pathProducts)) {
                const file = await fs.promises.readFile(this.pathProducts, 'utf-8')
                const fileParse = JSON.parse(file)
                limit&&fileParse.splice(limit)
                return fileParse 
            }else{
                //para crear productos.json la primera vez desde el array de products.js
                for (let i = 0; i < productsList.length; i++) {
                    productsList[i].id =i +1
                }    
                await fs.promises.writeFile(this.pathProducts, JSON.stringify(productsList))
                limit&&productsList.splice(limit)
                return productsList
            }
        } catch (error) {
            console.log(error)   
        }
    }
    async getProductById(id){
        try {
            const products = await this.getProducts()
            const producto = products.find(product=>product.id==id)
            if(!producto) throw new Error(`Product ID ${id} Not found`)
            return producto
        } catch (error) {
            throw (error.message)   
        }
    }
    async updateProduct(id, newProduct){
        try {
            const prod= await this.getProductById(id)
            const arrayProd = await this.getProducts()
            const updateArray = arrayProd.map( p => {
                if (p.id==id){
                    p= {...p, ...newProduct}
                    return p
                }else return p
            })
            await fs.promises.writeFile(this.pathProducts, JSON.stringify(updateArray))
            return (`Producto id ${id} modificado con exito`);
        } catch (error) {
            console.log(error.message)   
        }
    }
    async deleteProduct(id){
        try {
            await this.getProductById(id)
            const arrayProduct = await this.getProducts()

            await fs.promises.writeFile(this.pathProducts, JSON.stringify( arrayProduct.filter(p=>p.id!=id)))
            return (`Producto id ${id} eliminado con exito`);
        } catch (error) {
            console.log(error)   
        }
    }
    async addCart(){
        try {
            const arrayCart = await this.getCarts()
            const newCart ={
                id: arrayCart.length + 1,
                products:[]
            }
            arrayCart.push(newCart)
            await fs.promises.writeFile(this.pathCarts, JSON.stringify(arrayCart))

            console.log(arrayCart)
            return newCart            
        } catch (error) {
            console.log(error)   
        }
    }
    async getCarts(id){
        try {
            if (fs.existsSync(this.pathCarts)) {
                const file = await fs.promises.readFile(this.pathCarts, 'utf-8')
                let fileParse = JSON.parse(file)
                if (id) fileParse = fileParse.filter(c=>c.id==id)
                return fileParse
            }else{
                return []
            }
        } catch (error) {
            console.log(error)   
        }
    }
    async updateCart(cid, pid){
        try {
            let carts = await this.getCarts()
            let indexCart =carts.findIndex(c=>c.id==cid)
            if(indexCart == -1) throw new Error ('Carrito inexistente' )

            let indexProd = carts[indexCart].products.findIndex(p=>p.id==pid)
            if (indexProd != -1) {
                carts[indexCart].products[indexProd].quantity+=1 
            } else {
                carts[indexCart].products.push({
                    id: Number(pid),
                    quantity:1
                })
            }
            await fs.promises.writeFile(this.pathCarts, JSON.stringify(carts))
            return carts
        } catch (error) {
            console.log(error)
            return error.message
        }
    }
}

const productManager = new ProductManager('./src/daos/db/productos.json', './src/daos/db/carritos.json')

export default productManager

