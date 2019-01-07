'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Env = use('Env')
const axios = require('axios')
const base64 = require('base-64')
const Payment = use('App/Models/Payment')
const Shipping = use('App/Models/Shipping')
const Database = use('Database')
/**
 * Resourceful controller for interacting with payments
 */
class PaymentController {
  /**
   * Show a list of all payments.
   * GET payments
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    try {
      const shipping = await Database.from('shippings')
      response.json({data:shipping})
    } catch (e) {
      response.json({error:e})
    }
  }

  /**
   * Render a form to be used for creating a new payment.
   * GET payments/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new payment.
   * POST payments
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth}) {
    const { total_price, order_id } = await request.body
    
    
    try {
      const header = await `${Env.get('MIDTRANS_KEY')}:`
      const header64 = await base64.encode(header)
      console.log(header64)
      const instance = await axios({
        method:'post',
        url:`https://app.sandbox.midtrans.com/snap/v1/transactions`,
        headers:{
          'Content-Type': 'application/json',
          'Authorization':  `Basic ${header64}`
        },
        data:{
          "transaction_details": {
            "order_id": order_id,
            "gross_amount": total_price
          }, 
          "credit_card": {
            "secure": true
          }
        }
      })
      const payment = await Payment.create({
        total_price,
        cart_id:order_id,
        status:'pending'
      })
      // console.log(instance)
      response.status(200).json({
        message: "welcome to mobile legend",
        result: instance.data,
        data: payment
      })
    } catch (e) {
      console.log(e)
      response.json({error:e})
    }

  }

  /**
   * Display a single payment.
   * GET payments/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    try {
      const shipping = await Database.from('shippings').where({id:params.id})
      response.status(200).json({
        message:"okay giiiii",
        data:shipping
      })
    } catch (e) {
      console.log(e)
      response.status(484).json({error:e})
    }
  }

  /**
   * Render a form to update an existing payment.
   * GET payments/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update payment details.
   * PUT or PATCH payments/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a payment with id.
   * DELETE payments/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {

  }
}

module.exports = PaymentController
