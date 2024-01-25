const { Router } = require('express')
const Products = require('../models/product.model')
const products  = require('../services/products.service')
const Carts = require('../services/carts.service')


const router = Router()

/*
Se debe entregar
✓ Con base en nuestra implementación actual de productos, modificar el método
GET / para que cumpla con los siguientes puntos:

○ Deberá poder recibir por query params un limit (opcional), una page
(opcional), un sort (opcional) y un query (opcional)
 ● -limit permitirá devolver sólo el número de elementos            // OK
    solicitados al momento de la petición, en caso de no recibir
    limit, éste será de 10.

 ● page permitirá devolver la página que queremos buscar,           //OK
    en caso de no recibir page, ésta será de 1

 ● query, el tipo de elemento que quiero buscar (es decir, qué
    filtro aplicar), en caso de no recibir query, realizar la
    búsqueda general

 ● sort: asc/desc, para realizar ordenamiento ascendente o          
    descendente por precio, en caso de no recibir sort, no
    realizar ningún ordenamiento


✓ El método GET deberá devolver un objeto con el siguiente
formato:
{
    status:success/error
    payload: Resultado de los productos solicitados
    totalPages: Total de páginas
    prevPage: Página anterior
    nextPage: Página siguiente
    page: Página actual
    hasPrevPage: Indicador para saber si la página previa existe
    hasNextPage: Indicador para saber si la página siguiente existe.
    prevLink: Link directo a la página previa (null si hasPrevPage=false)
    nextLink: Link directo a la página siguiente (null si hasNextPage=false)
}

✓ Se deberá poder buscar productos por categoría o
por disponibilidad, y se deberá poder realizar un
ordenamiento de estos productos de manera
ascendente o descendente por precio.

*/

/*
router.get('/', async (req, res) => {
    const products = await Products.products ()
    res.json({payload: products})
})
*/




//   const paginatedResults = await Product.paginate({}, { page, limit: pageSize });

//   // Here, you can apply the `lean()` function to the `docs` array
//   const products = paginatedResults.docs.map(doc => doc.toObject());


//Probar res.json({status:'sucess', payload})
//if (error===400) {
// res.status(400).json({status:'error', error:'algo pasó'})
//      return}

router.get('/', async (req, res) => {
	const { page = 1 } = req.query
    const { limit, query, sort, cat } = req.query
	//const { docs, hasPrevPage, hasNextPage, nextPage, prevPage } = await Products.paginate ({}, { page, limit: 10 })
    //const productsAll = await products.productsFind(page, limit, sort)
    const carts = await Carts.carts ()
    let cartId 
    if (carts[0]) {
        const  { _id } = carts[0]
     cartId = _id.toString()
    } 
    
    const { docs, hasPrevPage, hasNextPage, nextPage, prevPage, filter } = await products.productsFind(page, limit, sort, cat)
	const productsDocs = []

    docs.forEach(doc => {
        const { _id, title, description, code, price , stock, category } = doc
        const prodId = _id.toString()
        productsDocs.push({ prodId, title, description, code, price , stock, category  })
        
    });



    res.render('products', {
    productsDocs, 
    hasPrevPage, 
    hasNextPage, 
    nextPage, 
    prevPage,
    page,
    cartId,
    cat
	})
})

// router.get('/', async (req, res) => {
// 	const { page = 1 } = req.query
//     const { limit, query, sort } = req.query
// 	//const { docs, hasPrevPage, hasNextPage, nextPage, prevPage } = await Products.paginate ({}, { page, limit: 10 })
//     const productsAll = await products.productsFind(limit)
// 	//const products = docs

// 	//res.render('students', {

//     res.json({payload: 
// 	productsAll, 
//     // hasPrevPage, 
//     // hasNextPage, 
//     // nextPage, 
//     // prevPage,
//     // page,
// 	})
// })

router.get('/:id', async (req, res) => {
    try {
        const {id} = req.params
    
        const product = await products.productId(id)
        res.json({payload: product})
        
    } catch (error) {
        console.log(error)
    }
})

router.post('/', async (req, res) => {
    try {
        const { title, description, code, price , stock, category } = req.body
        
        const newUserInfo = {
            title,
            description,
            code,
            price,
            stock,
            category
        }

        const newUser = await products.addProduct(newUserInfo)

        res.json({payload: newUser})

    } catch (error) {
        console.log({error})
        
    }
    
    
})

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const  body  = req.body

        await User.updateOne({ _id: id, status: true}, body)

        res.json({payload: 'User updated'})
        
    } catch (error) {
        console.log({error})        
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params

        const deletedProd = await Products.deleteProduct(id)
        res.json({payload: deletedProd})
        
    } catch (error) {
        console.log({error})        
    }
})


module.exports = router