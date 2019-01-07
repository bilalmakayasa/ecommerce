'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Voucher extends Model {
    id_product(){
        return this.belongsTo('App/Models/Product')
    }
}

module.exports = Voucher
