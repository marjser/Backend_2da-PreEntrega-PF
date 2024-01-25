const { Router } = require('express')
const Carts = require('../services/carts.service')

/*
✓ Además, agregar al router de carts los
siguientes endpoints:
   
○ DELETE api/carts/:cid/products/:pid deberá eliminar del carrito el
  producto seleccionado.
   
○ PUT api/carts/:cid deberá actualizar el carrito con un arreglo de
  productos con el formato especificado arriba.

 ○ PUT api/carts/:cid/products/:pid deberá poder actualizar SÓLO la
   cantidad de ejemplares del producto por cualquier cantidad pasada
   desde req.body

 ○ DELETE api/carts/:cid deberá eliminar todos los productos del carrito

 ○ Esta vez, para el modelo de Carts, en su propiedad products, el id
   de cada producto generado dentro del array tiene que hacer
   referencia al modelo de Products. Modificar la ruta /:cid para que al
   traer todos los productos, los traiga completos mediante un
   “populate”. De esta manera almacenamos sólo el Id, pero al
   solicitarlo podemos desglosar los
   productos asociados.

       VISTAS

✓  Crear una vista en el router de views ‘/products’ para visualizar todos
    los productos con su respectiva paginación. Cada producto mostrado puede
    resolverse de dos formas:
 
    ○ Llevar a una nueva vista con el producto seleccionado con su descripción completa,
    detalles de precio, categoría, etc. Además de un botón para agregar al carrito.

    ○ Contar con el botón de “agregar al carrito” directamente, sin necesidad de abrir una
    página adicional con los detalles del producto.

✓  Además, agregar una vista en ‘/carts/:cid (cartId) para visualizar un carrito específico, donde se deberán
    listar SOLO los productos que pertenezcan a dicho carrito.

 */

const router = Router()

router.get('/', async (req, res) => {
    const carts = await Carts.carts ()
    res.json({payload: carts})
})


router.get('/:id', async (req, res) => {
    try {
        const {id} = req.params
    
        const { _id, products} = await Carts.cartFindId(id)
        //const products = cart.products
        console.log(products)
        const productsDocs = []

        products.forEach(prod => {
            const  data  = prod
            const { product } = data
            const { _id, title, description, code, price , stock, category } = product
            //const prodId = _id.toString()
            productsDocs.push({ title, description, code, price , stock, category  })
            
        });
        
        console.log(productsDocs)
        //res.json({payload: cart}) 
        res.render('carts', {productsDocs})
       
        
    } catch (error) {
        console.log(error)
    }
})

router.post('/', async (req, res) => {
    try {


        const newCart = await Carts.addCart()

        res.json({payload: newCart})

    } catch (error) {
        console.log({error})
        
    }
    
    
})

router.post('/:cid/product/:pid', async (req, res) => {
    const { cid, pid } = req.params
    try {
        const productAdded = await Carts.addProdToCart(cid, pid)
        res.json({payload: productAdded})
    } catch (error) {
        console.log(error)    
    }
})


router.patch('/:cid/product/:pid', async (req, res) => {
    const { cid, pid } = req.params
    try {
        const productAdded = await Carts.addProdToCart(cid, pid)
        res.json({payload: productAdded})
    } catch (error) {
        console.log(error)    
    }
})


/*
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
*/


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