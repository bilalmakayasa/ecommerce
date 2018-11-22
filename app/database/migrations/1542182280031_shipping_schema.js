'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ShippingSchema extends Schema {
  up () {
    this.create('shippings', (table) => {
      table.increments()
      table.string('type').notNullable()
      table.integer('quantity').notNullable()
      table.string('etd')
      table.integer('price')
      table.string('name')
      table.string('province')
      table.string('city')
      table.string('street')
      table.integer('phone_number')
      table.timestamps()
    })
  }

  down () {
    this.drop('shippings')
  }
}

module.exports = ShippingSchema
