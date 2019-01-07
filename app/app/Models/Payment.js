'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Payment extends Model {
    payment(){
        return this.belongsTo('App/Models/Cart')
    }
    invoice(){
        return this.hasMany('App/Model/Invoice')
    }
}

module.exports = Payment
