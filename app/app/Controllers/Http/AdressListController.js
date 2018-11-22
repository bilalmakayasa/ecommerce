'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const User = use('App/Models/User')
const AddressList = use('App/Models/AddressList')

/**
 * Resourceful controller for interacting with adresslists
 */
class AdressListController {
    
  /**
   * Show a list of all adresslists.
   * GET adresslists
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view, auth }) {
    const user = await auth.getUser()
    const Address = await AddressList.query().where('user_id', user.id).fetch()
    return Address
  }

  /**
   * Render a form to be used for creating a new adresslist.
   * GET adresslists/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new adresslist.
   * POST adresslists
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response , auth}) {
    const { province, city, street } = await request.body
      try {
        const user = await auth.getUser()
        if(user){
            const Address = await AddressList.create({
                province,
                city,
                street,
                user_id:user.id
            })
        }
          
      } catch (e) {
          response.status(401).json({error: e})
      }
  }

  /**
   * Display a single adresslist.
   * GET adresslists/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view , auth}) {
    const Address = await AddressList.query().where('user_id', params.id).first()
    // const Address = await AddressList.findBy('user_id',params.id)
    
    try {
        response.json({
            message: 'Success',
            data: Address
        })
        console.log(Address)
      } catch (error) {
        response.send('Missing or invalid api token')
      }
  }

  /**
   * Render a form to update an existing adresslist.
   * GET adresslists/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update adresslist details.
   * PUT or PATCH adresslists/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a adresslist with id.
   * DELETE adresslists/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = AdressListController
