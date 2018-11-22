'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const User = use('App/Models/User')
const Hash = use('Hash')
const View = use('View')
const fs = require('fs')
const private_key = fs.readFileSync('/Users/apple/documents/bootcamp/ecommerce/app/app/middleware/helper/private_key')
/**
 * Resourceful controller for interacting with logins
 */
class LoginController {
  /**
   * Show a list of all logins.
   * GET logins
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
  }

  /**
   * Render a form to be used for creating a new login.
   * GET logins/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {



  }

  /**
   * Create/save a new login.
   * POST logins
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, auth }) {
    try {
      const { email, password } = await request.body
      const user = await User.query().where('email', email).firstOrFail()
      const isSame = await Hash.verify(password, user.password)
      const tokenJwt =  await auth.generate(user)
      console.log(tokenJwt);
      
      console.log(user.verifiedAt);
      if(!user.verifiedAt){
        return response.json({error:"please verify your account, check your e-mail"})
      }else{
        if (isSame) {
          response.status(200).json({ "message": "welcome to mobile legend", token:tokenJwt.token})
          return tokenJwt
        } else {
          response.status(300).json({ "error": "invalid password" })
        }
      } 
      }
    catch (e) {
      response.status(401).json({ "error": "please enter correct E-mail" })
    }

  }

  /**
   * Display a single login.
   * GET logins/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    
    try {
      const user = await User.query().where('token', params.id).firstOrFail()
      if (user) {
        user.verifiedAt = new Date()
        await user.save()
        response.json({message:"you have been verified"})
      }
    }
    catch (e) {
      return e.message
    }
  }

  /**
   * Render a form to update an existing login.
   * GET logins/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {
  }

  /**
   * Update login details.
   * PUT or PATCH logins/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
  }

  /**
   * Delete a login with id.
   * DELETE logins/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
  }
}

module.exports = LoginController
