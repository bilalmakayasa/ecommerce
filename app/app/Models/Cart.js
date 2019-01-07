'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Cart extends Model {
    product(){
        return this.belongsTo('App/Models/Product')
    }
    user_id(){
        return this.belongsTo('App/Model/User')
    }
    cart_id(){
        return this.hasMany('App/Models/Shipping')
    }

    payment(){
        return this.hasMany('App/Models/Payment')
    }

    cart(){
        return this.hasMany('App/Models/Invoice')
    }
    
}

module.exports = Cart
