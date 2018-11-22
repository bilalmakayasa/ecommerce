'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddressListSchema extends Schema {
  up () {
    this.create('address_lists', (table) => {
      table.increments()
      table.integer('user_id').notNullable()
      table.string('province').notNullable()
      table.string('city').notNullable()
      table.string('street').notNullable().unique()
      table.timestamps()
    })
  }

  down () {
    this.drop('address_lists')
  }
}

module.exports = AddressListSchema
