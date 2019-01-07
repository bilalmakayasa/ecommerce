'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ShippingSchema extends Schema {
  up () {
    this.create('shippings', (table) => {
      table.increments()
      table.integer('quantity').notNullable()
      table.string('etd')
      table.integer('price')
      table.string('name')
      table.string('province')
      table.string('city')
      table.string('street')
      table.string('phone_number')
      table.string('cart_id')
      table.timestamps()
    })
  }

  down () {
    this.drop('shippings')
  }
}

module.exports = ShippingSchema
