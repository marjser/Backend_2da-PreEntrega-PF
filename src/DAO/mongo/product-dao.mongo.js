const  Products  = require('../../models/product.model')


//const carts = require('.../models/user.model.js').carts


class ProductsDAO {
    async allProd (page, limit, sort, cat) {
        try {
            if(cat) {
                const products = await Products.paginate ({category: cat}, { page, limit: 5, })
                products.filter = cat
                return products
            }

            if (sort) {
                if(sort == "asc") 
                {//sort = 1
                const products = await Products.paginate ({}, { page, limit: 5, sort: { price: -1 }})
                return products
                
                } else if (sort == "desc")
                 {//sort = -1
                const products = await Products.paginate ({}, { page, limit: 5, sort: { price: 1 }})
                return products
                }
                 // else {sort = null}
            }
            //if(!page) {return page = 3}
 
            if(limit) {
                const products = await Products.paginate ({}, { page, limit: limit, /*sort: { price: 0 }*/ })
                return products
            }
            
            const products = await Products.paginate ({}, { page, limit: 5,  /*sort: { price: 0 }*/ }) // ACORDARSE DE MODIFICAR LIMIT : 10
            //const products = await Products.paginate ({}, { page, limit: 10 })

            //const products = await Products.find({ status: true})


            return products            
        } catch (error) {
            throw error
        }
    }

    async prodId (id) {
        try {
            const prodId = await Products.findOne({ _id: id , status: true })
            return prodId
        } catch (error) {
            throw error
        }
    }


    async addProd (newProdInfo) {
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

    async deleteProd (id) {
        try {
            await Products.updateOne({ _id: id}, {status: false})
            return 'Product deleted'
        } catch (error) {
            throw error
        }
    }

}





// const allProd = async () => {
    // try {
    //     const products = await Products.find({ status: true})

    // } catch (error) {
    //     throw error
    // }
// }



module.exports = ProductsDAO


