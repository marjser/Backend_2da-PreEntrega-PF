const Carts = require('../../models/cart.model')
const Products = require('../../models/product.model')



//const carts = require('.../models/user.model.js').carts


class CartsDAO {
    async allCarts () {
        try {
            const carts = await Carts.find({ status: true})
            return carts            
        } catch (error) {
            throw error
        }
    }

    async cartId (id) {
        try {
            const cartId = await Carts.findOne({ _id: id , status: true }).populate('products.product')
            return cartId
        } catch (error) {
            throw error
        }
    }


    async addCart () {
        try {
            const cart = {products: []}
            const newCart = await Carts.create(cart)

            return newCart
        } catch (error) {
            throw error
        }
        
    }

    async addProdToCart (cid, pid) {
        try {
            if (!Products.findById(pid)) {
                return res.status(400).send({status:"error", error:"Incorrect Id Product"})
            } else {
                const cart = await Carts.findById(cid)
                const { _id } = await Products.findById(pid)
                
                const products = cart.products       
                console.log(products)         

                // if (cart.products.findIndex(product => product._id = _id)) {
                //     let prodIndex = cart.products.findIndex(product => product._id = _id)
                //     console.log(prodIndex)
                //     return prodIndex
                // }

                cart.products.push({product: pid, quantity: 1})

                const prodAdd = await Carts.updateOne({ _id: cart._id}, cart ) 


                return 'product added to Cart'
            }
        } catch (error) {
            throw error
        }
    }

    /*
    async addProd () {
        try {
            const { code } = newProdInfo

            if(!await Products.findOne({code: code})) {
                const newProd = await Products.create(newProdInfo)
                return newProd
            } else {
                return 'Invalid code'
            }
        } catch (error) {
            throw error
        }
        
    }
    */

    async deleteProd (id) {
        try {
            await Products.updateOne({ _id: id}, {status: false})
            return 'Product deleted'
        } catch (error) {
            throw error
        }
    }

}



module.exports = CartsDAO