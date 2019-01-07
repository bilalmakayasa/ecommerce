'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Voucher = use('App/Models/Voucher')
const Env = use('Env')
const Database = use('Database')
/**
 * Resourceful controller for interacting with vouchers
 */
class VoucherController {
  /**
   * Show a list of all vouchers.
   * GET vouchers
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    const vouchers = await Database.select('*').from('vouchers')
    response.status(200).json({
      message: "this is the voucher that still valid",
      data: vouchers
    })
  }

  /**
   * Render a form to be used for creating a new voucher.
   * GET vouchers/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {
  }

  /**
   * Create/save a new voucher.
   * POST vouchers
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, auth }) {
    const { name, price_discount, id_product, code, expired_time, publishedAt, photo } = await request.body
    try {
      const user = await auth.getUser()
      if (user.email !== Env.get('ADMIN_EMAIL')) {
        response.status(402).json({ message: "you don't have authority to create voucher" })

      } else {
        const voucher = await Voucher.create({
          name,
          price_discount: parseFloat(price_discount),
          id_product,
          code,
          admin_id: user.id,
          expired_time,
          publishedAt,
          photo: `${Env.get('APP_URL')}/image/${photo}.png`
        })

        const voucherPic = await request.file('image', {
          types: ['image'],
          size: '2mb'
        })

        console.log(voucher)
        await voucherPic.move(('public/image'), {
          name: photo + '.png'
        })

        if (!voucherPic.moved()) {
          throw new Error('voucher photo is not updated')
        }

        response.status(200).json({
          message: "voucher has been created",
          data: voucher
        })

      }
    } catch (e) {
      console.log(e)
      response.status(401).json({ error: e })
    }
  }

  /**
   * Display a single voucher.
   * GET vouchers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    // const voucher = await Database.from('vouchers').where(params.id)

  }

  /**
   * Render a form to update an existing voucher.
   * GET vouchers/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {
  }

  /**
   * Update voucher details.
   * PUT or PATCH vouchers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
  }

  /**
   * Delete a voucher with id.
   * DELETE vouchers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    try {
      const voucher = await Voucher.query().where('id', params.id).firstOrFail()
      voucher.delete()
      response.status(200).json({
        message: "item deleted",
        data: voucher
      })
    } catch (e) {
      console.log(e)
      response.status(404).json({ error: e })
    }
  }
}

module.exports = VoucherController
