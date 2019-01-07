'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Shipping = use('App/Models/Shipping')
const axios = require('axios')
const Env = use('Env')
const uid = require('uid')
/**
 * Resourceful controller for interacting with shippings
 */
class ShippingController {
  /**
   * Show a list of all shippings.
   * GET shippings
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view, auth }) {

    try {
      const instance = await axios({
        method: 'get',
        url: `${Env.get('RAJAONGKIR_URL')}/province`,
        headers: {
          "key": `${Env.get('RAJAONGKIR_API')}`
        }
      })

      response.status(200).json({
        data: instance.data.rajaongkir.results
      })
    } catch (e) {
      console.log(e)
      response.status(401).json({ error: e })
    }
  }

  /**
   * Render a form to be used for creating a new shipping.
   * GET shippings/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {
  }

  /**
   * Create/save a new shipping.
   * POST shippings
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, auth }) {

    try {
      const origin = await Env.get('RAJAONGKIR_BANDUNG')
      const { quantity, name, province, city, street, phone_number, destination, courier } = await request.body
      const Courier = courier.toLowerCase()
      const User = await auth.user
      let cart_id = null
      if (!User) {
        cart_id = await uid(5)
      } else if (User) {
        const userId = await User.id
        cart_id = await `ORDER-${userId}`
      }
      const post = await axios({
        method: 'post',
        url: `${Env.get('RAJAONGKIR_URL')}/cost`,
        headers: {
          "key": `${Env.get('RAJAONGKIR_API')}`
        },
        data: {
          origin,
          destination,
          weight: quantity * 1000,
          courier: Courier,

        }
      })
      const shipping = await Shipping.create({
        quantity,
        price: post.data.rajaongkir.results[0].costs[0].cost[0].value,
        name,
        province,
        city,
        street,
        phone_number,
        etd: post.data.rajaongkir.results[0].costs[0].cost[0].etd,
        cart_id: cart_id
      })
      response.status(200).json({
        message: "your shipment request has been saved",
        data: shipping
      })
    } catch (e) {
      console.log(e)
      response.json({ error: e })
    }
  }

  /**
   * Display a single shipping.
   * GET shippings/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    try {
      const instance = await axios({
        method: 'get',
        url: `${Env.get('RAJAONGKIR_URL')}/city?province=${params.id}`,
        headers: {
          "key": `${Env.get('RAJAONGKIR_API')}`
        },
      })
      response.status(200).json({ city: instance.data.rajaongkir.results })
    } catch (e) {
      response.status(404).json({ error: e })
    }
  }

  /**
   * Render a form to update an existing shipping.
   * GET shippings/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {
  }

  /**
   * Update shipping details.
   * PUT or PATCH shippings/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
  }

  /**
   * Delete a shipping with id.
   * DELETE shippings/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    const user = await Shipping.query().where('id', params.id).firstOrFail()
    user.delete()
  }
}

module.exports = ShippingController
