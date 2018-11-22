'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class AddressList extends Model {
    user (){
        return this.belongsTo('App/Models/User')
    }
    user_profiles(){
        return this.hasOne('App/Models/UserProfile')
    }
}

module.exports = AddressList
