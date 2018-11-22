'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class UserProfile extends Model {
    user(){
        return this.belongsTo('App/Models/User')
    }
    address(){
        return this.belongsToMany('App/Models/AddressList')
    }
}

module.exports = UserProfile
