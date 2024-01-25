const ProductsDAO = require("../DAO/mongo/product-dao.mongo");


const Products = new ProductsDAO()

const productsFind = async (page, limit, sort, cat) => {
    try {

        

        //if(page != 1) {return page = 3}
        const products = await Products.allProd(page, limit, sort, cat)
        return products
    } catch (error) {
        throw error
    }

}

const productId = async (id) => {
    try {
        const prodId = await Products.prodId (id)
        return prodId
    } catch (error) {
        throw error
    }
}

const addProduct = async (newProdInfo) => {
    try {
        const newProd = await Products.addProd(newProdInfo)
        return newProd
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





module.exports = {productsFind, productId, addProduct, deleteProduct}