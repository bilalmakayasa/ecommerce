'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class VoucherSchema extends Schema {
  up () {
    this.create('vouchers', (table) => {
      table.increments()
      table.string('name').notNullable()
      table.integer('price_discount').notNullable()
      table.integer('id_product')
      table.date('expired_time').notNullable()
      table.date('publishedAt').notNullable()
      table.integer('admin_id').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('vouchers')
  }
}

module.exports = VoucherSchema
