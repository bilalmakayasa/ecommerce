'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Invoice extends Model {
    cart(){
        return this.belongsTo('App/Models/Cart')
    }

    shipment(){
        return this.belongsTo('App/Models/Shipping')
    }

    invoice(){
        return this.belongsTo('App/Models/Payment')
    }
}

module.exports = Invoice
