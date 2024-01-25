const express = require('express')
const mongoConnect = require('./db')
const app = express()
const router = require('./router')
const handlebars = require('express-handlebars')


app.engine('handlebars', handlebars.engine())
app.set('views', process.cwd() + '/src/views') //=> configuramos donde estará la carpeta con las vistas. Este archivo lo tenemos que crear tambien.
app.set('view engine', 'handlebars') //=> Esto es para definir el motor de plantillas por defecto


const port = 3000

app.use(express.json()) 
app.use(express.static(process.cwd() + '/src/public')) 

mongoConnect()

router(app)


app.listen(port, ()=> {
    console.log(`Server is running at port ${port}`)
})



/*

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