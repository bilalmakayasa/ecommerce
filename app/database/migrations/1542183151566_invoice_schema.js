'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class InvoiceSchema extends Schema {
  up () {
    this.create('invoices', (table) => {
      table.increments()
      table.integer('cart_id')
      table.integer('price_total')
      table.string('voucher')
      table.string('payment')
      table.string('shipping')
      table.integer('tax')
      table.timestamps()
    })
  }

  down () {
    this.drop('invoices')
  }
}

module.exports = InvoiceSchema
