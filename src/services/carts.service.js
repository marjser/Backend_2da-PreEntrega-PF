const CartsDAO = require("../DAO/mongo/cart-dao.mongo");



const Carts = new CartsDAO()

const carts = async () => {
    try {
        const carts = await Carts.allCarts()
        return carts
    } catch (error) {
        throw error
    }

}

const cartFindId = async (id) => {
    try {
        const cartId = await Carts.cartId(id)
        return cartId
    } catch (error) {
        throw error
    }
}



const addCart = async () => {
    try {
        const newCart = await Carts.addCart()
        return newCart
    } catch (error) {
        throw error
    }
}

const addProdToCart = async (cid, pid) => {
    try {
        const newProdInCart = await Carts.addProdToCart(cid, pid)
        return newProdInCart
    } catch (error) {
        throw error
    }
}

const deleteProduct = async (id) => {
    try {
        const deletedProd = await Products.deleteProd(id)
        return deletedProd
    } catch (error) {
        throw error
    }
}





module.exports = {carts, cartFindId, addCart, addProdToCart, deleteProduct}