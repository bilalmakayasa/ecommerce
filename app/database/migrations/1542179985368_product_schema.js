'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductSchema extends Schema {
  up () {
    this.create('products', (table) => {
      table.increments()
      table.string('name').notNullable().unique()
      table.string('type').notNullable()
      table.integer('price').notNullable()
      table.string('description')
      table.integer('stock')
      table.string('photo')
      table.date('publishedAt')
      table.integer('admin_id')
      table.timestamps()
    })
  }

  down () {
    this.drop('products')
  }
}

module.exports = ProductSchema
