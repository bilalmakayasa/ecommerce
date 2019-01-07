'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Product = use('App/Models/Product')
const Env = use('Env')
const Helpers = use('Helpers')
const Database = use('Database')
/**
 * Resourceful controller for interacting with products
 */
class ProductController {
  /**
   * Show a list of all products.
   * GET products
   *
   * @param {object} ctx
   * @param {Request} ctx.requets
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view, auth }) {

    const products = await Database.select('*').from('products')
    response.json({ Product: products })
    response.status(200).json({
      message: "this is the list of the product",
      data: products
    })
 
  }


  /**
   * Render a form to be used for creating a new product.
   * GET products/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {
  }

  /**
   * Create/save a new product.
   * POST products
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, auth }) {
    const { name, type, price, description, stock, photo, publishedAt } = await request.body

    try {
      const user = await auth.getUser()
      if (user.email !== Env.get('ADMIN_EMAIL')) {
        response.json({ error: "you don't have authority to access this page" })

      } else {
        const product = await Product.create({
          name,
          type,
          price,
          description,
          stock,
          // admin_id:user.id,
          photo: `${Env.get('APP_URL')}/image/${photo}.png`,
          publishedAt
        })

        const image = request.file('image', {
          types: ['image'],
          size: '2mb'
        })

        if (image) {
          await image.move(('public/image'), {
            name: photo + '.png'
          })

          if (!image.moved()) {
            throw new Error('Not moved')
          }
        }

        response.status(200).json({
          message: "Product has been created"
        })
      }
    } catch (e) {
      response.status(401).json({ error: e.message })
    }
  }

  /**
   * Display a single product.
   * GET products/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view, user }) {
    try {
      const product = await Database.from('products').where({ id: params.id })
      response.status(200).json({ product: product[0] })
    } catch (e) {
      response.status(401).json({ error: e })
    }
  }

  /**
   * Render a form to update an existing product.
   * GET products/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {
  }

  /**
   * Update product details.
   * PUT or PATCH products/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const { name, type, price, description, stock, photo, publishedAt } = await request.body

    try {
      const user = await auth.getUser()
      if (user.email !== Env.get('ADMIN_EMAIL')) {
        response.json({ error: "you don't have authority to access this page" })

      } else {
        const product = Product.query().where('products', params.id).firstOrFail()
        const products = await new product ({
          name,
          type,
          price,
          description,
          stock,
          admin_id: user.id,
          photo: `${Env.get('APP_URL')}/image/${photo}.png`,
          publishedAt
        })
        await products.save()

        const image = request.file('image', {
          types: ['image'],
          size: '2mb'
        })

        if (image) {
          await image.move(('public/image'), {
            name: photo + '.png'
          })

          if (!image.moved()) {
            throw new Error('Not moved')
          }
        }

        response.status(200).json({
          message: "Product has been updated"
        })
      }
    } catch (e) {
      response.status(401).json({ error: e.message })
    }
  }

  /**
   * Delete a product with id.
   * DELETE products/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    try {
      const product = await Product.query().where('id', params.id).firstOrFail()
      await product.delete()
      console.log('berhasil')
    } catch (e) {
      console.log(e)
    }
  }
}

module.exports = ProductController
