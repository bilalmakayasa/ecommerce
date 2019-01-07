'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Shipping extends Model {
    cart_id(){
        return this.belongsTo('App/Models/Cart')
    }

    shipment(){
        return this.hasMany('App/Models/Invoice')
    }
}

module.exports = Shipping
