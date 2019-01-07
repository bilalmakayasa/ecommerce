'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Env = use('Env')
const axios = require('axios')
const base64 = require('base-64')
const Payment = use('App/Models/Payment')
const Shipment = use('App/Models/Shipping')
const moment = require('moment')

/**
 * Resourceful controller for interacting with invoices
 */
class InvoiceController {
  /**
   * Show a list of all invoices.
   * GET invoices
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {

  }

  /**
   * Render a form to be used for creating a new invoice.
   * GET invoices/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */

  /**
   * Display a single invoice.
   * GET invoices/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    const header = await `${Env.get('MIDTRANS_KEY')}:`
    const header64 = await base64.encode(header)
    let cart = await Payment.query().where('cart_id', params.id).firstOrFail()
    let shipment = await Shipment.query().where('cart_id',params.id).firstOrFail()
    const createdAt = cart.created_at
    const how = moment().diff(moment(createdAt), 'days')
    const stats = await cart.status
    console.log(shipment)

    try {
      const instance = await axios({
        method: 'get',
        url: `https://api.sandbox.midtrans.com/v2/${params.id}/status`,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${header64}`
        }
      })

      if (instance.data.status_code == 404) {
        if (stats === 'pending' || 'expired') {
          if (how >= 5) {
            cart.status = 'expired'
            await cart.save()
            response.status(201).json({ message: 'your cart has been expired' })
          }
          else {
            response.status(202).json({ message: "please finish your payment" })
          }
        }
      } else if (instance.data.transaction_status === 'capture') {
        await cart.save()
        response.status(200).json({
          message:'thank you, see you again',
          payment:cart,
          shipping:shipment
        })
      }

    } catch (e) {
      console.log(e)
      response.json({ error: e })
    }
  }

  /**
   * Render a form to update an existing invoice.
   * GET invoices/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {
  }


  /**
   * Delete a invoice with id.
   * DELETE invoices/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
  }
}

module.exports = InvoiceController
