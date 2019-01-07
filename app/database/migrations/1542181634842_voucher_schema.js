'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class VoucherSchema extends Schema {
  up () {
    this.create('vouchers', (table) => {
      table.increments()
      table.string('name').notNullable()
      table.float('price_discount')
      table.integer('id_product')
      table.string('code')
      table.date('expired_time').notNullable()
      table.date('publishedAt')
      table.integer('admin_id')
      table.timestamps()

    })
  }

  down () {
    this.drop('vouchers')
  }
}

module.exports = VoucherSchema
