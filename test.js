// import productsList from './products.js'  
// import productManager from './db.js'

// const test = async (test)=>{
//     console.log(await test);
// }

// //**AGREGAR PRODUCTOS
// await productManager.addProduct(productsList[0])
// await productManager.addProduct(productsList[2])
// await productManager.addProduct(productsList[1])

// // OBTENER TODOS LOS PRODUCTOS

// await test(productManager.getProducts())

// //OBTENER PRODUCTO POR ID (PRODUCTO EXISTENTE)
//  await test(productManager.getProductById(3))

// //ACTUALIZAR PRODUCTO POR ID

//  await test(productManager.updateProduct(4, productsList[2]))

// //ELIMINAR PRODUCTO POR ID
//  await test(productManager.deleteProduct(1))
let y ={
    "title": "Calculadora",
    "description": "Calculadora Cientifica marca Maxwell con 417 funciones y menu de funciones amigable",
    "status": true,
    "stock": 8,
    "category": "libreria",
    "code": "CAL015",
    "thumbnail": [
      "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png"
    ],
    "price": 234.56,
    "id": 2
  }
console.log(y)
let uy =  {
    "title": "mortadela6  2 modificada",
    "code": "ESC010 modificado",
    "thumbnail": [
      "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png"
    ],
    "price": 123.4500000000000001
  } 
y= {...y, ...uy}
console.log(y)