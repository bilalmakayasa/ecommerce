'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Product extends Model {
    user(){
        return this.belongsTo('App/Models/User')
    }
    product(){
        return this.hasMany('App/Models/Cart')
    }
    id_product(){
        return this.hasMany('App/Models/Voucher')
    }
}

module.exports = Product
