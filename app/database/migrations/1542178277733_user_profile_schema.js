'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserProfileSchema extends Schema {
  up () {
    this.create('user_profiles', (table) => {
      table.increments()
      table.string('name').notNullable().unique()
      table.string('email').notNullable()
      table.string('phone_number').notNullable().unique()
      table.integer('user_id').unique()
      
      table.timestamps()
    })
  }

  down () {
    this.drop('user_profiles')
  }
}

module.exports = UserProfileSchema
