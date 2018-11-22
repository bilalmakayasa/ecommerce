'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const User = use('App/Models/User')
const AddressList = use('App/Models/AddressList')
const UserProfile = use('App/Models/UserProfile')
/**
 * Resourceful controller for interacting with userprofiles
 */
class UserProfileController {
  /**
   * Show a list of all userprofiles.
   * GET userprofiles
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view, auth }) {
    const user = await auth.getUser()
    const profile = await UserProfile.query().where('user_id', user.id).first()
    const Address = await AddressList.query().where('user_id', user.id).fetch()
    
    return {
      ...user.toJSON(),
      profile: profile.toJSON(),
      Address:Address.toJSON()
    }
  }

  /**
   * Render a form to be used for creating a new userprofile.
   * GET userprofiles/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new userprofile.
   * POST userprofiles
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth }) {
    const { name, phone_number} = await request.body
    const user = await auth.getUser()
    const Address = await AddressList.query().where('user_id',user.id).fetch()
    console.log(Address);
    response.json(Address)
    
    try {
      
      if(user){
        const userProfile = UserProfile.create({
          name,
          email:user.email,
          phone_number,
          user_id: user.id,
          
        })
        response.status(200).json(userProfile)
      }
      
    } catch (e) {
      response.json({error:'fsafsa'})
    }
  }

  /**
   * Display a single userprofile.
   * GET userprofiles/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view, auth }) {
  }

  /**
   * Render a form to update an existing userprofile.
   * GET userprofiles/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update userprofile details.
   * PUT or PATCH userprofiles/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a userprofile with id.
   * DELETE userprofiles/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = UserProfileController
