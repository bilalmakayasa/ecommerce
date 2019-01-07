'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Product = use('App/Models/Product')
const Cart = use('App/Models/Cart')
const Database = use('Database')
/**
 * Resourceful controller for interacting with carts
 */
class CartController {
  /**
   * Show a list of all carts.
   * GET carts
   *
   * @param {object} ctx 
   * @param {Request} ctx.request
   * @param {Response} ctx.responsef
   * @param {View} ctx.view
   */
  async index({ request, response, view, auth }) {
    const User = await auth.user
    if(User){
      const carts = await Database.select('*').from('carts').where({ user_id: User.id })
      console.log(User)
      response.status(202).json({message:"okee", data: carts})
    }

    // const carts = await Database.select('*').from('carts')
    // response.json({ cart: carts })
  }

  /**
   * Render a form to be used for creating a new cart.
   * GET carts/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {
  }

  /**
   * Create/save a new cart.
   * POST carts
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, auth }) {
    const { id, quantity, user_id } = await request.body
    
    try {
      const user = await auth.getUser()
      const product = await Database.from('products').where({ id: id })

      const cart = await Cart.create({

            id_product: product[0].id,
            user_id: user.id,
            price: product[0].price,
            quantity
        
      })
      response.status(200).json({ product: product[0], user_id: user_id, quantity: quantity })
    } catch (e) {
      console.log(e)
      response.status(401).json({ error: e })

    }
  }

  /**
   * Display a single cart.
   * GET carts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
   async show({ params, request, response, view, auth }) {

  }

  /**
   * Render a form to update an existing cart.
   * GET carts/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {
  }

  /**
   * Update cart details.
   * PUT or PATCH carts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const { quantity } = await request.body
    try {
      const cart = await Cart.query().where('id', params.id).firstOrFail()
      cart.quantity = quantity
      await cart.save()
      console.log(cart)
   
    } catch (e) {
      console.log(e)
      response.json({ error: e })
    }
  }

  /**
   * Delete a cart with id.
   * DELETE carts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    try {
      const cart = await Cart.query().where('id', params.id).firstOrFail()
      await cart.delete()
      console.log('berhasil')
    } catch (e) {
      response.json({ error: e })
    }
  }
}

module.exports = CartController
